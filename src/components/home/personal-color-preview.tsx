"use client";

import { useState } from "react";
import Link from "next/link";
import { Palette, ArrowRight, Sparkles, Check } from "lucide-react";

interface ColorSwatch {
  name: string;
  hex: string;
}

const PALETTES: Record<"warm" | "cool", { title: string; subtitle: string; best: ColorSwatch[]; avoid: ColorSwatch[]; tip: string }> = {
  warm: {
    title: "Warm Undertone (ผิวโทนอุ่น)",
    subtitle: "เส้นเลือดข้อมือออกสีเขียว ใส่เครื่องประดับสีทองแล้วผิวดูผ่องสดใส",
    best: [
      { name: "ขาวงาช้าง", hex: "#FFFDF0" },
      { name: "เบจธรรมชาติ", hex: "#D6C7AE" },
      { name: "เขียวโอลีฟ", hex: "#556445" },
      { name: "ส้มอิฐ", hex: "#C75D38" },
      { name: "น้ำตาลคาราเมล", hex: "#B88450" },
      { name: "เหลืองมัสตาร์ด", hex: "#D4A338" },
      { name: "ชมพูคอรัล", hex: "#E87C6C" },
      { name: "ช็อกโกแลต", hex: "#523B2F" },
    ],
    avoid: [
      { name: "ขาวโอโม่จืดชืด", hex: "#ECECEC" },
      { name: "เทาเงินเย็น", hex: "#A8B2BD" },
    ],
    tip: "เน้นใส่เสื้อท่อนบนโทนอุ่นใกล้ใบหน้าเพื่อช่วยให้ผิวดูเปล่งปลั่งและมีเลือดฝาด",
  },
  cool: {
    title: "Cool Undertone (ผิวโทนเย็น)",
    subtitle: "เส้นเลือดข้อมือออกสีน้ำเงิน/ม่วง ใส่เครื่องประดับสีเงินแล้วผิวดูสว่างออร่า",
    best: [
      { name: "ขาวบริสุทธิ์", hex: "#FFFFFF" },
      { name: "สีกรมท่า", hex: "#1B2A4A" },
      { name: "ฟ้าพาสเทล", hex: "#A0C4E2" },
      { name: "ม่วงลาเวนเดอร์", hex: "#9B8FA8" },
      { name: "เขียวมรกต", hex: "#226B54" },
      { name: "แดงเบอร์กันดี", hex: "#6E1E2F" },
      { name: "เทาเข้ม", hex: "#3B3F46" },
      { name: "ดำคลาสสิก", hex: "#1A1A1A" },
    ],
    avoid: [
      { name: "ส้มอมเหลือง", hex: "#E87320" },
      { name: "เหลืองมัสตาร์ดหม่น", hex: "#B88D2B" },
    ],
    tip: "เสื้อเชิ้ตขาวจั๊วะและสีกรมท่าคือคู่สี Signature ที่ช่วยขับผิวหน้าให้ดูสว่างตาที่สุด",
  },
};

export function PersonalColorPreview() {
  const [selectedTone, setSelectedTone] = useState<"warm" | "cool">("warm");
  const current = PALETTES[selectedTone];

  return (
    <section className="py-20 border-b border-line bg-paper/60" aria-labelledby="personal-color-title">
      <div className="container">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-olive uppercase tracking-wider">
            <Palette className="w-4 h-4" />
            <span>PERSONAL COLOR DISCOVERY / โทนสีประจำตัว</span>
          </div>
          <h2 id="personal-color-title" className="font-serif text-3xl sm:text-4xl text-charcoal">
            สีที่ใส่ใกล้ใบหน้า คือตัวกำหนดความสดใส
          </h2>
          <p className="text-sm text-muted leading-relaxed">
            AI ของเราไม่ได้เลือกสีตามกระแสแฟชั่น แต่คำนวณจากอันเดอร์โทนผิวของคุณจริง เพื่อให้ทุกชุดช่วยขับผิวหน้าให้สว่าง ไม่หมองคล้ำ
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls & Explanation */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex gap-3 p-1.5 bg-paper border border-line rounded-lg">
                <button
                  type="button"
                  onClick={() => setSelectedTone("warm")}
                  className={`flex-1 py-3 px-4 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedTone === "warm"
                      ? "bg-background text-charcoal shadow-xs font-semibold border border-line"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C75D38]" />
                  <span>Warm Tone (ผิวโทนอุ่น)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTone("cool")}
                  className={`flex-1 py-3 px-4 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedTone === "cool"
                      ? "bg-background text-charcoal shadow-xs font-semibold border border-line"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1B2A4A]" />
                  <span>Cool Tone (ผิวโทนเย็น)</span>
                </button>
              </div>

              <div className="p-6 bg-background border border-line rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-olive uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ลักษณะของผิวกลุ่มนี้</span>
                </div>
                <h3 className="font-serif text-2xl text-charcoal">{current.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{current.subtitle}</p>
                <div className="pt-3 border-t border-line/60 text-xs text-charcoal/90 flex items-start gap-2">
                  <Check className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                  <span>{current.tip}</span>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/account/personal-color"
                className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 bg-charcoal text-background hover:bg-olive font-medium text-xs rounded-none transition-colors shadow-xs group cursor-pointer"
              >
                <span>ทำแบบทดสอบ Personal Color 4 ข้อของคุณ</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[11px] font-mono text-muted text-center block mt-2">
                ใช้เวลาเพียง 1 นาที • บันทึกเข้าโปรไฟล์ AI อัตโนมัติ
              </span>
            </div>
          </div>

          {/* Palette Swatches */}
          <div className="lg:col-span-7 bg-background border border-line p-6 sm:p-8 rounded-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-mono text-muted uppercase">8 เฉดสีที่ช่วยขับผิว (Best Colors)</span>
                <span className="text-[10px] font-mono text-olive bg-olive-pale/30 px-2 py-0.5 rounded">
                  AI RECOMMENDATION
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {current.best.map((color, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-line bg-paper/50 rounded-lg flex flex-col items-center text-center gap-2 group hover:border-olive transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-line/80 shadow-2xs group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-medium text-charcoal truncate w-full">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-line/60 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-muted">
                <span className="font-mono text-[11px] uppercase">สีที่ควรเลี่ยงใกล้ใบหน้า:</span>
                <div className="flex gap-2">
                  {current.avoid.map((c, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2 py-1 bg-paper border border-line rounded text-[11px]">
                      <span className="w-2.5 h-2.5 rounded-full border border-line" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-olive font-mono">✦ จัดชุดจากเสื้อผ้าในตู้จริง</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
