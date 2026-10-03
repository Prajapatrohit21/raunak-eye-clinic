"use client";

import React, { useState, useEffect, useTransition, useMemo, useRef } from "react";
import Link from "next/link";
import {
  getAdminAppointmentsAction,
  updateAppointmentStatusAction,
  deleteAppointmentAction,
  createManualAppointmentAction,
} from "@/lib/actions";
import { Appointment, AppointmentStatus, SERVICE_LABELS } from "@/lib/types";
import {
  Phone,
  MessageCircle,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  RefreshCw,
  Lock,
  LogOut,
  CalendarCheck,
  Clock,
  User,
  AlertCircle,
  CheckCircle2,
  Printer,
  X,
  Eye,
  ChevronRight,
  Calendar,
  Volume2,
  VolumeX,
  KeyRound,
  Copy,
  ExternalLink,
  MapPin,
  Check,
} from "lucide-react";

const DEFAULT_PIN = "1234";

const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [rememberDevice, setRememberDevice] = useState(true);

  // Settings & PIN Change Modal
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [pinChangeError, setPinChangeError] = useState("");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"all" | "today" | "new" | "confirmed" | "completed">("all");

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Detail slot editing state
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // WhatsApp template modal state
  const [whatsappModalPatient, setWhatsappModalPatient] = useState<Appointment | null>(null);
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [copiedText, setCopiedText] = useState(false);

  // Print slip modal state
  const [printPatient, setPrintPatient] = useState<Appointment | null>(null);

  // Auto-refresh & Audio chime
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const previousCountRef = useRef<number>(0);

  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Get current active PIN from localStorage
  const getActivePin = () => {
    if (typeof window === "undefined") return DEFAULT_PIN;
    return localStorage.getItem("raunak_admin_custom_pin") || DEFAULT_PIN;
  };

  // Gentle chime sound synthesizer
  const playChime = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  // Check stored auth on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("raunak_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch appointments
  const loadData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await getAdminAppointmentsAction();
      // Check if new records arrived
      if (previousCountRef.current > 0 && data.length > previousCountRef.current) {
        const newItems = data.length - previousCountRef.current;
        playChime();
        setActionMessage({
          type: "success",
          text: `🔔 ${newItems} new appointment enquiry received!`,
        });
        setTimeout(() => setActionMessage(null), 5000);
      }
      previousCountRef.current = data.length;
      setAppointments(data);

      // Keep selected appointment in sync
      if (selectedAppointment) {
        const updatedSelected = data.find((a) => a.id === selectedAppointment.id);
        if (updatedSelected) {
          setSelectedAppointment(updatedSelected);
        }
      }
    } catch (err) {
      console.error("Failed to load appointments:", err);
      if (!silent) {
        setActionMessage({ type: "error", text: "Failed to load patient records." });
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Auto-refresh interval (every 25 seconds)
  useEffect(() => {
    if (!isAuthenticated || !autoRefresh) return;
    const interval = setInterval(() => {
      loadData(true);
    }, 25000);
    return () => clearInterval(interval);
  }, [isAuthenticated, autoRefresh]);

  // Update edit form values when selected appointment changes
  useEffect(() => {
    if (selectedAppointment) {
      setEditDate(selectedAppointment.appointmentDate || "");
      setEditTime(selectedAppointment.appointmentTime || "");
      setEditNotes(selectedAppointment.staffNotes || "");
    }
  }, [selectedAppointment]);

  // Handle PIN submit
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = getActivePin();
    if (pinInput.trim() === currentPin) {
      setIsAuthenticated(true);
      setPinError("");
      if (rememberDevice) {
        localStorage.setItem("raunak_admin_auth", "true");
      }
    } else {
      setPinError(`Incorrect PIN. Please enter clinic reception PIN.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("raunak_admin_auth");
    setIsAuthenticated(false);
    setPinInput("");
  };

  // Handle PIN change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePin = getActivePin();
    if (currentPinInput !== activePin) {
      setPinChangeError("Current PIN is incorrect.");
      return;
    }
    if (newPinInput.length < 4) {
      setPinChangeError("New PIN must be at least 4 digits.");
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeError("New PIN and Confirm PIN do not match.");
      return;
    }

    localStorage.setItem("raunak_admin_custom_pin", newPinInput);
    setIsPinModalOpen(false);
    setCurrentPinInput("");
    setNewPinInput("");
    setConfirmPinInput("");
    setPinChangeError("");
    setActionMessage({ type: "success", text: "Reception PIN updated successfully!" });
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Status update
  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus, updatedAt: new Date().toISOString() } : a))
    );

    startTransition(async () => {
      const target = appointments.find((a) => a.id === id);
      const res = await updateAppointmentStatusAction(
        id,
        newStatus,
        target?.staffNotes,
        target?.appointmentDate,
        target?.appointmentTime
      );
      if (!res.success) {
        setActionMessage({ type: "error", text: res.message });
        await loadData();
      } else {
        setActionMessage({ type: "success", text: `Status updated to ${newStatus}` });
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  // Save Slot & Notes
  const handleSaveSlotAndNotes = async (id: string) => {
    startTransition(async () => {
      const target = appointments.find((a) => a.id === id);
      if (!target) return;
      const res = await updateAppointmentStatusAction(
        id,
        target.status,
        editNotes,
        editDate || undefined,
        editTime || undefined
      );
      if (res.success) {
        setAppointments((prev) =>
          prev.map((a) =>
            a.id === id
              ? {
                  ...a,
                  staffNotes: editNotes,
                  appointmentDate: editDate || undefined,
                  appointmentTime: editTime || undefined,
                  updatedAt: new Date().toISOString(),
                }
              : a
          )
        );
        setActionMessage({ type: "success", text: "Appointment slot and notes saved." });
        setTimeout(() => setActionMessage(null), 3000);
      } else {
        setActionMessage({ type: "error", text: res.message });
      }
    });
  };

  // Delete appointment
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete appointment enquiry for ${name}?`)) {
      return;
    }

    setAppointments((prev) => prev.filter((a) => a.id !== id));
    if (selectedAppointment?.id === id) {
      setSelectedAppointment(null);
    }

    startTransition(async () => {
      const res = await deleteAppointmentAction(id);
      if (!res.success) {
        setActionMessage({ type: "error", text: res.message });
        await loadData();
      } else {
        setActionMessage({ type: "success", text: `Deleted record for ${name}` });
        setTimeout(() => setActionMessage(null), 3000);
      }
    });
  };

  // Add manual appointment
  const handleCreateManual = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createManualAppointmentAction(null, formData);
      if (res.success) {
        setIsAddModalOpen(false);
        setActionMessage({ type: "success", text: res.message || "New appointment created." });
        await loadData();
        setTimeout(() => setActionMessage(null), 4000);
      } else {
        alert(res.message || "Failed to create appointment.");
      }
    });
  };

  // Today's date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split("T")[0];

  // Filtered appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.staffNotes && item.staffNotes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.appointmentDate && item.appointmentDate.includes(searchQuery));

      let matchesTab = true;
      if (activeTab === "today") {
        matchesTab = item.appointmentDate === todayStr;
      } else if (activeTab === "new") {
        matchesTab = item.status === "new";
      } else if (activeTab === "confirmed") {
        matchesTab = item.status === "confirmed";
      } else if (activeTab === "completed") {
        matchesTab = item.status === "completed";
      }

      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesService = serviceFilter === "all" || item.service === serviceFilter;

      return matchesSearch && matchesTab && matchesStatus && matchesService;
    });
  }, [appointments, searchQuery, activeTab, statusFilter, serviceFilter, todayStr]);

  // Export to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "ID",
      "Patient Name",
      "Mobile Number",
      "Speciality / Service",
      "Scheduled Date",
      "Scheduled Time",
      "Patient Message / Age",
      "Status",
      "Staff Remarks",
      "Received Date",
      "Received Time",
    ];

    const rows = appointments.map((a) => {
      const dateObj = new Date(a.createdAt);
      return [
        `"${a.id}"`,
        `"${a.fullName.replace(/"/g, '""')}"`,
        `"${a.phone}"`,
        `"${(SERVICE_LABELS[a.service] || a.service).replace(/"/g, '""')}"`,
        `"${a.appointmentDate || "Not Scheduled"}"`,
        `"${a.appointmentTime || "-"}"`,
        `"${(a.message || "").replace(/"/g, '""')}"`,
        `"${a.status.toUpperCase()}"`,
        `"${(a.staffNotes || "").replace(/"/g, '""')}"`,
        `"${dateObj.toLocaleDateString("en-IN")}"`,
        `"${dateObj.toLocaleTimeString("en-IN")}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `raunak_eye_hospital_appointments_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalCount = appointments.length;
  const todayCount = appointments.filter((a) => a.appointmentDate === todayStr).length;
  const newCount = appointments.filter((a) => a.status === "new").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;

  // Helper date formatter
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 5) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const formatSlotDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr + "T00:00:00");
      const isToday = dateStr === todayStr;
      if (isToday) return "Today";
      return d.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    } catch {
      return dateStr;
    }
  };

  // Status badge colors
  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "new":
        return {
          bg: "bg-amber-100 text-amber-900 border-amber-300",
          dot: "bg-amber-500 animate-pulse",
          label: "New Lead",
        };
      case "contacted":
        return {
          bg: "bg-blue-100 text-blue-900 border-blue-300",
          dot: "bg-blue-500",
          label: "Contacted",
        };
      case "confirmed":
        return {
          bg: "bg-emerald-100 text-emerald-900 border-emerald-300",
          dot: "bg-emerald-500",
          label: "Confirmed",
        };
      case "completed":
        return {
          bg: "bg-slate-100 text-slate-800 border-slate-300",
          dot: "bg-slate-500",
          label: "Completed",
        };
      case "cancelled":
        return {
          bg: "bg-rose-100 text-rose-900 border-rose-300",
          dot: "bg-rose-500",
          label: "Cancelled",
        };
    }
  };

  // WhatsApp Templates generator
  const getWhatsAppTemplates = (patient: Appointment) => {
    const serviceName = SERVICE_LABELS[patient.service] || patient.service;
    const slotDateFormatted = patient.appointmentDate
      ? formatSlotDate(patient.appointmentDate)
      : "aapke suvidhanusaar samay par";
    const slotTimeFormatted = patient.appointmentTime ? `at ${patient.appointmentTime}` : "";

    return [
      {
        title: "Appointment Confirmation",
        description: "Official slot confirmation with doctor details & address",
        text: `Namaste ${patient.fullName} ji! Raunak Eye Care Hospital Dewas se Dr Sachin Malviya (Vitreo-Retinal Surgeon) ke sath aapka appointment ${slotDateFormatted} ${slotTimeFormatted} confirm kar diya gaya hai.\n\n📍 Pata: 121, Moti Bunglow Main Rd, near LIC, opposite SBI, Dewas.\n📞 Reception: 079876 76544.\nKripya samay se 10 minute pehle pahunche. Dhanyawad!`,
      },
      {
        title: "Hospital Location & Directions",
        description: "Google Maps link and landmark directions in Dewas",
        text: `Namaste ${patient.fullName} ji! Raunak Eye Care Hospital Dewas ka Google Maps location link:\n🔗 https://maps.google.com/?q=Raunak+Eye+Care+Hospital+Dewas\n\nLandmark: Moti Bunglow Main Rd, LIC office ke paas, SBI Bank ke samne, Dewas.\nOPD Timing: Monday to Saturday 10:00 AM to 07:00 PM.\nHelpline: 079876 76544`,
      },
      {
        title: "Pre-Consultation Instructions",
        description: "Remind patient to bring previous glasses and medical reports",
        text: `Namaste ${patient.fullName} ji! Raunak Eye Care Hospital me aankh jaanch ke liye aate samay kripya:\n1. Apne purane chashme ya number ki parchi layen.\n2. Purane ilaaj ya eye drop ke prescriptions layen.\n3. Yadi diabetes (sugar) ya BP hai, toh recent blood test reports saath layen.\nDr Sachin Malviya & Team, Raunak Eye Care Dewas.`,
      },
      {
        title: "Website Callback Follow-up",
        description: "Friendly check-in for patients who submitted inquiry",
        text: `Namaste ${patient.fullName} ji! Raunak Eye Care Hospital Dewas se sampark kar rahe hain. Aapne hamari website par "${serviceName}" ke liye inquiry ki thi. Kya hum Dr Sachin Malviya ji ke sath aapka consultation slot book karein? Kripya bataiye kaun sa din aapke liye suvidhajanak rahega.`,
      },
    ];
  };

  // If not authenticated, show PIN Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FBF7F0] border border-[#7A8B7A]/30 rounded-3xl p-8 shadow-elevated">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-16 w-16 rounded-2xl bg-[#0E4D4C] flex items-center justify-center text-[#C17F3A] mb-4 shadow-resting">
              <Lock className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <span className="font-serif font-semibold text-2xl text-[#0E4D4C]">
              Raunak Eye Care Hospital
            </span>
            <span className="text-xs uppercase tracking-widest text-[#C17F3A] font-semibold mt-1">
              Staff & Reception Portal
            </span>
            <p className="text-sm text-[#201D18]/70 mt-3">
              Enter reception security PIN to access live patient appointments & OPD scheduling.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="pin-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-2"
              >
                Reception PIN
              </label>
              <input
                id="pin-input"
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-[#7A8B7A]/40 bg-white text-center text-2xl tracking-[0.3em] font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#C17F3A]"
              />
              {pinError && (
                <p className="text-xs text-rose-600 mt-2 flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {pinError}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember-device"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
                className="h-4 w-4 rounded border-[#7A8B7A] text-[#0E4D4C] focus:ring-[#C17F3A]"
              />
              <label htmlFor="remember-device" className="text-xs text-[#201D18]/70 cursor-pointer">
                Remember this device (stays logged in)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#0E4D4C] text-[#FBF7F0] font-semibold text-base shadow-resting hover:bg-[#146362] transition-colors cursor-pointer"
            >
              Open Admin Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#7A8B7A]/20 text-center">
            <p className="text-xs text-[#201D18]/50">
              Dewas Center • Dr Sachin Malviya (Vitreo-Retinal Surgeon)
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] pb-24">
      {/* Toast Notification */}
      {actionMessage && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-elevated text-sm font-medium transition-all animate-in fade-in ${
            actionMessage.type === "success"
              ? "bg-[#0E4D4C] text-[#FBF7F0]"
              : "bg-rose-600 text-white"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#C17F3A]" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-[#0E4D4C] text-[#FBF7F0] border-b border-[#7A8B7A]/30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider text-[#C17F3A] font-semibold mb-1">
              <span>Raunak Eye Care Hospital</span>
              <span>•</span>
              <span>Hospital Reception & Staff CRM</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-white/60">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FBF7F0]">
              Patient Appointments & Lead Tracker
            </h1>
            <p className="text-xs text-[#FBF7F0]/75 mt-0.5">
              Live database of website callbacks, OPD bookings & patient walk-ins
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Auto refresh status indicator */}
            <button
              type="button"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                autoRefresh
                  ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/40"
                  : "bg-white/10 text-white/60 border-white/20"
              }`}
              title={autoRefresh ? "Auto-refresh is active (every 25s)" : "Auto-refresh is paused"}
            >
              <span className={`h-2 w-2 rounded-full ${autoRefresh ? "bg-emerald-400 animate-pulse" : "bg-gray-400"}`} />
              <span>{autoRefresh ? "Live Sync On" : "Sync Paused"}</span>
            </button>

            {/* Sound toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FBF7F0] text-xs transition-colors"
              title={soundEnabled ? "New enquiry sound enabled" : "Mute new enquiry chime"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#C17F3A]" /> : <VolumeX className="w-4 h-4 text-white/50" />}
            </button>

            {/* Manual refresh button */}
            <button
              type="button"
              onClick={() => loadData()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FBF7F0] text-xs font-medium transition-colors cursor-pointer"
              title="Refresh live data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Export CSV button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#C17F3A] hover:bg-[#d68e42] text-[#201D18] text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* + Add Patient button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#0E4D4C] text-xs font-semibold hover:bg-[#E8D9C5] transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C17F3A]" />
              <span>+ Add Patient</span>
            </button>

            {/* Settings PIN Modal button */}
            <button
              type="button"
              onClick={() => setIsPinModalOpen(true)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FBF7F0]/80 hover:text-white text-xs transition-colors"
              title="Change Reception PIN"
            >
              <KeyRound className="w-4 h-4" />
            </button>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/30 text-[#FBF7F0]/80 hover:text-white text-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
          {/* Card 1: Total */}
          <div
            onClick={() => {
              setActiveTab("all");
              setStatusFilter("all");
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "all" && statusFilter === "all"
                ? "bg-[#0E4D4C] text-[#FBF7F0] border-[#0E4D4C] shadow-resting"
                : "bg-white text-[#201D18] border-[#7A8B7A]/20 hover:border-[#0E4D4C]/40"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-medium opacity-80 mb-1.5">
              <span>TOTAL RECORDS</span>
              <CalendarCheck className="w-3.5 h-3.5 opacity-70" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold">{totalCount}</div>
            <div className="text-[11px] opacity-70 mt-0.5">All patient enquiries</div>
          </div>

          {/* Card 2: Today's Schedule */}
          <div
            onClick={() => {
              setActiveTab("today");
              setStatusFilter("all");
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "today"
                ? "bg-purple-700 text-white border-purple-800 shadow-resting"
                : "bg-white text-[#201D18] border-[#7A8B7A]/20 hover:border-purple-600"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-purple-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                TODAY'S OPD
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-purple-950">{todayCount}</div>
            <div className="text-[11px] text-purple-800/80 mt-0.5">Scheduled for today</div>
          </div>

          {/* Card 3: New Leads */}
          <div
            onClick={() => {
              setActiveTab("new");
              setStatusFilter("new");
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === "new" || activeTab === "new"
                ? "bg-amber-500 text-[#201D18] border-amber-600 shadow-resting"
                : "bg-white text-[#201D18] border-[#7A8B7A]/20 hover:border-amber-500"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-amber-800">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                PENDING CALL
              </span>
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-950">{newCount}</div>
            <div className="text-[11px] text-amber-800/80 mt-0.5">Awaiting reception callback</div>
          </div>

          {/* Card 4: Confirmed */}
          <div
            onClick={() => {
              setActiveTab("confirmed");
              setStatusFilter("confirmed");
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              statusFilter === "confirmed" || activeTab === "confirmed"
                ? "bg-emerald-600 text-white border-emerald-700 shadow-resting"
                : "bg-white text-[#201D18] border-[#7A8B7A]/20 hover:border-emerald-500"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-medium text-emerald-700 mb-1.5">
              <span>CONFIRMED SLOTS</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-950">{confirmedCount}</div>
            <div className="text-[11px] text-emerald-700/80 mt-0.5">Doctor slots booked</div>
          </div>

          {/* Card 5: Completed */}
          <div
            onClick={() => {
              setActiveTab("completed");
              setStatusFilter("completed");
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer col-span-2 sm:col-span-1 ${
              statusFilter === "completed" || activeTab === "completed"
                ? "bg-slate-700 text-white border-slate-800 shadow-resting"
                : "bg-white text-[#201D18] border-[#7A8B7A]/20 hover:border-slate-500"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>COMPLETED</span>
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">{completedCount}</div>
            <div className="text-[11px] text-slate-600 mt-0.5">Consultations done</div>
          </div>
        </div>

        {/* Tab Selection Bar & Search Bar */}
        <div className="bg-white rounded-2xl border border-[#7A8B7A]/20 p-4 mb-6 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Quick Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab("all");
                setStatusFilter("all");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "all"
                  ? "bg-[#0E4D4C] text-[#FBF7F0]"
                  : "bg-gray-100 text-[#201D18]/70 hover:bg-gray-200"
              }`}
            >
              All Records ({totalCount})
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("today");
                setStatusFilter("all");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "today"
                  ? "bg-purple-700 text-white"
                  : "bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100"
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Today's OPD ({todayCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("new");
                setStatusFilter("new");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === "new"
                  ? "bg-amber-500 text-[#201D18]"
                  : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Pending Call ({newCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("confirmed");
                setStatusFilter("confirmed");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === "confirmed"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-[#201D18]/70 hover:bg-gray-200"
              }`}
            >
              Confirmed ({confirmedCount})
            </button>
          </div>

          {/* Search box & Dropdowns */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-1 md:max-w-xl md:justify-end">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A8B7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, phone, notes, slot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-[#7A8B7A]/30 text-xs focus:outline-none focus:ring-2 focus:ring-[#C17F3A] bg-[#FBF7F0]/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Speciality dropdown */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#7A8B7A]/30 text-xs font-medium bg-[#FBF7F0]/40 text-[#201D18] focus:outline-none focus:ring-2 focus:ring-[#C17F3A]"
            >
              <option value="all">All Specialities</option>
              <option value="retina-care">Retina Care</option>
              <option value="squint-correction">Squint Correction</option>
              <option value="cataract-surgery">Cataract Surgery</option>
              <option value="complete-checkup">Complete Eye Check-up</option>
              <option value="paediatric-care">Paediatric Care</option>
              <option value="emergency-care">Emergency Care</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Table / List (8 cols or 12 cols if none selected) */}
          <div className={selectedAppointment ? "lg:col-span-7" : "lg:col-span-12"}>
            <div className="bg-white rounded-2xl border border-[#7A8B7A]/20 shadow-sm overflow-hidden">
              <div className="p-3.5 border-b border-[#7A8B7A]/15 flex items-center justify-between bg-[#FBF7F0]/50">
                <span className="text-xs font-semibold text-[#0E4D4C] uppercase tracking-wider flex items-center gap-2">
                  <span>Patient Enquiries</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0E4D4C]/10 text-[#0E4D4C] text-[11px] font-bold">
                    {filteredAppointments.length}
                  </span>
                </span>
                <span className="text-[11px] text-[#201D18]/60">
                  Showing {filteredAppointments.length} of {appointments.length} records
                </span>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="h-12 w-12 rounded-full bg-[#E8D9C5]/50 flex items-center justify-center mx-auto text-[#0E4D4C] mb-3">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#201D18]">
                    No patient records found
                  </h3>
                  <p className="text-xs text-[#201D18]/60 mt-1 max-w-sm mx-auto">
                    Try adjusting your search query or tab filter to see other appointments.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#7A8B7A]/10 overflow-x-auto">
                  {filteredAppointments.map((item) => {
                    const badge = getStatusBadge(item.status);
                    const isSelected = selectedAppointment?.id === item.id;
                    const isToday = item.appointmentDate === todayStr;

                    return (
                      <div
                        key={item.id}
                        className={`p-4 transition-colors hover:bg-[#FBF7F0]/60 ${
                          isSelected ? "bg-[#E8D9C5]/30 border-l-4 border-l-[#0E4D4C]" : ""
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          {/* Patient Info */}
                          <div
                            onClick={() => setSelectedAppointment(item)}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="font-serif font-semibold text-base text-[#0E4D4C] hover:underline">
                                {item.fullName}
                              </span>

                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badge.bg}`}
                              >
                                <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                                {badge.label}
                              </span>

                              {/* Scheduled Slot Badge */}
                              {item.appointmentDate && (
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                                    isToday
                                      ? "bg-purple-100 text-purple-900 border-purple-300 animate-pulse"
                                      : "bg-slate-100 text-slate-800 border-slate-300"
                                  }`}
                                >
                                  <Calendar className="w-3 h-3 text-purple-600" />
                                  <span>
                                    Slot: {formatSlotDate(item.appointmentDate)}{" "}
                                    {item.appointmentTime && `• ${item.appointmentTime}`}
                                  </span>
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#201D18]/70">
                              <span className="font-medium text-[#201D18]">
                                {SERVICE_LABELS[item.service] || item.service}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-[#201D18]/60">
                                <Clock className="w-3.5 h-3.5" />
                                Received: {formatDate(item.createdAt)}
                              </span>
                            </div>

                            {item.message && (
                              <div className="mt-1.5 text-xs text-[#201D18]/80 line-clamp-1 italic">
                                &ldquo;{item.message}&rdquo;
                              </div>
                            )}

                            {item.staffNotes && (
                              <div className="mt-2 text-xs bg-amber-50 text-amber-900 border border-amber-200/70 rounded-lg px-2.5 py-1 inline-flex items-center gap-1.5 max-w-full">
                                <span className="font-semibold text-[10px] uppercase tracking-wider text-amber-800 shrink-0">
                                  Staff Note:
                                </span>
                                <span className="truncate">{item.staffNotes}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick Actions Bar */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            {/* Call Button */}
                            <a
                              href={`tel:${item.phone}`}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0E4D4C] hover:bg-[#146362] text-white text-xs font-semibold transition-colors shadow-sm"
                              title={`Call ${item.fullName}`}
                            >
                              <Phone className="w-3 h-3 text-[#C17F3A]" />
                              <span>{item.phone}</span>
                            </a>

                            {/* WhatsApp Button (Opens Template Selector) */}
                            <button
                              type="button"
                              onClick={() => {
                                setWhatsappModalPatient(item);
                                setSelectedTemplateIndex(0);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                              title="Send WhatsApp message"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">WhatsApp</span>
                            </button>

                            {/* Print OPD Slip Button */}
                            <button
                              type="button"
                              onClick={() => setPrintPatient(item)}
                              className="p-1.5 rounded-xl border border-gray-300 hover:border-[#0E4D4C] text-[#201D18]/70 hover:text-[#0E4D4C] hover:bg-[#FBF7F0] transition-colors"
                              title="Print OPD slip for doctor"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            {/* Quick Status Dropdown */}
                            <select
                              value={item.status}
                              onChange={(e) =>
                                handleStatusChange(item.id, e.target.value as AppointmentStatus)
                              }
                              className="px-2 py-1.5 rounded-xl border border-[#7A8B7A]/30 text-xs font-medium bg-white text-[#201D18] focus:outline-none focus:ring-2 focus:ring-[#C17F3A]"
                            >
                              <option value="new">New Lead</option>
                              <option value="contacted">Contacted</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            {/* View / Edit arrow */}
                            <button
                              type="button"
                              onClick={() => setSelectedAppointment(item)}
                              className="p-1.5 rounded-xl text-gray-400 hover:text-[#0E4D4C] hover:bg-[#E8D9C5]/40 transition-colors"
                              title="View & Edit Slot"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Detail Pane (5 cols) */}
          {selectedAppointment && (
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#7A8B7A]/30 p-5 shadow-elevated sticky top-20">
              <div className="flex items-center justify-between border-b border-[#7A8B7A]/20 pb-3.5 mb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C17F3A] font-semibold">
                    Appointment Details & Slot
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#0E4D4C]">
                    {selectedAppointment.fullName}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setPrintPatient(selectedAppointment)}
                    className="p-1.5 rounded-lg text-[#0E4D4C] hover:bg-emerald-50 border border-[#7A8B7A]/20"
                    title="Print OPD slip"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAppointment(null)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Contact Card */}
                <div className="p-3.5 rounded-xl bg-[#FBF7F0] border border-[#7A8B7A]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Phone:</span>
                    <a
                      href={`tel:${selectedAppointment.phone}`}
                      className="font-mono font-bold text-sm text-[#0E4D4C] hover:underline"
                    >
                      {selectedAppointment.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Speciality:</span>
                    <span className="font-semibold text-right text-[#201D18]">
                      {SERVICE_LABELS[selectedAppointment.service] || selectedAppointment.service}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Enquiry Received:</span>
                    <span>{new Date(selectedAppointment.createdAt).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Patient Query / Note */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Patient Query / Age / Symptoms
                  </label>
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-[#201D18] leading-relaxed">
                    {selectedAppointment.message || "No specific note provided by patient."}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${selectedAppointment.phone}`}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0E4D4C] text-white text-xs font-semibold hover:bg-[#146362] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C17F3A]" />
                    <span>Call Patient</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setWhatsappModalPatient(selectedAppointment);
                      setSelectedTemplateIndex(0);
                    }}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Templates</span>
                  </button>
                </div>

                {/* Status selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Change Status
                  </label>
                  <select
                    value={selectedAppointment.status}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedAppointment.id,
                        e.target.value as AppointmentStatus
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#7A8B7A]/30 text-xs font-medium bg-[#FBF7F0] focus:ring-2 focus:ring-[#C17F3A]"
                  >
                    <option value="new">New Lead (Awaiting Call)</option>
                    <option value="contacted">Contacted (Spoken)</option>
                    <option value="confirmed">Confirmed Appointment</option>
                    <option value="completed">Completed Consultation</option>
                    <option value="cancelled">Cancelled / Invalid</option>
                  </select>
                </div>

                {/* Scheduling: Date & Time Picker */}
                <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-700" />
                    <span>Doctor Consultation Slot (Dr Sachin Malviya)</span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-purple-800 mb-1">
                        Appointment Date
                      </label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-purple-300 bg-white text-xs focus:ring-2 focus:ring-[#C17F3A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-purple-800 mb-1">
                        Time Slot
                      </label>
                      <input
                        list="time-slots-list"
                        type="text"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        placeholder="e.g. 11:30 AM"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-purple-300 bg-white text-xs focus:ring-2 focus:ring-[#C17F3A]"
                      />
                      <datalist id="time-slots-list">
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                {/* Staff Internal Remarks */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Reception / Staff Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={editNotes}
                    placeholder="e.g. Called at 11:30 AM. Patient visiting Wednesday with Dr Malviya..."
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#7A8B7A]/30 text-xs focus:ring-2 focus:ring-[#C17F3A] bg-[#FBF7F0]/40"
                  />
                </div>

                {/* Save Slot & Notes Button */}
                <button
                  type="button"
                  onClick={() => handleSaveSlotAndNotes(selectedAppointment.id)}
                  disabled={isPending}
                  className="w-full py-2.5 rounded-xl bg-[#0E4D4C] text-[#FBF7F0] text-xs font-semibold hover:bg-[#146362] transition-colors shadow-sm cursor-pointer"
                >
                  {isPending ? "Saving changes..." : "Save Slot & Reception Notes"}
                </button>

                {/* Delete button */}
                <div className="pt-2 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(selectedAppointment.id, selectedAppointment.fullName)
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Manual Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#FBF7F0] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#7A8B7A]/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#7A8B7A]/20 pb-4 mb-5">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#C17F3A] font-semibold">
                  Manual Entry
                </span>
                <h3 className="font-serif font-bold text-xl text-[#0E4D4C]">
                  Add Patient / Walk-in
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManual} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-1.5">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rameshwar Patel"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm focus:ring-2 focus:ring-[#C17F3A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-1.5">
                  Mobile Number (10 digits) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[6-9][0-9]{9}"
                  placeholder="e.g. 9826012345"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm focus:ring-2 focus:ring-[#C17F3A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-1.5">
                    Speciality / Reason
                  </label>
                  <select
                    name="service"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm focus:ring-2 focus:ring-[#C17F3A]"
                  >
                    <option value="cataract-surgery">Cataract Surgery</option>
                    <option value="retina-care">Retina Care</option>
                    <option value="squint-correction">Squint Correction</option>
                    <option value="complete-checkup">Complete Eye Check-up</option>
                    <option value="paediatric-care">Paediatric Care</option>
                    <option value="emergency-care">Emergency Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-1.5">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-3 py-2.5 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm focus:ring-2 focus:ring-[#C17F3A]"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed Slot</option>
                  </select>
                </div>
              </div>

              {/* Slot Scheduling fields */}
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-purple-900 mb-1">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    defaultValue={todayStr}
                    className="w-full px-3 py-2 rounded-xl border border-purple-300 bg-white text-xs focus:ring-2 focus:ring-[#C17F3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-900 mb-1">
                    Time Slot
                  </label>
                  <input
                    list="new-time-slots"
                    type="text"
                    name="appointmentTime"
                    defaultValue="11:30 AM"
                    className="w-full px-3 py-2 rounded-xl border border-purple-300 bg-white text-xs focus:ring-2 focus:ring-[#C17F3A]"
                  />
                  <datalist id="new-time-slots">
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-1.5">
                  Age / Symptoms / Patient Notes
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="e.g. 55 yrs old, diabetic patient, left eye blurred vision"
                  className="w-full px-4 py-2 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm focus:ring-2 focus:ring-[#C17F3A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#201D18]/80 mb-1.5">
                  Receptionist Notes / Remarks
                </label>
                <textarea
                  name="staffNotes"
                  rows={2}
                  placeholder="e.g. Doctor slot fixed for Wednesday with Dr Malviya"
                  className="w-full px-4 py-2 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm focus:ring-2 focus:ring-[#C17F3A] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#7A8B7A]/20">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#7A8B7A]/40 text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2.5 rounded-xl bg-[#0E4D4C] text-[#FBF7F0] text-sm font-semibold hover:bg-[#146362] transition-colors cursor-pointer shadow-resting"
                >
                  {isPending ? "Saving..." : "Save Patient Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* WhatsApp Message Template Modal */}
      {whatsappModalPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg bg-[#FBF7F0] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#7A8B7A]/30">
            <div className="flex items-center justify-between border-b border-[#7A8B7A]/20 pb-4 mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Message Templates</span>
                </span>
                <h3 className="font-serif font-bold text-lg text-[#0E4D4C]">
                  {whatsappModalPatient.fullName} ({whatsappModalPatient.phone})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWhatsappModalPatient(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Template Selector Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
              {getWhatsAppTemplates(whatsappModalPatient).map((t, idx) => (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => {
                    setSelectedTemplateIndex(idx);
                    setCopiedText(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedTemplateIndex === idx
                      ? "bg-emerald-700 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>

            {/* Message Preview Box */}
            {(() => {
              const templates = getWhatsAppTemplates(whatsappModalPatient);
              const activeTemplate = templates[selectedTemplateIndex] || templates[0];
              const cleanPhone = whatsappModalPatient.phone.replace(/\D/g, "");
              const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(activeTemplate.text)}`;

              const handleCopy = () => {
                navigator.clipboard.writeText(activeTemplate.text);
                setCopiedText(true);
                setTimeout(() => setCopiedText(false), 2000);
              };

              return (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[#7A8B7A]/30 text-xs font-sans text-[#201D18] leading-relaxed whitespace-pre-line shadow-inner max-h-48 overflow-y-auto">
                    {activeTemplate.text}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#7A8B7A]/20">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#7A8B7A]/40 text-xs font-medium hover:bg-gray-100 text-[#201D18] transition-colors"
                    >
                      {copiedText ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#7A8B7A]" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-resting transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send in WhatsApp</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* OPD Slip / Token Printing Modal */}
      {printPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-300 max-h-[95vh] overflow-y-auto print:p-0 print:border-none print:shadow-none print:rounded-none">
            {/* Modal Controls (hidden on print) */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 print:hidden">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#0E4D4C]" />
                <h3 className="font-serif font-bold text-base text-[#0E4D4C]">
                  OPD Consultation Slip Preview
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E4D4C] text-[#FBF7F0] text-xs font-semibold hover:bg-[#146362] transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrintPatient(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable OPD Paper Layout */}
            <div className="border border-gray-400 p-6 rounded-xl text-black font-sans bg-white print:border-none print:p-0">
              {/* Hospital Header */}
              <div className="border-b-2 border-[#0E4D4C] pb-4 mb-4 text-center">
                <h2 className="font-serif font-bold text-2xl text-[#0E4D4C] uppercase tracking-wide">
                  Raunak Eye Care Hospital
                </h2>
                <p className="text-xs font-semibold text-[#C17F3A] uppercase tracking-widest mt-0.5">
                  Super-Speciality Eye & Retina Center
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  121, Moti Bunglow Main Rd, near LIC, opposite SBI, Dewas (M.P.) • Tel: 079876 76544
                </p>
                <p className="text-xs font-semibold text-gray-800 mt-1">
                  Dr. Sachin Malviya • MBBS, MS (Ophthalmology), Vitreo-Retinal Surgeon
                </p>
              </div>

              {/* Patient Demographics Box */}
              <div className="grid grid-cols-2 gap-3 text-xs border border-gray-300 p-3 rounded-lg mb-4 bg-gray-50/50">
                <div>
                  <span className="text-gray-500 font-medium">Patient Name: </span>
                  <span className="font-bold text-sm text-gray-900">{printPatient.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Token / Ref ID: </span>
                  <span className="font-mono font-bold">{printPatient.id}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Contact Phone: </span>
                  <span className="font-mono font-bold text-gray-900">{printPatient.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Speciality: </span>
                  <span className="font-bold text-gray-900">
                    {SERVICE_LABELS[printPatient.service] || printPatient.service}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Date & Slot: </span>
                  <span className="font-bold text-purple-900">
                    {printPatient.appointmentDate || todayStr} (
                    {printPatient.appointmentTime || "11:30 AM"})
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Status: </span>
                  <span className="font-bold text-emerald-800 uppercase">
                    {printPatient.status}
                  </span>
                </div>
              </div>

              {printPatient.message && (
                <div className="mb-4 text-xs">
                  <span className="font-semibold text-gray-700">Patient Symptoms / Chief Complaint: </span>
                  <span className="text-gray-800 italic">{printPatient.message}</span>
                </div>
              )}

              {/* Doctor Examination Section */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-2.5">
                  <div className="text-xs">
                    <span className="font-bold text-gray-700 block mb-1">Right Eye (OD):</span>
                    <div className="h-10 border-b border-dashed border-gray-300" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-gray-700 block mb-1">Left Eye (OS):</span>
                    <div className="h-10 border-b border-dashed border-gray-300" />
                  </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-2.5 text-xs">
                  <span className="font-bold text-gray-700 block mb-1">
                    Clinical Examination / Findings (IOP / Slit Lamp / Retina Fundus):
                  </span>
                  <div className="h-16 border-b border-dashed border-gray-300" />
                </div>

                <div className="border border-gray-300 rounded-lg p-2.5 text-xs">
                  <span className="font-bold text-gray-700 block mb-1">
                    Diagnosis & Treatment Plan / Rx:
                  </span>
                  <div className="h-24 border-b border-dashed border-gray-300" />
                </div>
              </div>

              {/* Doctor Signature Footer */}
              <div className="mt-8 pt-4 flex items-center justify-between text-xs text-gray-600">
                <span>Receptionist Signature: ____________</span>
                <span className="font-semibold text-right">
                  Dr. Sachin Malviya<br />
                  <span className="text-[10px] text-gray-500 font-normal">Vitreo-Retinal Surgeon</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change PIN Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[#FBF7F0] rounded-3xl p-6 shadow-2xl border border-[#7A8B7A]/30">
            <div className="flex items-center justify-between border-b border-[#7A8B7A]/20 pb-3 mb-4">
              <div className="flex items-center gap-2 text-[#0E4D4C]">
                <KeyRound className="w-5 h-5 text-[#C17F3A]" />
                <h3 className="font-serif font-bold text-lg">Change Reception PIN</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#201D18]/80 mb-1">
                  Current PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  placeholder="Enter current PIN"
                  className="w-full px-3 py-2 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm font-mono text-center tracking-widest focus:ring-2 focus:ring-[#C17F3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#201D18]/80 mb-1">
                  New Security PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="At least 4 digits"
                  className="w-full px-3 py-2 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm font-mono text-center tracking-widest focus:ring-2 focus:ring-[#C17F3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#201D18]/80 mb-1">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  placeholder="Re-enter new PIN"
                  className="w-full px-3 py-2 rounded-xl border border-[#7A8B7A]/40 bg-white text-sm font-mono text-center tracking-widest focus:ring-2 focus:ring-[#C17F3A]"
                />
              </div>

              {pinChangeError && (
                <p className="text-xs text-rose-600 font-medium">{pinChangeError}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#7A8B7A]/20">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl border border-[#7A8B7A]/30 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0E4D4C] text-[#FBF7F0] text-xs font-semibold hover:bg-[#146362]"
                >
                  Update PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
