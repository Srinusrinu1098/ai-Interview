"use client";
import axios from "axios";
import { Loader2Icon, ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supeabaseClient";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/app/Providers";
import { useRouter } from "next/navigation";

function QuestionsList({ jobDetails, sendBackInfo }) {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [fineloading, setfineloading] = useState(false);
  const hasFetched = useRef(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getQuestionsFromAi();
  }, [jobDetails]);

  const getQuestionsFromAi = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...jobDetails,
      });
      const final_result = result.data.content;

      let interviewQuestions = [];

      // 1. Try to extract from ```json ... ``` block
      const jsonStart = final_result.indexOf("```json");
      const jsonEnd = final_result.indexOf("```", jsonStart + 1);
      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonString = final_result.slice(jsonStart + 7, jsonEnd).trim();
        try {
          const parsed = JSON.parse(jsonString);
          if (Array.isArray(parsed.interviewQuestions)) {
            interviewQuestions = parsed.interviewQuestions;
          } else if (Array.isArray(parsed)) {
            interviewQuestions = parsed;
          }
        } catch (e) {
          // console.warn("Failed to parse JSON block:", e);
          console.log(e);
        }
      }

      // 2. Try full JSON string (if block wasn't found or failed)
      if (interviewQuestions.length === 0) {
        try {
          const parsed = JSON.parse(final_result);
          if (Array.isArray(parsed.interviewQuestions)) {
            interviewQuestions = parsed.interviewQuestions;
          }
        } catch (e) {
          // console.warn("Failed to parse full JSON string:", e);
          console.log(e);
        }
      }

      // 3. Try to extract array from `interviewQuestions = [...]`
      if (interviewQuestions.length === 0) {
        const match = final_result.match(
          /interviewQuestions\s*[:=]\s*(\[\s*[\s\S]*?\])/
        );
        if (match && match[1]) {
          try {
            interviewQuestions = JSON.parse(match[1]);
          } catch (e) {
            console.warn("Failed to parse fallback array:", e);
          }
        }
      }

      if (interviewQuestions.length === 0) {
        throw new Error("No interview questions found.");
      }

      setQuestions(interviewQuestions);
    } catch (e) {
      console.error(e);
      toast.error("Server error, please try again", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getTheLink = async () => {
    setfineloading(true);
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...jobDetails,
          interview_id: uuidv4(),
          userEmail: user.email,
          QuestionLists: questions,
        },
      ])
      .select();
    setfineloading(false);

    sendBackInfo(data[0].interview_id, questions);
  };

  return (
    <div>
      {loading && (
        <div className="flex gap-2 bg-blue-300 p-2 items-center rounded-2xl">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-bold text-gray-500 font-serif">
              Generating AI-Powered Questions For You ❤️
            </h2>
            <p className="text-[14px] font-semibold">
              Our AI is crafting questions based on your job position.
            </p>
          </div>
        </div>
      )}

      {questions?.length > 0 && (
        <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8 font-sans">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=" w-full"
          >
            <h1 className="text-5xl font-extrabold text-[#1d80d1] mb-6 text-center font-serif">
              Interview Questions
            </h1>
            <div className="bg-[#f0f8ff] border-l-4 border-[#1d80d1] px-6 py-6 rounded-2xl shadow space-y-6 w-full">
              {questions.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-4">
                  <p className="text-lg font-medium text-gray-800 leading-relaxed">
                    <span className="font-bold text-[#1d80d1] mr-2">
                      Q{index + 1} ({item.type}):
                    </span>
                    {item.question}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <Button
                onClick={getTheLink}
                className={"cursor-pointer"}
                disabled={fineloading}
              >
                {fineloading && <Loader2Icon className="animate-spin" />}{" "}
                Generate interview link & finesh
              </Button>
            </div>
          </motion.div>
        </main>
      )}
    </div>
  );
}

export default QuestionsList;
