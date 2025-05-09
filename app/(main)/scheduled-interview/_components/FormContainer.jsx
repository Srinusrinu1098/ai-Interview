import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constents";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function FormContainer({ onHandelFields, GoToNext }) {
  const [interviewType, setInterviewType] = useState([]);
  useEffect(() => {
    if (interviewType) {
      onHandelFields("type", interviewType);
    }
  }, [interviewType]);

  const addToInterview = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setInterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item != type);
      setInterviewType(result);
    }
  };
  return (
    <div className="p-5 m-3 bg-gray-200 border rounded-2xl border-black">
      <div>
        <h2 className="text-sm font-bold font-serif mb-2">Job Poestion</h2>
        <Input
          placeholder="e.g Full stack developer"
          className={"border border-black"}
          onChange={(e) => onHandelFields("JobPoestion", e.target.value)}
        />
        <h2 className="text-sm font-bold font-serif mt-3">Job description</h2>
        <Textarea
          placeholder="Enter the Description of your job role"
          className={"border border-black mt-3"}
          onChange={(e) => onHandelFields("JobDescription", e.target.value)}
        />
        <h2 className="text-sm font-bold font-serif mt-2">
          Interview duration
        </h2>
        <Select onValueChange={(value) => onHandelFields("duration", value)}>
          <SelectTrigger className="w-full border border-black mt-3 cursor-pointer">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min" className={"cursor-pointer"}>
              5 Min
            </SelectItem>
            <SelectItem value="15 Min" className={"cursor-pointer"}>
              15 Min
            </SelectItem>
            <SelectItem value="30 Min" className={"cursor-pointer"}>
              30 Min
            </SelectItem>
            <SelectItem value="45 Min" className={"cursor-pointer"}>
              45 Min
            </SelectItem>
            <SelectItem value="60 Min" className={"cursor-pointer"}>
              60 Min
            </SelectItem>
          </SelectContent>
        </Select>
        <h2 className="text-sm font-bold font-serif mt-2">Interview Type</h2>
        <div className="flex  flex-wrap  gap-1   rounded-2xl  ">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`text-sm mt-1 flex cursor-pointer hover:bg-blue-200  items-center text-[8px] border border-black w-[120px] rounded-2xl ${
                interviewType.includes(type.title) && "bg-blue-100 text-primary"
              }`}
              onClick={() => addToInterview(type.title)}
            >
              <type.icon className="h-3" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end m-3">
        <Button className={"cursor-pointer"} onClick={() => GoToNext()}>
          Generate Question <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
