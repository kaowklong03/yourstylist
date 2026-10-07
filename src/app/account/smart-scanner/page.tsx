"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Layers,
  ShoppingBag,
  TrendingUp,
  Tag,
  Loader2,
  Info,
} from "lucide-react";

interface MatchedItem {
  id: string;
  name: string;
  type: string;
  color: string;
  imageUrl?: string | null;
}

interface StyledOutfit {
  direction: string;
  name: string;
  notes: string;
  items: Array<{
    role: string;
    description: string;
    imageUrl?: string | null;
    isCandidate: boolean;
  }>;
}

interface ScanResult {
  candidateItem: {
    name: string;
    category: string;
    subcategory: string;
    color: string;
    material: string;
    style: string;
    formality: string;
    description: string;
  };
  score: number;
  verdict: {
    grade: string;
    title: string;
    badgeColor: "emerald" | "amber" | "rose";
    verdictText: string;
    explanation: string;
  };
  isUsingDefaultCapsule: boolean;
  potentialOutfitsCount: number;
  price: number | null;
  costPerOutfit: number | null;
  matchedWardrobeCount: number;
  matchedItems: MatchedItem[];
  styledOutfits: StyledOutfit[];
  proTips: string[];
}

export default function SmartScannerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [price, setPrice] = useState<string>("590");
  const [itemName, setItemName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState<string>("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleStartScan = async () => {
    if (!selectedImage) {
      setError("กรุณาถ่ายรูปหรืออัปโหลดรูปเสื้อผ้าที่ต้องการสแกนก่อนครับ");
      return;
    }

    setLoading(true);
    setError(null);
    setScanStep("กำลังสแกนรูปทรง สี และเนื้อผ้าด้วย Vision AI...");

    try {
      setTimeout(() => {
        setScanStep("กำลังนำไปเทียบกับฐานข้อมูลตู้เสื้อผ้าของคุณ...");
      }, 1500);

      setTimeout(() => {
        setScanStep("กำลังคำนวณคะแนนความคุ้มค่าและจัด 3 ลุคตัวอย่าง...");
      }, 3000);

      const res = await fetch("/api/account/smart-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          price: price ? Number(price) : null,
          itemName: itemName.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "ไม่สามารถวิเคราะห์ได้ กรุณาลองใหม่อีกครั้ง");
      }

      setResult(data);
    } catch (err: unknown) {
      console.error("Scan error:", err);
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่");
    } finally {
      setLoading(false);
      setScanStep("");
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setError(null);
    setItemName("");
    setNotes("");
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-line pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-olive/10 text-olive-dark rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-olive" />
          <span>Smart-Buy Scanner · AI กล้องสแกนก่อนซื้อ</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-charcoal">
          ตัวนี้ซื้อไป... แมตช์กับตู้ที่บ้านได้กี่ชุด?
        </h1>
        <p className="text-sm text-muted max-w-2xl leading-relaxed">
          ถ่ายรูปเสื้อผ้าที่คุณกำลังยืนดูอยู่ที่หน้าร้าน หรือแคปรูปจาก IG/Shopee
          ให้ AI เทียบกับเสื้อผ้าในตู้ที่บ้านของคุณทันทีใน 3 วินาที เพื่อเช็กความคุ้มค่าก่อนควักเงินจ่าย!
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded flex items-center gap-2">
          <XCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Container */}
      {!result ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Upload / Capture */}
          <div className="md:col-span-7 space-y-4">
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-paper/40 ${
                selectedImage ? "border-olive/50 bg-paper" : "border-line hover:border-olive/40"
              }`}
            >
              {selectedImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-[4/5] max-h-[380px] mx-auto rounded-lg overflow-hidden border border-line bg-background shadow-sm">
                    <Image
                      src={selectedImage}
                      alt="เสื้อผ้าที่กำลังสแกน"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-charcoal hover:underline font-medium cursor-pointer"
                    >
                      เปลี่ยนรูปภาพ
                    </button>
                    <span className="text-muted text-xs">•</span>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-xs text-rose-600 hover:underline font-medium cursor-pointer"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-olive/10 flex items-center justify-center text-olive">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-base text-charcoal">
                      ถ่ายรูป หรือ อัปโหลดรูปเสื้อผ้า
                    </h3>
                    <p className="text-xs text-muted max-w-sm mx-auto">
                      ถ่ายรูปเสื้อผ้าหน้าร้าน ไม้แขวน หรือภาพแคปหน้าจอออนไลน์
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="px-4 py-2.5 bg-charcoal text-background hover:bg-olive text-xs font-medium rounded inline-flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
                    >
                      <Camera className="w-4 h-4" />
                      <span>เปิดกล้องมือถือ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 bg-paper border border-line text-charcoal hover:border-olive text-xs font-medium rounded inline-flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>เลือกจากคลังรูป</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Quick Demo Samples */}
            {!selectedImage && (
              <div className="space-y-2 pt-2">
                <span className="text-xs text-muted font-medium block">
                  หรือลองทดสอบด้วยตัวอย่างเสื้อผ้าหน้าร้านยอดนิยม:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage("/images/fittoday/ad-soft-tailored-set-v1.webp");
                      setItemName("เบลเซอร์สูทผ้าวูลผสมสีเบจ");
                      setPrice("890");
                    }}
                    className="p-2 border border-line rounded bg-paper hover:border-olive text-left text-[11px] space-y-1 cursor-pointer transition-all"
                  >
                    <span className="font-semibold text-charcoal block line-clamp-1">
                      🧥 เบลเซอร์ลินินสีเบจ
                    </span>
                    <span className="text-muted block">890 ฿</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage("/images/fittoday/ad-pleated-pants.jpg");
                      setItemName("กางเกงสแล็คขากระบอกสีดำ");
                      setPrice("590");
                    }}
                    className="p-2 border border-line rounded bg-paper hover:border-olive text-left text-[11px] space-y-1 cursor-pointer transition-all"
                  >
                    <span className="font-semibold text-charcoal block line-clamp-1">
                      👖 กางเกงสแล็คสีดำ
                    </span>
                    <span className="text-muted block">590 ฿</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage("/images/fittoday/ad-city-shoes.jpg");
                      setItemName("รองเท้าโลฟเฟอร์หนังกลับ");
                      setPrice("1290");
                    }}
                    className="p-2 border border-line rounded bg-paper hover:border-olive text-left text-[11px] space-y-1 cursor-pointer transition-all"
                  >
                    <span className="font-semibold text-charcoal block line-clamp-1">
                      👞 รองเท้าโลฟเฟอร์
                    </span>
                    <span className="text-muted block">1,290 ฿</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Scan Parameters & Trigger */}
          <div className="md:col-span-5 space-y-5 bg-paper/60 border border-line p-5 sm:p-6 rounded-xl">
            <h3 className="font-medium text-sm text-charcoal border-b border-line pb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-olive" />
              <span>ข้อมูลเสื้อผ้า (ระบุหรือไม่ก็ได้)</span>
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ราคาป้าย (บาท)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    placeholder="เช่น 590"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-line rounded text-sm text-charcoal focus:outline-none focus:border-olive"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-muted">THB</span>
                </div>
                <p className="text-[11px] text-muted mt-1">
                  ใส่ราคาเพื่อให้ AI คำนวณความคุ้มค่าต่อชุด (Cost per Outfit)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  ชื่อสินค้า / ร้านค้า (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  placeholder="เช่น เสื้อเชิ้ตโอเวอร์ไซซ์ Uniqlo"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-line rounded text-sm text-charcoal focus:outline-none focus:border-olive"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">
                  หมายเหตุเพิ่มเติม
                </label>
                <input
                  type="text"
                  placeholder="เช่น ผ้าหนาปานกลาง สำหรับใส่ไปทำงาน"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-line rounded text-sm text-charcoal focus:outline-none focus:border-olive"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartScan}
                disabled={loading || !selectedImage}
                className="w-full py-3.5 bg-charcoal hover:bg-olive text-background text-sm font-semibold rounded transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>กำลังประมวลผล...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>🚀 สแกนจับคู่กับตู้ที่บ้าน</span>
                  </>
                )}
              </button>
            </div>

            {loading && (
              <div className="p-3 bg-olive/10 border border-olive/20 rounded text-center space-y-2 animate-pulse">
                <span className="text-xs font-semibold text-olive-dark block">{scanStep}</span>
                <span className="text-[11px] text-muted block">
                  ระบบกำลังเทียบความเข้ากันได้ของสี ทรง และเนื้อผ้า...
                </span>
              </div>
            )}

            {/* Why This Feature Card */}
            <div className="p-3.5 bg-background border border-line rounded-lg text-xs space-y-1.5 text-muted">
              <span className="font-semibold text-charcoal flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-olive" />
                <span>ทำไมต้องสแกนก่อนซื้อ?</span>
              </span>
              <p className="leading-relaxed">
                การรู้ล่วงหน้าว่ามีเสื้อผ้าเดิมในตู้รอแมตช์อยู่แล้วอย่างน้อย 3-5 ชิ้น
                จะช่วยหยุดปัญหาซื้อเสื้อผ้ามาแขวนทิ้งในตู้ได้ 100% ประหยัดเงินปีละนับหมื่นบาท!
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top Banner Verdict */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border ${
              result.score >= 8
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950"
                : result.score >= 6
                ? "bg-amber-500/10 border-amber-500/30 text-amber-950"
                : "bg-rose-500/10 border-rose-500/30 text-rose-950"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                      result.score >= 8
                        ? "bg-emerald-600 text-white"
                        : result.score >= 6
                        ? "bg-amber-600 text-white"
                        : "bg-rose-600 text-white"
                    }`}
                  >
                    เกรด {result.verdict.grade} · {result.verdict.verdictText}
                  </span>
                  {result.isUsingDefaultCapsule && (
                    <span className="text-[11px] text-muted bg-background/80 px-2.5 py-0.5 rounded border border-line">
                      เทียบกับตู้เสื้อผ้าพื้นฐาน
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {result.verdict.title}
                </h2>
                <p className="text-sm leading-relaxed text-charcoal/80">
                  {result.verdict.explanation}
                </p>
              </div>

              {/* Big Score Circle */}
              <div className="flex items-center gap-4 sm:flex-col sm:items-end justify-between border-t sm:border-t-0 border-line/40 pt-4 sm:pt-0">
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-muted font-bold block">
                    คะแนนความคุ้มค่า
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black font-mono">
                      {result.score.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted font-bold">/10</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-charcoal text-background hover:bg-olive text-xs font-semibold rounded cursor-pointer transition-colors inline-flex items-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>สแกนชิ้นใหม่</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-line/40">
              <div className="bg-background/80 p-3 rounded-lg border border-line/60">
                <span className="text-[11px] text-muted block">แมตช์ได้ทันที</span>
                <span className="text-lg font-bold text-charcoal font-mono">
                  {result.potentialOutfitsCount} ลุค
                </span>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-line/60">
                <span className="text-[11px] text-muted block">ของในตู้ที่ใส่คู่ได้</span>
                <span className="text-lg font-bold text-charcoal font-mono">
                  {result.matchedWardrobeCount} ชิ้น
                </span>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-line/60">
                <span className="text-[11px] text-muted block">ราคาป้าย</span>
                <span className="text-lg font-bold text-charcoal font-mono">
                  {result.price ? `${result.price.toLocaleString()} ฿` : "ไม่ได้ระบุ"}
                </span>
              </div>
              <div className="bg-background/80 p-3 rounded-lg border border-line/60">
                <span className="text-[11px] text-muted block">ต้นทุนเฉลี่ยต่อลุค</span>
                <span className="text-lg font-bold text-olive-dark font-mono">
                  {result.costPerOutfit ? `~${result.costPerOutfit} ฿ / ลุค` : "คุ้มค่ามาก"}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Matched Items From Your Wardrobe */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal flex items-center gap-2">
                  <Layers className="w-5 h-5 text-olive" />
                  <span>เสื้อผ้าเดิมในตู้ของคุณที่พร้อมใส่คู่ด้วย</span>
                </h3>
                <p className="text-xs text-muted">
                  ดึงมาจากตู้เสื้อผ้าของคุณ สามารถนำมาจับคู่กับเสื้อผ้าชิ้นนี้ได้ทันที
                </p>
              </div>
              <Link
                href="/account/wardrobe"
                className="text-xs text-olive hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>จัดการตู้เสื้อผ้า</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {result.matchedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-paper border border-line rounded-lg p-2.5 space-y-2 flex flex-col justify-between hover:border-olive/50 transition-colors shadow-sm"
                >
                  <div className="aspect-square relative bg-background border border-line/60 rounded overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                        {item.type}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-olive uppercase block font-semibold">
                      {item.type} · {item.color}
                    </span>
                    <p className="text-[11px] text-charcoal font-medium line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: 3 Styled Outfits Ready to Wear */}
          <div className="space-y-4">
            <div className="space-y-0.5">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-charcoal flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-olive" />
                <span>ตัวอย่าง 3 ลุคที่ได้ทันทีเมื่อซื้อชิ้นนี้</span>
              </h3>
              <p className="text-xs text-muted">
                จำลองการจับคู่เสื้อผ้าชิ้นใหม่เข้ากับเสื้อผ้าที่มีอยู่แล้วในตู้ของคุณ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.styledOutfits.map((outfit, idx) => (
                <div
                  key={idx}
                  className="bg-paper border border-line rounded-xl p-5 space-y-4 flex flex-col justify-between shadow-sm hover:border-olive/50 transition-all"
                >
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-1 bg-olive/10 text-olive-dark rounded text-[11px] font-bold">
                      {outfit.direction}
                    </span>
                    <h4 className="font-semibold text-sm text-charcoal">{outfit.name}</h4>
                    <p className="text-xs text-muted leading-relaxed">{outfit.notes}</p>
                  </div>

                  <div className="space-y-2 border-t border-line/60 pt-3">
                    <span className="text-[11px] text-charcoal font-semibold uppercase tracking-wider block">
                      ไอเทมในลุคนี้:
                    </span>
                    <div className="space-y-1.5">
                      {outfit.items.map((it, itIdx) => (
                        <div
                          key={itIdx}
                          className={`text-xs p-2 rounded flex items-center justify-between ${
                            it.isCandidate
                              ? "bg-olive-pale/40 border border-olive/30 font-medium text-olive-dark"
                              : "bg-background border border-line text-charcoal"
                          }`}
                        >
                          <span className="line-clamp-1">{it.description}</span>
                          <span className="text-[10px] font-mono text-muted uppercase shrink-0 ml-2">
                            {it.isCandidate ? "ชิ้นใหม่" : it.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: AI Pro Tips */}
          <div className="p-5 bg-olive-pale/20 border border-olive/30 rounded-xl space-y-3">
            <h4 className="font-semibold text-sm text-olive-dark flex items-center gap-2">
              <Info className="w-4 h-4 text-olive" />
              <span>คำแนะนำจาก AI Stylist ก่อนตัดสินใจซื้อ:</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-charcoal/90 list-disc list-inside leading-relaxed">
              {result.proTips.map((tip, tipIdx) => (
                <li key={tipIdx}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-charcoal text-background hover:bg-olive text-xs font-semibold rounded cursor-pointer transition-colors inline-flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>สแกนเสื้อผ้าชิ้นต่อไป</span>
            </button>
            <Link
              href="/ai-stylist"
              className="w-full sm:w-auto px-6 py-3 bg-paper border border-line hover:border-olive text-charcoal text-xs font-semibold rounded transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <span>ไปที่ AI Stylist ประจำวัน</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
