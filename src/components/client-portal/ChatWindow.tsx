import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Image,
  FileText,
  Download,
  Check,
  CheckCheck,
  Clock,
  Pin,
  Bell,
  BellOff,
  Users,
  Phone,
  Video,
  Info,
  X,
  ArrowLeft,
  ChevronDown,
  Edit3,
  Trash2,
  Copy,
  Reply,
  Forward,
  Star,
} from "lucide-react";
import { Topbar } from "./Topbar";

// Types
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  senderRole: "client" | "pm" | "dev" | "admin";
  content: string;
  timestamp: string;
  status: "sending" | "sent" | "delivered" | "read";
  type: "text" | "image" | "file" | "system";
  attachments?: {
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  pinned?: boolean;
}

interface ChatThread {
  id: string;
  projectId: string;
  projectName: string;
  projectColor: string;
  participants: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
    online: boolean;
    lastSeen?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
}

interface ChatWindowProps {
  setView: (view: string) => void;
  onNew?: () => void;
  onMenu: () => void;
}

// Sample Data
const SAMPLE_THREADS: ChatThread[] = [
  {
    id: "thread1",
    projectId: "p1",
    projectName: "FoodRush Web App",
    projectColor: "#2563eb",
    participants: [
      { id: "client1", name: "You", role: "client", online: true },
      { id: "pm1", name: "Saumya Roy", role: "pm", online: true, avatar: "SR" },
      { id: "dev1", name: "Arjun Das", role: "dev", online: false, lastSeen: "2024-03-10T10:30:00" },
    ],
    unreadCount: 2,
    pinned: true,
    muted: false,
    lastMessage: {
      id: "msg3",
      senderId: "pm1",
      senderName: "Saumya Roy",
      content: "The staging deployment is complete. You can test it at staging.foodrush.com",
      timestamp: "2024-03-10T09:45:00",
      status: "delivered",
      type: "text",
      senderRole: "pm",
    },
  },
  {
    id: "thread2",
    projectId: "p2",
    projectName: "StyleVibe Mobile App",
    projectColor: "#16a34a",
    participants: [
      { id: "client1", name: "You", role: "client", online: true },
      { id: "pm2", name: "Priya Nair", role: "pm", online: true, avatar: "PN" },
      { id: "dev2", name: "Rohit Sen", role: "dev", online: true, avatar: "RS" },
    ],
    unreadCount: 0,
    pinned: false,
    muted: false,
    lastMessage: {
      id: "msg5",
      senderId: "dev2",
      senderName: "Rohit Sen",
      content: "AR try-on feature is ready for testing! Here's the latest build:",
      timestamp: "2024-03-09T16:20:00",
      status: "read",
      type: "text",
      senderRole: "dev",
      attachments: [
        {
          name: "StyleVibe-v2.1.0.apk",
          size: 24500000,
          type: "application/apk",
          url: "#",
        },
      ],
    },
  },
  {
    id: "thread3",
    projectId: "p3",
    projectName: "LendSmart AI Engine",
    projectColor: "#7c3aed",
    participants: [
      { id: "client1", name: "You", role: "client", online: true },
      { id: "pm3", name: "Saumya Roy", role: "pm", online: false, lastSeen: "2024-03-09T18:20:00" },
      { id: "dev3", name: "Meera Gupta", role: "dev", online: true, avatar: "MG" },
    ],
    unreadCount: 1,
    pinned: false,
    muted: true,
    lastMessage: {
      id: "msg8",
      senderId: "dev3",
      senderName: "Meera Gupta",
      content: "EDA report is ready. I've attached the initial findings.",
      timestamp: "2024-03-09T11:15:00",
      status: "delivered",
      type: "text",
      senderRole: "dev",
      attachments: [
        {
          name: "EDA-Report-Q1-2024.pdf",
          size: 1800000,
          type: "application/pdf",
          url: "#",
        },
      ],
    },
  },
];

const SAMPLE_MESSAGES: Record<string, Message[]> = {
  thread1: [
    {
      id: "msg1",
      senderId: "pm1",
      senderName: "Saumya Roy",
      senderRole: "pm",
      content: "Hi! I've reviewed the requirements for FoodRush. The real-time tracking feature looks good. When would you like to schedule a demo?",
      timestamp: "2024-03-10T09:30:00",
      status: "read",
      type: "text",
      reactions: [
        { emoji: "👍", count: 1, users: ["client1"] },
      ],
    },
    {
      id: "msg2",
      senderId: "client1",
      senderName: "You",
      senderRole: "client",
      content: "Thanks for the update! Can we do it this Friday at 11 AM?",
      timestamp: "2024-03-10T09:35:00",
      status: "read",
      type: "text",
    },
    {
      id: "msg3",
      senderId: "dev1",
      senderName: "Arjun Das",
      senderRole: "dev",
      content: "Friday at 11 AM works for me. I'll prepare the demo environment.",
      timestamp: "2024-03-10T09:40:00",
      status: "read",
      type: "text",
    },
    {
      id: "msg4",
      senderId: "pm1",
      senderName: "Saumya Roy",
      senderRole: "pm",
      content: "Perfect! I've sent you the calendar invite. Also, here's the latest build for testing:",
      timestamp: "2024-03-10T09:45:00",
      status: "read",
      type: "text",
      attachments: [
        {
          name: "FoodRush-Staging-Build.apk",
          size: 24500000,
          type: "application/apk",
          url: "#",
        },
      ],
    },
    {
      id: "msg5",
      senderId: "client1",
      senderName: "You",
      senderRole: "client",
      content: "Great! I'll test it today and share feedback.",
      timestamp: "2024-03-10T09:50:00",
      status: "delivered",
      type: "text",
    },
    {
      id: "msg6",
      senderId: "dev1",
      senderName: "Arjun Das",
      senderRole: "dev",
      content: "Here's a screenshot of the new dashboard:",
      timestamp: "2024-03-10T10:15:00",
      status: "delivered",
      type: "image",
      attachments: [
        {
          name: "dashboard-preview.png",
          size: 1200000,
          type: "image/png",
          url: "#",
        },
      ],
    },
  ],
  thread2: [
    {
      id: "msg7",
      senderId: "dev2",
      senderName: "Rohit Sen",
      senderRole: "dev",
      content: "AR try-on feature is ready for testing! Here's the latest build:",
      timestamp: "2024-03-09T16:20:00",
      status: "read",
      type: "text",
      attachments: [
        {
          name: "StyleVibe-v2.1.0.apk",
          size: 24500000,
          type: "application/apk",
          url: "#",
        },
      ],
    },
  ],
  thread3: [
    {
      id: "msg8",
      senderId: "dev3",
      senderName: "Meera Gupta",
      senderRole: "dev",
      content: "EDA report is ready. I've attached the initial findings.",
      timestamp: "2024-03-09T11:15:00",
      status: "delivered",
      type: "text",
      attachments: [
        {
          name: "EDA-Report-Q1-2024.pdf",
          size: 1800000,
          type: "application/pdf",
          url: "#",
        },
      ],
    },
  ],
};

export function ChatWindow({ setView, onNew, onMenu }: ChatWindowProps) {
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showThreadInfo, setShowThreadInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const threads = SAMPLE_THREADS;
  const currentMessages = selectedThread ? SAMPLE_MESSAGES[selectedThread.id] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, selectedThread]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach((msg) => {
      const date = formatDate(msg.timestamp);
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock size={12} className="text-gray-400" />;
      case "sent":
        return <Check size={12} className="text-gray-400" />;
      case "delivered":
        return <CheckCheck size={12} className="text-gray-400" />;
      case "read":
        return <CheckCheck size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedThread) return;
    // Handle send message
    setMessageInput("");
    setReplyTo(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Topbar
        title={selectedThread ? selectedThread.projectName : "Messages"}
        sub={selectedThread ? `${selectedThread.participants.length} participants` : "Chat with your team"}
        back={!!selectedThread}
        onBack={() => setSelectedThread(null)}
        onMenu={onMenu}
        color={selectedThread?.projectColor}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Threads Sidebar */}
        <AnimatePresence mode="wait">
          {!selectedThread && (
            <motion.div
              key="threads"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full lg:w-80 border-r border-gray-200 bg-white overflow-hidden flex flex-col"
            >
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-300 bg-gray-50"
                  />
                </div>
              </div>

              {/* Threads List */}
              <div className="flex-1 overflow-y-auto">
                {threads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread)}
                    className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ background: thread.projectColor }}
                    >
                      {thread.projectName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900 truncate">
                          {thread.projectName}
                        </span>
                        {thread.lastMessage && (
                          <span className="text-[10px] text-gray-400">
                            {formatTime(thread.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 truncate">
                            {thread.lastMessage?.content || "No messages yet"}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            {thread.participants.slice(0, 3).map((p) => (
                              <div
                                key={p.id}
                                className="relative"
                              >
                                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-medium text-gray-600">
                                  {p.avatar || p.name[0]}
                                </div>
                                {p.online && (
                                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
                                )}
                              </div>
                            ))}
                            {thread.participants.length > 3 && (
                              <span className="text-[8px] text-gray-400">
                                +{thread.participants.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-2">
                          {thread.unreadCount > 0 && (
                            <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full min-w-[16px] text-center">
                              {thread.unreadCount}
                            </span>
                          )}
                          {thread.pinned && (
                            <Pin size={10} className="text-gray-300" />
                          )}
                          {thread.muted && (
                            <BellOff size={10} className="text-gray-300" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Area */}
          {selectedThread && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col bg-white"
            >
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedThread(null)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: selectedThread.projectColor }}
                  >
                    {selectedThread.projectName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {selectedThread.projectName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex -space-x-1">
                        {selectedThread.participants.slice(0, 3).map((p) => (
                          <div
                            key={p.id}
                            className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[8px] font-medium text-gray-600"
                            title={`${p.name} (${p.role})`}
                          >
                            {p.avatar || p.name[0]}
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {selectedThread.participants.length} participants
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowSearch(!showSearch)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Search size={16} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => setShowThreadInfo(!showThreadInfo)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Info size={16} className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-gray-200 overflow-hidden"
                  >
                    <div className="p-3 bg-gray-50">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search in this conversation..."
                          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-300"
                          autoFocus
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {Object.entries(groupMessagesByDate(currentMessages)).map(([date, messages]) => (
                  <div key={date}>
                    <div className="flex justify-center mb-4">
                      <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        {date}
                      </span>
                    </div>

                    {messages.map((msg, idx) => {
                      const isOwn = msg.senderId === "client1";
                      const showAvatar = idx === 0 || messages[idx - 1]?.senderId !== msg.senderId;

                      return (
                        <div
                          key={msg.id}
                          className={`flex items-end gap-2 mb-3 group ${isOwn ? "flex-row-reverse" : ""}`}
                        >
                          {!isOwn && showAvatar && (
                            <div className="relative">
                              <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-[9px] font-bold text-gray-600 shrink-0">
                                {msg.senderAvatar || msg.senderName[0]}
                              </div>
                              {selectedThread.participants.find(p => p.id === msg.senderId)?.online && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white" />
                              )}
                            </div>
                          )}
                          {!isOwn && !showAvatar && <div className="w-7" />}

                          <div className={`max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
                            {showAvatar && !isOwn && (
                              <span className="text-[8px] text-gray-400 ml-1">
                                {msg.senderName} · {msg.senderRole}
                              </span>
                            )}

                            {/* Reply indicator */}
                            {msg.replyTo && (
                              <div className="mb-1 px-3 py-1.5 bg-gray-100 rounded-lg text-[10px] border-l-2 border-gray-300">
                                <span className="text-gray-500">Replying to {msg.replyTo.senderName}: </span>
                                <span className="text-gray-600">{msg.replyTo.content.slice(0, 30)}...</span>
                              </div>
                            )}

                            {/* Message bubble */}
                            <div
                              className={`px-3 py-2 rounded-xl text-sm ${
                                isOwn
                                  ? "bg-blue-500 text-white rounded-br-none"
                                  : "bg-gray-100 text-gray-900 rounded-bl-none"
                              }`}
                            >
                              <p className="text-xs whitespace-pre-wrap break-words">{msg.content}</p>

                              {/* Attachments */}
                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {msg.attachments.map((att) => (
                                    <a
                                      key={att.name}
                                      href={att.url}
                                      className={`flex items-center gap-2 p-2 rounded-lg text-[10px] ${
                                        isOwn ? "bg-blue-600" : "bg-white"
                                      }`}
                                    >
                                      {att.type.includes("pdf") ? (
                                        <FileText size={12} />
                                      ) : att.type.includes("image") ? (
                                        <Image size={12} />
                                      ) : (
                                        <Paperclip size={12} />
                                      )}
                                      <span className="flex-1 truncate">{att.name}</span>
                                      <span className="text-[8px] opacity-70">
                                        {formatFileSize(att.size)}
                                      </span>
                                      <Download size={10} />
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Reactions */}
                            {msg.reactions && msg.reactions.length > 0 && (
                              <div className={`flex gap-1 mt-1 ${isOwn ? "justify-end" : ""}`}>
                                {msg.reactions.map((reaction) => (
                                  <button
                                    key={reaction.emoji}
                                    className="px-1.5 py-0.5 bg-gray-100 rounded-full text-[9px] flex items-center gap-0.5"
                                  >
                                    <span>{reaction.emoji}</span>
                                    <span className="text-gray-600">{reaction.count}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Message footer */}
                            <div className={`flex items-center gap-1 mt-0.5 ${isOwn ? "justify-end" : ""}`}>
                              <span className="text-[8px] text-gray-400">
                                {formatTime(msg.timestamp)}
                              </span>
                              {isOwn && getStatusIcon(msg.status)}
                              
                              {/* Message actions on hover */}
                              <div className="hidden group-hover:flex items-center gap-1 ml-2">
                                <button
                                  onClick={() => setReplyTo(msg)}
                                  className="p-0.5 hover:bg-gray-200 rounded"
                                >
                                  <Reply size={10} className="text-gray-500" />
                                </button>
                                <button className="p-0.5 hover:bg-gray-200 rounded">
                                  <Copy size={10} className="text-gray-500" />
                                </button>
                                <button className="p-0.5 hover:bg-gray-200 rounded">
                                  <MoreVertical size={10} className="text-gray-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Reply preview */}
              <AnimatePresence>
                {replyTo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] text-gray-500 font-mono">
                        Replying to {replyTo.senderName}
                      </span>
                      <p className="text-xs truncate text-gray-600">{replyTo.content}</p>
                    </div>
                    <button
                      onClick={() => setReplyTo(null)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <X size={12} className="text-gray-500" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input area */}
              <div className="px-4 py-3 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-3 py-2 bg-transparent text-sm resize-none max-h-32 focus:outline-none"
                    />
                    <div className="flex items-center justify-between px-2 pb-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Paperclip size={14} className="text-gray-400" />
                        </button>
                        <button
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Smile size={14} className="text-gray-400" />
                        </button>
                      </div>
                      <span className="text-[8px] text-gray-400">
                        {messageInput.length}/500
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="p-2 bg-blue-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" multiple />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thread Info Sidebar */}
        <AnimatePresence>
          {showThreadInfo && selectedThread && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:block border-l border-gray-200 bg-white overflow-hidden"
            >
              <div className="w-[280px] h-full overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-gray-900">Thread Info</h4>
                    <button
                      onClick={() => setShowThreadInfo(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={14} className="text-gray-500" />
                    </button>
                  </div>

                  <div
                    className="w-full h-20 rounded-xl mb-3"
                    style={{ background: `linear-gradient(135deg, ${selectedThread.projectColor}20, ${selectedThread.projectColor}05)` }}
                  >
                    <div className="p-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-2"
                        style={{ background: selectedThread.projectColor }}
                      >
                        {selectedThread.projectName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <h5 className="text-xs font-medium text-gray-900">{selectedThread.projectName}</h5>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg text-xs">
                      <Bell size={12} className="text-gray-500" />
                      <span className="flex-1 text-left text-gray-600">Notifications</span>
                      <span className="text-gray-400">{selectedThread.muted ? "Muted" : "On"}</span>
                    </button>
                    <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-lg text-xs">
                      <Pin size={12} className="text-gray-500" />
                      <span className="flex-1 text-left text-gray-600">Pinned</span>
                      <span className="text-gray-400">{selectedThread.pinned ? "Yes" : "No"}</span>
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h5 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-3">
                    Participants · {selectedThread.participants.length}
                  </h5>
                  <div className="space-y-3">
                    {selectedThread.participants.map((p) => (
                      <div key={p.id} className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                            {p.avatar || p.name[0]}
                          </div>
                          {p.online && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-900">
                            {p.name}
                            {p.id === "client1" && " (You)"}
                          </p>
                          <p className="text-[9px] text-gray-400 font-mono uppercase">{p.role}</p>
                          {!p.online && p.lastSeen && (
                            <p className="text-[8px] text-gray-400">
                              Last seen {formatTime(p.lastSeen)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200">
                  <h5 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-3">
                    Media & Files
                  </h5>
                  <div className="space-y-2">
                    {currentMessages
                      .filter((m) => m.attachments && m.attachments.length > 0)
                      .slice(0, 3)
                      .map((m) => (
                        <div key={m.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            {m.attachments?.[0].type.includes("pdf") ? (
                              <FileText size={14} className="text-gray-500" />
                            ) : m.attachments?.[0].type.includes("image") ? (
                              <Image size={14} className="text-gray-500" />
                            ) : (
                              <Paperclip size={14} className="text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-medium text-gray-700 truncate">
                              {m.attachments?.[0].name}
                            </p>
                            <p className="text-[8px] text-gray-400">
                              {formatFileSize(m.attachments?.[0].size || 0)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}