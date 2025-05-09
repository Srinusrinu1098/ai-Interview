"use client";

import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";
import React, { useState } from "react";

function LatestInterviewList() {
  const [interviewList, setinterviewList] = useState();
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl pb-2">Previously Create Interviews</h2>

      {interviewList == undefined && (
        <div className="bg-blue-200 flex flex-col gap-3 justify-center items-center p-5 rounded-3xl">
          <Video className=" text-primary" />
          <h2>you don't have any interview created</h2>
          <Button>Create New Interview</Button>
        </div>
      )}
    </div>
  );
}

export default LatestInterviewList;
