import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="bg-gradient-to-r from-[#D3E4FD] to-[#e6f7ff] py-3 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <img 
          src="/image/hi.jpg" 
          alt="NITC Logo" 
          className="h-12 w-auto object-contain"
        />
        <h1 className="text-xl font-bold">NITC Health Care Center</h1>
      </div>
      
      <Button variant="ghost" className="flex items-center gap-2">
        <LogOut size={18} />
        <span className="hidden md:inline">Logout</span>
      </Button>
    </header>
  );
};

export default DashboardHeader;