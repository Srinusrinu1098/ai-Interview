"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supeabaseClient";
import { Clock10 } from "lucide-react";

import { toast } from "sonner";
import { UserDetailsContext } from "@/context/UserDetailsContext";

export default function InterviewPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { interview_id } = useParams();
  const [details, setDetails] = useState(null);
  const { DetailsOfQuestions, setDetailsOfQuestions } =
    useContext(UserDetailsContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && getInterviewDetails();
  }, [interview_id]);

  const getInterviewDetails = async () => {
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id)
      .single();

    if (data) setDetails(data);
    if (error)
      toast("Invalid interview link", {
        style: {
          backgroundColor: "red",
        },
      });
  };

  const sendToContext = async () => {
    const { data, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("interview_id", interview_id)
      .single();

    setDetailsOfQuestions({
      username: username,
      interviewData: data,
      useremail: email,
    });

    router.push(`${interview_id}/start`);
  };

  // ✅ Gmail-only validation
  const isValidGmail =
    email.endsWith("@gmail.com") &&
    email.includes("@") &&
    email.length > "@gmail.com".length;

  const isFormValid = username.trim() !== "" && isValidGmail;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src="/logo.jpg" alt="Logo" width={80} height={80} />
        </div>

        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">
            Join the Interview
          </h1>
          <p className="text-sm text-gray-500">
            Enter your details to begin with{" "}
            <span className="text-green-400 animate-pulse font-bold">
              {details?.JobPoestion?.toUpperCase()}
            </span>{" "}
            Position
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mt-2">
            <Clock10 className="h-4 w-4" /> {details?.duration}s
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <Input
              placeholder="Enter your name"
              className="rounded mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <Input
              type="email"
              placeholder="Enter your Gmail"
              className="rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isValidGmail && email.length > 0 && (
              <p className="text-xs text-red-500 mt-1">
                Please enter a valid Gmail address.
              </p>
            )}
          </div>
        </div>

        {/* Alert Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={!isFormValid}
              className="w-full  mt-4 cursor-pointer "
            >
              Get Started
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">
                Are you sure you want to start?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-500">
                Once you begin the interview, the timer will start and cannot be
                paused.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer"
                onClick={() => sendToContext()}
              >
                Yes, Start
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
