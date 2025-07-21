import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, LogOut, Settings, Users, Package2, UserPlus } from "lucide-react";
import type { Package, PackageProduct } from "@shared/schema";
import AdminLogin from "./admin-login";
import PasswordChangeDialog from "@/components/password-change-dialog";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("admin");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<PackageProduct | null>(null);
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 인증 상태 확인
  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/status", {
        credentials: 'include',
        cache: 'no-cache'
      });
      const result = await response.json();
      console.log('관리자 페이지 인증 확인:', result);
      setIsAuthenticated(result.isAuthenticated);
      return result.isAuthenticated;
    } catch (error) {
      console.error("인증 상태 확인 오류:", error);
      setIsAuthenticated(false);
      return false;
    }
  };
  
  useEffect(() => {
    checkAuth();
  }, []);

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: 'include'
      });
      const result = await response.json();
      
      if (result.success) {
        setIsAuthenticated(false);
        toast({
          title: "로그아웃 완료",
          description: "성공적으로 로그아웃되었습니다.",
          duration: 3000, // 3초 후 자동 사라짐
        });
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      toast({
        title: "로그아웃 오류",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000, // 3초 후 자동 사라짐
      });
    }
  };

  // 패키지 목록 조회 (인증된 경우에만)
  const { data: packages = [], isLoading: packagesLoading } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
    enabled: isAuthenticated === true,
  });

  // 테마별 그룹화
  const themes = Array.from(new Set(packages.map(pkg => pkg.theme)));
  
  // 선택된 테마의 패키지 타입들
  const typesForTheme = packages
    .filter(pkg => pkg.theme === selectedTheme)
    .map(pkg => pkg.type);

  // 선택된 패키지 찾기
  const currentPackage = packages.find(pkg => 
    pkg.theme === selectedTheme && pkg.type === selectedType
  );

  // 선택된 패키지의 제품 목록 조회 (인증된 경우에만)
  const { data: packageProducts = [] } = useQuery<PackageProduct[]>({
    queryKey: ['/api/packages', currentPackage?.id, 'products'],
    enabled: !!currentPackage?.id && isAuthenticated === true,
  });

  // 패키지 업데이트 뮤테이션
  const updatePackageMutation = useMutation({
    mutationFn: async (data: { id: number; packageData: Partial<Package> }) =>
      apiRequest(`/api/packages/${data.id}`, 'PUT', data.packageData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
      toast({ title: "패키지가 성공적으로 업데이트되었습니다." });
      setIsPackageDialogOpen(false);
    },
    onError: () => {
      toast({ title: "패키지 업데이트에 실패했습니다.", variant: "destructive" });
    },
  });

  // 제품 생성 뮤테이션
  const createProductMutation = useMutation({
    mutationFn: async (productData: Omit<PackageProduct, 'id' | 'createdAt'>) =>
      apiRequest(`/api/packages/${currentPackage?.id}/products`, 'POST', productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/packages', currentPackage?.id, 'products'] });
      toast({ title: "제품이 성공적으로 추가되었습니다." });
      setIsProductDialogOpen(false);
    },
    onError: () => {
      toast({ title: "제품 추가에 실패했습니다.", variant: "destructive" });
    },
  });

  // 제품 업데이트 뮤테이션
  const updateProductMutation = useMutation({
    mutationFn: async (data: { id: number; productData: Partial<PackageProduct> }) =>
      apiRequest(`/api/package-products/${data.id}`, 'PUT', data.productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/packages', currentPackage?.id, 'products'] });
      toast({ title: "제품이 성공적으로 업데이트되었습니다." });
      setIsProductDialogOpen(false);
      setEditingProduct(null);
    },
    onError: () => {
      toast({ title: "제품 업데이트에 실패했습니다.", variant: "destructive" });
    },
  });

  // 제품 삭제 뮤테이션
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) =>
      apiRequest(`/api/package-products/${id}`, 'DELETE'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/packages', currentPackage?.id, 'products'] });
      toast({ title: "제품이 성공적으로 삭제되었습니다." });
    },
    onError: () => {
      toast({ title: "제품 삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  const handlePackageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!currentPackage) return;

    const packageData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      totalPrice: formData.get('totalPrice') as string,
    };

    updatePackageMutation.mutate({ id: currentPackage.id, packageData });
  };

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!currentPackage) return;

    const productData = {
      packageId: currentPackage.id,
      productName: formData.get('productName') as string,
      productDescription: formData.get('productDescription') as string,
      price: formData.get('price') as string,
      pointValue: parseInt(formData.get('pointValue') as string) || 0,
      order: parseInt(formData.get('order') as string) || 0,
    };

    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  // 관리자 추가 핸들러
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingAdmin(true);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('adminEmail') as string;
    const name = formData.get('adminName') as string;
    const password = formData.get('adminPassword') as string;

    try {
      const result = await apiRequest("/api/admin/add", "POST", {
        email,
        name,
        password
      }) as any;

      if (result.success) {
        toast({
          title: "관리자 추가 완료",
          description: `${name} 관리자가 성공적으로 추가되었습니다.`,
          duration: 3000,
        });
        setIsAddAdminDialogOpen(false);
        // 폼 리셋
        (e.target as HTMLFormElement).reset();
      } else {
        toast({
          title: "추가 실패",
          description: result.message || "관리자 추가에 실패했습니다.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "관리자 추가 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsAddingAdmin(false);
    }
  };

  // 인증 상태 로딩 중
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">인증 상태 확인 중...</div>
      </div>
    );
  }

  // 인증되지 않은 경우 로그인 페이지 표시
  if (isAuthenticated === false) {
    return <AdminLogin onLoginSuccess={async () => {
      console.log('로그인 성공 - 인증 상태 재확인');
      await new Promise(resolve => setTimeout(resolve, 100)); // 잠깐 대기
      const authenticated = await checkAuth();
      console.log('재확인된 인증 상태:', authenticated);
    }} />;
  }

  // 패키지 데이터 로딩 중
  if (packagesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">데이터 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  유사나 관리자 페이지
                </h1>
                <p className="text-gray-600">건강구독 마케팅 시스템을 관리할 수 있습니다.</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <LogOut className="w-4 h-4" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>

        {/* 탭 컨테이너 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-50 rounded-t-xl p-1">
              <TabsTrigger 
                value="admin" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Users className="w-4 h-4" />
                관리자
              </TabsTrigger>
              <TabsTrigger 
                value="packages" 
                className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Package2 className="w-4 h-4" />
                구독패키지
              </TabsTrigger>
            </TabsList>

            {/* 관리자 탭 */}
            <TabsContent value="admin" className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* 비밀번호 변경 카드 */}
                <Card className="border-blue-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-blue-700">
                      <Settings className="w-5 h-5" />
                      비밀번호 관리
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">현재 관리자 계정의 비밀번호를 변경할 수 있습니다.</p>
                    <PasswordChangeDialog>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        <Settings className="w-4 h-4 mr-2" />
                        비밀번호 변경
                      </Button>
                    </PasswordChangeDialog>
                  </CardContent>
                </Card>

                {/* 관리자 추가 카드 */}
                <Card className="border-green-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <UserPlus className="w-5 h-5" />
                      관리자 추가
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">새로운 관리자 계정을 추가할 수 있습니다.</p>
                    <Dialog open={isAddAdminDialogOpen} onOpenChange={setIsAddAdminDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="w-full border-green-300 text-green-700 hover:bg-green-50"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          관리자 추가
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>새 관리자 추가</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddAdmin} className="space-y-4">
                          <div>
                            <Label htmlFor="adminEmail">이메일</Label>
                            <Input
                              id="adminEmail"
                              type="email"
                              placeholder="admin@example.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="adminName">이름</Label>
                            <Input
                              id="adminName"
                              placeholder="관리자 이름"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="adminPassword">비밀번호</Label>
                            <Input
                              id="adminPassword"
                              type="password"
                              placeholder="최소 8자 이상"
                              required
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full"
                            disabled={isAddingAdmin}
                          >
                            {isAddingAdmin ? "추가 중..." : "관리자 추가"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>

              {/* 현재 관리자 정보 */}
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5" />
                    현재 관리자 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">박현진</h3>
                        <p className="text-sm text-gray-600">okaypark7@gmail.com</p>
                        <p className="text-xs text-blue-600 mt-1">유사나 에메랄드 디렉터</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 구독패키지 탭 */}
            <TabsContent value="packages" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 패키지 선택 */}
          <Card>
            <CardHeader>
              <CardTitle>패키지 선택</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* 테마 선택 */}
                <div>
                  <Label htmlFor="theme-select">구독 테마</Label>
                  <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="구독 테마를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 타입 선택 */}
                {selectedTheme && (
                  <div>
                    <Label htmlFor="type-select">패키지 타입</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="패키지 타입을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {typesForTheme.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type === 'standard' ? '스탠다드' : '프리미엄'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* 선택된 패키지 정보 */}
                {currentPackage && (
                  <div className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{currentPackage.name}</h3>
                        <p className="text-sm text-gray-600">{currentPackage.description}</p>
                        <p className="text-sm font-medium text-blue-600 mt-1">{currentPackage.totalPrice}</p>
                      </div>
                      <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>패키지 편집</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handlePackageSubmit} className="space-y-4">
                            <div>
                              <Label htmlFor="name">패키지명</Label>
                              <Input
                                id="name"
                                name="name"
                                defaultValue={currentPackage?.name}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="description">설명</Label>
                              <Textarea
                                id="description"
                                name="description"
                                defaultValue={currentPackage?.description || ''}
                              />
                            </div>
                            <div>
                              <Label htmlFor="totalPrice">총 가격</Label>
                              <Input
                                id="totalPrice"
                                name="totalPrice"
                                defaultValue={currentPackage?.totalPrice}
                                placeholder="예: 월 130P"
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              패키지 업데이트
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 제품 관리 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                제품 구성
                {currentPackage && (
                  <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingProduct(null);
                          setIsProductDialogOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        제품 추가
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingProduct ? '제품 편집' : '제품 추가'}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="productName">제품명</Label>
                          <Input
                            id="productName"
                            name="productName"
                            defaultValue={editingProduct?.productName || ''}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="productDescription">제품 설명</Label>
                          <Textarea
                            id="productDescription"
                            name="productDescription"
                            defaultValue={editingProduct?.productDescription || ''}
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">가격</Label>
                          <Input
                            id="price"
                            name="price"
                            defaultValue={editingProduct?.price || ''}
                            placeholder="예: 35P"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pointValue">포인트 값</Label>
                          <Input
                            id="pointValue"
                            name="pointValue"
                            type="number"
                            defaultValue={editingProduct?.pointValue || 0}
                          />
                        </div>
                        <div>
                          <Label htmlFor="order">정렬 순서</Label>
                          <Input
                            id="order"
                            name="order"
                            type="number"
                            defaultValue={editingProduct?.order || 0}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          {editingProduct ? '제품 업데이트' : '제품 추가'}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentPackage ? (
                <div>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold">{currentPackage.name}</h3>
                    <p className="text-sm text-gray-600">{currentPackage.description}</p>
                  </div>
                  <div className="space-y-3">
                    {packageProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between items-start p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{product.productName}</h4>
                          <p className="text-sm text-gray-600">{product.productDescription}</p>
                          <p className="text-sm font-medium text-blue-600 mt-1">
                            {product.price}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsProductDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              if (confirm('이 제품을 삭제하시겠습니까?')) {
                                deleteProductMutation.mutate(product.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  편집할 구독 테마와 패키지 타입을 선택해주세요
                </p>
              )}
            </CardContent>
          </Card>
        </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}