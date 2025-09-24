"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supeabaseClient"; // make sure this is correctly imported
import FeedbackSummary from "../../_components/FeedbackSummary"; // path to the component I shared earlier

function FeedbackPage() {
  const { interview_id } = useParams();
  const [feedback, setFeedback] = useState(null);
  const [RecommendationMsg, setRecommendationMsg] = useState("");
  const [Recommendation, setRecommendation] = useState("");
  const [ratings, setrating] = useState({});

  useEffect(() => {
    if (interview_id) getTheFeedback();
  }, [interview_id]);

  const getTheFeedback = async () => {
    const { data, error } = await supabase
      .from("interview-feedbacks")
      .select("*")
      .eq("interview_id", interview_id);

    if (data && data[0]) {
      const parsed = safeParseJSON(data[0]);

      const parsedd = data[0].feedback; // ensure feedback is valid JSON
      setRecommendationMsg(parsedd["feedback"]["RecommendationMsg"]);
      setRecommendation(parsedd["feedback"]["summary"]);
      setrating(parsedd["feedback"]["rating"]);

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

  return (
    <FeedbackSummary
      feedback={feedback}
      RecommendationMsg={RecommendationMsg}
      Recommendation={Recommendation}
      ratings={ratings}
    />
  );
}

export default FeedbackPage;
