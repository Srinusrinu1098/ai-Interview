import { useUser } from "@/app/Providers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Clock10Icon,
  Copy,
  Facebook,
  Instagram,
  ListChecks,
  TvMinimalPlay,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

function InterviewLink({ interview_id, jobDetails, questions }) {
  console.log(jobDetails);

  const url = process.env.NEXT_PUBLIC_INTERVIEW_URL + interview_id;
  console.log(url);

  const { user } = useUser();
  console.log(user);
  const getTheVAlue = () => {
    return url;
  };

  const getThelinkCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast("Copied Succesfully ✅", {
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const handleOpen = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    let shareLink = "";

    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedUrl}`;
        break;
      case "instagram":
        shareLink = `https://www.instagram.com/?url=${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "start":
        shareLink = url;
        break;
      default:
        alert("Unsupported platform");
        return;
    }

    window.open(shareLink, "_blank");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="border border-black  p-3 rounded-xl flex flex-col justify-center items-center">
        <Image
          src={"/check.jpg"}
          alt="logo"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-xl animate-caret-blink"
        />
        <h1 className="font-bold">Your AI interview is ready!</h1>
        <p className="text-gray-500 font-semibold font-serif">
          Share this link with your candidates to start interview process or
          Click Start interview{" "}
        </p>
      </div>
      <div className="border border-black  p-3 rounded-xl flex flex-col gap-2  w-full">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[14px]">Interview Link</h2>
          <h1 className="text-red-500 font-bold text-[10px] bg-blue-200 p-1 rounded-4xl">
            valid for 30 days
          </h1>
        </div>

        <div>
          <div className="flex justify-between gap-5">
            <Input defaultValue={getTheVAlue()} disabled={true} />
            <Button
              onClick={() => getThelinkCopy()}
              className={"cursor-pointer"}
            >
              <Copy />
              Copy
            </Button>
          </div>
          <hr
            style={{
              marginTop: "10px",

              height: "2px",
              backgroundColor: "black",
            }}
          />

          <div className="flex place-items-center gap-3 mt-2">
            <h1 className="text-[14px] flex items-center ">
              <Clock10Icon className="h-3" />
              {jobDetails?.duration}
            </h1>
            <h1 className="text-[14px] flex items-center">
              <ListChecks className="h-3" />
              {questions?.length}
            </h1>
          </div>

          <div className="mt-3">
            <h1 className="text-[14px] font-semibold">Share Via</h1>
            <div className="flex gap-3 mt-2">
              <Button
                onClick={() => handleOpen("whatsapp")}
                className="bg-[#25D366] cursor-pointer text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-[#1ebe5d] transition-all"
              >
                <FaWhatsapp /> WhatsApp
              </Button>
              <Button
                onClick={() => handleOpen("instagram")}
                className="bg-gradient-to-r cursor-pointer from-yellow-400 via-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:brightness-110 transition-all"
              >
                <Instagram />
                Instagram
              </Button>
              <Button
                onClick={() => handleOpen("facebook")}
                className="bg-[#1877F2] cursor-pointer text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-[#166fe0] transition-all"
              >
                {" "}
                <Facebook />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link href={"/dashboard"}>
          <Button className={" cursor-pointer"}>
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>
        <Button
          className={"bg-green-600 cursor-pointer"}
          onClick={() => handleOpen("start")}
        >
          <TvMinimalPlay /> Start Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewLink;
