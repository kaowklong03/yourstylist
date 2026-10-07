import { NextResponse } from "next/server";
import { getSiteUrl, isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { requireSameOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!(await requireSameOrigin(request))) {
    return NextResponse.json({ error: "Origin ไม่ถูกต้อง" }, { status: 403 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "ระบบบัญชียังไม่ได้ตั้งค่า Supabase" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email ? String(body.email).trim().toLowerCase() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "กรุณาระบุอีเมลที่ถูกต้อง" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const siteUrl = getSiteUrl();
    const redirectUrl = `${siteUrl}/auth/callback?next=/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });

    if (error) {
      console.warn("resetPasswordForEmail error:", error.message);
      // If rate limited, tell user
      if (error.message.toLowerCase().includes("rate limit") || error.message.toLowerCase().includes("security purposes")) {
        return NextResponse.json(
          { error: "มีการขอรีเซ็ตรหัสผ่านถี่เกินไป กรุณารอประมาณ 5-10 นาทีแล้วลองใหม่อีกครั้ง" },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: "ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้ กรุณาลองใหม่อีกครั้ง" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "ระบบได้ส่งลิงก์ตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณเรียบร้อยแล้ว กรุณาเปิดอีเมลเพื่อตั้งรหัสผ่านใหม่",
    });
  } catch (err) {
    console.error("Forgot password route error:", err);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
  }
}
