import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { openKakaoChat } from "@/lib/utils";

export default function FloatingActionButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={openKakaoChat}
        className="gradient-usana-income text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 h-auto w-auto"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
}
