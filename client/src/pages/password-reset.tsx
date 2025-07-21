import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await apiRequest("/api/admin/password-reset", "POST", {
        email,
      }) as any;

      if (result.success) {
        setIsEmailSent(true);
        toast({
          title: "이메일 발송 완료",
          description: "비밀번호 재설정 링크가 이메일로 발송되었습니다.",
        });
      } else {
        toast({
          title: "발송 실패",
          description: result.message || "이메일 발송에 실패했습니다.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "비밀번호 재설정 요청 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              이메일 발송 완료
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              <strong>{email}</strong>로 비밀번호 재설정 링크를 발송했습니다.
            </p>
            <p className="text-sm text-gray-500">
              이메일을 확인하고 링크를 클릭하여 새 비밀번호를 설정하세요.
            </p>
            <div className="pt-4">
              <Link href="/admin">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  로그인 페이지로 돌아가기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            비밀번호 재설정
          </CardTitle>
          <p className="text-gray-600 text-sm">
            등록된 이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                이메일 주소
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  placeholder="관리자 이메일을 입력하세요"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "발송 중..." : "재설정 링크 보내기"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/admin">
              <Button variant="link" className="text-sm text-gray-600 hover:text-gray-800">
                <ArrowLeft className="w-3 h-3 mr-1" />
                로그인 페이지로 돌아가기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}