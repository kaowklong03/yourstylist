"use client";

import { useState, useTransition } from "react";
import { saveAppearanceSettings } from "@/app/account/settings/appearance-actions";
import { Palette, Lock, Check } from "lucide-react";

export function AppearanceSettingsForm({
  isPro,
  currentSettings,
}: {
  isPro: boolean;
  currentSettings: { theme?: string; accent?: string };
}) {
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const initialTheme = currentSettings?.theme || "system";
  const initialAccent =
    (currentSettings?.accent === "monochrome" ? "mono" : currentSettings?.accent) || "olive";

  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedAccent, setSelectedAccent] = useState(initialAccent);

  const applyPreview = (theme: string, accent: string) => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("data-accent", accent);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    applyPreview(newTheme, selectedAccent);
  };

  const handleAccentChange = (newAccent: string) => {
    setSelectedAccent(newAccent);
    applyPreview(selectedTheme, newAccent);
  };

  if (!isPro) {
    return (
      <div className="border border-line bg-paper p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase border-b border-line pb-4">
          <Palette className="w-4 h-4 text-olive" />
          <span>Appearance / ธีมและการแสดงผล</span>
        </div>
        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-lg">
          <Lock className="w-6 h-6 text-muted-foreground" />
          <div>
            <p className="font-bold text-sm">อัปเกรด Pro เพื่อปลดล็อก</p>
            <p className="text-xs text-muted-foreground">
              ปรับแต่งธีม (Light/Dark/System) และสีหลักของแอปพลิเคชันได้เมื่อคุณเป็นสมาชิก Pro
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line bg-paper p-6 sm:p-8 space-y-6">
      <div className="space-y-1 border-b border-line pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-muted uppercase">
          <Palette className="w-4 h-4 text-olive" />
          <span>Appearance / ธีมและการแสดงผล (Pro)</span>
        </div>
        <h2 className="font-serif text-2xl font-normal text-charcoal">ปรับแต่งการแสดงผล</h2>
      </div>

      <form
        action={(formData) => {
          setSavedSuccess(false);
          startTransition(async () => {
            await saveAppearanceSettings(formData);
            applyPreview(selectedTheme, selectedAccent);
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
          });
        }}
        className="space-y-6"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              ธีมของแอป (Theme)
            </label>
            <div className="grid grid-cols-3 gap-4">
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={selectedTheme === "light"}
                  onChange={() => handleThemeChange("light")}
                  className="sr-only peer"
                />
                <div
                  className={`w-full h-16 border rounded bg-white transition-all ${
                    selectedTheme === "light"
                      ? "border-olive ring-2 ring-olive shadow-sm"
                      : "border-line hover:border-muted"
                  }`}
                ></div>
                <span
                  className={`text-xs ${
                    selectedTheme === "light" ? "font-semibold text-olive" : "text-muted"
                  }`}
                >
                  Light
                </span>
              </label>
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={selectedTheme === "dark"}
                  onChange={() => handleThemeChange("dark")}
                  className="sr-only peer"
                />
                <div
                  className={`w-full h-16 border rounded bg-slate-900 transition-all ${
                    selectedTheme === "dark"
                      ? "border-olive ring-2 ring-olive shadow-sm"
                      : "border-line hover:border-muted"
                  }`}
                ></div>
                <span
                  className={`text-xs ${
                    selectedTheme === "dark" ? "font-semibold text-olive" : "text-muted"
                  }`}
                >
                  Dark
                </span>
              </label>
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="theme"
                  value="system"
                  checked={selectedTheme === "system"}
                  onChange={() => handleThemeChange("system")}
                  className="sr-only peer"
                />
                <div
                  className={`w-full h-16 border rounded bg-gradient-to-br from-white to-slate-900 transition-all ${
                    selectedTheme === "system"
                      ? "border-olive ring-2 ring-olive shadow-sm"
                      : "border-line hover:border-muted"
                  }`}
                ></div>
                <span
                  className={`text-xs ${
                    selectedTheme === "system" ? "font-semibold text-olive" : "text-muted"
                  }`}
                >
                  System
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              สีหลัก (Accent Color)
            </label>
            <div className="flex gap-6">
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accent"
                  value="olive"
                  checked={selectedAccent === "olive"}
                  onChange={() => handleAccentChange("olive")}
                  className="sr-only peer"
                />
                <div
                  className={`w-9 h-9 rounded-full bg-[#526042] transition-all flex items-center justify-center text-white ${
                    selectedAccent === "olive"
                      ? "ring-2 ring-offset-2 ring-[#526042] shadow-sm scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {selectedAccent === "olive" && <Check className="w-4 h-4" />}
                </div>
                <span
                  className={`text-xs ${
                    selectedAccent === "olive" ? "font-semibold text-charcoal" : "text-muted"
                  }`}
                >
                  Olive
                </span>
              </label>
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accent"
                  value="navy"
                  checked={selectedAccent === "navy"}
                  onChange={() => handleAccentChange("navy")}
                  className="sr-only peer"
                />
                <div
                  className={`w-9 h-9 rounded-full bg-blue-900 transition-all flex items-center justify-center text-white ${
                    selectedAccent === "navy"
                      ? "ring-2 ring-offset-2 ring-blue-900 shadow-sm scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {selectedAccent === "navy" && <Check className="w-4 h-4" />}
                </div>
                <span
                  className={`text-xs ${
                    selectedAccent === "navy" ? "font-semibold text-charcoal" : "text-muted"
                  }`}
                >
                  Navy
                </span>
              </label>
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accent"
                  value="mono"
                  checked={selectedAccent === "mono"}
                  onChange={() => handleAccentChange("mono")}
                  className="sr-only peer"
                />
                <div
                  className={`w-9 h-9 rounded-full bg-slate-800 transition-all flex items-center justify-center text-white ${
                    selectedAccent === "mono"
                      ? "ring-2 ring-offset-2 ring-slate-800 shadow-sm scale-105"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {selectedAccent === "mono" && <Check className="w-4 h-4" />}
                </div>
                <span
                  className={`text-xs ${
                    selectedAccent === "mono" ? "font-semibold text-charcoal" : "text-muted"
                  }`}
                >
                  Mono
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-line flex items-center gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-charcoal text-background hover:bg-olive font-medium text-xs rounded-none transition-colors disabled:opacity-50 inline-flex items-center gap-2 cursor-pointer"
          >
            {isPending ? "กำลังบันทึก..." : "บันทึกการตั้งค่าธีม"}
          </button>
          {savedSuccess && (
            <span className="text-xs text-olive font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> บันทึกเรียบร้อยแล้ว
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
