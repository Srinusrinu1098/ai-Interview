import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  Gem,
  LayoutDashboardIcon,
  List,
  Power,
  Puzzle,
  Settings,
  User2Icon,
  WalletCards,
} from "lucide-react";

export const SideBarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All Interview",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: WalletCards,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experieance",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Leadership",
    icon: Gem,
  },
];

export const OpenAiPromt = `You are an expert technical interviewer. 
Based on the following inputs, generate a well-structured list of high-quality interview questions: 
Job Title: {{job Title}} 
Job Description:{{jobDescription}} 
Interview Duration: {{duration}} 
Interview Type: {{type}} 
📝 Your task: 
Analyze the job description to identify key responsibilities, required skills, and expected experience. 
Generate a list of interview questions depends on interview duration 
Adjust the number and depth of questions to match the interview duration. 
Ensure the questions match the tone and structure of a real-life {{type}} interview. 
🧩vFormat your response in JSON format with array list of questions. 
format: interviewQuestions=[ 
{ 
question:", 
type: Technical/Behavioral/Experince/Problem Solving/Leaseship' 
},{ 
}] 
 🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{job Title}} role.`;

export const Summery = `{{conversation}}

You are an expert technical interviewer. Analyze the user's responses from the mock interview.

🛑 Important Rules:
1. If the user did not provide meaningful answers (less than 20 words or very short / empty responses), respond ONLY with:
{
  "feedback": {
    "rating": null,
    "summary": "No meaningful answers provided",
    "Recommendation": "Not Applicable",
    "RecommendationMsg": "User did not attempt the questions or responses were too short."
  }
}

2. Otherwise, provide feedback with the following:
- Give ratings out of 10 for Technical Skills, Communication, Problem Solving, Experience
- Provide a 3-line summary of the interview
- Provide a 1-line recommendation on hire (Recommended / Not Recommended)
- Be strict and honest. If user performed poorly, do not give positive feedback.
- Respond ONLY in JSON format as follows:

{
  "feedback": {
    "rating": {
      "technicalSkills": <number>,
      "communication": <number>,
      "problemSolving": <number>,
      "experience": <number>
    },
    "summary": "<3 line summary>",
    "Recommendation": "<Recommended / Not Recommended>",
    "RecommendationMsg": "<one line message>"
  }
}

Your task: Analyze the conversation carefully and follow the rules strictly.
`;
