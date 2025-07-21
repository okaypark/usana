import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { KeyRound, Eye, EyeOff } from "lucide-react";

interface PasswordChangeDialogProps {
  children: React.ReactNode;
}

export default function PasswordChangeDialog({ children }: PasswordChangeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswords({ current: false, new: false, confirm: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "비밀번호 불일치",
        description: "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.",
        variant: "destructive",
        duration: 3000, // 3초 후 자동 사라짐
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "비밀번호 조건 미충족",
        description: "새 비밀번호는 최소 8자 이상이어야 합니다.",
        variant: "destructive",
        duration: 3000, // 3초 후 자동 사라짐
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await apiRequest("/api/admin/change-password", "POST", {
        currentPassword,
        newPassword,
      }) as any;

      if (result.success) {
        toast({
          title: "비밀번호 변경 완료",
          description: "비밀번호가 성공적으로 변경되었습니다.",
          duration: 3000, // 3초 후 자동 사라짐
        });
        setIsOpen(false);
        resetForm();
      } else {
        toast({
          title: "변경 실패",
          description: result.message || "비밀번호 변경에 실패했습니다.",
          variant: "destructive",
          duration: 3000, // 3초 후 자동 사라짐
        });
      }
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "비밀번호 변경 중 오류가 발생했습니다.",
        variant: "destructive",
        duration: 3000, // 3초 후 자동 사라짐
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="w-5 h-5" />
            비밀번호 변경
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">현재 비밀번호</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">새 비밀번호</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.new ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
                placeholder="최소 8자 이상"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>보안 권장사항:</strong><br />
              • 최소 8자 이상<br />
              • 대소문자, 숫자, 특수문자 조합<br />
              • 개인정보와 무관한 비밀번호 사용
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? "변경 중..." : "변경하기"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}