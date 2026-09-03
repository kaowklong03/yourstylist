"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Copy, Check, ExternalLink, Download, X, Camera, Layers, Loader2 } from "lucide-react";

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

export function resolveItemImage(role: string, description: string, explicitUrl?: string | null): string {
  if (explicitUrl && explicitUrl.trim() && (explicitUrl.startsWith("/") || explicitUrl.startsWith("http"))) {
    return explicitUrl;
  }

  const text = (role + " " + description).toLowerCase();

  if (
    text.includes("เบลเซอร์") ||
    text.includes("สูท") ||
    text.includes("blazer") ||
    text.includes("jacket") ||
    text.includes("คลุม") ||
    text.includes("coat") ||
    text.includes("เสื้อคลุม")
  ) {
    return "/images/fittoday/ad-soft-tailored-set-v1.webp";
  }
  if (
    text.includes("กางเกง") ||
    text.includes("กระโปรง") ||
    text.includes("pants") ||
    text.includes("trousers") ||
    text.includes("bottom") ||
    text.includes("jeans") ||
    text.includes("ท่อนล่าง") ||
    text.includes("สแล็ค")
  ) {
    return "/images/fittoday/ad-pleated-pants.jpg";
  }
  if (
    text.includes("รองเท้า") ||
    text.includes("shoes") ||
    text.includes("loafers") ||
    text.includes("sneakers") ||
    text.includes("โลฟเฟอร์")
  ) {
    return "/images/fittoday/ad-city-shoes.jpg";
  }
  if (
    text.includes("กระเป๋า") ||
    text.includes("bag") ||
    text.includes("tote") ||
    text.includes("เครื่องประดับ") ||
    text.includes("accessory") ||
    text.includes("หมวก")
  ) {
    return "/images/fittoday/ad-structure-tote.jpg";
  }
  if (text.includes("เดรส") || text.includes("dress")) {
    return "/images/fittoday/ad-summer-dress.jpg";
  }

  // Default to clean linen shirt
  return "/demo-assets/ad-linen-shirt.jpg";
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Fallback to default local shirt if remote image fails or CORS blocks
      const fallback = new window.Image();
      fallback.onload = () => resolve(fallback);
      fallback.onerror = () => resolve(img);
      fallback.src = "/demo-assets/ad-linen-shirt.jpg";
    };
    img.src = src;
  });
}

export function LookbookStudioModal({ isOpen, onClose, outfit }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      setDownloading(false);
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

  const handleDownloadMoodboard = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const displayItems = outfit.items.slice(0, 4);
      const imageUrls = displayItems.map((item) =>
        resolveItemImage(item.role, item.description, item.imageUrl)
      );

      // Preload all 4 images
      const loadedImages = await Promise.all(imageUrls.map((url) => loadImage(url)));

      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1450;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background
      ctx.fillStyle = "#faf8f5";
      ctx.fillRect(0, 0, 1200, 1450);

      // Outer Border
      ctx.strokeStyle = "#e2ddd5";
      ctx.lineWidth = 3;
      ctx.strokeRect(36, 36, 1128, 1378);

      // Header Brand
      ctx.fillStyle = "#64748b";
      ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("YOURSTYLIST · 4-ITEM OUTFIT MOODBOARD", 600, 85);

      // Outfit Title
      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 42px 'Georgia', serif";
      ctx.fillText(outfit.name || "Curated Outfit", 600, 140);

      // Subtitle / Direction
      ctx.fillStyle = "#526042";
      ctx.font = "italic 20px 'Georgia', serif";
      ctx.fillText(`Style Direction: ${outfit.direction || outfit.style || "Signature Look"}`, 600, 178);

      // Grid for items (2x2 layout)
      const boxW = 510;
      const boxH = 530;
      const startX = 65;
      const startY = 220;
      const gapX = 50;
      const gapY = 40;

      for (let idx = 0; idx < displayItems.length; idx++) {
        const item = displayItems[idx];
        const img = loadedImages[idx];
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = startX + col * (boxW + gapX);
        const y = startY + row * (boxH + gapY);

        // Box background & border
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, boxW, boxH);
        ctx.strokeStyle = "#ded9d0";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, boxW, boxH);

        // Header inside box
        ctx.fillStyle = "#39432f";
        ctx.fillRect(x, y, boxW, 46);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 16px -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(`0${idx + 1}. ${item.role.toUpperCase()}`, x + 18, y + 29);

        // Draw Actual Item Image
        const imgX = x + 16;
        const imgY = y + 58;
        const imgW = boxW - 32;
        const imgH = 360;

        // Image background container
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(imgX, imgY, imgW, imgH);
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        ctx.strokeRect(imgX, imgY, imgW, imgH);

        if (img && img.naturalWidth > 0) {
          // Calculate object-fit cover / contain
          const hRatio = imgW / img.naturalWidth;
          const vRatio = imgH / img.naturalHeight;
          const ratio = Math.max(hRatio, vRatio); // cover
          const centerShiftX = (imgW - img.naturalWidth * ratio) / 2;
          const centerShiftY = (imgH - img.naturalHeight * ratio) / 2;

          ctx.save();
          ctx.beginPath();
          ctx.rect(imgX, imgY, imgW, imgH);
          ctx.clip();
          ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            imgX + centerShiftX,
            imgY + centerShiftY,
            img.naturalWidth * ratio,
            img.naturalHeight * ratio
          );
          ctx.restore();
        }

        // Item Description below image
        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 17px -apple-system, sans-serif";
        ctx.textAlign = "left";

        const desc = item.description || "ไอเทมเสื้อผ้า";
        let displayDesc = desc;
        if (ctx.measureText(displayDesc).width > boxW - 40) {
          displayDesc = desc.slice(0, 32) + "...";
        }
        ctx.fillText(displayDesc, x + 18, y + 450);

        // Subtle category badge
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(x + 18, y + 472, 140, 26);
        ctx.fillStyle = "#475569";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText("AUTHENTIC ITEM", x + 30, y + 489);
      }

      // Footer Note
      ctx.fillStyle = "#94a3b8";
      ctx.font = "15px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "YourStylist Wardrobe Intelligence · 4-Item Lookbook Moodboard · Ready for AI Photoshoot",
        600,
        1385
      );

      // Trigger Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `YourStylist-Lookbook-${outfit.name.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error("Moodboard download failed:", e);
      alert("ไม่สามารถดาวน์โหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง");
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
            ชุด: <strong className="text-charcoal font-medium">{outfit.name}</strong> ({outfit.direction || outfit.style || "Signature Look"})
          </p>
        </div>

        {/* Outfit 4-Item Grid Preview with Real Photos */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-olive" />
              <span>ภาพไอเทมทั้ง 4 ชิ้น (Visual Moodboard)</span>
            </span>
            <button
              type="button"
              onClick={handleDownloadMoodboard}
              disabled={downloading}
              className="text-xs font-semibold text-olive hover:underline inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {downloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloading ? "กำลังประกอบภาพ..." : "📥 บันทึกรูปภาพ Moodboard ลงเครื่อง"}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {outfit.items.slice(0, 4).map((item, idx) => {
              const itemImg = resolveItemImage(item.role, item.description, item.imageUrl);
              return (
                <div key={idx} className="bg-paper border border-line p-2.5 rounded space-y-2 flex flex-col justify-between">
                  <div className="aspect-square relative bg-background border border-line/60 rounded overflow-hidden">
                    <Image
                      src={itemImg}
                      alt={item.description}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-olive uppercase block font-semibold">
                      0{idx + 1}. {item.role}
                    </span>
                    <p className="text-[11px] text-charcoal font-medium line-clamp-2 leading-tight">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
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
              rows={6}
              value={masterPrompt}
              className="w-full p-3.5 bg-paper/60 border border-line text-xs font-mono text-charcoal leading-relaxed rounded resize-none focus:outline-none focus:border-olive selection:bg-olive-pale"
            />
          </div>
        </div>

        {/* 3 Step Guide */}
        <div className="p-4 bg-olive-pale/25 border border-olive/20 text-xs text-charcoal space-y-2 rounded">
          <strong className="block text-olive-dark font-medium">💡 วิธีใช้งานง่ายๆ ใน 3 ขั้นตอน:</strong>
          <ol className="list-decimal list-inside space-y-1 text-muted leading-relaxed">
            <li>กดปุ่ม <strong>"📥 บันทึกรูปภาพ Moodboard"</strong> ด้านบน เพื่อเซฟรูปเสื้อผ้าทั้ง 4 ชิ้นลงเครื่อง</li>
            <li>กดปุ่ม <strong>"🚀 เปิดใน ChatGPT"</strong> (ระบบจะนำ Prompt 4 มุมไปใส่ในช่องแชทให้อัตโนมัติ)</li>
            <li>แนบรูป Moodboard (และรูปหน้าคุณถ้าต้องการ) แล้วกดส่งเพื่อรับภาพถ่ายคุณสวมชุดนี้ 4 มุมทันที!</li>
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
