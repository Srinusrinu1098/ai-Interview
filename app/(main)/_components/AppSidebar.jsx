"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constents";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className={"flex items-center"}>
        <Image
          src={"/logo.jpg"}
          alt="logo"
          width={200}
          height={100}
          className="h-[50px] rounded-3xl "
        />
        <Button className={"w-full mt-5"}>
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((options, index) => (
                <SidebarMenuItem key={index} className={"p-1"}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 font-mono hover:bg-blue-100 hover:text-white ${
                      path == options.path && "bg-blue-300 font-serif "
                    }`}
                  >
                    <Link href={options.path}>
                      <options.icon
                        className={`${path == options.path && "text-blue-500"}`}
                      />
                      <span
                        className={`text-[16px] ${
                          path == options.path && "text-blue-500"
                        }`}
                      >
                        {options.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
