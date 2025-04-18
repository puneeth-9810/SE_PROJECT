import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardHeader = ({  page1 }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleLogout= ()=>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#D3E4FD] to-[#e6f7ff] py-3 px-6 flex justify-between items-center shadow-sm z-10">
      <div className="flex items-center space-x-4">
        {location.pathname !== "/reset-password" && <SidebarTrigger />}
        
        <img 
          src="/image/hi.jpg" 
          alt="NITC Logo" 
          className="h-12 w-auto object-contain"
        />
        <h1 className="text-xl font-bold">NITC Health Care Center</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Reset Password Button */}
        {location.pathname !== "/reset-password" && (
          <Button variant="outline" onClick={() => navigate(`/${page1}`)}>
            Reset Password
          </Button>
        )}

        {/* Logout Button */}
        <Button 
          variant="destructive" 
          className="flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
