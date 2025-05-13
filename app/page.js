"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "./Providers";

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };
  return (
    <div>
      <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-center"
        >
          <h1 className="text-5xl font-bold text-[#1d80d1] mb-4">
            AI-Powered Interview Scheduler
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Simplify your hiring process with intelligent scheduling and
            automated interview management powered by AI.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="bg-[#1d80d1] cursor-pointer text-white hover:bg-[#176caf] px-6 py-3 text-lg rounded-2xl shadow flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <Link href="/guidelines">
              <button className="text-[#1d80d1] border cursor-pointer border-[#1d80d1] hover:bg-[#e6f2fb] px-6 py-3 text-lg rounded-2xl">
                Learn More
              </button>
            </Link>
          </div>
          <p className="text-gray-300 font-bold mt-6 animate-bounce text-2xl">
            Built by Srinu Crazy 😜
          </p>
        </motion.div>
      </main>
    </div>
  );
}
