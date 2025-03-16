import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OTPInputFormProps {
  onVerify: (otp: string) => void;
  isSubmitting: boolean;
}

const OTPInputForm = ({ onVerify, isSubmitting }: OTPInputFormProps) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }
    onVerify(otp);
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        required
        className="text-center tracking-widest"
      />
      <Button
        onClick={()=>navigate('/d')}
        className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Verifying..." : "Verify OTP"}
      </Button>
    </div>
  );
};

export default OTPInputForm;
