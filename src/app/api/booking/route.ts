import { createSupabaseServerClient } from "@/lib/supabase";

export const runtime = "nodejs";

function value(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = value(body.name);
    const phone = value(body.phone);
    const preferredDate = value(body.preferredDate);
    const reason = value(body.reason);

    if (name.length < 2 || name.length > 120) return Response.json({ error: "Please enter your full name." }, { status: 400 });
    if (phone.length < 7 || phone.length > 32) return Response.json({ error: "Please enter a valid phone number." }, { status: 400 });
    if (!preferredDate || Number.isNaN(Date.parse(preferredDate))) return Response.json({ error: "Please choose a preferred date and time." }, { status: 400 });
    if (reason.length < 2 || reason.length > 1000) return Response.json({ error: "Please tell us the reason for your visit." }, { status: 400 });

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("bookings").insert({ name, phone, preferred_date: preferredDate, reason });
    if (error) throw error;

    return Response.json({ confirmation: "Your request is in. Bright Smile Dental will review availability and confirm your appointment." }, { status: 201 });
  } catch (error) {
    console.error("Booking request failed", error);
    return Response.json({ error: "We could not save your request. Please try again or contact the clinic directly." }, { status: 500 });
  }
}
