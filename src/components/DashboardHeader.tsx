import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ( { page }: { page: string } ) => {
  const navigate=useNavigate();
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#D3E4FD] to-[#e6f7ff] py-3 px-6 flex justify-between items-center shadow-sm z-10">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <img 
          src="/image/hi.jpg" 
          alt="NITC Logo" 
          className="h-12 w-auto object-contain"
        />
        <h1 className="text-xl font-bold">NITC Health Care Center</h1>
      </div>
      
      <Button variant="ghost" className="flex items-center gap-2" onClick={()=>{navigate(`/${page}`)}}>
        <LogOut size={18} />
        <span className="hidden md:inline">Logout</span>
      </Button>
    </header>
  );
};

export default DashboardHeader;
