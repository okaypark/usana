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
    
    // 테이블의 모든 행을 순회
    $('table tr').each((index, element) => {
      const $row = $(element);
      const cells = $row.find('td');
      
      // 카테고리 행 확인 (colspan이 있는 행)
      if (cells.length === 1 && cells.first().attr('colspan')) {
        const categoryText = cells.first().text().trim();
        
        // 원하는 카테고리만 처리
        if (categoryText.includes('뉴트리션')) {
          currentCategory = '뉴트리션';
        } else if (categoryText.includes('셀라비브')) {
          currentCategory = '셀라비브';
        } else if (categoryText.includes('바디') && categoryText.includes('헤어')) {
          currentCategory = '바디&헤어';
        } else if (categoryText.includes('유사나') && categoryText.includes('기프트')) {
          currentCategory = '유사나기프트팩';
        } else {
          currentCategory = ''; // 원하지 않는 카테고리
        }
        return; // 카테고리 행은 건너뛰기
      }
      
      // 제품 데이터 행 처리 (7개 열이 있는 행)
      if (cells.length === 7 && currentCategory) {
        const productCode = $(cells[0]).text().trim();
        const name = $(cells[1]).text().trim();
        const priceText = $(cells[2]).text().trim().replace(/,/g, '');
        const pointsText = $(cells[3]).text().trim();
        
        // 유효한 데이터인지 확인
        if (productCode && name && priceText && pointsText) {
          const price = parseInt(priceText);
          const points = parseInt(pointsText);
          
          if (!isNaN(price) && !isNaN(points)) {
            products.push({
              productCode,
              category: currentCategory,
              name,
              price,
              points
            });
          }
        }
      }
    });
    
    console.log(`스크래핑 완료: ${products.length}개 제품 발견`);
    console.log('카테고리별 제품 수:', 
      products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    );
    
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