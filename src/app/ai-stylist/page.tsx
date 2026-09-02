import type { Metadata } from "next";
import { StylistForm } from "@/components/stylist-form";
import { EditorialPageIntro } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "AI Stylist — YourStylist" };

const WEEKDAY_NAMES: Record<number, string> = {
  1: "จันทร์",
  2: "อังคาร",
  3: "พุธ",
  4: "พฤหัสบดี",
  5: "ศุกร์",
  6: "เสาร์",
  7: "อาทิตย์",
};

interface PageProps {
  searchParams: Promise<{ mode?: string; weekday?: string; activity?: string }>;
}

export default async function AiStylistPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialMode = params.mode === "wardrobe" ? "wardrobe" : "general";

  const user = await getCurrentUser();
  let routineMemory = null;
  const weekdayNum = params.weekday ? parseInt(params.weekday, 10) : undefined;

  if (user && weekdayNum && weekdayNum >= 1 && weekdayNum <= 7) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("weekly_style_memories")
      .select("*")
      .eq("user_id", user.id)
      .eq("weekday", weekdayNum)
      .maybeSingle();

    if (data) {
      routineMemory = data;
    }
  }

  const dayLabel = weekdayNum ? WEEKDAY_NAMES[weekdayNum] : undefined;

  return (
    <div className="editorial-page-shell editorial-page-ai">
      <div className="container py-12 space-y-8">
        <EditorialPageIntro
          tone="ai"
          eyebrow={routineMemory ? `WEEKLY STYLE MEMORY — วัน${dayLabel}` : "INDEPENDENT AI STYLING"}
          title={routineMemory ? `จัดชุดสำหรับวัน${dayLabel} (${routineMemory.usual_activity})` : "วันนี้จะไปไหน?"}
          body={routineMemory
            ? `ระบบดึงข้อมูลจากกิจวัตรวัน${dayLabel}ของคุณมาให้อัตโนมัติแล้ว พร้อมให้ AI เลือกจับคู่เสื้อผ้าในตู้ของคุณได้ทันที`
            : "ตอบคำถามสั้น ๆ สามขั้น แล้วรับลุค Safe, Elevated และ Comfortable จากบริบทของคุณ เลือกได้ว่าจะใช้คำแนะนำทั่วไปหรือตู้เสื้อผ้าส่วนตัว"}
        />

        <StylistForm
          configured={Boolean(process.env.OPENAI_API_KEY)}
          initialMode={initialMode}
          initialRoutine={routineMemory}
          targetWeekday={weekdayNum}
          weekdayLabel={dayLabel}
          initialActivityQuery={params.activity}
        />
      </div>
    </div>
  );
}
