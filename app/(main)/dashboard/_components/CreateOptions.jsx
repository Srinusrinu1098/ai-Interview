"use client";
import { Phone, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function CreateOptions() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="bg-gray-100 border border-gray-500 rounded-lg p-3">
        <div
          className=" h-[80px] w-[full] cursor-pointer "
          onClick={() => router.push("/dashboard/create-interview")}
        >
          <div className="bg-blue-50 ">
            <Video className="text-primary" />
          </div>
          <h2 className="font-bold">Create New Interview</h2>
          <p className="text-gray-400 text-[8px] w-full">
            Create AI Interview and Schedule then with candidates
          </p>
        </div>
      </div>
      <div className="bg-gray-100 border border-gray-500 rounded-lg p-3">
        <div className=" h-[80px] w-[full] ">
          <div className="bg-blue-50 ">
            <Phone className="text-primary" />
          </div>
          <h2 className="font-bold">Create New Call</h2>
          <p className="text-gray-400 text-[8px] w-full">
            Create AI Interview Call and Schedule then with candidates
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
