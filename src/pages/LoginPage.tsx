import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import OTPInputForm from "@/components/OTPInputForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate OTP sending delay
    setTimeout(() => {
      setIsOtpSent(true);
      setIsSubmitting(false);
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your email",
      });
    }, 1500);
  };

  const handleVerifyOtp = (otp) => {
    setIsSubmitting(true);
    
    // Simulate verification delay
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "You have successfully logged in",
      });
      navigate("/prescription");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center relative min-h-[600px]">
        {/* Brighter Background Image */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundImage: "url('/image/hc.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Content */}
        <div className="container max-w-md px-4 z-10">
                  <Card className="w-full backdrop-blur-lg bg-white/90 shadow-xl">
                    <CardHeader className="space-y-1">
                      <CardTitle className="text-2xl font-bold text-center">
                        Medicines are waiting for you...
                      </CardTitle>
                      <CardDescription className="text-center">
                Enter your email to get OTP
              </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!isOtpSent ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                          <div className="space-y-2">
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                              <Input
                                type="email"
                                placeholder="Your email address"
                                className="pl-10"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full bg-[#33C3F0] hover:bg-[#1EAEDB] transition-colors duration-200"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send Verification Code"}
                          </Button>
                        </form>
                      ) : (
                        <OTPInputForm onVerify={handleVerifyOtp} isSubmitting={isSubmitting} page="k"/>
                      )}
                      
                      <div className="text-center text-sm text-gray-500 mt-4">
                        <p>Need help? Contact the health center</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default LoginPage;
