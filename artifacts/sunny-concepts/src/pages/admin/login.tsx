import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAdminLogin, useAdminMe, getAdminMeQueryKey } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: session, isLoading } = useAdminMe({
    query: { queryKey: getAdminMeQueryKey() }
  });

  const loginMutation = useAdminLogin();

  useEffect(() => {
    if (session?.authenticated) {
      setLocation("/admin/dashboard");
    }
  }, [session, setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { data: { password } },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast({ title: "Welcome back", description: "Login successful." });
            setLocation("/admin/dashboard");
          } else {
            toast({ title: "Login failed", description: res.message, variant: "destructive" });
          }
        },
        onError: () => {
          toast({ title: "Error", description: "Invalid password", variant: "destructive" });
        }
      }
    );
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-card p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center border border-white/10">
            <Lock className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <h1 className="font-serif text-3xl text-center text-white mb-2">Agency Access</h1>
        <p className="text-center text-muted-foreground text-sm mb-8 uppercase tracking-widest">Sunny Concepts</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-white/10 text-center text-lg h-14 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/50"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-14 bg-white text-black hover:bg-white/90 uppercase tracking-widest font-medium text-sm rounded-none"
            disabled={loginMutation.isPending || !password}
          >
            {loginMutation.isPending ? "Authenticating..." : "Enter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
