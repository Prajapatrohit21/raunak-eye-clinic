"use server";

import { callbackFormSchema } from "@/lib/validation";
import {
  saveAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAdminPin,
  setAdminPin,
  Appointment,
  AppointmentStatus,
} from "@/lib/appointments";
import { revalidatePath } from "next/cache";

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  data?: Appointment;
}

export async function requestCallback(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    service: formData.get("service"),
    message: formData.get("message") || undefined,
  };

  const parseResult = callbackFormSchema.safeParse(rawData);

  if (!parseResult.success) {
    const errors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string") {
        errors[field] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please check the highlighted details and try again.",
      errors,
    };
  }

  const { fullName, phone, service, message } = parseResult.data;

  try {
    // Save to persistent hospital records
    const saved = await saveAppointment({
      fullName,
      phone,
      service,
      message,
      status: "new",
    });

    const hospitalEmail = process.env.HOSPITAL_EMAIL || "reception@raunakeye.com";

    if (process.env.NODE_ENV === "development") {
      console.log(`[Appointment Saved] Callback alert recorded for ${hospitalEmail}:`, {
        id: saved.id,
        patient: fullName,
        phone,
        serviceRequested: service,
        patientNote: message ?? "None provided",
        timestamp: saved.createdAt,
      });
    }

    revalidatePath("/admin");

    return {
      success: true,
      message: "Thank you — the hospital will call you shortly.",
      data: saved,
    };
  } catch (error) {
    console.error("Failed to forward callback request:", error);
    return {
      success: false,
      message: "We encountered an issue submitting your request. Please call 079876 76544 directly.",
    };
  }
}

// Admin server actions
export async function getAdminAppointmentsAction(): Promise<Appointment[]> {
  try {
    return await getAppointments();
  } catch (err) {
    console.error("Error in getAdminAppointmentsAction:", err);
    return [];
  }
}

export async function updateAppointmentStatusAction(
  id: string,
  status: AppointmentStatus,
  staffNotes?: string,
  appointmentDate?: string,
  appointmentTime?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const updated = await updateAppointment(id, {
      status,
      ...(staffNotes !== undefined ? { staffNotes } : {}),
      ...(appointmentDate !== undefined ? { appointmentDate } : {}),
      ...(appointmentTime !== undefined ? { appointmentTime } : {}),
    });
    if (!updated) {
      return { success: false, message: "Appointment record not found." };
    }
    revalidatePath("/admin");
    return { success: true, message: "Appointment status updated." };
  } catch (err) {
    console.error("Error updating appointment status:", err);
    return { success: false, message: "Failed to update appointment." };
  }
}

export async function deleteAppointmentAction(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    const deleted = await deleteAppointment(id);
    if (!deleted) {
      return { success: false, message: "Appointment record not found." };
    }
    revalidatePath("/admin");
    return { success: true, message: "Appointment deleted successfully." };
  } catch (err) {
    console.error("Error deleting appointment:", err);
    return { success: false, message: "Failed to delete appointment." };
  }
}

export async function createManualAppointmentAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const fullName = String(formData.get("fullName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const service = String(formData.get("service") || "complete-checkup");
  const message = String(formData.get("message") || "").trim();
  const staffNotes = String(formData.get("staffNotes") || "").trim();
  const status = (formData.get("status") || "new") as AppointmentStatus;
  const appointmentDate = String(formData.get("appointmentDate") || "").trim();
  const appointmentTime = String(formData.get("appointmentTime") || "").trim();

  if (fullName.length < 2) {
    return {
      success: false,
      message: "Patient name is required (at least 2 letters).",
    };
  }

  if (!/^[6-9]\d{9}$/.test(phone)) {
    return {
      success: false,
      message: "Please enter a valid 10-digit Indian phone number.",
    };
  }

  try {
    const saved = await saveAppointment({
      fullName,
      phone,
      service,
      message: message || undefined,
      staffNotes: staffNotes || undefined,
      status,
      appointmentDate: appointmentDate || undefined,
      appointmentTime: appointmentTime || undefined,
    });
    revalidatePath("/admin");
    return {
      success: true,
      message: "Patient enquiry saved successfully.",
      data: saved,
    };
  } catch (err) {
    console.error("Error creating manual appointment:", err);
    return {
      success: false,
      message: "Failed to save appointment. Please try again.",
    };
  }
}

// ──────────────────────────────────────────────────────────
// PIN actions (server-side, synced across devices via Redis)
// ──────────────────────────────────────────────────────────
export async function getAdminPinAction(): Promise<string> {
  return await getAdminPin();
}

export async function updateAdminPinAction(
  currentPin: string,
  newPin: string
): Promise<{ success: boolean; message: string }> {
  const cleanNewPin = String(newPin || "").trim();
  const cleanCurrentPin = String(currentPin || "").trim();

  if (!/^\d{4,8}$/.test(cleanNewPin)) {
    return { success: false, message: "PIN must be 4–8 digits." };
  }
  const storedPin = await getAdminPin();
  if (cleanCurrentPin !== String(storedPin).trim()) {
    return { success: false, message: "Current PIN is incorrect." };
  }
  await setAdminPin(cleanNewPin);
  return { success: true, message: "PIN updated successfully on all devices." };
}

export async function verifyAdminPinAction(
  pin: string
): Promise<{ success: boolean }> {
  const storedPin = await getAdminPin();
  const inputPin = String(pin || "").trim();
  const actualPin = String(storedPin || "").trim();
  return { success: Boolean(inputPin && inputPin === actualPin) };
}


