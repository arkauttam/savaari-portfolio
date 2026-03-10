import {
  Circle,
  CheckCircle2,
  GitBranch,
  Activity,
  Zap,
  AlertCircle,
  Upload,
  Wallet,
  CreditCard,
  DollarSign,
  X,
} from "lucide-react";
import type {
  Status,
  Priority,
  ReqStatus,
  UpdType,
  Milestone,
  PaymentStatus,
  Project,
} from "./types";

export const STATUS_CFG: Record<
  Status,
  { label: string; color: string; bg: string }
> = {
  planning: {
    label: "Planning",
    color: "#64748b",
    bg: "rgba(100,116,139,0.08)",
  },
  "in-progress": {
    label: "In Progress",
    color: "#2563eb",
    bg: "rgba(37,99,235,0.08)",
  },
  review: { label: "In Review", color: "#ea580c", bg: "rgba(234,88,12,0.08)" },
  completed: {
    label: "Completed",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
  },
  "on-hold": { label: "On Hold", color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
};

export const PRIORITY_CFG: Record<Priority, { label: string; color: string }> =
  {
    low: { label: "Low", color: "#64748b" },
    medium: { label: "Medium", color: "#ea580c" },
    high: { label: "High", color: "#2563eb" },
    critical: { label: "Critical", color: "#dc2626" },
  };

export const REQ_STATUS_CFG: Record<
  ReqStatus,
  { label: string; color: string; Icon: React.ElementType }
> = {
  pending: { label: "Pending", color: "#64748b", Icon: Circle },
  approved: { label: "Approved", color: "#ea580c", Icon: CheckCircle2 },
  "in-dev": { label: "In Dev", color: "#2563eb", Icon: GitBranch },
  done: { label: "Done", color: "#16a34a", Icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "#dc2626", Icon: X },
};

export const UPD_TYPE_CFG: Record<
  UpdType,
  { color: string; Icon: React.ElementType; label: string }
> = {
  progress: { color: "#2563eb", Icon: Activity, label: "Progress" },
  milestone: { color: "#16a34a", Icon: Zap, label: "Milestone" },
  issue: { color: "#dc2626", Icon: AlertCircle, label: "Issue" },
  deployment: { color: "#7c3aed", Icon: Upload, label: "Deployment" },
};

export const PAYMENT_STATUS_CFG: Record<
  PaymentStatus,
  { label: string; color: string; bg: string }
> = {
  pending: { label: "Pending", color: "#ea580c", bg: "rgba(234,88,12,0.08)" },
  paid: { label: "Paid", color: "#16a34a", bg: "rgba(22,163,74,0.08)" },
  overdue: { label: "Overdue", color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
};

export const PROJECT_TYPES = [
  "Web Development",
  "Mobile App",
  "AI / ML",
  "UI / UX Design",
  "CRM & ERP",
  "Digital Marketing",
];

export const TYPE_COLORS: Record<string, string> = {
  "Web Development": "#2563eb",
  "Mobile App": "#16a34a",
  "AI / ML": "#7c3aed",
  "UI / UX Design": "#0891b2",
  "CRM & ERP": "#ea580c",
  "Digital Marketing": "#d97706",
};

// Updated SEED data with milestones
export const SEED: Project[] = [
  {
    id: "p1",
    name: "FoodRush Web App",
    type: "Web Development",
    color: "#2563eb",
    status: "in-progress",
    progress: 68,
    startDate: "2024-10-01",
    deadline: "2025-02-28",
    description:
      "Full-stack SaaS food ordering platform with real-time tracking, multi-vendor support, and an admin dashboard.",
    budget: "₹1,80,000",
    spent: "₹1,22,400",
    pm: "Saumya Roy",
    dev: "Arjun Das",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    requirements: [
      {
        id: "r1",
        title: "Real-time order tracking map",
        description:
          "Live GPS map showing delivery agent location updating every 5 seconds.",
        priority: "high",
        status: "in-dev",
        createdAt: "2024-10-05",
        createdBy: "client",
      },
      {
        id: "r2",
        title: "Multi-vendor dashboard",
        description:
          "Each restaurant gets their own admin panel to manage menu, orders, and payouts.",
        priority: "critical",
        status: "done",
        createdAt: "2024-10-06",
        createdBy: "client",
      },
      {
        id: "r3",
        title: "Push notifications",
        description:
          "Order status push notifications via Firebase for both web and mobile.",
        priority: "medium",
        status: "approved",
        createdAt: "2024-10-10",
        createdBy: "client",
      },
      {
        id: "r4",
        title: "Promo code engine",
        description:
          "Admin can create time-limited promo codes with usage limits and discount types.",
        priority: "low",
        status: "pending",
        createdAt: "2024-11-01",
        createdBy: "client",
      },
    ],
    updates: [
      {
        id: "u1",
        date: "2025-01-14",
        title: "Sprint 7 complete — Checkout flow live",
        body: "Completed the full checkout flow including address selection, payment gateway integration (Razorpay), and order confirmation emails. All QA tests passed.",
        type: "milestone",
        author: "Arjun Das",
        pct: 68,
      },
      {
        id: "u2",
        date: "2025-01-07",
        title: "Map integration underway",
        body: "Integrated Google Maps SDK. Real-time tracking websocket server deployed. Currently polishing the driver-side location broadcast.",
        type: "progress",
        author: "Arjun Das",
        pct: 58,
      },
      {
        id: "u3",
        date: "2024-12-20",
        title: "Staging deployment",
        body: "First staging build deployed to AWS EC2. Client can access at staging.foodrush.weblogiic.dev",
        type: "deployment",
        author: "Saumya Roy",
        pct: 45,
      },
    ],
    milestones: [
      {
        id: "m1",
        title: "Project Kickoff",
        description: "Initial project setup and requirement gathering",
        amount: 18000,
        status: "paid",
        dueDate: "2024-10-15",
        paidDate: "2024-10-10",
      },
      {
        id: "m2",
        title: "UI/UX Design Approval",
        description: "Complete design system and wireframes approval",
        amount: 27000,
        status: "paid",
        dueDate: "2024-11-15",
        paidDate: "2024-11-10",
      },
      {
        id: "m3",
        title: "Core Development Sprint 1",
        description: "User authentication, vendor dashboard, basic ordering",
        amount: 45000,
        status: "paid",
        dueDate: "2024-12-15",
        paidDate: "2024-12-12",
      },
      {
        id: "m4",
        title: "Core Development Sprint 2",
        description: "Payment integration, order tracking, admin panel",
        amount: 45000,
        status: "pending",
        dueDate: "2025-01-30",
      },
      {
        id: "m5",
        title: "Testing & Deployment",
        description: "QA testing, bug fixes, production deployment",
        amount: 27000,
        status: "pending",
        dueDate: "2025-02-20",
      },
      {
        id: "m6",
        title: "Final Delivery & Training",
        description: "Handover, documentation, team training",
        amount: 18000,
        status: "pending",
        dueDate: "2025-02-28",
      },
    ],
    documents: [],
  },
  {
    id: "p2",
    name: "StyleVibe Mobile App",
    type: "Mobile App",
    color: "#16a34a",
    status: "review",
    progress: 91,
    startDate: "2024-08-15",
    deadline: "2025-01-31",
    description:
      "Flutter-based fashion e-commerce app for iOS & Android with AR try-on, wishlist, and influencer affiliate system.",
    budget: "₹2,40,000",
    spent: "₹2,18,400",
    pm: "Priya Nair",
    dev: "Rohit Sen",
    stack: ["Flutter", "Firebase", "Dart", "AWS S3"],
    requirements: [
      {
        id: "r5",
        title: "AR try-on feature",
        description:
          "Use ARKit/ARCore to let users virtually try on glasses and accessories.",
        priority: "high",
        status: "done",
        createdAt: "2024-08-20",
        createdBy: "client",
      },
      {
        id: "r6",
        title: "Influencer affiliate links",
        description:
          "Influencers get unique referral links. Dashboard shows clicks, conversions, and commissions.",
        priority: "medium",
        status: "done",
        createdAt: "2024-08-22",
        createdBy: "team",
      },
    ],
    updates: [
      {
        id: "u4",
        date: "2025-01-18",
        title: "Final QA round complete",
        body: "All 47 test cases passed on both iOS (iPhone 15) and Android (Pixel 8). App is ready for store submission pending client sign-off.",
        type: "milestone",
        author: "Rohit Sen",
        pct: 91,
      },
      {
        id: "u5",
        date: "2025-01-10",
        title: "AR try-on shipped",
        body: "ARKit + ARCore try-on live on staging. Tested on 6 devices. Performance smooth at 60fps.",
        type: "milestone",
        author: "Rohit Sen",
        pct: 85,
      },
    ],
    milestones: [
      {
        id: "m7",
        title: "Project Initiation",
        description: "Requirements analysis and tech stack finalization",
        amount: 24000,
        status: "paid",
        dueDate: "2024-08-30",
        paidDate: "2024-08-28",
      },
      {
        id: "m8",
        title: "UI/UX Design",
        description: "App design and prototyping",
        amount: 36000,
        status: "paid",
        dueDate: "2024-09-30",
        paidDate: "2024-09-25",
      },
      {
        id: "m9",
        title: "Core Development",
        description: "Main app features development",
        amount: 120000,
        status: "paid",
        dueDate: "2024-11-30",
        paidDate: "2024-11-28",
      },
      {
        id: "m10",
        title: "AR Integration",
        description: "AR try-on feature implementation",
        amount: 36000,
        status: "paid",
        dueDate: "2024-12-31",
        paidDate: "2024-12-29",
      },
      {
        id: "m11",
        title: "Final Delivery",
        description: "App store submission and launch",
        amount: 24000,
        status: "pending",
        dueDate: "2025-01-31",
      },
    ],
    documents: [],
  },
  {
    id: "p3",
    name: "LendSmart AI Engine",
    type: "AI / ML",
    color: "#7c3aed",
    status: "planning",
    progress: 12,
    startDate: "2025-01-20",
    deadline: "2025-06-30",
    description:
      "ML-powered credit risk assessment engine for a fintech startup. Processes loan applications and scores applicants.",
    budget: "₹3,60,000",
    spent: "₹43,200",
    pm: "Saumya Roy",
    dev: "Meera Gupta",
    stack: ["Python", "FastAPI", "TensorFlow", "PostgreSQL", "Docker"],
    requirements: [
      {
        id: "r8",
        title: "Credit scoring model",
        description:
          "Train an XGBoost model on historical loan data to predict default probability.",
        priority: "critical",
        status: "in-dev",
        createdAt: "2025-01-21",
        createdBy: "team",
      },
      {
        id: "r9",
        title: "Explainability (SHAP) dashboard",
        description:
          "SHAP values dashboard so underwriters can see why a score was assigned.",
        priority: "high",
        status: "pending",
        createdAt: "2025-01-21",
        createdBy: "client",
      },
    ],
    updates: [
      {
        id: "u6",
        date: "2025-01-22",
        title: "Project kickoff complete",
        body: "Discovery call done. Tech stack finalised. Dataset received from client (anonymised). EDA in progress.",
        type: "progress",
        author: "Meera Gupta",
        pct: 12,
      },
    ],
    milestones: [
      {
        id: "m12",
        title: "Project Kickoff",
        description: "Discovery phase and data collection",
        amount: 36000,
        status: "paid",
        dueDate: "2025-01-31",
        paidDate: "2025-01-25",
      },
      {
        id: "m13",
        title: "Data Processing & EDA",
        description: "Data cleaning, preprocessing, exploratory analysis",
        amount: 54000,
        status: "pending",
        dueDate: "2025-02-28",
      },
      {
        id: "m14",
        title: "Model Development",
        description: "ML model training and validation",
        amount: 108000,
        status: "pending",
        dueDate: "2025-03-31",
      },
      {
        id: "m15",
        title: "API Development",
        description: "FastAPI endpoints and integration",
        amount: 72000,
        status: "pending",
        dueDate: "2025-04-30",
      },
      {
        id: "m16",
        title: "Dashboard & Testing",
        description: "SHAP dashboard and comprehensive testing",
        amount: 54000,
        status: "pending",
        dueDate: "2025-05-31",
      },
      {
        id: "m17",
        title: "Deployment & Handover",
        description: "Production deployment and documentation",
        amount: 36000,
        status: "pending",
        dueDate: "2025-06-30",
      },
    ],
    documents: [],
  },
];
