import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSiteUrl, isSupabaseConfigured, isSupabaseAdminConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { registerSchema } from "@/lib/validation";
import { requireSameOrigin } from "@/lib/request-security";

export async function POST(request: Request) {
  if (!(await requireSameOrigin(request))) return NextResponse.json({ error: "Origin ไม่ถูกต้อง" }, { status: 403 });
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "ระบบบัญชียังไม่ได้ตั้งค่า Supabase" }, { status: 503 });
  }

  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }

  const { email, password, displayName, role } = parsed.data;
  const supabase = await createClient();
  const redirectPath = role === "merchant" ? "/merchant/onboarding" : "/account";

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(redirectPath)}`,
      data: { requested_role: role, display_name: displayName },
    },
  });

  // If Supabase free tier rate limits email sending, gracefully fallback to admin auto-confirm
  if (error && (error.message.toLowerCase().includes("rate limit") || (error as { code?: string })?.code === "over_email_send_rate_limit")) {
    if (isSupabaseAdminConfigured()) {
      try {
        const admin = getAdminClient();
        const adminCreate = await admin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { requested_role: role, display_name: displayName },
        });

        if (!adminCreate.error && adminCreate.data?.user) {
          // Sign in user directly
          const signInRes = await supabase.auth.signInWithPassword({ email, password });
          if (!signInRes.error) {
            const response = NextResponse.json({ redirectTo: redirectPath });
            const cookieStore = await cookies();
            for (const c of cookieStore.getAll()) {
              response.cookies.set(c.name, c.value, c);
            }
            return response;
          }
          return NextResponse.json({ redirectTo: redirectPath });
        }
      } catch (adminErr) {
        console.error("Admin auto-create fallback failed:", adminErr);
      }
    }
  }

  if (error) {
    if (error.message.toLowerCase().includes("already") || error.message.toLowerCase().includes("registered")) {
      return NextResponse.json({ error: "อีเมลนี้มีบัญชีอยู่แล้ว กรุณาเข้าสู่ระบบ" }, { status: 400 });
    }
    return NextResponse.json(
      { error: error.message || "สร้างบัญชีไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" },
      { status: 400 },
    );
  }

  if (!data?.session) {
    return NextResponse.json({
      message: "สร้างบัญชีแล้ว กรุณาเปิดอีเมลเพื่อยืนยันก่อนเข้าสู่ระบบ",
    });
  }

  const response = NextResponse.json({ redirectTo: redirectPath });
  const cookieStore = await cookies();
  for (const c of cookieStore.getAll()) {
    response.cookies.set(c.name, c.value, c);
  }
  return response;
}
