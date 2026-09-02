"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Store, Globe, Sparkles, Check, Camera, Image as ImageIcon, Trash2, Loader2 } from "lucide-react";

interface ShopFormProps {
  shop?: {
    id?: string;
    name: string;
    slug: string;
    description: string;
    website_url: string | null;
    instagram_url: string | null;
    logo_path?: string | null;
    cover_path?: string | null;
  } | null;
  onboarding?: boolean;
}

function getAssetPreviewUrl(path: string | null | undefined, fallback: string) {
  if (!path) return fallback;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `/api/assets?bucket=shop-assets&path=${encodeURIComponent(path)}`;
}

export function ShopForm({ shop, onboarding = false }: ShopFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [name, setName] = useState(shop?.name || "");
  const [slug, setSlug] = useState(shop?.slug || "");
  const [logoPath, setLogoPath] = useState<string | null>(shop?.logo_path || null);
  const [coverPath, setCoverPath] = useState<string | null>(shop?.cover_path || null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);

  async function handleUpload(event: ChangeEvent<HTMLInputElement>, type: "logo" | "cover") {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 6_000_000) {
      setMessage("รองรับ JPEG, PNG, WebP ขนาดไม่เกิน 6MB");
      event.target.value = "";
      return;
    }

    if (!shop?.id) {
      setMessage("กรุณาสร้างโปรไฟล์ร้านก่อนอัปโหลดรูปภาพ");
      event.target.value = "";
      return;
    }

    if (type === "logo") setLogoUploading(true);
    else setCoverUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.set("file", file);
    formData.set("shopId", shop.id);
    formData.set("bucket", "shop-assets");

    try {
      const res = await fetch("/api/merchant/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.path) {
        setMessage(data.error || "อัปโหลดรูปไม่สำเร็จ");
      } else {
        if (type === "logo") {
          setLogoPath(data.path);
        } else {
          setCoverPath(data.path);
        }
        setMessage(`อัปโหลด${type === "logo" ? "รูปโปรไฟล์ร้าน" : "รูปหน้าปกร้าน"}เรียบร้อยแล้ว (อย่าลืมกดบันทึกการเปลี่ยนแปลง)`);
      }
    } catch {
      setMessage("เกิดข้อผิดพลาดในการอัปโหลดรูป");
    } finally {
      if (type === "logo") setLogoUploading(false);
      else setCoverUploading(false);
      event.target.value = "";
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const form = new FormData(event.currentTarget);
    const body = {
      ...Object.fromEntries(form.entries()),
      logoPath: logoPath || null,
      coverPath: coverPath || null,
    };

    const response = await fetch("/api/merchant/shop", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    setPending(false);
    if (!response.ok) {
      setMessage(result.error ?? "บันทึกข้อมูลร้านไม่สำเร็จ");
      return;
    }
    setMessage("บันทึกข้อมูลโปรไฟล์ร้านเรียบร้อยแล้ว");
    router.push(onboarding ? "/merchant" : "/merchant/shop");
    router.refresh();
  }

  return (
    <form className="space-y-6 max-w-2xl" onSubmit={submit}>
      {onboarding && (
        <div className="p-5 border border-olive/30 bg-olive-pale/30 text-xs text-charcoal space-y-2">
          <div className="flex items-center gap-2 font-mono uppercase font-semibold text-olive">
            <Store className="w-4 h-4" />
            <span>เริ่มต้นเปิดสตูดิโอร้านค้าบน YourStylist</span>
          </div>
          <p className="text-muted leading-relaxed">
            กรอกข้อมูลเบื้องต้นเกี่ยวกับสตูดิโอและแบรนด์ของคุณ ข้อมูลนี้จะใช้แสดงในหน้าโปรไฟล์ร้าน
          </p>
        </div>
      )}

      {/* Image Upload Section */}
      {!onboarding && (
        <div className="p-6 sm:p-8 bg-paper border border-line space-y-6">
          <h2 className="text-sm font-mono uppercase tracking-wider text-charcoal">
            รูปภาพและแบรนดิ้งร้านค้า
          </h2>

          {/* Cover Photo */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-muted uppercase">
              รูปหน้าปกร้าน (Cover Banner)
            </label>
            <div className="relative aspect-[21/7] min-h-[160px] bg-background border border-line overflow-hidden group">
              <Image
                src={getAssetPreviewUrl(coverPath, "/demo/look-sand.svg")}
                alt="ภาพหน้าปกร้าน"
                fill
                unoptimized
                className="object-cover"
              />
              {coverUploading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs gap-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>กำลังอัปโหลดรูปหน้าปก...</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-line hover:border-charcoal text-xs font-mono cursor-pointer transition-colors">
                <ImageIcon className="w-3.5 h-3.5 text-olive" />
                <span>{coverPath ? "เปลี่ยนรูปหน้าปก" : "อัปโหลดรูปหน้าปก"}</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleUpload(e, "cover")}
                  disabled={coverUploading}
                />
              </label>

              {coverPath && (
                <button
                  type="button"
                  onClick={() => setCoverPath(null)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-line/60 text-destructive text-xs font-mono hover:border-destructive transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>ลบรูปหน้าปก</span>
                </button>
              )}
              <span className="text-[11px] text-muted font-mono">แนะนำสัดส่วนแนวนอน (เช่น 1600x600) ไม่เกิน 6MB</span>
            </div>
          </div>

          {/* Logo / Profile */}
          <div className="space-y-2 pt-2 border-t border-line/60">
            <label className="block text-xs font-mono text-muted uppercase">
              รูปโปรไฟล์ / โลโก้ร้านค้า (Shop Logo)
            </label>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 bg-background border border-line overflow-hidden rounded-md shrink-0">
                <Image
                  src={getAssetPreviewUrl(logoPath, "/demo/shop-quiet.svg")}
                  alt="โลโก้ร้าน"
                  fill
                  unoptimized
                  className="object-cover"
                />
                {logoUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-paper border border-line hover:border-charcoal text-xs font-mono cursor-pointer transition-colors">
                    <Camera className="w-3.5 h-3.5 text-olive" />
                    <span>{logoPath ? "เปลี่ยนรูปโปรไฟล์" : "อัปโหลดรูปโปรไฟล์"}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => handleUpload(e, "logo")}
                      disabled={logoUploading}
                    />
                  </label>

                  {logoPath && (
                    <button
                      type="button"
                      onClick={() => setLogoPath(null)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 border border-line/60 text-destructive text-xs font-mono hover:border-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ลบรูป</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-muted font-mono">
                  แนะนำรูปจัตุรัส 1:1 (เช่น 400x400) ไม่เกิน 6MB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8 bg-paper border border-line space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-1">ชื่อร้านค้า / สตูดิโอ *</label>
            <input
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug && e.target.value) {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
                }
              }}
              required
              minLength={2}
              maxLength={100}
              placeholder="เช่น Quiet Form Studio"
              className="w-full px-4 py-3 border border-line bg-background text-sm text-charcoal focus:border-charcoal outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-1">Slug URL ร้านค้า *</label>
            <input
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              placeholder="quiet-form"
              className="w-full px-4 py-3 border border-line bg-background text-sm text-charcoal focus:border-charcoal outline-none font-mono"
            />
            <small className="text-[11px] text-muted block mt-1">ใช้เป็นส่วนหนึ่งของที่อยู่ URL ร้านค้า เช่น yourstylist.app/shops/{slug || "shop-name"}</small>
          </div>

          <div>
            <label className="block text-xs font-mono text-muted uppercase mb-1">เรื่องราวและเอกลักษณ์ของร้าน</label>
            <textarea
              name="description"
              defaultValue={shop?.description}
              rows={4}
              maxLength={1500}
              placeholder="อธิบายปรัชญาการออกแบบ สไตล์เสื้อผ้า และจุดเด่นของแบรนด์"
              className="w-full p-4 border border-line bg-background text-sm text-charcoal focus:border-charcoal outline-none resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-olive" />
                <span>เว็บไซต์ร้านค้า (ไม่บังคับ)</span>
              </label>
              <input
                name="websiteUrl"
                defaultValue={shop?.website_url ?? ""}
                type="url"
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-line bg-background text-sm text-charcoal focus:border-charcoal outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-muted uppercase mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-olive" />
                <span>ลิงก์ Instagram / โซเชียลร้านค้า</span>
              </label>
              <input
                name="instagramUrl"
                defaultValue={shop?.instagram_url ?? ""}
                type="url"
                placeholder="https://instagram.com/shop-name"
                className="w-full px-4 py-3 border border-line bg-background text-sm text-charcoal focus:border-charcoal outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 border border-olive/30 bg-olive-pale/30 text-olive-dark text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button
          className="px-8 py-4 bg-charcoal text-background hover:bg-olive font-semibold text-xs rounded-none transition-colors disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
          disabled={pending || logoUploading || coverUploading}
          type="submit"
        >
          <Sparkles className="w-4 h-4 text-olive" />
          <span>{pending ? "กำลังบันทึก…" : onboarding ? "สร้างโปรไฟล์สตูดิโอร้านค้า" : "บันทึกการเปลี่ยนแปลง"}</span>
        </button>
      </div>
    </form>
  );
}
