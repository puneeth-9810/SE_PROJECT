
import { useState } from "react";
import { Menu } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#D3E4FD] to-[#e6f7ff] py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <img 
          src="/lovable-uploads/d0b20645-30d7-401d-b3a6-10060a2a56a4.png" 
          alt="NITC Logo" 
          className="h-16 w-16 object-contain"
        />
        <div className="ml-2">
          <h1 className="text-2xl font-bold text-gray-800">NITC</h1>
          <h2 className="text-xl text-gray-700">Health Care Center</h2>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="focus:outline-none text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-8">
        <a href="#patients" className="text-lg text-gray-700 hover:text-[#33C3F0] transition-colors duration-200">Patients</a>
        <a href="#pharmacist" className="text-lg text-gray-700 hover:text-[#33C3F0] transition-colors duration-200">Pharmacist</a>
        <a href="#doctor" className="text-lg text-gray-700 hover:text-[#33C3F0] transition-colors duration-200">Doctor</a>
      </nav>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-20 right-0 left-0 bg-[#D3E4FD] z-10 md:hidden">
          <div className="flex flex-col items-center py-4">
            <a href="#patients" className="py-2 text-lg text-gray-700 hover:text-[#33C3F0]">Patients</a>
            <a href="#pharmacist" className="py-2 text-lg text-gray-700 hover:text-[#33C3F0]">Pharmacist</a>
            <a href="#doctor" className="py-2 text-lg text-gray-700 hover:text-[#33C3F0]">Doctor</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
