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
    
    // 로그에서 확인된 실제 HTML 구조에 맞게 파싱
    let foundProducts = false;
    
    // 먼저 카테고리 행 찾기 (th 태그에 배경색이 navy인 행들)
    $('tr').each((trIndex, trElement) => {
      const $row = $(trElement);
      
      // 카테고리 행 확인 (style에 background-color:navy가 있거나 th 태그가 있는 행)
      const categoryHeader = $row.find('th[colspan="7"]');
      if (categoryHeader.length > 0) {
        const categoryText = categoryHeader.text().trim();
        console.log('카테고리 발견:', categoryText);
        
        if (categoryText === '뉴트리션') {
          currentCategory = '뉴트리션';
        } else if (categoryText === '셀라비브') {
          currentCategory = '셀라비브';  
        } else if (categoryText.includes('바디') || categoryText.includes('헤어')) {
          currentCategory = '바디&헤어';
        } else if (categoryText.includes('기프트') || categoryText.includes('비즈니스')) {
          currentCategory = '유사나기프트팩';
        } else if (categoryText.includes('프로모션')) {
          currentCategory = '프로모션';
        } else {
          currentCategory = categoryText; // 기타 카테고리 그대로 사용
        }
        return; // 다음 행으로
      }
      
      // 제품 데이터 행 처리 (7개 열: 품번, 제품명, 가격, 점수, +, 수량, -)
      const cells = $row.find('td');
      if (cells.length === 7 && currentCategory) {
        const productCode = $(cells[0]).text().trim();
        const name = $(cells[1]).text().trim();
        const priceText = $(cells[2]).text().trim().replace(/,/g, '').replace(/[^0-9]/g, '');
        const pointsText = $(cells[3]).text().trim().replace(/[^0-9]/g, '');
        
        // 헤더 행이 아니고 실제 제품 데이터인지 확인
        if (productCode && name && 
            productCode !== '품번' && name !== '제품명' && 
            !productCode.includes('품번') && !name.includes('제품명')) {
          
          console.log('제품 후보:', {
            productCode, name, priceText, pointsText, category: currentCategory
          });
          
          const price = parseInt(priceText) || 0;
          const points = parseInt(pointsText) || 0;
          
          if (productCode.length > 0 && name.length > 0 && price >= 0) {
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