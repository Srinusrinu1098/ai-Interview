import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeBack from "./dashboard/_components/WelcomeBack";

function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full m-4">
        <SidebarTrigger />
        <WelcomeBack className="m-5" />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
