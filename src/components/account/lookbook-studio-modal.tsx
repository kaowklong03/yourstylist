"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Copy, Check, ExternalLink, Download, X, Camera, Shirt, Layers } from "lucide-react";

export interface LookbookItem {
  role: string;
  description: string;
  imageUrl?: string | null;
}

export interface LookbookOutfit {
  name: string;
  direction?: string;
  style?: string;
  notes?: string;
  items: LookbookItem[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  outfit: LookbookOutfit | null;
}

export function LookbookStudioModal({ isOpen, onClose, outfit }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen || !outfit) return null;

  // Generate the World-Class 4-Angle Master Prompt
  const itemsText = outfit.items.map((i) => `${i.role} (${i.description})`).join(", ");

  const masterPrompt = `Create a high-fashion editorial photoshoot collage of 4 distinct camera angles in ONE SINGLE image (2x2 grid layout), showcasing the complete outfit: [${itemsText}].

The 4 panels must feature the same stylish model wearing this exact outfit:
• Top-Left Panel (Front View): Full-body shot, standing pose, looking at camera with effortless confidence.
• Top-Right Panel (45° Side View): Three-quarter dynamic walking pose, showcasing silhouette, drapery, and fit.
• Bottom-Left Panel (Back View): Elegant rear angle showing back cut, shoulder line, and trousers hemline details.
• Bottom-Right Panel (Close-up Macro Detail): Detailed shot focusing on the luxury fabric texture, buttons, stitching, and accessories.

Aesthetic & Photography Style:
High-fashion editorial magazine lookbook, natural diffused window daylight, clean warm ivory/paper neutral studio background, 8k resolution, ultra-realistic textiles, cinematic depth of field, quiet luxury Vogue/Celine aesthetic. Perfectly consistent clothing details and colors across all 4 panels, photorealistic, no watermarks, no distorted limbs.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(masterPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = masterPrompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleOpenChatGPT = () => {
    const encoded = encodeURIComponent(masterPrompt);
    window.open(`https://chatgpt.com/?q=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadMoodboard = () => {
    setDownloading(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background
      ctx.fillStyle = "#faf8f5";
      ctx.fillRect(0, 0, 1200, 1200);

      // Outer Border
      ctx.strokeStyle = "#e5e0d8";
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, 1120, 1120);

      // Header Brand
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("YOURSTYLIST · LOOKBOOK MOODBOARD", 600, 95);

      // Outfit Title
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 44px 'Georgia', serif";
      ctx.fillText(outfit.name || "Curated Outfit", 600, 155);

      // Subtitle / Direction
      ctx.fillStyle = "#526042";
      ctx.font = "italic 22px 'Georgia', serif";
      ctx.fillText(`Style Direction: ${outfit.direction || outfit.style || "Signature Look"}`, 600, 195);

      // Grid for items (4 items or up to 4)
      const displayItems = outfit.items.slice(0, 4);
      const boxW = 500;
      const boxH = 380;
      const startX = 80;
      const startY = 240;
      const gapX = 40;
      const gapY = 40;

      displayItems.forEach((item, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = startX + col * (boxW + gapX);
        const y = startY + row * (boxH + gapY);

        // Box background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, boxW, boxH);
        ctx.strokeStyle = "#e2ddd5";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, boxW, boxH);

        // Header inside box
        ctx.fillStyle = "#39432f";
        ctx.fillRect(x, y, boxW, 55);
        ctx.fillStyle = "#faf8f5";
        ctx.font = "bold 18px -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`0${idx + 1}. ${item.role.toUpperCase()}`, x + 24, y + 35);

        // Description
        ctx.fillStyle = "#1e293b";
        ctx.font = "24px -apple-system, sans-serif";
        const words = item.description.split(" ");
        let line = "";
        let lineY = y + 120;
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > boxW - 50 && n > 0) {
            ctx.fillText(line, x + 24, lineY);
            line = words[n] + " ";
            lineY += 36;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, x + 24, lineY);

        // Badge at bottom of card
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(x + 24, y + boxH - 65, 160, 36);
        ctx.fillStyle = "#475569";
        ctx.font = "bold 14px sans-serif";
        ctx.fillText("CLOTHING ITEM", x + 38, y + boxH - 42);
      });

      // Footer Note
      ctx.fillStyle = "#94a3b8";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Generated with YourStylist AI · 4-Angle Fashion Lookbook Generator", 600, 1115);

      // Trigger Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `YourStylist-Lookbook-${outfit.name.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Download failed:", e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-background border border-line p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-muted hover:text-charcoal transition-colors rounded-full hover:bg-paper cursor-pointer"
          aria-label="ปิดหน้าต่าง"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-8 border-b border-line pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-olive font-semibold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>AI Lookbook Studio · 4-Angle Photoshoot</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            สตูดิโอสร้างภาพสวมชุด 4 มุมด้วย AI
          </h3>
          <p className="text-xs text-muted">
            ชุด: <strong className="text-charcoal font-medium">{outfit.name}</strong> ({outfit.direction || "Signature Look"})
          </p>
        </div>

        {/* Outfit 4-Item Grid Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-olive" />
              <span>ไอเทมในชุด (4-Item Composition)</span>
            </span>
            <button
              type="button"
              onClick={handleDownloadMoodboard}
              disabled={downloading}
              className="text-xs font-medium text-olive hover:underline inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? "กำลังดาวน์โหลด..." : "📥 บันทึกรูปภาพ Moodboard ลงเครื่อง"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {outfit.items.slice(0, 4).map((item, idx) => (
              <div key={idx} className="p-3 bg-paper border border-line rounded space-y-1">
                <span className="text-[10px] font-mono text-olive uppercase block font-semibold">
                  0{idx + 1}. {item.role}
                </span>
                <p className="text-xs text-charcoal font-medium line-clamp-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Master Prompt Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-olive" />
              <span>Master Prompt 4 มุมที่ดีที่สุด (พร้อมคัดลอก)</span>
            </label>
            <span className="text-[11px] font-mono text-muted bg-paper px-2 py-0.5 border border-line rounded">
              Photorealistic 2x2 Grid
            </span>
          </div>

          <div className="relative">
            <textarea
              readOnly
              rows={7}
              value={masterPrompt}
              className="w-full p-3.5 bg-paper/60 border border-line text-xs font-mono text-charcoal leading-relaxed rounded resize-none focus:outline-none focus:border-olive selection:bg-olive-pale"
            />
          </div>
        </div>

        {/* 3 Step Guide */}
        <div className="p-4 bg-olive-pale/25 border border-olive/20 text-xs text-charcoal space-y-2 rounded">
          <strong className="block text-olive-dark font-medium">💡 วิธีใช้งานง่ายๆ ใน 3 ขั้นตอน:</strong>
          <ol className="list-decimal list-inside space-y-1 text-muted leading-relaxed">
            <li>กดปุ่ม <strong>"📥 บันทึกรูปภาพ Moodboard"</strong> ด้านบน เพื่อเซฟรูปชุดลงเครื่อง</li>
            <li>กดปุ่ม <strong>"🚀 เปิดใน ChatGPT"</strong> (ระบบจะนำ Prompt ไปใส่ในช่องแชทให้อัตโนมัติ)</li>
            <li>แนบรูป Moodboard หรือรูปตัวเอง แล้วกดส่งเพื่อรับภาพคุณสวมชุดนี้ 4 มุมได้ทันที!</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 border border-line text-xs font-medium text-charcoal hover:bg-paper transition-colors cursor-pointer"
          >
            ปิด
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className={`flex-1 sm:flex-none px-4 py-2.5 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                copied
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-paper text-charcoal border-line hover:border-olive"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>คัดลอก Prompt แล้ว!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>คัดลอก Prompt</span>
                </>
              )}
            </button>

            {/* Open in ChatGPT Button */}
            <button
              type="button"
              onClick={handleOpenChatGPT}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-charcoal text-background hover:bg-olive text-xs font-medium transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow"
            >
              <ExternalLink className="w-4 h-4" />
              <span>🚀 เปิดใน ChatGPT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
