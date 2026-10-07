"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage("กรุณาระบุอีเมลของคุณ");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "ไม่สามารถส่งคำขอได้ กรุณาลองใหม่อีกครั้ง");
      }

      setSuccessMessage(data.message);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 bg-paper border border-line p-8 rounded-2xl shadow-xl">
        {/* Back Link */}
        <Link
          href="/login/customer"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-charcoal font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับไปหน้าเข้าสู่ระบบ</span>
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-olive font-semibold uppercase tracking-wider block">
            ACCOUNT RECOVERY
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            ลืมรหัสผ่าน?
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            ระบุอีเมลที่คุณใช้สมัครสมาชิก เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้ทางอีเมลของคุณ
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage ? (
          <div className="space-y-4 py-3">
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ส่งลิงก์สำเร็จแล้ว!</span>
              </div>
              <p className="leading-relaxed text-emerald-900/90">
                {successMessage}
              </p>
              <p className="text-[11px] text-emerald-700">
                💡 ตรวจสอบกล่องข้อความ (Inbox) หรือโฟลเดอร์จดหมายขยะ (Spam/Junk) ในอีเมลของคุณ
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                setEmail("");
              }}
              className="w-full py-2.5 bg-paper border border-line hover:border-olive text-charcoal text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              ส่งอีกครั้งด้วยอีเมลอื่น
            </button>
          </div>
        ) : (
          /* Input Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="recovery-email" className="block text-xs font-semibold text-charcoal mb-1">
                อีเมลของคุณ
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
                <input
                  id="recovery-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-background border border-line rounded-lg text-sm text-charcoal focus:outline-none focus:border-olive"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-charcoal hover:bg-olive text-background text-xs font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังส่งลิงก์...</span>
                </>
              ) : (
                <span>ส่งลิงก์ตั้งรหัสผ่านใหม่</span>
              )}
            </button>
          </form>
        )}

        {/* Footer help */}
        <div className="pt-4 border-t border-line text-center text-xs text-muted">
          <span>จำรหัสผ่านได้แล้ว? </span>
          <Link href="/login/customer" className="text-olive hover:underline font-semibold">
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}
