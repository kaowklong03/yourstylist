import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { requireSameOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!(await requireSameOrigin(request))) {
    return NextResponse.json({ error: "Origin ไม่ถูกต้อง" }, { status: 403 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "ระบบบัญชียังไม่ได้ตั้งค่า Supabase" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const password = body?.password ? String(body.password) : "";

  if (!password || password.length < 6) {
    return NextResponse.json({ error: "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "เซสชันหมดอายุหรือไม่ถูกต้อง กรุณากดลิงก์จากอีเมลใหม่อีกครั้ง" },
        { status: 401 }
      );
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      console.error("Update password error:", updateError);
      return NextResponse.json(
        { error: updateError.message || "ไม่สามารถอัปเดตรหัสผ่านได้ กรุณาลองใหม่อีกครั้ง" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว! กำลังนำคุณเข้าสู่ระบบ...",
    });
  } catch (err) {
    console.error("Reset password route error:", err);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
  }
}
