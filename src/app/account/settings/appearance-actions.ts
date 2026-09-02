"use server";

import { createClient } from "@/lib/supabase/server";
import { requireCustomerExperiencePage } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabase/admin";

export async function saveAppearanceSettings(formData: FormData) {
  const user = await requireCustomerExperiencePage("/login/customer");
  const rawTheme = (formData.get("theme") as string) || "light";
  const rawAccent = (formData.get("accent") as string) || "olive";

  const theme = ["light", "dark", "system"].includes(rawTheme) ? rawTheme : "light";
  const accent = rawAccent === "monochrome" ? "mono" : rawAccent;

  const supabase = user.role === "admin" ? getAdminClient() : await createClient();
  
  await supabase
    .from("customer_preferences")
    .upsert({
      user_id: user.id,
      appearance_theme: theme,
      appearance_accent: accent,
    });

  const cookieStore = await cookies();
  cookieStore.set("appearance_theme", theme, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  cookieStore.set("appearance_accent", accent, { path: "/", maxAge: 60 * 60 * 24 * 365 });

  revalidatePath("/");
  revalidatePath("/account/settings");
}
