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
  document?: File | null;
}
// Add these to your existing types.ts

export type MessageType = "text" | "file" | "image" | "system";
export type MessageStatus = "sending" | "sent" | "delivered" | "read";
export type ChatParticipantRole = "client" | "pm" | "dev" | "admin";

export interface ChatParticipant {
  id: string;
  name: string;
  role: ChatParticipantRole;
  avatar?: string;
  online: boolean;
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderRole: ChatParticipantRole;
  content: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: string;
  readBy: string[];
  replyTo?: string;
  attachments?: {
    name: string;
    url: string;
    size: number;
    type: string;
  }[];
}

export interface Chat {
  id: string;
  projectId?: string;
  projectName?: string;
  projectColor?: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  isGroup: boolean;
  name?: string;
  avatar?: string;
}

export interface ChatThread {
  chat: Chat;
  project?: Project;
}