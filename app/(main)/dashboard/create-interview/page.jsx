"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "../../scheduled-interview/_components/FormContainer";
import QuestionsList from "../../scheduled-interview/_components/QuestionsList";
import { toast } from "sonner";
import InterviewLink from "../../scheduled-interview/_components/interviewLink";

function CreateInterview() {
  const router = useRouter();
  const [pro, setpro] = useState(1);
  const [jobDetails, setJobDetails] = useState();
  const [interview_id, setinterview_id] = useState("");
  const [questions, setQuestions] = useState();

  const onHandelFields = (fields, value) => {
    setJobDetails((prev) => ({
      ...prev,
      [fields]: value,
    }));
  };

  const GoToTheNextPage = () => {
    if (
      !jobDetails?.JobPoestion ||
      !jobDetails?.JobDescription ||
      !jobDetails?.duration ||
      !jobDetails?.type
    ) {
      toast.error("Please enter all the details!", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });

      return;
    } else {
      setpro(pro + 1);
    }
  };

  const sendBackInfo = (sendBackInfo, questions) => {
    setpro(pro + 1);
    setinterview_id(sendBackInfo);
    setQuestions(questions);
  };
  return (
    <div className=" w-full">
      <div className="flex gap-2">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2>Create new interview</h2>
      </div>
      <div className="m-3">
        <Progress value={pro * 33.33} className={"m-4"} />
        {pro == 1 ? (
          <FormContainer
            onHandelFields={onHandelFields}
            GoToNext={() => GoToTheNextPage()}
          />
        ) : pro == 2 ? (
          <QuestionsList jobDetails={jobDetails} sendBackInfo={sendBackInfo} />
        ) : pro == 3 ? (
          <InterviewLink
            interview_id={interview_id}
            jobDetails={jobDetails}
            questions={questions}
          />
        ) : null}
      </div>
    </div>
  );
}

export default CreateInterview;
