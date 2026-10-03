import fs from "fs/promises";
import path from "path";
import { Appointment, AppointmentStatus, SERVICE_LABELS } from "./types";

export type { Appointment, AppointmentStatus };
export { SERVICE_LABELS };

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "appointments.json");

// Seed initial realistic appointments so dashboard looks alive from day 1
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt_101",
    fullName: "Rameshwar Patel",
    phone: "9826012345",
    service: "cataract-surgery",
    message: "Age: 62 years. Blurred vision in right eye for 3 months.",
    status: "new",
    staffNotes: "New enquiry from website. Needs morning slot.",
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
  },
  {
    id: "apt_102",
    fullName: "Sunita Sharma",
    phone: "9827154321",
    service: "retina-care",
    message: "Age: 54 years. Diabetic patient, doctor recommended retina fundus check.",
    status: "contacted",
    staffNotes: "Called reception. Sent address on WhatsApp. Scheduled for today 11:30 AM.",
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "11:30 AM",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(FILE_PATH);
    } catch {
      // File doesn't exist yet, seed initial data
      await fs.writeFile(FILE_PATH, JSON.stringify(INITIAL_APPOINTMENTS, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error creating appointments data directory/file:", err);
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const data: Appointment[] = JSON.parse(raw);
    return data.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.error("Failed to read appointments:", err);
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
  await ensureDataFile();
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
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return newRecord;
}

export async function updateAppointment(
  id: string,
  updates: Partial<Pick<Appointment, "status" | "staffNotes" | "appointmentDate" | "appointmentTime">>
): Promise<Appointment | null> {
  await ensureDataFile();
  const list = await getAppointments();
  const index = list.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const current = list[index];
  const updated: Appointment = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return updated;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  await ensureDataFile();
  const list = await getAppointments();
  const filtered = list.filter((a) => a.id !== id);
  if (filtered.length === list.length) return false;

  await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
