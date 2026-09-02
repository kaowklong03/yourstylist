import Link from "next/link";
import { requireCustomerExperiencePage } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getCustomerEntitlements } from "@/lib/entitlements";
import { LockKeyhole, Sparkles, CalendarDays } from "lucide-react";

export const metadata = { title: "Weekly Planner | Account" };

const WEEKDAYS = [
  { id: 1, label: "จันทร์" },
  { id: 2, label: "อังคาร" },
  { id: 3, label: "พุธ" },
  { id: 4, label: "พฤหัสบดี" },
  { id: 5, label: "ศุกร์" },
  { id: 6, label: "เสาร์" },
  { id: 7, label: "อาทิตย์" },
];

export default async function WeeklyPlannerPage() {
  const user = await requireCustomerExperiencePage("/login/customer");
  const entitlements = await getCustomerEntitlements(user.id, user.role);

  if (!entitlements.isProActive) {
    return (
      <div className="max-w-2xl">
        <header className="dashboard-heading mb-8">
          <h1>วางแผนลุค 7 วัน</h1>
        </header>
        <div className="content-card p-6 border rounded-xl flex items-center gap-4 bg-muted/50">
          <LockKeyhole className="w-8 h-8 text-muted-foreground" />
          <div>
            <h2 className="font-bold text-lg">ฟีเจอร์สำหรับสมาชิก Pro</h2>
            <p className="text-muted-foreground">วางแผนลุคทั้งสัปดาห์จากตู้เสื้อผ้าของคุณ พร้อมหลีกเลี่ยงการใส่ซ้ำ และคำนึงถึงกิจวัตรประจำวัน</p>
          </div>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: memories } = await supabase
    .from("weekly_style_memories")
    .select("*")
    .eq("user_id", user.id)
    .order("weekday", { ascending: true });

  const memoryMap = new Map(memories?.map(m => [m.weekday, m]));

  return (
    <div className="max-w-5xl">
      <header className="dashboard-heading mb-8">
        <h1>วางแผนลุค 7 วัน (Weekly Planner)</h1>
        <p>ให้ AI ช่วยจัดชุดล่วงหน้าสำหรับทั้งสัปดาห์ โดยอ้างอิงจากกิจวัตรและตู้เสื้อผ้าของคุณ</p>
      </header>

      {(!memories || memories.length === 0) && (
        <div className="mb-6 p-4 border border-olive/30 bg-olive-pale/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-medium text-sm text-charcoal flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-olive" />
              <span>ยังไม่ได้ตั้งค่า &quot;กิจวัตรและสไตล์ประจำวัน&quot;</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              กำหนดกิจกรรมของแต่ละวัน (เช่น วันจันทร์ไปออฟฟิศ, วันเสาร์ไปคาเฟ่) เพื่อให้ AI คัดเลือกเสื้อผ้าในตู้มาจัดชุดได้ตรงกับชีวิตจริง
            </p>
          </div>
          <Link
            href="/account/style-memory"
            className="px-4 py-2 bg-olive-dark text-background rounded-md text-xs font-medium shrink-0 self-start sm:self-center hover:bg-olive-dark/90 transition-colors"
          >
            ตั้งค่ากิจวัตร 7 วัน ↗
          </Link>
        </div>
      )}

      <div className="flex justify-end mb-6">
        <Link
          href="/ai-stylist?mode=wardrobe"
          className="inline-flex items-center gap-2 px-4 py-2 bg-olive-dark text-background rounded-md text-sm font-medium hover:bg-olive-dark/90 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>จัดชุดจากตู้เสื้อผ้าด้วย AI</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WEEKDAYS.map(day => {
          const mem = memoryMap.get(day.id);
          return (
            <div key={day.id} className="border rounded-xl bg-card overflow-hidden flex flex-col">
              <div className="p-4 border-b bg-muted/30">
                <div className="font-bold">วัน{day.label}</div>
                {mem?.is_active && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {mem.usual_activity} {mem.time_of_day ? `• ${mem.time_of_day}` : ""} {mem.location_context ? `• ${mem.location_context}` : ""}
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col items-center justify-center text-center min-h-[160px] text-muted-foreground">
                <p className="text-sm">
                  {mem?.is_active ? `กิจวัตร: ${mem.usual_activity}` : "ยังไม่ได้กำหนดกิจวัตร"}
                </p>
                <div className="flex flex-col items-center gap-2 mt-4">
                  <Link
                    href={`/ai-stylist?mode=wardrobe&weekday=${day.id}${mem?.usual_activity ? `&activity=${encodeURIComponent(mem.usual_activity)}` : ""}`}
                    className="px-3 py-1.5 bg-charcoal text-background rounded text-xs hover:bg-charcoal/90 font-medium transition-colors"
                  >
                    จัดชุดวัน{day.label}ด้วย AI
                  </Link>
                  <Link
                    href="/account/style-memory"
                    className="text-[11px] text-olive hover:underline"
                  >
                    {mem ? "แก้ไขกิจวัตรวัน" + day.label : "ตั้งค่ากิจวัตรวัน" + day.label}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12 p-6 border rounded-xl bg-olive-pale/20">
        <h2 className="font-bold mb-2">เกี่ยวกับ Weekly Planner</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>แผนนี้จะใช้เสื้อผ้าที่มีสถานะ &quot;พร้อมใช้&quot; เท่านั้น (ข้ามเสื้อผ้าที่กำลังซัก)</li>
          <li>AI จะดึงข้อมูลจาก กิจวัตร (Style Memory) ของวันที่เปิดอนุญาตเท่านั้น</li>
          <li>ไม่ใช้ข้อมูลสินค้าโฆษณามาปะปนในคำแนะนำนี้</li>
        </ul>
      </div>
    </div>
  );
}
