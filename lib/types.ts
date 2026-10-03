export type AppointmentStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  service: string;
  message?: string;
  status: AppointmentStatus;
  staffNotes?: string;
  appointmentDate?: string; // YYYY-MM-DD
  appointmentTime?: string; // e.g. "11:30 AM"
  createdAt: string;
  updatedAt: string;
}

export const SERVICE_LABELS: Record<string, string> = {
  "retina-care": "Retina Care",
  "squint-correction": "Squint Correction",
  "cataract-surgery": "Cataract Surgery",
  "complete-checkup": "Complete Eye Check-up",
  "paediatric-care": "Paediatric Care",
  "emergency-care": "Emergency Care",
};
