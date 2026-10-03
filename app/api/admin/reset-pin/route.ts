import { NextRequest, NextResponse } from "next/server";
import { setAdminPin, getAdminPin } from "@/lib/appointments";

// One-time PIN sync endpoint
// Usage: GET /api/admin/reset-pin?secret=raunak2024&pin=7415
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const pin = req.nextUrl.searchParams.get("pin");

  // Basic protection — only allow with secret key
  if (secret !== "raunak2024") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const currentPin = await getAdminPin();

    if (pin) {
      // Set the PIN to requested value
      if (!/^\d{4,8}$/.test(pin)) {
        return NextResponse.json({ error: "PIN must be 4-8 digits" }, { status: 400 });
      }
      await setAdminPin(pin);
      return NextResponse.json({
        success: true,
        message: `PIN updated to ${pin}`,
        previousPin: currentPin,
      });
    }

    // Just show current PIN (for debugging)
    return NextResponse.json({
      success: true,
      currentPin,
      message: "Use ?pin=XXXX to update the PIN",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Redis connection failed", detail: String(err) },
      { status: 500 }
    );
  }
}
