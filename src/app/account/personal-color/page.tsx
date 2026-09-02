import type { Metadata } from "next";
import { requireCustomerExperiencePage } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { PersonalColorQuiz } from "@/components/account/personal-color-quiz";
import { Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "วิเคราะห์ Personal Color | YourStylist",
};

export const dynamic = "force-dynamic";

export default async function PersonalColorPage() {
  const user = await requireCustomerExperiencePage("/login/customer");
  const supabase = await createClient();

  const { data: prefs } = await supabase
    .from("customer_preferences")
    .select("personal_color_tone")
    .eq("user_id", user.id)
    .maybeSingle();

  const savedTone = (prefs?.personal_color_tone as "warm" | "cool" | "neutral" | null) ?? null;

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="dashboard-heading">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-muted uppercase">
          <Palette className="w-4 h-4 text-olive" />
          <span>Skin Undertone & Color Palette</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
          วิเคราะห์ Personal Color
        </h1>
        <p className="text-sm text-muted mt-1">
          ค้นหาโทนสีผิวประจำตัว (Warm / Cool / Neutral) เพื่อให้ AI Stylist เลือกจับคู่สีเสื้อผ้าในตู้ที่ช่วยขับผิวหน้าของคุณให้ดูสว่างและสดใสที่สุด
        </p>
      </header>

      <PersonalColorQuiz initialTone={savedTone} />
    </div>
  );
}
