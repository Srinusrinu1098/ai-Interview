"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center p-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center"
      >
        <h1 className="text-5xl font-extrabold text-[#1d80d1] mb-6 font-serif">
          Interview Guidelines
        </h1>
        <p className="text-lg text-gray-700 mb-6 font-light italic">
          Please follow these best practices to have a smooth and successful
          AI-powered interview experience:
        </p>
        <div className="bg-[#f0f8ff] border-l-4 border-[#1d80d1] text-left text-gray-800 px-6 py-6 rounded-2xl shadow mb-10">
          <ul className="list-decimal list-inside space-y-4 text-lg leading-relaxed">
            <li>
              <strong>Prepare Your Environment:</strong> Find a quiet, well-lit
              space with minimal background noise.
            </li>
            <li>
              <strong>Check Your Tech:</strong> Ensure a stable internet
              connection, and test your webcam and microphone in advance.
            </li>
            <li>
              <strong>Be Clear and Confident:</strong> Speak clearly and
              directly; the AI will analyze both your words and tone.
            </li>
            <li>
              <strong>Dress the Part:</strong> Wear professional attire to
              simulate a real interview and boost your confidence.
            </li>
            <li>
              <strong>Have Documents Ready:</strong> Keep your resume and any
              other relevant materials nearby for reference.
            </li>
          </ul>
        </div>
        <Link href="/">
          <button className="bg-[#1d80d1] cursor-pointer text-white hover:bg-[#176caf] px-6 py-3 rounded-2xl shadow flex items-center text-lg">
            <ArrowLeft className="mr-2 w-5 h-5" /> Back to Home
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
