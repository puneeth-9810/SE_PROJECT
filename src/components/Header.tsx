
import { useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#33C3F0] text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/d0272ec1-ff25-46fa-a627-2955e37e4b90.png" 
          alt="NITC Logo" 
          className="h-16 w-16 object-contain bg-white rounded-full p-1"
        />
        <div className="ml-2">
          <h1 className="text-2xl font-bold">NITC</h1>
          <h2 className="text-xl">Health Care Center</h2>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none text-white"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-8">
        <a href="#patients" className="text-lg text-white hover:underline">Patients</a>
        <a href="#pharmacist" className="text-lg text-white hover:underline">Pharmacist</a>
        <a href="#doctor" className="text-lg text-white hover:underline">Doctor</a>
      </nav>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-20 right-0 left-0 bg-[#33C3F0] z-10 md:hidden">
          <div className="flex flex-col items-center py-4">
            <a href="#patients" className="py-2 text-lg text-white hover:underline">Patients</a>
            <a href="#pharmacist" className="py-2 text-lg text-white hover:underline">Pharmacist</a>
            <a href="#doctor" className="py-2 text-lg text-white hover:underline">Doctor</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
