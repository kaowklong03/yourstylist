"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Sparkles,
  Layers,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Flame,
  PlusCircle,
  Tag,
  Clock,
  Filter,
} from "lucide-react";

interface DemandItem {
  id: string;
  rank: number;
  title: string;
  category: "outerwear" | "top" | "bottom" | "shoes" | "vest";
  categoryLabel: string;
  demandCount: number;
  growthRate: string;
  isHot: boolean;
  priceRange: string;
  matchingClosetStaples: string[];
  stylingContext: string;
  recommendedMaterial: string;
  prefillSlug: string;
}

const DEMAND_DATA: DemandItem[] = [
  {
    id: "demand-1",
    rank: 1,
    title: "เบลเซอร์ผ้าลินินสีเบจทรงหลวม (Relaxed Linen Blazer in Earth Tone)",
    category: "outerwear",
    categoryLabel: "เสื้อคลุม & เบลเซอร์",
    demandCount: 1240,
    growthRate: "+48% สัปดาห์นี้",
    isHot: true,
    priceRange: "690 - 1,290 ฿",
    matchingClosetStaples: [
      "กางเกงสแล็คสีดำขากระบอก",
      "กางเกงยีนส์สีเดนิมฟอก",
      "เสื้อยืดคอตตอนสีขาว",
    ],
    stylingContext: "ลูกค้าต้องการนำไปสวมทับลุคชิลล์เพื่อเข้าประชุม หรือใส่ไปทำงานห้องแอร์",
    recommendedMaterial: "ผ้าลินินผสมเรยอน (ระบายอากาศดี ทิ้งตัวสวย ไม่ร้อน)",
    prefillSlug: "linen-blazer",
  },
  {
    id: "demand-2",
    rank: 2,
    title: "กางเกงสแล็คทรงขากระบอกตรงสีดำ (Tailored Straight Trousers in Charcoal)",
    category: "bottom",
    categoryLabel: "กางเกง & ท่อนล่าง",
    demandCount: 890,
    growthRate: "+24% สัปดาห์นี้",
    isHot: false,
    priceRange: "490 - 890 ฿",
    matchingClosetStaples: [
      "เสื้อเชิ้ตขาวโอเวอร์ไซซ์",
      "เสื้อโปโลไหมพรมสีครีม",
      "เบลเซอร์สีเทา",
    ],
    stylingContext: "ไอเทมเบสิกที่ใส่ได้ทั้งทำงานและไปคาเฟ่ ยอดนิยมอันดับ 1 ของกลุ่ม First Jobber",
    recommendedMaterial: "ผ้าโพลีเอสเตอร์ผสมสแปนเด็กซ์ (ยับยาก ขอบเอวยืดหยุ่น)",
    prefillSlug: "black-trousers",
  },
  {
    id: "demand-3",
    rank: 3,
    title: "เสื้อเชิ้ตคอจีนแขนยาวผ้าออกฟอร์ดสีฟ้าพาสเทล (Pastel Blue Mandarin Shirt)",
    category: "top",
    categoryLabel: "เสื้อท่อนบน",
    demandCount: 650,
    growthRate: "+18% สัปดาห์นี้",
    isHot: false,
    priceRange: "450 - 750 ฿",
    matchingClosetStaples: [
      "กางเกงชิโนสีเบจ",
      "กางเกงสแล็คสีกรมท่า",
      "รองเท้าโลฟเฟอร์",
    ],
    stylingContext: "สร้างลุคมินิมอลสะอาดตา ใส่ทำงานแบบ Casual Friday หรือนัดทานข้าววันหยุด",
    recommendedMaterial: "ผ้าคอตตอนออกฟอร์ดเนื้อบางเบา (นุ่มสบาย ไม่อบเหงื่อ)",
    prefillSlug: "blue-shirt",
  },
  {
    id: "demand-4",
    rank: 4,
    title: "เสื้อกั๊กไหมพรมคอวีมินิมอลสีครีม (V-Neck Minimalist Knit Vest)",
    category: "vest",
    categoryLabel: "เสื้อท่อนบน & กั๊ก",
    demandCount: 580,
    growthRate: "+65% พุ่งแรง 🔥",
    isHot: true,
    priceRange: "390 - 650 ฿",
    matchingClosetStaples: [
      "เสื้อเชิ้ตขาวแขนยาว",
      "กระโปรงพลีทสีดำ",
      "กางเกงยีนส์เอวสูง",
    ],
    stylingContext: "เทรนด์แฟชั่นเกาหลี/ญี่ปุ่นกำลังมาแรง คนต้องการเอาไปเลเยอร์ทับเชิ้ตเดิมในตู้",
    recommendedMaterial: "ไหมพรมคอตตอนถักเส้นเล็ก (เนื้อนุ่ม ไม่คัน ไม่หนาเกินไป)",
    prefillSlug: "knit-vest",
  },
  {
    id: "demand-5",
    rank: 5,
    title: "รองเท้าโลฟเฟอร์หนังกลับสีเบจ/น้ำตาลแทน (Suede Penny Loafers)",
    category: "shoes",
    categoryLabel: "รองเท้า",
    demandCount: 420,
    growthRate: "+15% สัปดาห์นี้",
    isHot: false,
    priceRange: "990 - 1,590 ฿",
    matchingClosetStaples: [
      "กางเกงสแล็คเต่อ",
      "กางเกงขาสั้นลินินทรงสุภาพ",
      "ชุดสูทสีเบจ",
    ],
    stylingContext: "คอมพลีตลุคสุภาพแต่ไม่เป็นทางการเกินไป สวมใส่ง่าย เข้าได้กับทั้งงานและเที่ยว",
    recommendedMaterial: "หนังไมโครไฟเบอร์สัมผัสนุ่ม หรือหนังกลับกันละอองน้ำ",
    prefillSlug: "suede-loafers",
  },
];

export default function MerchantRadarPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems = DEMAND_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-3 border-b border-line pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-olive/10 text-olive-dark rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-olive" />
              <span>Merchant Intelligence · ช่องทางที่ 1: แดชบอร์ดวิเคราะห์ตลาด</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
              เรดาร์ความต้องการตลาด (Demand Radar)
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-paper border border-line rounded-lg text-xs text-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PDPA Compliant: ข้อมูลสถิติเชิงรวมแบบไม่ระบุตัวตน</span>
          </div>
        </div>
        <p className="text-sm text-muted max-w-3xl leading-relaxed">
          สรุปความต้องการเสื้อผ้าจริงจากตู้เสื้อผ้าของผู้บริโภคในระบบ
          บอกชัดเจนว่าลูกค้ากำลังขาดไอเทมชิ้นไหนเพื่อไปแมตช์กับเสื้อผ้าที่บ้าน
          ช่วยให้ร้านค้าของคุณผลิตหรือนำสินค้ามาลงขายได้ตรงเป้า ยอดขายแน่นอน ไม่เสี่ยงสต็อกจม
        </p>
      </div>

      {/* Hero Stats Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-paper border border-line p-4 rounded-xl space-y-1">
          <span className="text-xs text-muted font-medium flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-olive" />
            <span>ความต้องการทั้งหมดสัปดาห์นี้</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-charcoal">
              4,820
            </span>
            <span className="text-xs font-semibold text-emerald-600">+32%</span>
          </div>
          <span className="text-[11px] text-muted block">จากการสแกนและจัดชุดของลูกค้า</span>
        </div>

        <div className="bg-paper border border-line p-4 rounded-xl space-y-1">
          <span className="text-xs text-muted font-medium flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>หมวดที่คนตามหามากที่สุด</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal">
              เบลเซอร์
            </span>
            <span className="text-xs font-semibold text-rose-500">41%</span>
          </div>
          <span className="text-[11px] text-muted block">เน้นผ้าลินินสีเอิร์ธโทน</span>
        </div>

        <div className="bg-paper border border-line p-4 rounded-xl space-y-1">
          <span className="text-xs text-muted font-medium flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-olive" />
            <span>อัตรา Conversion เฉลี่ย</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-olive-dark">
              4.5x
            </span>
            <span className="text-xs text-muted">สูงกว่าแอดทั่วไป</span>
          </div>
          <span className="text-[11px] text-muted block">เพราะแนะนำในจังหวะที่คนขาดจริง</span>
        </div>

        <div className="bg-paper border border-line p-4 rounded-xl space-y-1">
          <span className="text-xs text-muted font-medium flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-olive" />
            <span>ตู้เสื้อผ้าที่กำลังรอจับคู่</span>
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-charcoal">
              3,250
            </span>
            <span className="text-xs text-muted">ตู้เสื้อผ้า</span>
          </div>
          <span className="text-[11px] text-muted block">พร้อมแสดงสินค้าของคุณทันที</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-charcoal">
            <Filter className="w-3.5 h-3.5 text-olive" />
            <span>หมวดหมู่สินค้า:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "ทั้งหมด (5)" },
              { id: "outerwear", label: "เสื้อคลุม & เบลเซอร์" },
              { id: "top", label: "เสื้อท่อนบน" },
              { id: "bottom", label: "กางเกง & ท่อนล่าง" },
              { id: "vest", label: "เสื้อกั๊กไหมพรม" },
              { id: "shoes", label: "รองเท้า" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-charcoal text-background shadow-sm"
                    : "bg-paper text-muted hover:text-charcoal hover:bg-background border border-line"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demand Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-paper border border-line rounded-2xl p-5 sm:p-6 transition-all hover:border-olive/50 shadow-sm space-y-5"
            >
              {/* Row 1: Header & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-charcoal text-background text-xs font-bold font-mono flex items-center justify-center shrink-0">
                      #{item.rank}
                    </span>
                    <span className="px-2.5 py-0.5 bg-olive/10 text-olive-dark text-[11px] font-bold rounded">
                      {item.categoryLabel}
                    </span>
                    {item.isHot && (
                      <span className="px-2 py-0.5 bg-rose-500/10 text-rose-600 text-[11px] font-bold rounded flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>เทรนด์พุ่งแรง</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    💡 <strong>บริบทการแต่งตัว:</strong> {item.stylingContext}
                  </p>
                </div>

                {/* Right Metrics Box */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-line/60 pt-3 sm:pt-0 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-muted block">มีคนกำลังขาดในตู้</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black font-mono text-charcoal">
                        {item.demandCount.toLocaleString()}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        {item.growthRate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-[11px] text-muted">ราคาที่ลูกค้ารับได้: </span>
                    <span className="text-xs font-bold text-charcoal">{item.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Deep Dive Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background border border-line rounded-xl p-4 text-xs">
                {/* Closet Staples Already Waiting */}
                <div className="space-y-2">
                  <span className="font-semibold text-charcoal flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-olive" />
                    <span>เสื้อผ้าเดิมในตู้ที่ลูกค้ารอใส่คู่ด้วย:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.matchingClosetStaples.map((staple, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-paper border border-line rounded text-[11px] text-charcoal font-medium"
                      >
                        ✓ {staple}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Material & Cutting Recommendation */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-charcoal flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-olive" />
                    <span>เนื้อผ้าและคัตติ้งที่แนะนำให้ผลิต/ลงขาย:</span>
                  </span>
                  <p className="text-muted leading-relaxed">
                    {item.recommendedMaterial}
                  </p>
                </div>
              </div>

              {/* Row 3: Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-muted">
                  ✨ หากร้านของคุณมีสินค้าชิ้นนี้อยู่แล้ว นำมาลงโฆษณาเพื่อจับคู่กับลูกค้ากลุ่มนี้ได้ทันที
                </span>
                <Link
                  href="/merchant/ads/new"
                  className="w-full sm:w-auto px-5 py-2.5 bg-charcoal hover:bg-olive text-background text-xs font-semibold rounded-lg transition-colors inline-flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ นำสินค้าในร้านมาลงขายรับดีลนี้</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color & Seasonal Intelligence Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-paper border border-line p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="font-serif text-lg sm:text-xl font-normal text-charcoal flex items-center gap-2">
            <Tag className="w-4 h-4 text-olive" />
            <span>สถิติโทนสีที่ตู้เสื้อผ้าขาดแคลนมากที่สุด</span>
          </h3>
          <div className="space-y-3">
            {[
              { color: "สีเบจ / ครีม / เอิร์ธโทน", pct: 38, width: "38%", desc: "คนมีเสื้อผ้าดำ/ขาวเยอะ ขาดสีโทนอุ่นมาตัดลุค" },
              { color: "สีดำคลาสสิก / ชาร์โคล", pct: 26, width: "26%", desc: "เน้นท่อนล่างและเบลเซอร์ทางการ" },
              { color: "สีฟ้าพาสเทล / เดนิมฟอก", pct: 18, width: "18%", desc: "เชิ้ตและเสื้อยืดลำลองวันหยุด" },
              { color: "สีเขียวมะกอก / โอลีฟดาร์ก", pct: 12, width: "12%", desc: "สายมินิมอลคาเฟ่กำลังมาแรง" },
            ].map((c, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-charcoal">{c.color}</span>
                  <span className="font-mono font-bold text-olive">{c.pct}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2 border border-line overflow-hidden">
                  <div
                    className="bg-olive h-full rounded-full transition-all duration-500"
                    style={{ width: c.width }}
                  />
                </div>
                <p className="text-[11px] text-muted">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Strategy Guide for SMEs */}
        <div className="bg-olive-pale/25 border border-olive/30 p-6 rounded-2xl space-y-4">
          <h3 className="font-serif text-lg sm:text-xl font-normal text-olive-dark flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-olive" />
            <span>คำแนะนำการวางแผนสต็อกสำหรับร้านค้า (Zero Deadstock)</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-charcoal/90 leading-relaxed list-disc list-inside">
            <li>
              <strong>สั่งตัดล็อตเล็กเฉพาะไอเทม Top 3:</strong> ความต้องการมีรองรับแน่นอน 1,000+ ชิ้น ไม่ต้องกลัวของเหลือค้างสต็อก
            </li>
            <li>
              <strong>ตั้งราคาให้อยู่ในช่วง Price Range:</strong> สินค้าที่อยู่ในช่วงราคาที่ระบบแนะนำ (เช่น 490 - 890 ฿) จะมี Conversion สูงที่สุด
            </li>
            <li>
              <strong>เน้นคัตติ้งผ้าที่ไม่ร้อน:</strong> 74% ของผู้ใช้ในไทยระบุว่าต้องการเนื้อผ้าที่ใส่ในห้องแอร์ได้และเดินข้างนอกไม่ร้อนอึดอัด
            </li>
            <li>
              <strong>อัปเดตข้อมูลทุกวันจันทร์:</strong> ตารางเรดาร์จะรีเฟรชข้อมูลทุกสัปดาห์ตามสภาพอากาศและเทรนด์ชีวิตจริงของคนทำงาน
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/merchant/ads"
              className="inline-flex items-center gap-1.5 text-xs text-olive font-semibold hover:underline"
            >
              <span>จัดการแคมเปญโฆษณาในร้านของคุณ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
