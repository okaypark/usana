import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search, Package, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UsanaProduct {
  productCode: string;
  category: string;
  name: string;
  price: number;
  points: number;
}

interface UsanaProductSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: UsanaProduct) => void;
}

const CATEGORIES = ['뉴트리션', '셀라비브', '바디&헤어', '유사나기프트팩'];

export default function UsanaProductSelector({ isOpen, onClose, onSelect }: UsanaProductSelectorProps) {
  const [products, setProducts] = useState<UsanaProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<UsanaProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(CATEGORIES);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const { toast } = useToast();

  // 제품 데이터 가져오기
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/usana/scrape", {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setProducts(result.data);
        setFilteredProducts(result.data);
        setHasLoaded(true);
        
        toast({
          title: "제품 정보 로드 완료",
          description: `${result.data.length}개의 제품을 불러왔습니다.`,
          duration: 3000,
        });
      } else {
        throw new Error(result.message || "제품 정보를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error('제품 정보 가져오기 오류:', error);
      toast({
        title: "오류 발생",
        description: error instanceof Error ? error.message : "제품 정보를 가져오는 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 필터링 적용
  const applyFilters = () => {
    let filtered = products;
    
    // 카테고리 필터링
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // 검색어 필터링
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.productCode.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(filtered);
  };

  // 카테고리 선택 토글
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // 제품 선택 처리
  const handleSelectProduct = (product: UsanaProduct) => {
    onSelect(product);
    onClose();
    toast({
      title: "제품 선택됨",
      description: `${product.name}이(가) 선택되었습니다.`,
      duration: 3000,
    });
  };

  // 다이얼로그가 열릴 때 제품 데이터 가져오기
  useEffect(() => {
    if (isOpen && !hasLoaded) {
      fetchProducts();
    }
  }, [isOpen, hasLoaded]);

  // 필터 변경시 적용
  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategories, products]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '뉴트리션': return 'bg-blue-100 text-blue-800 border-blue-200';
      case '셀라비브': return 'bg-pink-100 text-pink-800 border-pink-200';
      case '바디&헤어': return 'bg-green-100 text-green-800 border-green-200';
      case '유사나기프트팩': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            유사나 제품 선택
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* 검색 및 필터 */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="search">제품 검색</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="제품명 또는 제품코드 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={fetchProducts}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  새로고침
                </Button>
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div>
              <Label>카테고리 필터</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {CATEGORIES.map(category => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 결과 요약 */}
            <div className="text-sm text-gray-600">
              총 {filteredProducts.length}개 제품 (전체 {products.length}개 중)
            </div>
          </div>

          {/* 제품 목록 */}
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">제품 정보를 불러오는 중...</span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {hasLoaded ? "검색 조건에 맞는 제품이 없습니다." : "제품 정보를 불러오려면 새로고침 버튼을 클릭하세요."}
              </div>
            ) : (
              <div className="grid gap-2">
                {filteredProducts.map((product) => (
                  <Card key={product.productCode} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4" onClick={() => handleSelectProduct(product)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={getCategoryColor(product.category)}>
                              {product.category}
                            </Badge>
                            <span className="text-xs text-gray-500">#{product.productCode}</span>
                          </div>
                          <h4 className="font-medium text-sm">{product.name}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{product.price.toLocaleString()}원</div>
                          <div className="text-xs text-gray-500">{product.points}점</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}