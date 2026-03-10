export type Status =
  | "planning"
  | "in-progress"
  | "review"
  | "completed"
  | "on-hold";
export type Priority = "low" | "medium" | "high" | "critical";
export type ReqStatus = "pending" | "approved" | "in-dev" | "done" | "rejected";
export type UpdType = "progress" | "milestone" | "issue" | "deployment";
export type PaymentStatus = "pending" | "paid" | "overdue";

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate?: string;
}

export interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: ReqStatus;
  createdAt: string;
  createdBy: "client" | "team";
  notes?: string;
}

export interface Update {
  id: string;
  date: string;
  title: string;
  body: string;
  type: UpdType;
  author: string;
  pct?: number;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  color: string;
  status: Status;
  progress: number;
  startDate: string;
  deadline: string;
  description: string;
  budget: string;
  spent: string;
  pm: string;
  dev: string;
  requirements: Requirement[];
  updates: Update[];
  milestones: Milestone[];
  stack: string[];
  documents: File[];
}
export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid" | "overdue";
  paidDate?: string;
}
