
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex items-center bg-gradient-to-r from-[#e6f7ff] to-[#f0f9ff]">
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side content */}
          <div className="flex flex-col items-start">
            <Card className="bg-white shadow-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-1">Feeling Unwell?</h2>
              <p className="text-gray-700 mb-4">Get Appointment with one Click</p>
              
              <Button 
                className="bg-[#33C3F0] hover:bg-[#33A3D0] text-white font-medium py-2 px-6 rounded-md text-lg w-full"
              >
                Appointment
              </Button>
            </Card>
            
            <Button 
              variant="outline"
              className="mt-8 bg-white hover:bg-gray-100 text-black border border-gray-300 font-medium py-2 px-6 rounded-md text-lg"
            >
              About us
            </Button>
          </div>
          
          {/* Right side image */}
          <div className="hidden md:flex justify-center items-center">
            <img 
              src="/lovable-uploads/d0272ec1-ff25-46fa-a627-2955e37e4b90.png" 
              alt="Health Center" 
              className="max-h-[400px] object-contain rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
