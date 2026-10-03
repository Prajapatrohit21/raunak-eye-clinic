import { Redis } from "@upstash/redis";
import { Appointment, AppointmentStatus, SERVICE_LABELS } from "./types";

export type { Appointment, AppointmentStatus };
export { SERVICE_LABELS };

// ──────────────────────────────────────────────────────────
// Redis client — uses env vars set in Vercel dashboard
// For local dev: add these to .env.local
// ──────────────────────────────────────────────────────────
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const APPOINTMENTS_KEY = "raunak:appointments";
const PIN_KEY = "raunak:admin_pin";

// Seed data — only used when database is empty
const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "apt_101",
    fullName: "Rameshwar Patel",
    phone: "9826012345",
    service: "cataract-surgery",
    message: "Age: 62 years. Blurred vision in right eye for 3 months.",
    status: "new",
    staffNotes: "New enquiry from website. Needs morning slot.",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "apt_102",
    fullName: "Sunita Sharma",
    phone: "9827154321",
    service: "retina-care",
    message: "Age: 54 years. Diabetic patient, doctor recommended retina fundus check.",
    status: "confirmed",
    staffNotes: "Confirmed with Dr Sachin Malviya. Slot fixed.",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "11:30 AM",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "apt_103",
    fullName: "Kailash Verma",
    phone: "9425098765",
    service: "squint-correction",
    message: "Age: 8 years. Paediatric squint checkup for son.",
    status: "confirmed",
    staffNotes: "Confirmed with Dr Sachin Malviya for Wednesday 4:00 PM.",
    appointmentDate: "2026-10-07",
    appointmentTime: "04:00 PM",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "apt_104",
    fullName: "Pooja Choudhary",
    phone: "9977011223",
    service: "complete-checkup",
    message: "Age: 29 years. Frequent headache and computer eye strain.",
    status: "completed",
    staffNotes: "Prescribed anti-glare lenses and dry eye drops.",
    appointmentDate: "2026-10-02",
    appointmentTime: "02:00 PM",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

// ──────────────────────────────────────────────────────────
// PIN Management (synced across all devices via Redis)
// ──────────────────────────────────────────────────────────
export async function getAdminPin(): Promise<string> {
  try {
    const pin = await redis.get<any>(PIN_KEY);
    if (pin === null || pin === undefined) return "1234";
    return String(pin).trim();
  } catch {
    return "1234";
  }
}

export async function setAdminPin(newPin: string): Promise<void> {
  await redis.set(PIN_KEY, String(newPin).trim());
}

// ──────────────────────────────────────────────────────────
// Appointment CRUD
// ──────────────────────────────────────────────────────────
export async function getAppointments(): Promise<Appointment[]> {
  try {
    const data = await redis.get<Appointment[]>(APPOINTMENTS_KEY);

    if (!data || data.length === 0) {
      // Seed initial data on first run
      await redis.set(APPOINTMENTS_KEY, SEED_APPOINTMENTS);
      return SEED_APPOINTMENTS.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("Failed to read appointments from Redis:", err);
    return [];
  }
}

export async function saveAppointment(input: {
  fullName: string;
  phone: string;
  service: string;
  message?: string;
  staffNotes?: string;
  status?: AppointmentStatus;
  appointmentDate?: string;
  appointmentTime?: string;
}): Promise<Appointment> {
  const list = await getAppointments();
  const now = new Date().toISOString();

  const newRecord: Appointment = {
    id: `apt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    fullName: input.fullName.trim(),
    phone: input.phone.trim(),
    service: input.service,
    message: input.message?.trim() || undefined,
    status: input.status || "new",
    staffNotes: input.staffNotes?.trim() || undefined,
    appointmentDate: input.appointmentDate?.trim() || undefined,
    appointmentTime: input.appointmentTime?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  list.unshift(newRecord);
  await redis.set(APPOINTMENTS_KEY, list);
  return newRecord;
}

export async function updateAppointment(
  id: string,
  updates: Partial<Pick<Appointment, "status" | "staffNotes" | "appointmentDate" | "appointmentTime">>
): Promise<Appointment | null> {
  const list = await getAppointments();
  const index = list.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updated: Appointment = {
    ...list[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  await redis.set(APPOINTMENTS_KEY, list);
  return updated;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  const list = await getAppointments();
  const filtered = list.filter((a) => a.id !== id);
  if (filtered.length === list.length) return false;

  await redis.set(APPOINTMENTS_KEY, filtered);
  return true;
}
