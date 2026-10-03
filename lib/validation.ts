import { z } from "zod";

export const serviceEnum = z.enum([
  "retina-care",
  "squint-correction",
  "cataract-surgery",
  "complete-checkup",
  "paediatric-care",
  "emergency-care",
]);

export const callbackFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name (minimum 2 characters)." }),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, {
      message: "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.",
    }),
  service: serviceEnum,
  message: z.string().trim().max(500, { message: "Message is too long (maximum 500 characters)." }).optional(),
});

export type CallbackFormData = z.infer<typeof callbackFormSchema>;
