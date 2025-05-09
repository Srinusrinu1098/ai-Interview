"use client";

import { UserDetailsContext } from "@/context/UserDetailsContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Mic, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

function InterviewStart() {
  const { DetailsOfQuestions } = useContext(UserDetailsContext);
  const [usersInformation, setUserInformation] = useState(null);
  const vapiRef = useRef(null); // persist Vapi instance
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_URL);

  // Store details in localStorage and set user info
  useEffect(() => {
    if (DetailsOfQuestions) {
      localStorage.setItem("srinu", JSON.stringify(DetailsOfQuestions));
    }

    const stored = localStorage.getItem("srinu");
    if (stored) {
      setUserInformation(JSON.parse(stored));
    }
  }, [DetailsOfQuestions]);

  // Start Vapi after usersInformation is ready
  useEffect(() => {
    if (!usersInformation || vapiRef.current) return;

    vapiRef.current = vapi;

    let questionsListstoPromt = "Ok first introduce yourself,";
    usersInformation?.interviewData?.QuestionLists.forEach((each) => {
      questionsListstoPromt += each.question + ", ";
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${usersInformation?.username}, how are you? Ready for your interview on ${usersInformation?.interviewData?.JobPoestion}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an Al voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, on, setting a relaxed yet professional tone. Example: "Hey there! Welcome to your {{jobPosition}} interview. Let's Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are
the questions ask one by one: Questions: ${questionsListstoPromt}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
Nice! That's a solid answer. "
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
Be friendly, engaging, and witty
Keep responses short and natural, like a real conversation
Adapt based on the candidate's confidence level
Ensure the interview remains focused on ${usersInformation?.interviewData?.JobPoestion} and ask introduce yourself and ask a question with the introduction 
 `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);

    vapi.on("call-start", () => {
      toast("Interview Started", {
        style: { backgroundColor: "green" },
      });
    });

    return () => {
      // clean up on unmount
      vapi.stop();
      vapiRef.current = null;
    };
  }, [usersInformation]);

  const endTheCall = () => {
    if (vapiRef.current) {
      vapi.say("Our time's up, goodbye!", true);
      vapiRef.current.stop();
      toast("Interview Stopped", {
        style: { backgroundColor: "green" },
      });
    }
  };

  if (!usersInformation) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white flex flex-col items-center justify-center p-4 space-y-6">
      <h1 className="text-3xl font-bold">Interview Start</h1>

      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {/* AI Agent */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">AI Agent</h2>
          <div className="h-48 bg-gray-200 rounded-xl flex flex-col gap-2 items-center justify-center">
            <div className="animate-pulse">
              <Image
                src="/ai1.jpg"
                alt="AI Agent"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <span className="font-mono font-bold">AI AGENT</span>
          </div>
        </div>

        {/* Interviewer */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Interviewer</h2>
          <div className="h-48 bg-gray-200 rounded-xl flex flex-col gap-2 items-center justify-center">
            <Image
              src="/profile.png"
              alt="Interviewer"
              width={100}
              height={100}
              className="rounded-full"
            />
            <span className="font-mono font-bold">
              {usersInformation?.username?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline">
          <Mic className="w-5 h-5" />
        </Button>
        <Button
          variant="default"
          className="bg-green-500 hover:bg-red-500"
          onClick={endTheCall}
        >
          <Phone className="w-5 h-5" />
        </Button>
      </div>

      <h2 className="text-gray-500 font-semibold text-sm">
        Interview is in progress...
      </h2>
    </div>
  );
}

export default InterviewStart;
