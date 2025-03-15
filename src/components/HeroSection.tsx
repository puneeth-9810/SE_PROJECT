
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <div 
      className="relative min-h-[600px] flex items-center bg-cover bg-center"
      style={{ 
        backgroundImage: "url('/lovable-uploads/e34313e0-a633-40d2-97d7-beb127bc91f4.png')",
        backgroundSize: "cover"
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            NITC Health Care Center
          </h1>
        </div>
        
        <div className="flex flex-col items-center">
          <Card className="bg-white shadow-xl p-6 w-full max-w-md rounded-lg">
            <h2 className="text-2xl font-bold mb-1 text-gray-800">Feeling Unwell?</h2>
            <p className="text-gray-700 mb-6">Get Appointment with One Click</p>
            
            <Button 
              className="bg-[#33C3F0] hover:bg-[#1EAEDB] text-white font-medium py-3 px-6 rounded-md text-lg w-full transition-colors duration-200"
            >
              Appointment
            </Button>
          </Card>
          
          <Button 
            variant="outline"
            className="mt-8 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-2 px-6 rounded-md text-lg shadow-md transition-all duration-200 hover:shadow-lg"
          >
            About us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
