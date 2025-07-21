import * as cheerio from 'cheerio';

export interface UsanaProduct {
  productCode: string;
  category: string;
  name: string;
  price: number;
  points: number;
}

export async function scrapeUsanaProducts(url: string = 'https://usanaq.com/mobile/calc/usana_calc.asp'): Promise<UsanaProduct[]> {
  try {
    console.log('유사나 제품 정보 스크래핑 시작:', url);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const products: UsanaProduct[] = [];
    let currentCategory = '';
    
    console.log('HTML 길이:', html.length);
    console.log('테이블 수:', $('table').length);
    
    // 모든 텍스트를 확인하여 카테고리 구분
    const htmlText = $.text();
    console.log('HTML 텍스트 샘플:', htmlText.substring(0, 500));
    
    // 다양한 방법으로 테이블 데이터 추출 시도
    let foundProducts = false;
    
    // 방법 1: 기존 방식
    $('table tr').each((index, element) => {
      const $row = $(element);
      const cells = $row.find('td');
      
      if (cells.length >= 6) {
        console.log(`행 ${index}: ${cells.length}개 셀`, cells.map((i, el) => $(el).text().trim()).get());
      }
      
      // 카테고리 행 확인 - 다양한 패턴 체크
      if (cells.length === 1 || (cells.length > 1 && cells.first().attr('colspan'))) {
        const categoryText = cells.first().text().trim();
        console.log('카테고리 후보:', categoryText);
        
        if (categoryText.includes('뉴트리션') || categoryText === '뉴트리션') {
          currentCategory = '뉴트리션';
          console.log('뉴트리션 카테고리 설정');
        } else if (categoryText.includes('셀라비브')) {
          currentCategory = '셀라비브';
          console.log('셀라비브 카테고리 설정');
        } else if (categoryText.includes('바디') && categoryText.includes('헤어')) {
          currentCategory = '바디&헤어';
          console.log('바디&헤어 카테고리 설정');
        } else if (categoryText.includes('유사나') && categoryText.includes('기프트')) {
          currentCategory = '유사나기프트팩';
          console.log('유사나기프트팩 카테고리 설정');
        } else if (categoryText.includes('뉴트리션') === false && 
                   categoryText.includes('셀라비브') === false &&
                   categoryText.includes('바디') === false &&
                   categoryText.includes('기프트') === false &&
                   categoryText.length > 0) {
          currentCategory = ''; // 원하지 않는 카테고리
          console.log('카테고리 초기화:', categoryText);
        }
        return;
      }
      
      // 제품 데이터 행 처리 - 6개 이상의 열이 있는 행
      if (cells.length >= 6 && currentCategory) {
        const productCode = $(cells[0]).text().trim();
        const name = $(cells[1]).text().trim();
        const priceText = $(cells[2]).text().trim().replace(/,/g, '').replace(/[^0-9]/g, '');
        const pointsText = $(cells[3]).text().trim().replace(/[^0-9]/g, '');
        
        console.log('제품 후보:', {
          productCode, name, priceText, pointsText, category: currentCategory
        });
        
        // 유효한 데이터인지 확인
        if (productCode && name && priceText && pointsText) {
          const price = parseInt(priceText);
          const points = parseInt(pointsText);
          
          if (!isNaN(price) && !isNaN(points) && price > 0 && points >= 0) {
            products.push({
              productCode,
              category: currentCategory,
              name,
              price,
              points
            });
            foundProducts = true;
            console.log('제품 추가됨:', { productCode, name, price, points, category: currentCategory });
          }
        }
      }
    });
    
    // 방법 2: 다른 구조 시도 (방법 1이 실패한 경우)
    if (!foundProducts) {
      console.log('방법 2 시도: 다른 HTML 구조 탐색');
      
      // 모든 td 요소 확인
      const allCells = $('td');
      console.log('전체 td 요소 수:', allCells.length);
      
      allCells.each((i, cell) => {
        const text = $(cell).text().trim();
        if (text.includes('뉴트리션') || text.includes('셀라비브') || 
            text.includes('바디') || text.includes('기프트')) {
          console.log(`카테고리 발견 (td ${i}):`, text);
        }
      });
    }
    
    console.log(`스크래핑 완료: ${products.length}개 제품 발견`);
    
    if (products.length === 0) {
      console.log('제품을 찾지 못했습니다. HTML 구조를 다시 확인합니다.');
      // HTML 구조 분석을 위한 추가 로깅
      console.log('첫 번째 테이블 내용:', $('table').first().html()?.substring(0, 1000));
    } else {
      console.log('카테고리별 제품 수:', 
        products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      );
    }
    
    return products;
    
  } catch (error) {
    console.error('유사나 제품 스크래핑 오류:', error);
    throw new Error('제품 정보를 가져오는 중 오류가 발생했습니다.');
  }
}

// 카테고리별 제품 필터링
export function filterProductsByCategory(products: UsanaProduct[], categories: string[]): UsanaProduct[] {
  return products.filter(product => categories.includes(product.category));
}

// 제품 검색
export function searchProducts(products: UsanaProduct[], searchTerm: string): UsanaProduct[] {
  const term = searchTerm.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.productCode.toLowerCase().includes(term)
  );
}