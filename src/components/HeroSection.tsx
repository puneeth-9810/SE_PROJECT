
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <div className="relative min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('/lovable-uploads/d0272ec1-ff25-46fa-a627-2955e37e4b90.png')",
          filter: "brightness(0.9)"
        }}
      />
      
      {/* Content overlay */}
      <div className="container mx-auto px-4 z-10 flex flex-col items-start">
        <Card className="bg-white/95 shadow-xl p-6 max-w-md">
          <h2 className="text-2xl font-bold mb-1">Feeling Unwell?</h2>
          <p className="text-gray-700 mb-4">Get Appointment with one Click</p>
          
          <Button 
            className="bg-[#33C3F0] hover:bg-[#33A3D0] text-white font-medium py-2 px-6 rounded-md text-lg w-full md:w-auto"
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
    </div>
  );
};

export default HeroSection;
