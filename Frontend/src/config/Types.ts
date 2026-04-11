export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface UserOut {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export interface PersonalOut {
  name: string | null;
  email: string | null;
  country: string | null;
  gender: string | null;
  bio: string | null;
}

export interface HandlesOut {
  git: string | null;
  codeforces: string | null;
  leetcode: string | null;
}

export interface SkillOut {
  id: number;
  skill: string;
}

export interface SkillVerificationOut {
  skill_name: string;
  score: number;
  passed: boolean;
  attempts: number;
  verified_at: string | null;
}

export interface GitHubStatsOut {
  github: string | null;
  github_stars: number;
  github_repos: number;
  github_languages: Record<string, number> | null;
  github_contributions: number;
  github_synced_at: string | null;
}

export interface PublicProfileOut {
  username: string;
  name: string | null;
  bio: string | null;
  country: string | null;
  avatar_url: string | null;
  github: string | null;
  github_stars: number;
  github_repos: number;
  github_languages: Record<string, number> | null;
  skills: SkillOut[];
  verifications: SkillVerificationOut[];
}

export interface Project {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  tech_stack: string[] | null;
  github_url: string | null;
  demo_url: string | null;
  screenshot_url: string | null;
  score: number;
  commits_this_week: number;
  contributors_count: number;
  issues_closed: number;
  stars: number;
  last_commit_at: string | null;
  activity_badge: "trending" | "active" | "low" | "dead";
  is_open: boolean;
  created_at: string;
}

export interface ProposalOut {
  id: number;
  project_id: number;
  applicant_id: number;
  role: string;
  skills: string[] | null;
  message: string;
  availability: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

export interface EnrollmentOut {
  id: number;
  user_id: number;
  project_id: number;
  role: string;
  joined_at: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string }[];
}

export interface QuizOut {
  skill: string;
  questions: QuizQuestion[];
  total: number;
}

export interface QuizResult {
  skill: string;
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  badge: string | null;
  explanations: {
    question_id: string;
    question: string;
    your_answer: string;
    correct: string;
    correct_text: string;
    is_correct: boolean;
    explanation: string;
  }[];
}

export interface DevCard {
  username: string;
  name: string | null;
  country: string | null;
  bio: string | null;
  github: string | null;
  github_stars: number;
  top_skills: string[];
  verified_skills: string[];
  top_score: number;
}

// Legacy aliases kept for backward compat
export type User = PublicProfileOut;
export type Details = { username: string };
export type Personal = PersonalOut;
export type CodingHandles = HandlesOut;
export type Skill = { id?: number; skill: string };
export type SaveStatus = "idle" | "loading" | "ok" | "err";
export type ProfilePage = "details" | "personal" | "skills" | "handles";
export type ActivityFilter = "all" | "trending" | "active" | "low" | "dead";
export type ActivitySort = "score" | "commits_this_week" | "last_commit_at";
