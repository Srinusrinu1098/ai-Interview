"use client";

import { CheckCircle, XCircle } from "lucide-react";

export default function FeedbackSummary({
  feedback,
  RecommendationMsg,
  Recommendation,
  ratings,
}) {
  const recommendationMsg = RecommendationMsg;
  const rating = feedback.feedback.feedback?.rating;
  const summary = Recommendation;

  const isRecommended =
    recommendationMsg?.toLowerCase().includes("not recommended") === false;

  const ratingBars = Object.entries(ratings || {}).map(([skill, value]) => (
    <div key={skill}>
      <div className="flex justify-between gap-3 mb-1">
        <span className="capitalize text-[8px] font-medium text-gray-700">
          {skill}
        </span>
        <span className="text-sm text-gray-500">{value}/10</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${
            value >= 7
              ? "bg-green-500"
              : value >= 5
              ? "bg-yellow-400"
              : "bg-red-500"
          }`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 ">
        <h1 className="text-4xl font-bold text-center text-gray-500">
          Interview Feedback
        </h1>
        <p className="text-gray-600">
          <strong>Name:</strong> {feedback.username}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {feedback.useremail}
        </p>
        <div className="text-center pt-4 border-t border-gray-200">
          {isRecommended ? (
            <>
              <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-2" />
              <p className="text-xl text-green-600 font-semibold">
                Recommended
              </p>
            </>
          ) : (
            <>
              <XCircle className="text-red-500 w-14 h-14 mx-auto mb-2" />
              <p className="text-xl text-red-600 font-semibold">
                Not Recommended
              </p>
            </>
          )}
          <p className="text-gray-600 mt-2">{recommendationMsg}</p>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-gray-800">Summary</h2>
        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
          {summary}
        </p>

        {/* Candidate Info */}

        {/* Skill Ratings */}
        <div>
          <h2 className="text-xl font-semibold mb-3 mt-3 text-gray-800">
            Skills Evaluation
          </h2>
          <div className="grid grid-cols-4 gap-10">{ratingBars}</div>
        </div>

        {/* Summary */}

        {/* Recommendation */}
      </div>
    </div>
  );
}
