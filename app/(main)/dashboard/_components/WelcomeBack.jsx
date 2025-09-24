"use client";

import { useUser } from "@/app/Providers";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/services/supeabaseClient";

function WelcomeBack() {
  const { user, setUser } = useContext(UserDetailsContext);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const router = useRouter();
 

  const logoutUser = () => {
    setLogoutDialogOpen(true);
  };
  const userLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    setUser(null);
    router.push("/");
  };

  return (
    <div className="bg-gray-400 p-3 rounded-2xl flex justify-between">
      <div>
        <h1 className="font-bold text-white">
          Welcome back,{" "}
          <span className="text-black font-serif">{user?.name}</span>
        </h1>
        <h2 className="text-primary font-serif">
          AI-Driven Interview, Hassel-Free Hiring
        </h2>
      </div>
      {user && (
        <Image
          onClick={logoutUser}
          src={
            "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_items_boosted&w=740"
          }
          alt="profile"
          height={50}
          width={50}
          className="rounded-2xl cursor-pointer"
        />
      )}

      {user && (
        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out from your account. To access your data
                again, you will need to log in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={"cursor-pointer"}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={"cursor-pointer"}
                onClick={userLogout}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default WelcomeBack;
