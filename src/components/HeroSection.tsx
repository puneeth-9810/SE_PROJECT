import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow relative min-h-[600px] flex items-center bg-cover bg-center"
        style={{ 
          backgroundImage: "url('image/hc.jpg')",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 z-10">
          {/* Left Aligned Box & Button */}
          <div className="flex flex-col items-start w-full px-10">
            <Card className="bg-white shadow-xl p-6 w-full max-w-md rounded-lg">
              <h2 className="text-2xl font-bold mb-1 text-gray-800">
                Feeling <span className="font-bold">Unwell?</span>
              </h2>
              <p className="text-gray-700 mb-6">Get Appointment with One Click</p>
              
              <Button 
                className="bg-[#33C3F0] hover:bg-[#1EAEDB] text-white font-medium py-3 px-6 rounded-md text-lg w-full transition-colors duration-200"
                onClick={()=>navigate('/a')}
              >
                Appointment
              </Button>
            </Card>

            {/* About Us Button */}
            <Button 
              variant="outline"
              className="mt-4 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium py-2 px-6 rounded-md text-lg shadow-md transition-all duration-200 hover:shadow-lg"
            >
              About us
            </Button>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default HeroSection;
