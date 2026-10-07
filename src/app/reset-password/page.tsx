"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setErrorMessage("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านทั้งสองช่องไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "ไม่สามารถตั้งรหัสผ่านใหม่ได้");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/account");
      }, 2500);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 bg-paper border border-line p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-olive font-semibold uppercase tracking-wider block">
            CREATE NEW PASSWORD
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            ตั้งรหัสผ่านใหม่
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            กรุณาระบุรหัสผ่านใหม่ที่คุณต้องการใช้งานสำหรับบัญชีนี้
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="p-5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl space-y-3 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-sm text-emerald-900">
              ตั้งรหัสผ่านใหม่สำเร็จแล้ว!
            </h3>
            <p className="text-emerald-700 leading-relaxed">
              ระบบกำลังนำคุณไปยังหน้าบัญชีของคุณโดยอัตโนมัติ...
            </p>
            <div className="pt-2">
              <Link
                href="/account"
                className="inline-block px-5 py-2 bg-charcoal text-background rounded-lg text-xs font-medium"
              >
                ไปที่หน้าบัญชีทันที
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="new-password" className="block text-xs font-semibold text-charcoal mb-1">
                รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-background border border-line rounded-lg text-sm text-charcoal focus:outline-none focus:border-olive"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted hover:text-charcoal cursor-pointer"
                  aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-xs font-semibold text-charcoal mb-1">
                ยืนยันรหัสผ่านใหม่อีกครั้ง
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <span>กำลังบันทึกรหัสผ่านใหม่...</span>
                </>
              ) : (
                <span>บันทึกรหัสผ่านใหม่</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
