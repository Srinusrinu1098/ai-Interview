"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supeabaseClient";
import { LogIn, LogInIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function Login() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("error", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className=" border-2 border-gray-500 rounded-2xl flex flex-col items-center justify-center p-5">
        <h1 className="font-bold text-3xl font-sans text-blue-500">
          Please Logoin first with Your account
        </h1>
        <Image
          src={"/Login.jpg"}
          alt="login"
          width={100}
          height={100}
          className="h-[250px] w-[250px]"
        />
        <h2 className="font-bold">
          Welcome to <span className="text-blue-500">AI INTERVIEW</span>
        </h2>
        <p>Sign in with google account</p>
        <div className="flex  w-full items-center m-4">
          <Button className="w-full cursor-pointer" onClick={signInWithGoogle}>
            Login with google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
