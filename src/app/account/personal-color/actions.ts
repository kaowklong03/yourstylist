"use server";

import { requireCustomerExperiencePage } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function savePersonalColorTone(tone: "warm" | "cool" | "neutral") {
  const user = await requireCustomerExperiencePage("/login/customer");
  const supabase = user.role === "admin" ? getAdminClient() : await createClient();

  await supabase
    .from("customer_preferences")
    .upsert({
      user_id: user.id,
      personal_color_tone: tone,
    });

  revalidatePath("/account/personal-color");
  revalidatePath("/account/profile");
  revalidatePath("/account");
}
