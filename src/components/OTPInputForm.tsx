import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPInputFormProps {
  onVerify: (otp: string) => void;
  isSubmitting: boolean;
}

const OTPInputForm = ({ onVerify, isSubmitting }: OTPInputFormProps) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="text-sm font-medium text-center mb-3">
          Enter the 6-digit verification code sent to your email
        </div>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[#33C3F0] hover:bg-[#1EAEDB] transition-colors duration-200"
        disabled={otp.length !== 6 || isSubmitting}
      >
        {isSubmitting ? (
          "Verifying..."
        ) : (
          <>
            Check Prescription <ArrowRight className="ml-2" size={16} />
          </>
        )}
      </Button>
    </form>
  );
};

export default OTPInputForm;