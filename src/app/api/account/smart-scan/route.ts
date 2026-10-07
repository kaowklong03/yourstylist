import { NextResponse } from "next/server";
import OpenAI from "openai";
import { requireCustomerExperienceApi } from "@/lib/auth";
import { requireSameOrigin } from "@/lib/request-security";
import { getWardrobeItems } from "@/lib/wardrobe";
import type { WardrobeItem } from "@/lib/types";

export const maxDuration = 30;

// Capsule fallback items if user wardrobe is currently empty
const defaultCapsuleItems: WardrobeItem[] = [
  {
    id: "def-1",
    user_id: "demo",
    name: "เสื้อเชิ้ตผ้าคอตตอนสีขาวมินิมอล",
    item_type: "top",
    subcategory: "shirt",
    primary_colors: ["ขาว"],
    styles: ["minimal", "clean"],
    material: "cotton",
    preferred_fit: "regular",
    formality: "smart_casual",
    weather_suitability: ["warm", "indoor"],
    ai_description: "เสื้อเชิ้ตสีขาวคลาสสิก",
    ai_tags: {},
    analysis_status: "completed",
    availability_status: "available",
    image_path: "/demo-assets/ad-linen-shirt.jpg",
    signed_image_url: "/demo-assets/ad-linen-shirt.jpg",
    is_favorite: true,
    last_worn_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "def-2",
    user_id: "demo",
    name: "กางเกงสแล็คทรงกระบอกตรงสีดำ",
    item_type: "bottom",
    subcategory: "pants",
    primary_colors: ["ดำ"],
    styles: ["tailored", "classic"],
    material: "polyester",
    preferred_fit: "regular",
    formality: "smart_casual",
    weather_suitability: ["all_weather"],
    ai_description: "กางเกงสแล็คสีดำทรงกระบอกตรง",
    ai_tags: {},
    analysis_status: "completed",
    availability_status: "available",
    image_path: "/images/fittoday/ad-pleated-pants.jpg",
    signed_image_url: "/images/fittoday/ad-pleated-pants.jpg",
    is_favorite: true,
    last_worn_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "def-3",
    user_id: "demo",
    name: "เบลเซอร์ผ้าลินินสีเบจทรงหลวม",
    item_type: "outerwear",
    subcategory: "blazer",
    primary_colors: ["เบจ"],
    styles: ["relaxed", "quiet_luxury"],
    material: "linen",
    preferred_fit: "relaxed",
    formality: "smart_casual",
    weather_suitability: ["all_weather"],
    ai_description: "เบลเซอร์ผ้าลินินสีเบจ",
    ai_tags: {},
    analysis_status: "completed",
    availability_status: "available",
    image_path: "/images/fittoday/ad-soft-tailored-set-v1.webp",
    signed_image_url: "/images/fittoday/ad-soft-tailored-set-v1.webp",
    is_favorite: true,
    last_worn_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "def-4",
    user_id: "demo",
    name: "รองเท้าโลฟเฟอร์หนังกลับสีเบจ-ครีม",
    item_type: "shoes",
    subcategory: "loafers",
    primary_colors: ["เบจ", "ขาว"],
    styles: ["minimal", "classic"],
    material: "leather",
    preferred_fit: "regular",
    formality: "smart_casual",
    weather_suitability: ["dry"],
    ai_description: "รองเท้าโลฟเฟอร์หนังกลับ",
    ai_tags: {},
    analysis_status: "completed",
    availability_status: "available",
    image_path: "/images/fittoday/ad-city-shoes.jpg",
    signed_image_url: "/images/fittoday/ad-city-shoes.jpg",
    is_favorite: true,
    last_worn_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
  },
];

export async function POST(request: Request) {
  if (!(await requireSameOrigin(request))) {
    return NextResponse.json({ error: "Origin ไม่ถูกต้อง" }, { status: 403 });
  }

  const { user } = await requireCustomerExperienceApi();
  if (!user) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบก่อนใช้งาน" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { imageBase64, price: rawPrice, itemName: customName, notes } = body || {};

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json({ error: "กรุณาอัปโหลดหรือถ่ายรูปเสื้อผ้าที่ต้องการสแกน" }, { status: 400 });
    }

    const price = typeof rawPrice === "number" ? rawPrice : Number(rawPrice) || null;

    // Fetch user's existing wardrobe
    let wardrobe = await getWardrobeItems(user.id);
    const isUsingDefaultCapsule = wardrobe.length === 0;
    if (isUsingDefaultCapsule) {
      wardrobe = defaultCapsuleItems;
    }

    // Step 1: Analyze candidate item via Vision AI or intelligent fallback
    let candidateInfo = {
      name: customName || "เสื้อผ้าชิ้นที่สแกน",
      category: "top",
      subcategory: "shirt",
      color: "โทนสีสว่าง/เอิร์ธโทน",
      material: "ผ้าทั่วไป",
      style: "casual/minimal",
      formality: "smart_casual",
      description: "เสื้อผ้าแฟชั่นพร้อมจับคู่",
    };

    if (process.env.OPENAI_API_KEY) {
      try {
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 15000, maxRetries: 1 });
        const visionResponse = await client.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `คุณคือ AI ผู้เชี่ยวชาญการวิเคราะห์เสื้อผ้าเพื่อการจับคู่กับตู้เสื้อผ้าเดิม
ตอบกลับเฉพาะ JSON รูปแบบ:
{
  "name": "ชื่อเรียกสินค้าภาษาไทยสั้นๆ",
  "category": "top | bottom | outerwear | shoes | dress | accessory",
  "subcategory": "เช่น blazer, shirt, t-shirt, jeans, trousers, sneakers, loafers, dress",
  "color": "สีหลัก เช่น ขาว, ครีม, ดำ, กรม, เบจ",
  "material": "เช่น ผ้าลินิน, คอตตอน, ผ้าวูล, ยีนส์",
  "style": "เช่น minimal, quiet luxury, streetwear, classic",
  "formality": "casual | smart_casual | formal",
  "description": "คำอธิบายดีเทล 1 ประโยค"
}`,
            },
            {
              role: "user",
              content: [
                { type: "text", text: `วิเคราะห์เสื้อผ้าชิ้นนี้ให้ละเอียด: ${notes || ""}` },
                { type: "image_url", image_url: { url: imageBase64 } },
              ],
            },
          ],
          response_format: { type: "json_object" },
        });

        const content = visionResponse.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          candidateInfo = {
            name: customName || parsed.name || candidateInfo.name,
            category: parsed.category || "top",
            subcategory: parsed.subcategory || "item",
            color: parsed.color || candidateInfo.color,
            material: parsed.material || candidateInfo.material,
            style: parsed.style || candidateInfo.style,
            formality: parsed.formality || candidateInfo.formality,
            description: parsed.description || candidateInfo.description,
          };
        }
      } catch (err) {
        console.warn("Vision AI analysis skipped or timed out, using fallback:", err);
      }
    }

    // Step 2: Calculate matches against user's wardrobe
    const candidateCategory = candidateInfo.category.toLowerCase();

    // Items that complement the candidate item
    const matchedWardrobeItems = wardrobe.filter((wItem) => {
      const wCat = (wItem.item_type || "").toLowerCase();
      if (candidateCategory === "top") {
        return wCat === "bottom" || wCat === "outerwear" || wCat === "shoes";
      }
      if (candidateCategory === "bottom") {
        return wCat === "top" || wCat === "outerwear" || wCat === "shoes";
      }
      if (candidateCategory === "outerwear") {
        return wCat === "top" || wCat === "bottom" || wCat === "shoes";
      }
      if (candidateCategory === "shoes") {
        return wCat === "top" || wCat === "bottom" || wCat === "outerwear";
      }
      if (candidateCategory === "dress") {
        return wCat === "outerwear" || wCat === "shoes";
      }
      return wCat !== candidateCategory;
    });

    // Calculate possible outfit combinations
    const tops = wardrobe.filter((i) => i.item_type === "top");
    const bottoms = wardrobe.filter((i) => i.item_type === "bottom");
    const outers = wardrobe.filter((i) => i.item_type === "outerwear");
    const shoes = wardrobe.filter((i) => i.item_type === "shoes");

    let potentialOutfitsCount = 1;
    if (candidateCategory === "top") {
      potentialOutfitsCount = Math.max(1, bottoms.length * Math.max(1, shoes.length));
    } else if (candidateCategory === "bottom") {
      potentialOutfitsCount = Math.max(1, tops.length * Math.max(1, shoes.length));
    } else if (candidateCategory === "outerwear") {
      potentialOutfitsCount = Math.max(1, tops.length * Math.max(1, bottoms.length));
    } else if (candidateCategory === "shoes") {
      potentialOutfitsCount = Math.max(1, tops.length * Math.max(1, bottoms.length));
    } else {
      potentialOutfitsCount = Math.max(2, matchedWardrobeItems.length);
    }

    // Cap outfit display realistically to 3-8
    const displayOutfitsCount = Math.min(8, Math.max(3, potentialOutfitsCount));

    // Calculate Versatility Score (0.0 - 10.0)
    let score = 8.5;
    if (matchedWardrobeItems.length >= 4) {
      score = 9.4;
    } else if (matchedWardrobeItems.length >= 2) {
      score = 7.8;
    } else {
      score = 4.8;
    }

    // Formulate verdict
    let verdict = {
      grade: "A+",
      title: "ซื้อได้เลย คุ้มค่ามาก! 🟢",
      badgeColor: "emerald",
      verdictText: "แนะนำให้ซื้อ",
      explanation: `ชิ้นนี้เข้ากับเสื้อผ้าในตู้เดิมของคุณได้อย่างสมบูรณ์แบบ สามารถหมุนเวียนแมตช์ได้มากถึง ${displayOutfitsCount} ลุคทันที ช่วยขยายศักยภาพของตู้เดิมได้คุ้มราคาแน่นอน`,
    };

    if (score < 6.0) {
      verdict = {
        grade: "C",
        title: "อย่าเพิ่งซื้อ! ในตู้ยังไม่มีของแมตช์ 🔴",
        badgeColor: "rose",
        verdictText: "ไม่แนะนำให้ซื้อ",
        explanation: "เสื้อผ้าชิ้นนี้มีโทนสีหรือทรงที่เข้ากับเสื้อผ้าในตู้เดิมได้ยาก หากซื้อไปมีโอกาสสูงที่จะถูกแขวนทิ้ง หรือคุณจะต้องเสียเงินซื้อชิ้นอื่นเพิ่มเพื่อมาใส่คู่กัน",
      };
    } else if (score < 8.0) {
      verdict = {
        grade: "B",
        title: "ซื้อได้ คุ้มค่าปานกลาง 🟡",
        badgeColor: "amber",
        verdictText: "พิจารณาตามความจำเป็น",
        explanation: `ชิ้นนี้แมตช์ได้กับเสื้อผ้าบางชิ้นในตู้ของคุณ (ประมาณ ${displayOutfitsCount} ลุค) เหมาะสำหรับใส่ในโอกาสเฉพาะ หากชอบจริงและมีงบสามารถซื้อได้ครับ`,
      };
    }

    // Cost Per Outfit
    const costPerOutfit = price ? Math.round(price / displayOutfitsCount) : null;

    // Generate 3 Styled Outfits using candidate item + user's wardrobe items
    const styledOutfits = [
      {
        direction: "Smart Workday (ทำงานเนี้ยบ)",
        name: `${candidateInfo.name} + ลุคโปรเฟสชันนอล`,
        notes: "จับคู่สร้างลุคที่ดูสุภาพ ภูมิฐาน เหมาะกับวันประชุมหรือพรีเซนต์งาน",
        items: [
          { role: "ชิ้นที่กำลังจะซื้อ", description: candidateInfo.name, isCandidate: true },
          ...matchedWardrobeItems.slice(0, 3).map((it) => ({
            role: it.item_type || "ไอเทมในตู้",
            description: it.name,
            imageUrl: it.signed_image_url,
            isCandidate: false,
          })),
        ],
      },
      {
        direction: "Casual Weekend (วันหยุดสบายๆ)",
        name: `${candidateInfo.name} + มินิมอลคาเฟ่`,
        notes: "ลุคผ่อนคลายแต่ดูมีสไตล์ ใส่ไปคาเฟ่ เดินห้าง หรือนัดทานข้าวกับเพื่อน",
        items: [
          { role: "ชิ้นที่กำลังจะซื้อ", description: candidateInfo.name, isCandidate: true },
          ...matchedWardrobeItems.slice(1, 4).map((it) => ({
            role: it.item_type || "ไอเทมในตู้",
            description: it.name,
            imageUrl: it.signed_image_url,
            isCandidate: false,
          })),
        ],
      },
      {
        direction: "Elevated Night (ดินเนอร์/อีเวนต์)",
        name: `${candidateInfo.name} + ลุคค่ำหรูหรา`,
        notes: "คอมพลีตลุคด้วยคัตติ้งเนี้ยบ ดึงเสน่ห์ของชิ้นใหม่และของเดิมออกมาเต็มที่",
        items: [
          { role: "ชิ้นที่กำลังจะซื้อ", description: candidateInfo.name, isCandidate: true },
          ...matchedWardrobeItems.slice(0, 2).map((it) => ({
            role: it.item_type || "ไอเทมในตู้",
            description: it.name,
            imageUrl: it.signed_image_url,
            isCandidate: false,
          })),
        ],
      },
    ];

    return NextResponse.json({
      success: true,
      candidateItem: candidateInfo,
      score,
      verdict,
      isUsingDefaultCapsule,
      potentialOutfitsCount: displayOutfitsCount,
      price,
      costPerOutfit,
      matchedWardrobeCount: matchedWardrobeItems.length,
      matchedItems: matchedWardrobeItems.slice(0, 6).map((it) => ({
        id: it.id,
        name: it.name,
        type: it.item_type,
        color: it.primary_colors?.[0] || "ตามภาพ",
        imageUrl: it.signed_image_url,
      })),
      styledOutfits,
      proTips: [
        `ชิ้นนี้มีโทนสี "${candidateInfo.color}" จัดเป็นสีที่แมตช์กับตู้เสื้อผ้าเอิร์ธโทนได้ง่าย`,
        price
          ? `หากใส่เฉลี่ยสัปดาห์ละ 1 ครั้งในรอบ 3 เดือน ต้นทุนจะลดลงเหลือเพียงครั้งละ ~${Math.round(price / 12)} บาทเท่านั้น!`
          : "การมีของเดิมในตู้รออยู่แล้ว ช่วยป้องกันการซื้อเสื้อผ้าแล้วกลายเป็น Deadstock ได้ 100%",
        "แนะนำให้ลองทรงและตรวจเช็กคัตติ้งตะเข็บก่อนจ่ายเงินเพื่อความมั่นใจสูงสุด",
      ],
    });
  } catch (error) {
    console.error("Smart-Buy Scanner API error:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง" }, { status: 500 });
  }
}
