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
import { Plus, Edit, Trash2, LogOut, Settings, Users, Package2, UserPlus, Crown, UserMinus, Home, Globe } from "lucide-react";
import type { Package, PackageProduct, Faq, SiteSetting } from "@shared/schema";
import AdminLogin from "./admin-login";
import PasswordChangeDialog from "@/components/password-change-dialog";
import UsanaProductSelector from "@/components/usana-product-selector";

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
  const [isUsanaProductSelectorOpen, setIsUsanaProductSelectorOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  
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

  const { data: adminListData, refetch: refetchAdmins } = useQuery({
    queryKey: ["/api/admin/list"],
    enabled: isAuthenticated === true
  });

  // 현재 로그인한 관리자의 이메일 가져오기
  const { data: currentAdminData } = useQuery({
    queryKey: ["/api/admin/current"],
    enabled: isAuthenticated === true
  });

  // FAQ 목록 조회
  const { data: faqs = [], isLoading: faqsLoading } = useQuery<Faq[]>({
    queryKey: ['/api/faqs'],
    enabled: isAuthenticated === true,
  });

  // 사이트 설정 조회
  const { data: siteSettings = [], isLoading: settingsLoading } = useQuery<SiteSetting[]>({
    queryKey: ['/api/site-settings'],
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
  const { data: packageProducts = [], isLoading: productsLoading, error: productsError } = useQuery<PackageProduct[]>({
    queryKey: ['/api/packages', currentPackage?.id, 'products'],
    queryFn: () => {
      console.log('제품 목록 쿼리 실행:', currentPackage?.id);
      return fetch(`/api/packages/${currentPackage?.id}/products`, {
        credentials: 'include'
      }).then(res => res.json());
    },
    enabled: !!currentPackage?.id && isAuthenticated === true,
  });

  // 디버깅을 위한 로그
  console.log('현재 상태:', {
    currentPackageId: currentPackage?.id,
    isAuthenticated,
    packageProducts: packageProducts?.length || 0,
    productsLoading,
    productsError
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
    onSuccess: async (data) => {
      console.log('제품 추가 성공:', data);
      console.log('현재 패키지 ID:', currentPackage?.id);
      
      // 현재 패키지의 제품 목록 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: ['/api/packages', currentPackage?.id, 'products'] });
      
      console.log('쿼리 무효화 완료');
      
      toast({ title: "제품이 성공적으로 추가되었습니다." });
      setIsProductDialogOpen(false);
    },
    onError: (error) => {
      console.error('제품 추가 실패:', error);
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
      toast({ 
        title: "제거되었습니다.", 
        duration: 1000 // 1초 후 자동 사라짐
      });
    },
    onError: () => {
      toast({ title: "제품 삭제에 실패했습니다.", variant: "destructive" });
    },
  });

  // 제품 수량 업데이트 뮤테이션
  const updateProductQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) =>
      apiRequest(`/api/package-products/${id}/quantity`, 'PATCH', { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/packages', currentPackage?.id, 'products'] });
    },
    onError: () => {
      toast({ title: "수량 변경에 실패했습니다.", variant: "destructive" });
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
      quantity: parseInt(formData.get('quantity') as string) || 1,
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

    console.log('전송 데이터:', { email, name, password });

    try {
      const response = await apiRequest("/api/admin/add", "POST", {
        email,
        name,
        password
      });

      const result = await response.json();
      console.log('관리자 추가 응답:', result);

      if (result && result.success) {
        toast({
          title: "관리자 추가 완료",
          description: `${name} 관리자가 성공적으로 추가되었습니다.`,
          duration: 3000,
        });
        setIsAddAdminDialogOpen(false);
        // 폼 리셋
        (e.target as HTMLFormElement).reset();
        // 관리자 목록 새로고침
        refetchAdmins();
      } else {
        toast({
          title: "추가 실패",
          description: result.message || "관리자 추가에 실패했습니다.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('관리자 추가 에러:', error);
      // 409 에러 (이미 존재하는 이메일)인 경우 특별 처리
      if (error.message.includes('409:')) {
        const errorData = JSON.parse(error.message.split('409: ')[1]);
        toast({
          title: "추가 실패",
          description: errorData.message || "이미 등록된 이메일입니다.",
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "오류 발생",
          description: error.message || "관리자 추가 중 오류가 발생했습니다.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } finally {
      setIsAddingAdmin(false);
    }
  };

  // 관리자 삭제 핸들러
  const handleDeleteAdmin = async (adminId: number, adminName: string) => {

    try {
      const response = await apiRequest(`/api/admin/${adminId}`, "DELETE");
      const result = await response.json();

      if (result && result.success) {
        toast({
          title: "관리자 삭제 완료",
          description: `${adminName} 관리자가 성공적으로 삭제되었습니다.`,
          duration: 3000,
        });
        // 관리자 목록 새로고침
        refetchAdmins();
      } else {
        toast({
          title: "삭제 실패",
          description: result.message || "관리자 삭제에 실패했습니다.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error('관리자 삭제 에러:', error);
      if (error.message.includes('403:')) {
        const errorData = JSON.parse(error.message.split('403: ')[1]);
        toast({
          title: "권한 없음",
          description: errorData.message || "주 관리자만 다른 관리자를 삭제할 수 있습니다.",
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "오류 발생",
          description: error.message || "관리자 삭제 중 오류가 발생했습니다.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  // FAQ 생성/수정 핸들러
  const handleFaqSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const faqData = {
      question: formData.get('question') as string,
      answer: formData.get('answer') as string,
      category: formData.get('category') as string,
      order: parseInt(formData.get('order') as string) || 1
    };

    try {
      if (editingFaq) {
        // FAQ 수정
        const response = await apiRequest(`/api/faqs/${editingFaq.id}`, 'PUT', faqData);
        if (response.ok) {
          toast({
            title: "FAQ 수정 완료",
            description: "FAQ가 성공적으로 수정되었습니다.",
          });
        }
      } else {
        // FAQ 추가
        const response = await apiRequest('/api/faqs', 'POST', faqData);
        if (response.ok) {
          toast({
            title: "FAQ 추가 완료",
            description: "새 FAQ가 성공적으로 추가되었습니다.",
          });
        }
      }
      queryClient.invalidateQueries({ queryKey: ['/api/faqs'] });
      setIsFaqDialogOpen(false);
      setEditingFaq(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "FAQ 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // FAQ 삭제 핸들러
  const handleDeleteFaq = async (faqId: number) => {
    try {
      const response = await apiRequest(`/api/faqs/${faqId}`, 'DELETE');
      if (response.ok) {
        toast({
          title: "FAQ 삭제 완료",
          description: "FAQ가 성공적으로 삭제되었습니다.",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/faqs'] });
      }
    } catch (error) {
      toast({
        title: "삭제 실패",
        description: "FAQ 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // 사이트 설정 업데이트 핸들러
  const handleUpdateSetting = async (key: string, value: string) => {
    try {
      const response = await apiRequest(`/api/site-settings/${key}`, 'PUT', { value });
      if (response.ok) {
        toast({
          title: "설정 업데이트 완료",
          description: "사이트 설정이 성공적으로 업데이트되었습니다.",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/site-settings'] });
      }
    } catch (error) {
      toast({
        title: "설정 업데이트 실패",
        description: "사이트 설정 업데이트 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // 전체 사이트 정보 업데이트 핸들러
  const handleUpdateAllSettings = async () => {
    try {
      // 모든 input 필드에서 현재 값을 가져와서 업데이트
      const inputs = document.querySelectorAll('#settings input, #settings textarea');
      const updates: Array<{ key: string, value: string }> = [];
      
      inputs.forEach((input: any) => {
        if (input.id && input.value !== undefined) {
          updates.push({ key: input.id, value: input.value || '' });
        }
      });

      // 체크박스 처리
      const checkboxes = document.querySelectorAll('#settings input[type="checkbox"]');
      checkboxes.forEach((checkbox: any) => {
        if (checkbox.id) {
          updates.push({ key: checkbox.id, value: checkbox.checked ? 'true' : 'false' });
        }
      });

      if (updates.length === 0) {
        toast({
          title: "업데이트할 정보 없음",
          description: "변경된 정보가 없습니다.",
          variant: "destructive",
        });
        return;
      }

      // 일괄 업데이트 API 사용
      const response = await apiRequest('/api/site-settings/bulk-update', 'POST', { settings: updates });
      const result = await response.json();

      if (result.success) {
        toast({
          title: "전체 정보 업데이트 완료",
          description: `${result.updatedCount}개의 설정이 성공적으로 업데이트되었습니다.`,
        });
        
        // 캐시 무효화하여 최신 데이터 로드
        queryClient.invalidateQueries({ queryKey: ['/api/site-settings'] });
        queryClient.invalidateQueries({ queryKey: ['/api/public/packages'] });
        queryClient.invalidateQueries({ queryKey: ['/api/faqs'] });
        
        // 메인 웹사이트도 새로고침하도록 알림
        toast({
          title: "웹사이트 적용 완료",
          description: "변경사항이 메인 웹사이트에 즉시 반영되었습니다.",
        });
      } else {
        toast({
          title: "업데이트 실패",
          description: result.message || "설정 업데이트 중 오류가 발생했습니다.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('전체 사이트 설정 업데이트 오류:', error);
      toast({
        title: "전체 업데이트 실패",
        description: "전체 사이트 설정 업데이트 중 오류가 발생했습니다.",
        variant: "destructive",
      });
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
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => window.open("/", "_blank")}
                  variant="outline"
                  className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 hover:text-green-800"
                >
                  <Home className="w-4 h-4" />
                  메인 웹사이트
                </Button>
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
        </div>

        {/* 탭 컨테이너 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-t-xl p-2 gap-1">
              <TabsTrigger 
                value="admin" 
                className="flex items-center gap-2 rounded-lg py-3 px-2 font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50 text-gray-600 data-[state=active]:scale-105"
              >
                <Users className="w-4 h-4" />
                관리자
              </TabsTrigger>
              <TabsTrigger 
                value="packages" 
                className="flex items-center gap-2 rounded-lg py-3 px-2 font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-50 text-gray-600 data-[state=active]:scale-105"
              >
                <Package2 className="w-4 h-4" />
                구독패키지
              </TabsTrigger>
              <TabsTrigger 
                value="faqs" 
                className="flex items-center gap-2 rounded-lg py-3 px-2 font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50 text-gray-600 data-[state=active]:scale-105"
              >
                <Settings className="w-4 h-4" />
                FAQ 관리
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center gap-2 rounded-lg py-3 px-2 font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-orange-50 text-gray-600 data-[state=active]:scale-105"
              >
                <Globe className="w-4 h-4" />
                사이트설정
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
                      <DialogContent aria-describedby="dialog-description">
                        <DialogHeader>
                          <DialogTitle>새 관리자 추가</DialogTitle>
                          <p id="dialog-description" className="text-sm text-muted-foreground mt-2">
                            새로운 관리자 계정을 생성합니다. 이메일, 이름, 비밀번호(최소 8자)를 입력해주세요.
                          </p>
                        </DialogHeader>
                        <form onSubmit={handleAddAdmin} className="space-y-4">
                          <div>
                            <Label htmlFor="adminEmail">이메일</Label>
                            <Input
                              id="adminEmail"
                              name="adminEmail"
                              type="email"
                              placeholder="admin@example.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="adminName">이름</Label>
                            <Input
                              id="adminName"
                              name="adminName"
                              placeholder="관리자 이름"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="adminPassword">비밀번호</Label>
                            <Input
                              id="adminPassword"
                              name="adminPassword"
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

              {/* 등록된 관리자 목록 */}
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5" />
                    등록된 관리자 목록
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {(adminListData as any)?.admins ? (
                    <div className="space-y-3">
                      {(adminListData as any).admins.map((admin: any, index: number) => {
                        const isMainAdmin = admin.email === 'okaypark7@gmail.com';
                        const isCurrentUserMainAdmin = (currentAdminData as any)?.admin?.email === 'okaypark7@gmail.com';
                        const canDelete = isCurrentUserMainAdmin && !isMainAdmin;
                        
                        return (
                          <div key={admin.id} className={`rounded-lg p-4 border ${
                            isMainAdmin 
                              ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' 
                              : 'bg-blue-50 border-blue-200'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                isMainAdmin 
                                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600' 
                                  : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                              }`}>
                                {isMainAdmin ? (
                                  <Crown className="w-5 h-5 text-white" />
                                ) : (
                                  <span className="text-white font-semibold text-sm">{index + 1}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900">{admin.name}</h3>
                                  {isMainAdmin && (
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                      주 관리자
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{admin.email}</p>
                                <p className={`text-xs mt-1 ${
                                  isMainAdmin ? 'text-yellow-600' : 'text-blue-600'
                                }`}>
                                  {new Date(admin.createdAt).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })} 가입
                                </p>
                              </div>
                              {canDelete && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteAdmin(admin.id, admin.name)}
                                  className="ml-auto"
                                >
                                  <UserMinus className="w-4 h-4 mr-1" />
                                  삭제
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      관리자 정보를 불러오는 중...
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 구독패키지 탭 */}
            <TabsContent value="packages" className="p-6 space-y-6">
              {/* 새 패키지 추가 섹션 */}
              <Card className="border-green-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <Package2 className="w-5 h-5" />
                      패키지 관리
                    </div>
                    <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          새 패키지 추가
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>새 구독패키지 추가</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const packageData = {
                            theme: formData.get('theme') as string,
                            type: formData.get('type') as string,
                            name: formData.get('name') as string,
                            description: formData.get('description') as string,
                            totalPrice: '0원'
                          };

                          try {
                            const response = await apiRequest('/api/packages', 'POST', packageData);
                            if (response.ok) {
                              toast({
                                title: "패키지 추가 완료",
                                description: "새 구독패키지가 성공적으로 추가되었습니다.",
                              });
                              queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
                              setIsPackageDialogOpen(false);
                              (e.target as HTMLFormElement).reset();
                            }
                          } catch (error) {
                            toast({
                              title: "패키지 추가 실패",
                              description: "패키지 추가 중 오류가 발생했습니다.",
                              variant: "destructive",
                            });
                          }
                        }} className="space-y-4">
                          <div>
                            <Label htmlFor="theme">테마</Label>
                            <Input
                              id="theme"
                              name="theme"
                              placeholder="예: 면역건강구독"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="type">타입</Label>
                            <Select name="type" required>
                              <SelectTrigger>
                                <SelectValue placeholder="패키지 타입 선택" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="standard">스탠다드</SelectItem>
                                <SelectItem value="premium">프리미엄</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="name">패키지명</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="예: 기본적인 면역력 강화 패키지"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">설명</Label>
                            <Textarea
                              id="description"
                              name="description"
                              placeholder="패키지에 대한 상세 설명을 입력하세요"
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            패키지 추가
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {themes.map((theme) => (
                      <div key={theme} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-3">{theme}</h3>
                        <div className="grid gap-3">
                          {packages
                            .filter(pkg => pkg.theme === theme)
                            .map((pkg) => (
                            <div key={pkg.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium">{pkg.type} - {pkg.name}</div>
                                <div className="text-sm text-gray-600">{pkg.description}</div>
                                <div className="text-sm font-semibold text-blue-600 mt-1">
                                  {pkg.totalPrice} {pkg.totalPoints ? `(${pkg.totalPoints}P)` : ''}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>패키지 정보 수정</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={async (e) => {
                                      e.preventDefault();
                                      const formData = new FormData(e.currentTarget);
                                      const packageData = {
                                        theme: formData.get('theme') as string,
                                        type: formData.get('type') as string,
                                        name: formData.get('name') as string,
                                        description: formData.get('description') as string,
                                      };

                                      try {
                                        const response = await apiRequest(`/api/packages/${pkg.id}`, 'PUT', packageData);
                                        if (response.ok) {
                                          toast({
                                            title: "패키지 수정 완료",
                                            description: "패키지 정보가 성공적으로 수정되었습니다.",
                                          });
                                          queryClient.invalidateQueries({ queryKey: ['/api/packages'] });
                                          queryClient.invalidateQueries({ queryKey: ['/api/public/packages'] });
                                        }
                                      } catch (error) {
                                        toast({
                                          title: "패키지 수정 실패",
                                          description: "패키지 수정 중 오류가 발생했습니다.",
                                          variant: "destructive",
                                        });
                                      }
                                    }} className="space-y-4">
                                      <div>
                                        <Label htmlFor="theme">테마</Label>
                                        <Input
                                          id="theme"
                                          name="theme"
                                          defaultValue={pkg.theme}
                                          required
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="type">타입</Label>
                                        <Select name="type" defaultValue={pkg.type} required>
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="standard">스탠다드</SelectItem>
                                            <SelectItem value="premium">프리미엄</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="name">패키지명</Label>
                                        <Input
                                          id="name"
                                          name="name"
                                          defaultValue={pkg.name}
                                          required
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="description">설명</Label>
                                        <Textarea
                                          id="description"
                                          name="description"
                                          defaultValue={pkg.description || ''}
                                          rows={3}
                                        />
                                      </div>
                                      <Button type="submit" className="w-full">
                                        수정 완료
                                      </Button>
                                    </form>
                                  </DialogContent>
                                </Dialog>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedTheme(pkg.theme);
                                    setSelectedType(pkg.type);
                                  }}
                                  className="text-blue-600"
                                >
                                  제품 관리
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setIsUsanaProductSelectorOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        유사나 제품 추가
                      </Button>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProduct(null);
                            setIsProductDialogOpen(true);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          직접 입력
                        </Button>
                      </DialogTrigger>
                    </div>
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
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-lg text-blue-900">{currentPackage.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{currentPackage.description}</p>
                    
                    {/* 실시간 총합계 표시 */}
                    <div className="bg-white rounded-lg p-3 border border-blue-300">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">총 제품 수:</span>
                        <span className="font-medium">{packageProducts.length}개</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-gray-700">총 금액:</span>
                        <span className="font-semibold text-blue-600">
                          {packageProducts.reduce((total, product) => {
                            const price = parseInt(product.price?.replace(/[^0-9]/g, '') || '0');
                            const quantity = product.quantity || 1;
                            return total + (price * quantity);
                          }, 0).toLocaleString('ko-KR')}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-gray-700">총 포인트:</span>
                        <span className="font-semibold text-green-600">
                          {packageProducts.reduce((total, product) => {
                            const points = parseInt(product.pointValue?.toString() || '0');
                            const quantity = product.quantity || 1;
                            return total + (points * quantity);
                          }, 0).toLocaleString()}P
                        </span>
                      </div>
                    </div>

                    {/* 패키지 정보 업데이트 버튼 */}
                    <Button
                      onClick={() => {
                        const totalPrice = packageProducts.reduce((total, product) => {
                          const price = parseInt(product.price?.replace(/[^0-9]/g, '') || '0');
                          const quantity = product.quantity || 1;
                          return total + (price * quantity);
                        }, 0);
                        
                        const totalPoints = packageProducts.reduce((total, product) => {
                          const points = parseInt(product.pointValue?.toString() || '0');
                          const quantity = product.quantity || 1;
                          return total + (points * quantity);
                        }, 0);

                        updatePackageMutation.mutate({
                          id: currentPackage.id,
                          packageData: {
                            totalPrice: totalPrice.toLocaleString('ko-KR') + '원',
                            totalPoints: totalPoints
                          }
                        });
                      }}
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                      disabled={updatePackageMutation.isPending}
                    >
                      {updatePackageMutation.isPending ? '업데이트 중...' : '패키지 정보 업데이트'}
                    </Button>
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
                        <div className="flex items-center gap-3">
                          {/* 수량 조절 UI */}
                          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-gray-600 hover:bg-gray-200"
                              onClick={() => {
                                if (product.quantity && product.quantity > 1) {
                                  updateProductQuantityMutation.mutate({
                                    id: product.id,
                                    quantity: product.quantity - 1
                                  });
                                }
                              }}
                              disabled={!product.quantity || product.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="text-sm font-medium min-w-[20px] text-center">
                              {product.quantity || 1}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-gray-600 hover:bg-gray-200"
                              onClick={() => {
                                updateProductQuantityMutation.mutate({
                                  id: product.id,
                                  quantity: (product.quantity || 1) + 1
                                });
                              }}
                            >
                              +
                            </Button>
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
                                deleteProductMutation.mutate(product.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

            {/* FAQ 관리 탭 */}
            <TabsContent value="faqs" className="p-6 space-y-6">
              <Card className="border-green-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <Settings className="w-5 h-5" />
                      FAQ 관리
                    </div>
                    <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => setEditingFaq(null)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          새 FAQ 추가
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {editingFaq ? 'FAQ 수정' : '새 FAQ 추가'}
                          </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleFaqSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="category">카테고리</Label>
                              <Input
                                id="category"
                                name="category"
                                defaultValue={editingFaq?.category || ""}
                                placeholder="예: 제품안전성, 사업방식"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="order">순서</Label>
                              <Input
                                id="order"
                                name="order"
                                type="number"
                                defaultValue={editingFaq?.order || 1}
                                min={1}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="question">질문</Label>
                            <Input
                              id="question"
                              name="question"
                              defaultValue={editingFaq?.question || ""}
                              placeholder="자주 묻는 질문을 입력하세요"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="answer">답변</Label>
                            <Textarea
                              id="answer"
                              name="answer"
                              defaultValue={editingFaq?.answer || ""}
                              placeholder="상세한 답변을 입력하세요"
                              rows={6}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            {editingFaq ? 'FAQ 수정' : 'FAQ 추가'}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {faqsLoading ? (
                    <div className="text-center py-8">FAQ 목록 로딩 중...</div>
                  ) : faqs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      등록된 FAQ가 없습니다. 새 FAQ를 추가해보세요.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {faqs
                        .sort((a, b) => a.order - b.order)
                        .map((faq) => (
                        <div
                          key={faq.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  {faq.category}
                                </span>
                                <span className="text-sm text-gray-500">순서: {faq.order}</span>
                              </div>
                              <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                              <p className="text-sm text-gray-600 line-clamp-3">{faq.answer}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingFaq(faq);
                                  setIsFaqDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteFaq(faq.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* 사이트 설정 탭 */}
            <TabsContent value="settings" className="p-6 space-y-6" id="settings">
              <Card className="border-orange-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Globe className="w-5 h-5" />
                      사이트 설정 관리
                    </div>
                    <Button
                      onClick={handleUpdateAllSettings}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      정보 업데이트
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {settingsLoading ? (
                    <div className="text-center py-8">사이트 설정 로딩 중...</div>
                  ) : (
                    <>
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* 관리자 정보 */}
                      <Card className="border-blue-100">
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold text-blue-700">관리자 정보</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="admin_name">이름</Label>
                            <Input
                              id="admin_name"
                              defaultValue={siteSettings.find(s => s.key === 'admin_name')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('admin_name', e.target.value)}
                              placeholder="관리자 이름"
                            />
                          </div>
                          <div>
                            <Label htmlFor="admin_phone">전화번호</Label>
                            <Input
                              id="admin_phone"
                              defaultValue={siteSettings.find(s => s.key === 'admin_phone')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('admin_phone', e.target.value)}
                              placeholder="010-0000-0000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="admin_email">이메일</Label>
                            <Input
                              id="admin_email"
                              defaultValue={siteSettings.find(s => s.key === 'admin_email')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('admin_email', e.target.value)}
                              placeholder="admin@example.com"
                            />
                          </div>
                          <div>
                            <Label htmlFor="admin_kakao">카카오톡 ID</Label>
                            <Input
                              id="admin_kakao"
                              defaultValue={siteSettings.find(s => s.key === 'admin_kakao')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('admin_kakao', e.target.value)}
                              placeholder="카카오톡 아이디"
                            />
                          </div>
                          <div>
                            <Label htmlFor="notification_email">알림 이메일</Label>
                            <Input
                              id="notification_email"
                              defaultValue={siteSettings.find(s => s.key === 'notification_email')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('notification_email', e.target.value)}
                              placeholder="상담신청 알림을 받을 이메일"
                            />
                          </div>
                          <div>
                            <Label htmlFor="admin_intro">자기소개</Label>
                            <Textarea
                              id="admin_intro"
                              defaultValue={siteSettings.find(s => s.key === 'admin_intro')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('admin_intro', e.target.value)}
                              placeholder="자기소개를 입력하세요"
                              rows={4}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* URL 설정 */}
                      <Card className="border-green-100">
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold text-green-700">URL 설정</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="openchat_url">오픈채팅 URL</Label>
                            <Input
                              id="openchat_url"
                              defaultValue={siteSettings.find(s => s.key === 'openchat_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('openchat_url', e.target.value)}
                              placeholder="https://open.kakao.com/..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="nutrition_product_url">뉴트리션 제품 URL</Label>
                            <Input
                              id="nutrition_product_url"
                              defaultValue={siteSettings.find(s => s.key === 'nutrition_product_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('nutrition_product_url', e.target.value)}
                              placeholder="https://okay7.usana.com/..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="skincare_product_url">셀라비브 스킨케어 URL</Label>
                            <Input
                              id="skincare_product_url"
                              defaultValue={siteSettings.find(s => s.key === 'skincare_product_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('skincare_product_url', e.target.value)}
                              placeholder="https://okay7.usana.com/..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="diet_product_url">다이어트&해독 URL</Label>
                            <Input
                              id="diet_product_url"
                              defaultValue={siteSettings.find(s => s.key === 'diet_product_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('diet_product_url', e.target.value)}
                              placeholder="https://okay7.usana.com/..."
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid gap-6 lg:grid-cols-2 mt-6">
                      <Card className="border-purple-100">
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold text-purple-700">소셜 미디어 링크</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="kakao_openchat_url">카카오톡 오픈채팅 URL</Label>
                            <Input
                              id="kakao_openchat_url"
                              defaultValue={siteSettings.find(s => s.key === 'kakao_openchat_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('kakao_openchat_url', e.target.value)}
                              placeholder="https://open.kakao.com/..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="blog_url">블로그 URL</Label>
                            <Input
                              id="blog_url"
                              defaultValue={siteSettings.find(s => s.key === 'blog_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('blog_url', e.target.value)}
                              placeholder="https://blog.naver.com/..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="instagram_url">인스타그램 URL</Label>
                            <Input
                              id="instagram_url"
                              defaultValue={siteSettings.find(s => s.key === 'instagram_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('instagram_url', e.target.value)}
                              placeholder="https://instagram.com/..."
                            />
                          </div>
                          <div>
                            <Label htmlFor="youtube_url">유튜브 URL</Label>
                            <Input
                              id="youtube_url"
                              defaultValue={siteSettings.find(s => s.key === 'youtube_url')?.value || ''}
                              onBlur={(e) => handleUpdateSetting('youtube_url', e.target.value)}
                              placeholder="https://youtube.com/..."
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-amber-100">
                        <CardHeader className="pb-3">
                          <h3 className="text-lg font-semibold text-amber-700">푸터 표시 설정</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              id="show_blog"
                              type="checkbox"
                              className="w-4 h-4"
                              defaultChecked={siteSettings.find(s => s.key === 'show_blog')?.value === 'true'}
                              onChange={(e) => handleUpdateSetting('show_blog', e.target.checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="show_blog" className="text-sm">블로그 링크 표시</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              id="show_kakao"
                              type="checkbox"
                              className="w-4 h-4"
                              defaultChecked={siteSettings.find(s => s.key === 'show_kakao')?.value === 'true'}
                              onChange={(e) => handleUpdateSetting('show_kakao', e.target.checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="show_kakao" className="text-sm">카카오톡 오픈채팅 표시</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              id="show_instagram"
                              type="checkbox"
                              className="w-4 h-4"
                              defaultChecked={siteSettings.find(s => s.key === 'show_instagram')?.value === 'true'}
                              onChange={(e) => handleUpdateSetting('show_instagram', e.target.checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="show_instagram" className="text-sm">인스타그램 링크 표시</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              id="show_youtube"
                              type="checkbox"
                              className="w-4 h-4"
                              defaultChecked={siteSettings.find(s => s.key === 'show_youtube')?.value === 'true'}
                              onChange={(e) => handleUpdateSetting('show_youtube', e.target.checked ? 'true' : 'false')}
                            />
                            <Label htmlFor="show_youtube" className="text-sm">유튜브 링크 표시</Label>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 유사나 제품 선택기 */}
          <UsanaProductSelector
            isOpen={isUsanaProductSelectorOpen}
            onClose={() => setIsUsanaProductSelectorOpen(false)}
            onSelect={(product) => {
              // 이미 제품 추가 중이면 중복 실행 방지
              if (createProductMutation.isPending) {
                console.log('제품 추가 중이므로 중복 실행 방지');
                return;
              }

              // 선택된 유사나 제품을 구독패키지에 추가
              if (currentPackage) {
                console.log('유사나 제품 추가 시도:', {
                  packageId: currentPackage.id,
                  productName: product.name,
                  theme: currentPackage.theme,
                  type: currentPackage.type
                });
                createProductMutation.mutate({
                  packageId: currentPackage.id,
                  productName: product.name,
                  productDescription: `${product.category} - 제품코드: ${product.productCode}`,
                  price: `${product.price.toLocaleString()}원`,
                  pointValue: product.points,
                  quantity: 1, // 기본 수량 1개
                  order: 0
                });
                setIsUsanaProductSelectorOpen(false);
              } else {
                console.error('currentPackage가 없습니다:', { selectedTheme, selectedType });
              }
            }}
            onSelectMultiple={(products) => {
              // 다중 선택된 유사나 제품들을 구독패키지에 추가
              if (currentPackage && products.length > 0) {
                console.log('다중 유사나 제품 추가 시도:', {
                  packageId: currentPackage.id,
                  productCount: products.length,
                  theme: currentPackage.theme,
                  type: currentPackage.type
                });
                
                // 각 제품을 순차적으로 추가
                products.forEach((product, index) => {
                  setTimeout(() => {
                    createProductMutation.mutate({
                      packageId: currentPackage.id,
                      productName: product.name,
                      productDescription: `${product.category} - 제품코드: ${product.productCode}`,
                      price: `${product.price.toLocaleString()}원`,
                      pointValue: product.points,
                      quantity: 1, // 기본 수량 1개
                      order: index
                    });
                  }, index * 100); // 100ms 간격으로 순차 실행
                });
                
                setIsUsanaProductSelectorOpen(false);
              } else {
                console.error('currentPackage가 없거나 선택된 제품이 없습니다');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}