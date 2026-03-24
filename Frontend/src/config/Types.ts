export interface AuthTokens {
  access: string;
  refresh: string;
}

export type User = {
  name: string
  age: number
  gender: string
  country: string
  org: string
  github?: string
  codeforces?: string
  leetcode?: string
  email: string
}

export interface Details {
  username: string;
}

export interface Personal {
  name: string;
  email: string;
  country: string;
  gender: string;
  bio: string;
}


export interface Skill {
  id?: number;
  skill: string;
}


export interface CodingHandles {
  git: string;
  codeforces: string;
  leetcode: string;
}


export interface Project {
  id: string;
  projectID?: string;
  name: string;
  description: string;
  github_url: string;
  projectgithub?: string;
  projectdemo?: string | null;
  score: number;
  commits_this_week: number;
  contributors_count: number;
  issues_closed: number;
  last_commit_at?: string | null;
  activity_badge: "trending" | "active" | "low" | "dead";
}


export interface ProjectSkill {
  id?: number;
  projectskill: string;
}


export interface ProjectWithSkills extends Project {
  skills: ProjectSkill[];
}


export interface Proposal {
  id?: number;
  project: string;
  proposal: string;
}


export interface Enrolled {
  id?: number;
  project: string;
  project_name?: string;
}


export interface FullProfile {
  details: Details;
  personal: Personal;
  skills: Skill[];
  handles: CodingHandles;
}


export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export type SaveStatus = "idle" | "loading" | "ok" | "err";


export type ProfilePage = "details" | "personal" | "skills" | "handles";

export type ActivityFilter = "all" | "trending" | "active" | "low" | "dead";

export type ActivitySort = "score" | "commits_this_week" | "last_commit_at";