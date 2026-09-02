"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { savePersonalColorTone } from "@/app/account/personal-color/actions";
import { Sparkles, Check, RefreshCw, Palette, ArrowRight, Sun, Droplets, Gem, Shirt } from "lucide-react";

interface Question {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  options: {
    label: string;
    description: string;
    tone: "warm" | "cool" | "neutral";
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "สีของเส้นเลือดบริเวณข้อมือ",
    subtitle: "สังเกตสีของเส้นเลือดใต้แสงธรรมชาติ (แสงแดดริมหน้าต่าง)",
    icon: <Droplets className="w-5 h-5 text-olive" />,
    options: [
      {
        label: "สีเขียว หรือเขียวมะกอก",
        description: "เห็นเส้นเลือดเป็นโทนเขียวชัดเจน หรือเขียวขี้ม้า",
        tone: "warm",
      },
      {
        label: "สีน้ำเงิน หรือม่วง",
        description: "เห็นเส้นเลือดเป็นสีน้ำเงิน ชัดเจน หรือม่วงเข้ม",
        tone: "cool",
      },
      {
        label: "ผสมกัน หรือแยกสียาก",
        description: "มีทั้งเขียวและน้ำเงินปนกัน หรือก้ำกึ่งระหว่างสองโทน",
        tone: "neutral",
      },
    ],
  },
  {
    id: 2,
    title: "เครื่องประดับโลหะที่ใส่แล้วขับผิว",
    subtitle: "เมื่อสวมใส่แล้ว ช่วยให้ใบหน้าดูสว่างสดใส ไม่หมอง",
    icon: <Gem className="w-5 h-5 text-olive" />,
    options: [
      {
        label: "สีทอง หรือโรสโกลด์ (Gold / Rose Gold)",
        description: "ใส่ทองแล้วผิวดูเปล่งปลั่ง มีออร่า เข้ากับผิวมากกว่าเงิน",
        tone: "warm",
      },
      {
        label: "สีเงิน หรือแพลทินัม (Silver / White Gold)",
        description: "ใส่เงินแล้วผิวดูสว่าง กระจ่างใส ไม่ดูหมองคล้ำ",
        tone: "cool",
      },
      {
        label: "ใส่ได้ทั้งสองแบบ ดูดีพอๆ กัน",
        description: "ใส่ได้ทั้งทองและเงิน ผิวดูดีทั้งสองเฉด",
        tone: "neutral",
      },
    ],
  },
  {
    id: 3,
    title: "ปฏิกิริยาของผิวเมื่ออยู่กลางแดดจัด",
    subtitle: "หลังจากไปทำกิจกรรมกลางแจ้งหรือโดนแดดแรงๆ 1-2 ชั่วโมง",
    icon: <Sun className="w-5 h-5 text-olive" />,
    options: [
      {
        label: "ผิวคล้ำขึ้น หรือเปลี่ยนเป็นสีแทนง่าย",
        description: "ผิวเปลี่ยนเป็นสีแทนเร็ว ไม่ค่อยแสบแดง หรือไหม้แดดยาก",
        tone: "warm",
      },
      {
        label: "ผิวไหม้ แดง แสบง่ายมาก",
        description: "ผิวแดงแสบอย่างรวดเร็วหลังโดนแดด และไม่ค่อยเปลี่ยนเป็นสีแทน",
        tone: "cool",
      },
      {
        label: "แดงเล็กน้อยแล้วค่อยๆ กลายเป็นสีแทน",
        description: "มีอาการแดงเล็กน้อยในวันแรก แล้วค่อยๆ เปลี่ยนเป็นสีแทนตามปกติ",
        tone: "neutral",
      },
    ],
  },
  {
    id: 4,
    title: "เสื้อผ้าสีขาวที่ใส่แล้วหน้าดูสว่าง",
    subtitle: "เมื่อนำเสื้อสีขาวมาเทียบใกล้ใบหน้า ตัวไหนช่วยขับผิวให้ดูสดใสกว่า",
    icon: <Shirt className="w-5 h-5 text-olive" />,
    options: [
      {
        label: "ขาวครีม หรือขาวงาช้าง (Ivory / Warm Cream)",
        description: "ใส่ขาวครีมแล้วหน้าดูนวลละมุน แต่ใส่ขาวจั๊วะแล้วหน้าดูซีดจืด",
        tone: "warm",
      },
      {
        label: "ขาวบริสุทธิ์ หรือขาวโอโม่ (Pure Crisp White)",
        description: "ใส่ขาวโอโม่แล้วหน้าดูผ่องสว่างตา แต่ใส่ขาวครีมแล้วหน้าดูเหลืองหมอง",
        tone: "cool",
      },
      {
        label: "ใส่ได้สวยทั้งสองแบบ",
        description: "สามารถใส่ได้ทั้งขาวบริสุทธิ์และขาวงาช้างโดยที่หน้าไม่หมอง",
        tone: "neutral",
      },
    ],
  },
];

interface ToneInfo {
  title: string;
  tagline: string;
  description: string;
  bestColors: { name: string; hex: string }[];
  avoidColors: { name: string; hex: string }[];
  styleTips: string[];
}

const TONE_DETAILS: Record<"warm" | "cool" | "neutral", ToneInfo> = {
  warm: {
    title: "Warm Tone (ผิวโทนอุ่น)",
    tagline: "โทนสีธรรมชาติที่มีอันเดอร์โทนเหลืองหรือทอง",
    description: "ผิวของคุณเปล่งประกายที่สุดเมื่ออยู่คู่กับเฉดสีธรรมชาติ (Earth Tones) และสีที่มีเบสสีเหลือง ส้ม หรือทอง",
    bestColors: [
      { name: "ขาวงาช้าง (Ivory)", hex: "#FFFDF0" },
      { name: "เบจธรรมชาติ (Beige)", hex: "#D6C7AE" },
      { name: "เขียวโอลีฟ (Olive)", hex: "#556445" },
      { name: "ส้มอิฐ (Terracotta)", hex: "#C75D38" },
      { name: "น้ำตาลคาราเมล (Camel)", hex: "#B88450" },
      { name: "เหลืองมัสตาร์ด (Mustard)", hex: "#D4A338" },
      { name: "ชมพูคอรัล (Coral)", hex: "#E87C6C" },
      { name: "น้ำตาลช็อกโกแลต (Warm Brown)", hex: "#523B2F" },
    ],
    avoidColors: [
      { name: "ขาวโอโม่จืดชืด (Stark White)", hex: "#ECECEC" },
      { name: "เทาเงินเย็น (Ice Grey)", hex: "#A8B2BD" },
      { name: "ม่วงพาสเทลเย็น (Cold Lavender)", hex: "#9B8FA8" },
    ],
    styleTips: [
      "เลือกเสื้อผ้าท่อนบนที่มีโทนอุ่นใกล้ใบหน้าเพื่อช่วยให้หน้าดูสดใส",
      "เครื่องประดับสีทองหรือโรสโกลด์จะช่วยขับความเงางามของผิวได้ดีที่สุด",
      "หากจำเป็นต้องใส่สีดำหรือสีขาวสว่าง ให้ใช้ผ้าพันคอหรือแจ็กเก็ตสีเบจ/โอลีฟช่วยเบรกโทน",
    ],
  },
  cool: {
    title: "Cool Tone (ผิวโทนเย็น)",
    tagline: "โทนสีสดใสที่มีอันเดอร์โทนฟ้าหรือชมพู",
    description: "ผิวของคุณเปล่งประกายที่สุดเมื่ออยู่คู่กับเฉดสีสดใสคมชัด (Jewel Tones) และสีที่มีเบสน้ำเงิน ฟ้า หรือชมพูเย็น",
    bestColors: [
      { name: "ขาวบริสุทธิ์ (Pure White)", hex: "#FFFFFF" },
      { name: "สีกรมท่า (Navy Blue)", hex: "#1B2A4A" },
      { name: "ฟ้าพาสเทล (Baby Blue)", hex: "#A0C4E2" },
      { name: "ม่วงลาเวนเดอร์ (Lavender)", hex: "#9B8FA8" },
      { name: "เขียวมรกต (Emerald)", hex: "#226B54" },
      { name: "แดงเบอร์กันดี (Burgundy)", hex: "#6E1E2F" },
      { name: "เทาชาโคล (Charcoal)", hex: "#3B3F46" },
      { name: "ดำคลาสสิก (True Black)", hex: "#1A1A1A" },
    ],
    avoidColors: [
      { name: "ส้มอมเหลือง (Bright Orange)", hex: "#E87320" },
      { name: "เหลืองมัสตาร์ดหม่น (Muted Mustard)", hex: "#B88D2B" },
      { name: "เขียวตองอ่อน (Warm Yellow-Green)", hex: "#9BA338" },
    ],
    styleTips: [
      "เสื้อเชิ้ตขาวบริสุทธิ์และสีกรมท่าคือคู่สี Signature ที่ใส่แล้วดูคมและภูมิฐานที่สุด",
      "เครื่องประดับสีเงิน แพลทินัม หรือไวท์โกลด์จะส่งเสริมผิวหน้าให้ดูสว่าง",
      "เลี่ยงสีส้มอิฐหรือสีเหลืองใกล้ใบหน้าเพราะอาจทำให้ผิวดูซีดหรือหมองลง",
    ],
  },
  neutral: {
    title: "Neutral Tone (ผิวโทนกลาง)",
    tagline: "อันเดอร์โทนสมดุลที่สามารถปรับใช้ได้ทั้งสองโทน",
    description: "คุณโชคดีมากที่มีผิวโทนสมดุล สามารถใส่เสื้อผ้าได้ทั้งเฉดสีอบอุ่นและเฉดสีเย็น เน้นเลือกโทนธรรมชาติที่ไม่สุดโต่งจนเกินไป",
    bestColors: [
      { name: "ขาวนวล (Soft Ivory)", hex: "#F8F6EB" },
      { name: "เทาอมน้ำตาล (Taupe)", hex: "#9E9084" },
      { name: "สีกรมท่าอ่อน (Soft Navy)", hex: "#283C5C" },
      { name: "ชมพูกุหลาบหม่น (Dusty Rose)", hex: "#C48A8F" },
      { name: "เขียวเสจ (Sage Green)", hex: "#7E907B" },
      { name: "ฟ้าเดนิม (Denim Blue)", hex: "#4E6D8C" },
      { name: "ครีมคาราเมล (Caramel)", hex: "#C29B6C" },
      { name: "เทาเข้ม (Deep Slate)", hex: "#3E444C" },
    ],
    avoidColors: [
      { name: "สีสะท้อนแสงจัด (Neon)", hex: "#CCFF00" },
      { name: "ส้มแสดจัด (Electric Orange)", hex: "#FF5500" },
    ],
    styleTips: [
      "สามารถมิกซ์เครื่องประดับทองและเงินในลุคเดียวกันได้อย่างลงตัว",
      "เลือกสี Muted Tones (สีที่มีความละมุน ไม่ฉูดฉาดจัด) จะช่วยเสริมเสน่ห์ที่เป็นธรรมชาติ",
      "ทดลองผสมผสานทั้งชิ้นสีอุ่นและชิ้นสีเย็นในชุดเดียวได้ตามใจชอบ",
    ],
  },
};

export function PersonalColorQuiz({
  initialTone,
}: {
  initialTone?: "warm" | "cool" | "neutral" | null;
}) {
  const [currentStep, setCurrentStep] = useState<number>(initialTone ? -1 : 0);
  const [answers, setAnswers] = useState<("warm" | "cool" | "neutral")[]>([]);
  const [resultTone, setResultTone] = useState<"warm" | "cool" | "neutral" | null>(initialTone ?? null);
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState(Boolean(initialTone));

  const handleSelectOption = (tone: "warm" | "cool" | "neutral") => {
    const nextAnswers = [...answers, tone];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      const counts = { warm: 0, cool: 0, neutral: 0 };
      for (const a of nextAnswers) counts[a]++;

      let finalTone: "warm" | "cool" | "neutral" = "neutral";
      if (counts.warm > counts.cool && counts.warm > counts.neutral) {
        finalTone = "warm";
      } else if (counts.cool > counts.warm && counts.cool > counts.neutral) {
        finalTone = "cool";
      } else if (counts.warm === counts.cool && counts.warm > 0) {
        finalTone = "neutral";
      } else {
        finalTone = "neutral";
      }

      setResultTone(finalTone);
      setCurrentStep(-1);

      startTransition(async () => {
        await savePersonalColorTone(finalTone);
        setIsSaved(true);
      });
    }
  };

  const handleRetake = () => {
    setAnswers([]);
    setCurrentStep(0);
    setIsSaved(false);
  };

  // Showing Quiz Questions
  if (currentStep >= 0 && currentStep < QUESTIONS.length) {
    const q = QUESTIONS[currentStep];
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    return (
      <div className="space-y-8 max-w-2xl bg-paper border border-line p-6 sm:p-10 rounded-xl shadow-xs">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-muted">
            <span>คำถามข้อที่ {currentStep + 1} จาก {QUESTIONS.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-line/60 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-olive h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-olive">
            {q.icon}
            <span>คำถามที่ {q.id}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-charcoal">{q.title}</h2>
          <p className="text-xs sm:text-sm text-muted">{q.subtitle}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectOption(opt.tone)}
              className="w-full p-4 sm:p-5 text-left border border-line hover:border-olive hover:bg-olive-pale/20 transition-all rounded-lg flex flex-col gap-1 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm sm:text-base text-charcoal group-hover:text-olive transition-colors">
                  {opt.label}
                </span>
                <span className="text-xs font-mono text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  เลือก ➔
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Showing Result View
  if (resultTone) {
    const details = TONE_DETAILS[resultTone];

    return (
      <div className="space-y-8 max-w-3xl">
        {/* Result Header Banner */}
        <div className="p-6 sm:p-8 bg-paper border border-line rounded-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-line pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-olive uppercase">
              <Sparkles className="w-4 h-4" />
              <span>ผลการวิเคราะห์ Personal Color</span>
            </div>
            {isSaved && (
              <span className="inline-flex items-center gap-1 text-xs text-olive font-medium bg-olive-pale/40 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" /> บันทึกลงโปรไฟล์แล้ว
              </span>
            )}
          </div>

          <div>
            <span className="text-xs font-mono text-muted uppercase block">{details.tagline}</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">{details.title}</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">{details.description}</p>
          </div>

          <div className="p-4 bg-olive-pale/20 border border-olive/20 rounded-lg text-xs text-charcoal flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-olive shrink-0 mt-0.5" />
            <span>
              <strong>ระบบเชื่อมโยงกับ AI Stylist แล้ว:</strong> เมื่อคุณสั่งจัดชุดจากตู้เสื้อผ้า AI จะจัดสรรคู่สีเสื้อผ้าในตู้ที่ขับเน้นโทนผิวของคุณให้สว่างสดใสขึ้นโดยอัตโนมัติ
            </span>
          </div>
        </div>

        {/* Color Palette Swatches */}
        <div className="p-6 sm:p-8 bg-paper border border-line rounded-xl space-y-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-charcoal flex items-center gap-2">
              <Palette className="w-5 h-5 text-olive" />
              <span>พาเลทสีที่ช่วยขับผิวของคุณ (Best Colors)</span>
            </h3>
            <p className="text-xs text-muted mt-1">โทนสีเหล่านี้เหมาะกับการสวมใส่เป็นเสื้อท่อนบน ผ้าพันคอ หรือชิ้นที่อยู่ใกล้ใบหน้า</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {details.bestColors.map((color, idx) => (
              <div key={idx} className="border border-line bg-background p-3 rounded-lg space-y-2 flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full border border-line/80 shadow-2xs"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <span className="text-xs font-medium text-charcoal block line-clamp-1">{color.name}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-line space-y-3">
            <h4 className="text-xs font-mono uppercase text-muted tracking-wider">โทนสีที่ควรเลี่ยงใกล้ใบหน้า:</h4>
            <div className="flex flex-wrap gap-3">
              {details.avoidColors.map((color, idx) => (
                <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 border border-line/60 bg-background rounded text-xs text-muted">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-line"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <span>{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Styling Tips */}
        <div className="p-6 sm:p-8 bg-paper border border-line rounded-xl space-y-4">
          <h3 className="font-serif text-xl text-charcoal">เคล็ดลับการแต่งตัวเฉพาะโทนผิวของคุณ</h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-muted">
            {details.styleTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={handleRetake}
            className="px-5 py-3 border border-line hover:border-charcoal bg-paper text-charcoal text-xs font-medium rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
          </button>

          <Link
            href="/ai-stylist?mode=wardrobe"
            className="px-6 py-3 bg-charcoal text-background hover:bg-olive font-medium text-xs rounded-none flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>ลองจัดชุดจากตู้เสื้อผ้าด้วย Personal Color</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
