"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supeabaseClient"; // make sure this is correctly imported
import FeedbackSummary from "../../_components/FeedbackSummary"; // path to the component I shared earlier

function FeedbackPage() {
  const { interview_id } = useParams();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (interview_id) getTheFeedback();
  }, [interview_id]);

  const getTheFeedback = async () => {
    const { data, error } = await supabase
      .from("interview-feedbacks")
      .select("*")
      .eq("interview_id", interview_id);

    if (data && data[0]) {
      const parsed = safeParseJSON(data[0]); // ensure feedback is valid JSON
      if (parsed) setFeedback(parsed);
    }
  };

  const safeParseJSON = (json) => {
    try {
      return typeof json === "string" ? JSON.parse(json) : json;
    } catch (e) {
      console.error("Invalid feedback JSON:", e);
      return null;
    }
  };

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading feedback...
      </div>
    );
  }

  return <FeedbackSummary feedback={feedback} />;
}

export default FeedbackPage;
