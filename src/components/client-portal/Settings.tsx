import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Key,
  Globe,
  Moon,
  Sun,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Laptop,
  Chrome,
  Clock,
  Check,
  X,
  AlertCircle,
  Plus,
  Trash2,
  Copy,
  Download,
  RefreshCw,
  Save,
  Camera,
  Palette,
  Volume2,
  Vibrate,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Upload,
  Calendar,
  Globe2,
  MailCheck,
  BellRing,
  ShieldCheck,
  Fingerprint,
  KeyRound,
  History,
  Activity,
  Receipt,
  ToggleLeft,
  ToggleRight,
  LogOut,
} from "lucide-react";
import { Topbar } from "./Topbar";
import { Card, CardHeader } from "./shared/Card";
import { SectionLabel } from "./shared/SectionLabel";
import { Field } from "./shared/Field";

// Types
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar?: string;
  timezone: string;
  language: string;
  createdAt: string;
  lastLogin: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  projectUpdates: boolean;
  milestonePayments: boolean;
  newMessages: boolean;
  requirementChanges: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}



interface BillingInfo {
  companyName: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  paymentMethod: 'card' | 'bank' | 'upi';
  cardLast4?: string;
  bankName?: string;
  accountLast4?: string;
  upiId?: string;
}


interface SettingsPageProps {
  setView: (view: string) => void;
  onNew?: () => void;
  onMenu: () => void;
}



// Sample user data
const SAMPLE_USER: UserProfile = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@company.com",
  phone: "+1 (555) 123-4567",
  company: "Tech Innovations Inc.",
  position: "Client Manager",
  timezone: "America/New_York",
  language: "English (US)",
  createdAt: "2024-01-15",
  lastLogin: "2024-03-10T09:30:00",
};

const SAMPLE_NOTIFICATIONS: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  projectUpdates: true,
  milestonePayments: true,
  newMessages: true,
  requirementChanges: true,
  weeklyDigest: false,
  marketingEmails: false,
};

const SAMPLE_TRUSTED_DEVICES = [
  {
    id: "dev1",
    name: "MacBook Pro",
    device: "Laptop",
    browser: "Chrome 122",
    location: "New York, US",
    lastActive: "2024-03-10T09:30:00",
    current: true,
  },
  {
    id: "dev2",
    name: "iPhone 15",
    device: "Mobile",
    browser: "Safari",
    location: "New York, US",
    lastActive: "2024-03-09T22:15:00",
    current: false,
  },
  {
    id: "dev3",
    name: "iPad Pro",
    device: "Tablet",
    browser: "Safari",
    location: "New York, US",
    lastActive: "2024-03-08T14:20:00",
    current: false,
  },
];

const SAMPLE_RECENT_ACTIVITY = [
  {
    id: "act1",
    action: "Login successful",
    ip: "192.168.1.1",
    location: "New York, US",
    device: "Chrome on MacOS",
    timestamp: "2024-03-10T09:30:00",
    status: "success",
  },
  {
    id: "act2",
    action: "Password changed",
    ip: "192.168.1.1",
    location: "New York, US",
    device: "Chrome on MacOS",
    timestamp: "2024-03-09T15:45:00",
    status: "success",
  },
  {
    id: "act3",
    action: "Failed login attempt",
    ip: "203.45.67.89",
    location: "Unknown",
    device: "Firefox on Windows",
    timestamp: "2024-03-08T03:12:00",
    status: "failed",
  },
];

const SAMPLE_BILLING: BillingInfo = {
  companyName: "Tech Innovations Inc.",
  gstNumber: "GSTIN123456789",
  address: "123 Business Ave",
  city: "New York",
  state: "NY",
  country: "United States",
  zipCode: "10001",
  paymentMethod: "card",
  cardLast4: "4242",
};



export function SettingsPage({ setView, onNew, onMenu }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "notifications" | "security" | "billing" >("profile");
  
  const [profile, setProfile] = useState(SAMPLE_USER);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showNewApiModal, setShowNewApiModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setEditing(false);
  };

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Topbar 
        title="Settings" 
        sub="Manage your account preferences" 
        onMenu={onMenu}
        back
        onBack={() => setView("dashboard")}
      />

      <div className="flex-1 overflow-y-auto p-5 sm:p-7">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Settings Header */}
          <div className="flex items-center justify-between">
            <SectionLabel text="// account settings" />
            <button
              onClick={() => setEditing(!editing)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                editing
                  ? "bg-gray-200 text-gray-700"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Settings Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security", icon: Shield },
              { id: "billing", label: "Billing", icon: CreditCard },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    active
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Profile Settings */}
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {/* Profile Picture */}
                <Card>
                  <CardHeader>
                    <User size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Profile Picture</span>
                  </CardHeader>
                  <div className="p-5">
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-3xl font-bold">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        {editing && (
                          <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white border-4 border-white hover:bg-blue-600 transition-colors">
                            <Camera size={14} />
                          </button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{profile.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{profile.position}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          Member since {formatDate(profile.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <User size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Personal Information</span>
                  </CardHeader>
                  <div className="p-5 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Full Name"
                        icon={User}
                        type="text"
                        value={profile.name}
                        onChange={(e: any) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!editing}
                        placeholder="Your full name"
                      />
                      <Field
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        value={profile.email}
                        onChange={(e: any) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!editing}
                        placeholder="your@email.com"
                      />
                      <Field
                        label="Phone Number"
                        icon={Phone}
                        type="tel"
                        value={profile.phone}
                        onChange={(e: any) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!editing}
                        placeholder="+1 (555) 000-0000"
                      />
                      <Field
                        label="Position"
                        icon={Briefcase}
                        type="text"
                        value={profile.position}
                        onChange={(e: any) => setProfile({ ...profile, position: e.target.value })}
                        disabled={!editing}
                        placeholder="Your role"
                      />
                    </div>
                  </div>
                </Card>

                {/* Company Information */}
                <Card>
                  <CardHeader>
                    <Building2 size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Company Information</span>
                  </CardHeader>
                  <div className="p-5 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Company Name"
                        icon={Building2}
                        type="text"
                        value={profile.company}
                        onChange={(e: any) => setProfile({ ...profile, company: e.target.value })}
                        disabled={!editing}
                        placeholder="Your company"
                      />
                      <Field
                        label="Timezone"
                        icon={Globe}
                        type="text"
                        value={profile.timezone}
                        onChange={(e: any) => setProfile({ ...profile, timezone: e.target.value })}
                        disabled={!editing}
                        placeholder="Select timezone"
                      />
                      <Field
                        label="Language"
                        icon={Globe2}
                        type="text"
                        value={profile.language}
                        onChange={(e: any) => setProfile({ ...profile, language: e.target.value })}
                        disabled={!editing}
                        placeholder="Preferred language"
                      />
                    </div>
                  </div>
                </Card>

                {/* Save Button */}
                {editing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end gap-3"
                  >
                    <button
                      onClick={() => setEditing(false)}
                      className="px-6 py-3 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={14} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <Bell size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Notification Channels</span>
                  </CardHeader>
                  <div className="p-5 space-y-4">
                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Notifications",
                        description: "Receive notifications via email",
                        icon: Mail,
                      },
                      {
                        key: "pushNotifications",
                        label: "Push Notifications",
                        description: "Receive browser push notifications",
                        icon: BellRing,
                      },
                      {
                        key: "smsNotifications",
                        label: "SMS Notifications",
                        description: "Receive text messages for urgent updates",
                        icon: Phone,
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                            <item.icon size={14} className="text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleNotification(item.key as keyof NotificationSettings)}
                          className="relative"
                        >
                          {notifications[item.key as keyof NotificationSettings] ? (
                            <ToggleRight size={24} className="text-blue-500" />
                          ) : (
                            <ToggleLeft size={24} className="text-gray-300" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <CardHeader>
                    <Bell size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Notification Types</span>
                  </CardHeader>
                  <div className="p-5 space-y-4">
                    {[
                      {
                        key: "projectUpdates",
                        label: "Project Updates",
                        description: "When project status or progress changes",
                      },
                      {
                        key: "milestonePayments",
                        label: "Milestone Payments",
                        description: "When payments are due or completed",
                      },
                      {
                        key: "newMessages",
                        label: "New Messages",
                        description: "When you receive a new chat message",
                      },
                      {
                        key: "requirementChanges",
                        label: "Requirement Changes",
                        description: "When requirements are added or modified",
                      },
                      {
                        key: "weeklyDigest",
                        label: "Weekly Digest",
                        description: "Weekly summary of all project activities",
                      },
                      {
                        key: "marketingEmails",
                        label: "Marketing Emails",
                        description: "Product updates and promotional content",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <button
                          onClick={() => toggleNotification(item.key as keyof NotificationSettings)}
                        >
                          {notifications[item.key as keyof NotificationSettings] ? (
                            <ToggleRight size={24} className="text-blue-500" />
                          ) : (
                            <ToggleLeft size={24} className="text-gray-300" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <Shield size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Security Settings</span>
                  </CardHeader>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Fingerprint size={14} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-xs text-gray-500">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          twoFactorEnabled
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {twoFactorEnabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <MailCheck size={14} className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Login Alerts</p>
                          <p className="text-xs text-gray-500">
                            Get notified of new login attempts
                          </p>
                        </div>
                      </div>
                      <button className="relative">
                        <ToggleRight size={24} className="text-blue-500" />
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-700">Session Timeout</p>
                        <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                        </select>
                      </div>
                      <p className="text-[10px] text-gray-500">
                        Automatically log out after period of inactivity
                      </p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <CardHeader>
                    <Smartphone size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Trusted Devices</span>
                  </CardHeader>
                  <div className="p-5 space-y-3">
                    {SAMPLE_TRUSTED_DEVICES.map((device) => (
                      <div
                        key={device.id}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                            {device.device === "Laptop" ? (
                              <Laptop size={14} className="text-gray-600" />
                            ) : device.device === "Mobile" ? (
                              <Smartphone size={14} className="text-gray-600" />
                            ) : (
                              <Chrome size={14} className="text-gray-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900">{device.name}</p>
                              {device.current && (
                                <span className="text-[9px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {device.browser} · Last active {formatTime(device.lastActive)}
                            </p>
                          </div>
                        </div>
                        {!device.current && (
                          <button className="text-gray-400 hover:text-red-500 p-1">
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <CardHeader>
                    <History size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Recent Activity</span>
                  </CardHeader>
                  <div className="p-5 space-y-3">
                    {SAMPLE_RECENT_ACTIVITY.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            activity.status === "success"
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {activity.status === "success" ? (
                            <Check size={10} className="text-green-600" />
                          ) : (
                            <AlertCircle size={10} className="text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-900">{activity.action}</p>
                          <p className="text-[9px] text-gray-500">
                            {activity.ip} · {activity.location} · {activity.device}
                          </p>
                        </div>
                        <span className="text-[9px] text-gray-400">
                          {formatTime(activity.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Billing Settings */}
            {activeTab === "billing" && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CreditCard size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Billing Information</span>
                  </CardHeader>
                  <div className="p-5 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Company Name"
                        icon={Building2}
                        type="text"
                        value={SAMPLE_BILLING.companyName}
                        disabled
                      />
                      <Field
                        label="GST Number"
                        icon={Receipt}
                        type="text"
                        value={SAMPLE_BILLING.gstNumber}
                        disabled
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Billing Address</h4>
                      <p className="text-sm text-gray-600">{SAMPLE_BILLING.address}</p>
                      <p className="text-sm text-gray-600">
                        {SAMPLE_BILLING.city}, {SAMPLE_BILLING.state} {SAMPLE_BILLING.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">{SAMPLE_BILLING.country}</p>
                    </div>

                    <button className="text-xs text-blue-500 hover:underline">
                      Update Billing Information
                    </button>
                  </div>
                </Card>

                <Card>
                  <CardHeader>
                    <CreditCard size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Payment Method</span>
                  </CardHeader>
                  <div className="p-5">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                          {SAMPLE_BILLING.paymentMethod === "card" ? "💳" : "🏦"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {SAMPLE_BILLING.paymentMethod === "card"
                              ? `Visa ending in ${SAMPLE_BILLING.cardLast4}`
                              : "Bank Transfer"}
                          </p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Update
                      </button>
                    </div>
                  </div>
                </Card>

                <Card>
                  <CardHeader>
                    <Receipt size={13} className="text-blue-500" />
                    <span className="text-xs font-bold text-gray-900">Billing History</span>
                  </CardHeader>
                  <div className="p-5">
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
                        >
                          <div>
                            <p className="text-xs font-medium text-gray-900">
                              Invoice #{new Date().getFullYear()}-{String(i).padStart(3, "0")}
                            </p>
                            <p className="text-[9px] text-gray-500">
                              {new Date(2024, i - 1, 1).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-gray-900">$1,250.00</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Download size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

          
          </AnimatePresence>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <AlertCircle size={13} className="text-red-500" />
              <span className="text-xs font-bold text-red-700">Danger Zone</span>
            </CardHeader>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Delete Account</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New API Key Modal */}
      <AnimatePresence>
        {showNewApiModal && (
          <NewApiKeyModal onClose={() => setShowNewApiModal(false)} />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <DeleteConfirmModal
            onClose={() => setShowDeleteConfirm(null)}
            onConfirm={() => {
              // Handle delete
              setShowDeleteConfirm(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// New API Key Modal
function NewApiKeyModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<string[]>(["read"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="w-full max-w-md rounded-2xl bg-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Create New API Key</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <Field
            label="Key Name"
            icon={Key}
            type="text"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder="e.g., Production API Key"
          />

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2">
              Permissions
            </label>
            <div className="space-y-2">
              {["read", "write", "delete", "admin"].map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPermissions([...permissions, perm]);
                      } else {
                        setPermissions(permissions.filter((p) => p !== perm));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-500"
                  />
                  <span className="text-xs text-gray-700 capitalize">{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600"
            >
              Create Key
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="w-full max-w-sm rounded-2xl bg-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-1">Delete API Key?</h3>
          <p className="text-xs text-gray-500 mb-4">
            This action cannot be undone. Any applications using this key will lose access.
          </p>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}