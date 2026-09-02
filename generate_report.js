const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} = require("docx");

async function generateDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "TH Sarabun New",
            size: 32, // 16pt
            color: "222222",
          },
          paragraph: {
            spacing: { line: 360, before: 120, after: 120 },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch
          },
        },
        children: [
          // Title Cover Block
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 720, after: 240 },
            children: [
              new TextRun({
                text: "รายงานแผนพัฒนานวัตกรรมทางธุรกิจ",
                size: 52, // 26pt
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 480 },
            children: [
              new TextRun({
                text: "รายวิชา: การสร้างสรรค์และพัฒนานวัตกรรมทางธุรกิจ (Business Innovation and Creative Development)",
                size: 36, // 18pt
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 240, after: 720 },
            children: [
              new TextRun({
                text: "ชื่อโครงการนวัตกรรม: YourStylist\nแพลตฟอร์มตู้เสื้อผ้าอัจฉริยะและการจัดสไตล์ด้วย AI ผสานเครือข่ายร้านค้าพันธมิตร\n(AI-Powered Smart Wardrobe & Contextual Fashion Ecosystem)",
                size: 38, // 19pt
                bold: true,
                color: "111827",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 480, after: 960 },
            children: [
              new TextRun({
                text: "----------------------------------------------------------------------------------------------------",
                color: "cbd5e1",
              }),
            ],
          }),

          // Executive Summary
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 480, after: 240 },
            children: [
              new TextRun({
                text: "บทสรุปผู้บริหาร (Executive Summary)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "โครงการ YourStylist เป็นนวัตกรรมทางธุรกิจประเภท Service & Business Model Innovation ที่ถูกพัฒนาขึ้นเพื่อแก้ปัญหาความเจ็บปวด (Pain Points) สำคัญสองด้านในอุตสาหกรรมแฟชั่นยุคปัจจุบัน ได้แก่ ปัญหาความเหนื่อยล้าในการตัดสินใจเลือกเสื้อผ้าของผู้บริโภค (Closet Paralysis & Decision Fatigue) ที่แม้จะมีเสื้อผ้าเต็มตู้แต่ไม่รู้จะใส่อะไร และปัญหาของร้านค้าแฟชั่นอิสระ (Fashion SMEs) ที่ต้องเผชิญกับค่าโฆษณาดิจิทัลที่สูงขึ้นแต่ผู้บริโภคเกิดความรำคาญ (Ad Blindness)",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "YourStylist สร้างสรรค์ทางออกด้วยการผสมผสาน 3 เสาหลักทางเทคโนโลยีและการออกแบบธุรกิจ: (1) Smart Digital Wardrobe แปลงเสื้อผ้าจริงของผู้ใช้เป็นสินทรัพย์ดิจิทัล (2) Independent AI Stylist สไตลิสต์ปัญญาประดิษฐ์ที่วิเคราะห์จัดชุด 3 ทิศทาง (Safe, Elevated, Comfortable) อิงตามกาลเทศะ สภาพอากาศ กิจวัตร 7 วัน โทนสีผิว (Personal Color) และประวัติการใส่เพื่อเลี่ยงการใส่ซ้ำ และ (3) Missing Item Matching นวัตกรรมโมเดลธุรกิจที่เปลี่ยนการยิงโฆษณาที่น่ารำคาญ ให้กลายเป็นการ 'เติมเต็มชิ้นส่วนเสื้อผ้าที่ขาดในตู้' อย่างตรงจุดและโปร่งใส 100%",
              }),
            ],
          }),

          // Section 1: Problems & Customer Pain Points
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "บทที่ 1: การระบุปัญหาและ Pain Points ของกลุ่มลูกค้าเป้าหมาย",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "การพัฒนานวัตกรรมทางธุรกิจที่ประสบความสำเร็จต้องเริ่มต้นจากการทำความเข้าใจปัญหาที่แท้จริง (Root Causes) ของผู้มีส่วนได้ส่วนเสียในระบบนิเวศ โครงการ YourStylist ได้วิเคราะห์และระบุกลุ่มลูกค้าออกเป็น 2 กลุ่มหลัก ดังนี้:",
              }),
            ],
          }),

          // Subsection 1.1: Consumer
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "1.1 กลุ่มผู้บริโภคทั่วไป (Customer / Consumer Segment)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "กลุ่มเป้าหมายคือคนรุ่นใหม่ วัยทำงาน (First Jobbers & Professionals) และนักศึกษา ที่ให้ความสำคัญกับภาพลักษณ์ แต่ประสบปัญหาดังต่อไปนี้:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ปรากฏการณ์ 'เสื้อผ้าเต็มตู้แต่ไม่มีอะไรจะใส่' (Closet Paralysis): " }),
              new TextRun("ผู้บริโภคสะสมเสื้อผ้าเฉลี่ยกว่า 50-100 ชิ้น แต่เมื่อเปิดตู้กลับนึกไม่ออกว่าจะหยิบชิ้นไหนมาจับคู่กับชิ้นไหน เพราะมองไม่เห็นภาพรวมของตู้เสื้อผ้า ส่งผลให้เสื้อผ้ากว่า 60% ถูกลืมทิ้งไว้"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ความเหนื่อยล้าในการตัดสินใจทุกเช้า (Morning Decision Fatigue): " }),
              new TextRun("การต้องใช้เวลา 15-30 นาทีทุกเช้าเพื่อลองเสื้อผ้า ถอดเปลี่ยน ส่องกระจกซ้ำๆ ทำให้สูญเสียพลังสมอง เกิดความเครียด และเริ่มต้นวันด้วยความเร่งรีบ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ความกังวลเรื่องการใส่ชุดซ้ำ (Fear of Repeating Outfits): " }),
              new TextRun("ในสภาพแวดล้อมการทำงานหรือมหาวิทยาลัย ผู้บริโภคมักกังวลว่าเพื่อนร่วมงานจะสังเกตเห็นการใส่ชุดเดิมซ้ำในเวลาใกล้เคียงกัน แต่ไม่มีเครื่องมือช่วยบันทึกหรือวางแผนหมุนเวียนชุดอย่างเป็นระบบ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "4. ปัญหากาลเทศะและสภาพอากาศเมืองไทย (Context & Weather Mismatch): " }),
              new TextRun("สภาพอากาศในไทยมีความผันผวนสูง (ร้อนอบอ้าว กลางแจ้งแดดจัด แต่ในออฟฟิศแอร์หนาวจัด หรือฝนตกกะทันหัน) การแต่งตัวที่ไม่สอดคล้องกับสภาพแวดล้อมทำให้ไม่สบายตัว และบางครั้งอาจไม่ตรงกับระดับความเป็นทางการของงาน"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "5. ความไม่มั่นใจในโทนสีที่ขับผิว (Personal Color Mismatch): " }),
              new TextRun("ผู้บริโภคจำนวนมากเลือกซื้อสีเสื้อตามกระแสนิยม แต่เมื่อใส่จริงกลับทำให้ใบหน้าดูหมองคล้ำ ซีดเซียว เนื่องจากไม่ตรงกับโทนสีผิวประจำตัว (Skin Undertone)"),
            ],
          }),

          // Subsection 1.2: Merchant
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "1.2 กลุ่มร้านค้าแฟชั่นอิสระ (Merchant / Fashion SME Segment)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "กลุ่มร้านค้าเสื้อผ้าอิสระ ผู้ประกอบการขนาดย่อม และแบรนด์ดีไซเนอร์ไทย เผชิญกับปัญหาเชิงโครงสร้างทางธุรกิจ:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ต้นทุนค่าโฆษณาดิจิทัลพุ่งสูง (Skyrocketing Customer Acquisition Cost - CAC): " }),
              new TextRun("การประมูลโฆษณาบน Meta, TikTok หรือ Google แข่งกับ Fast Fashion รายใหญ่ ทำให้ต้นทุนต่อคลิก (CPC) สูงขึ้นอย่างต่อเนื่อง ในขณะที่อัตราการซื้อจริง (Conversion Rate) ลดลง"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ภาวะผู้บริโภคตาบอดโฆษณา (Ad Blindness & Distrust): " }),
              new TextRun("ผู้บริโภคมีแนวโน้มเลื่อนผ่านหรือใช้เครื่องมือปิดกั้นโฆษณา เนื่องจากรู้สึกว่าถูกยัดเยียดสิ่งที่ไม่ต้องการในจังหวะที่ไม่เหมาะสม"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ขาดบริบทความต้องการที่แม่นยำ (Lack of Contextual Intent): " }),
              new TextRun("ร้านค้าไม่สามารถล่วงรู้ได้ว่า 'ลูกค้าคนไหนกำลังขาดเสื้อผ้าชิ้นใดในตู้' เพื่อที่จะเสนอสินค้าเข้าไปเติมเต็มความต้องการได้อย่างแม่นยำในจังหวะที่พร้อมซื้อ"),
            ],
          }),

          // Section 2: Solution & Creativity
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "บทที่ 2: วิธีการแก้ไขปัญหาด้วยนวัตกรรมและความคิดสร้างสรรค์",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "YourStylist ได้นำเสนอกรอบแนวคิดการแก้ปัญหาผ่านนวัตกรรมทางธุรกิจที่มีความคิดสร้างสรรค์ (Creative Business Innovation) โดยเปลี่ยนกระบวนทัศน์จาก 'การผลักดันให้ซื้อเสื้อผ้าใหม่ตลอดเวลา' สู่ 'การบริหารจัดการสินทรัพย์ในตู้เดิมให้คุ้มค่าสูงสุด พร้อมเติมเต็มเฉพาะสิ่งที่ขาด':",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 180 },
            children: [
              new TextRun({
                text: "2.1 นวัตกรรมโมเดล 'Missing Item Matching' (สะพานเชื่อมตู้เสื้อผ้ากับร้านค้า)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "นี่คือหัวใจแห่งความคิดสร้างสรรค์ของ YourStylist ที่เปลี่ยนรูปแบบการโฆษณาแบบเดิม (Disruptive Advertising) ให้กลายเป็น 'บริการเติมเต็มคุณค่า' (Value-Added Matching):\n" +
                "• เมื่อ AI วิเคราะห์ชุดจากตู้เสื้อผ้าของผู้ใช้ และพบว่าลุคที่เหมาะสมนั้นขาดชิ้นส่วนสำคัญที่ในตู้ยังไม่มี (เช่น 'ลุคนี้จัดทรงสมาร์ต แต่ในตู้ขาดเสื้อเบลเซอร์สีกรมท่าหรือรองเท้าโลฟเฟอร์')\n" +
                "• ระบบจะไม่บอกแค่ว่าขาดอะไร แต่จะทำการจับคู่ (Contextual Semantic Match) กับสินค้าของร้านค้าพันธมิตรที่มีไอเทมตรงกับสเปกนั้น\n" +
                "• แสดงผลในรูปแบบการ์ดสินค้าแนะนำขนาดกะทัดรัด พร้อมระบุป้าย 'โฆษณา' อย่างโปร่งใส 100%\n" +
                "• ผลลัพธ์: ลูกค้าได้ทางออกในการเติมเต็มชุดที่สมบูรณ์ ในขณะที่ร้านค้าได้ลูกค้าที่มีความต้องการแท้จริง (High Purchase Intent) โดยไม่รู้สึกว่าถูกยัดเยียด",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 180 },
            children: [
              new TextRun({
                text: "2.2 นวัตกรรมจริยธรรมความโปร่งใส 100% (Ethical & Independent AI)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "จุดเด่นที่สร้างความแตกต่างอย่างแท้จริงจากแพลตฟอร์มแฟชั่นทั่วไป คือ YourStylist ยึดมั่นใน 'จริยธรรมปัญญาประดิษฐ์' (AI Ethics):\n" +
                "• ระบบแยกคำแนะนำแฟชั่นของ AI Stylist ออกจากโฆษณาสปอนเซอร์โดยเด็ดขาด 100%\n" +
                "• AI จะเลือกสิ่งที่ดีที่สุดจากตู้เสื้อผ้าของผู้ใช้จริงเป็นอันดับแรกเสมอ ไม่มีการแอบรับสปอนเซอร์เพื่อดันสินค้าให้ผู้ใช้ซื้อของที่ไม่จำเป็น\n" +
                "• โฆษณาที่ปรากฏจะถูกติดป้ายกำกับชัดเจน และมีระบบคำอธิบายความเกี่ยวข้อง (Relevance Transparency) ทำให้ผู้ใช้ไว้วางใจในคำแนะนำของแพลตฟอร์มสูงสุด",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 180 },
            children: [
              new TextRun({
                text: "2.3 นวัตกรรมการจัดสไตล์เชิงบริบท (Multi-Dimensional Context Engine)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "AI ของ YourStylist ไม่ได้จัดชุดแบบสุ่ม แต่ใช้เครื่องมือประมวลผลข้อมูลหลายมิติพร้อมกัน:\n" +
                "1. ปัจจัยด้านกิจวัตร 7 วัน (Weekly Style Memory): รับรู้กิจกรรมประจำสัปดาห์ของผู้ใช้\n" +
                "2. ปัจจัยด้านสภาพอากาศเมืองไทย (Real-time Thai Weather Logic): คำนวณความร้อนชื้น การเลเยอร์เนื้อผ้า\n" +
                "3. ปัจจัยด้านกาลเทศะ (Formality Level): แยกแยะ Safe (ใส่ง่าย), Elevated (แต่งขึ้น), Comfortable (เน้นสบาย)\n" +
                "4. ปัจจัยโทนสีผิวประจำตัว (Personal Color / Undertone): ขับเน้นสีเสื้อผ้าที่ทำให้ใบหน้าสว่างสดใส\n" +
                "5. ปัจจัยการสลับชุดซ้ำ (Smart Repeat Avoidance): คำนวณประวัติการใส่เพื่อกระจายการใช้งานเสื้อผ้าทุกชิ้นอย่างคุ้มค่า",
              }),
            ],
          }),

          // Section 3: Feature Matrix by Role
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "บทที่ 3: สถาปัตยกรรมและฟีเจอร์ของระบบจำแนกตาม Role ทั้งหมด",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "โครงสร้างระบบของ YourStylist ถูกออกแบบตามหลักสถาปัตยกรรม Role-Based Access Control (RBAC) แบ่งออกเป็น 3 บทบาทหลักที่เกื้อหนุนกันในระบบนิเวศ ดังนี้:",
              }),
            ],
          }),

          // 3.1 Customer Role
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "3.1 Role: ลูกค้าผู้ใช้งาน (Customer & Pro Member)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "เป็นศูนย์กลางของประสบการณ์ใช้งานแฟชั่นส่วนบุคคล ประกอบด้วยฟีเจอร์เด่นดังนี้:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ตู้เสื้อผ้าดิจิทัล (Smart Digital Wardrobe): " }),
              new TextRun("อัปโหลดภาพเสื้อผ้าพร้อมระบบสกัดสีและประเภทอัตโนมัติ จัดเก็บข้อมูลหมวดหมู่ สถานะความพร้อมใส่ และจัดการคอลเลกชันส่วนตัวได้อย่างง่ายดาย"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ปัญญาประดิษฐ์จัดสไตล์ (Independent AI Stylist): " }),
              new TextRun("มี 2 โหมดหลัก ได้แก่ 'โหมดทั่วไป' (General Inspiration) สำหรับหาไอเดียชุด และ 'โหมดตู้เสื้อผ้า' (Wardrobe Mode) จัดชุดจากเสื้อผ้าที่มีอยู่จริง ตอบลุค 3 ทิศทาง (Safe, Elevated, Comfortable) พร้อมคำอธิบายเหตุผลและคำแนะนำความสบาย"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ระบบจับคู่ชิ้นที่ขาด (Missing Item Matching): " }),
              new TextRun("แสดงกล่องแจ้งเตือนชิ้นส่วนที่ขาดในลุคนั้น พร้อมแสดงการ์ดสินค้าแนะนำจากร้านค้าพันธมิตรที่เข้าคู่กันได้ทันทีแบบโปร่งใส"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "4. กิจวัตรและสไตล์ (Weekly Style Memory): " }),
              new TextRun("บันทึกข้อมูลกิจกรรมประจำวันจันทร์-อาทิตย์ เช่น วันจันทร์ไปเรียนเช้า วันเสาร์ไปคาเฟ่ เพื่อเป็นฐานข้อมูลบริบทให้ AI ใช้งาน"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "5. วางแผนลุค 7 วัน (Weekly Planner): " }),
              new TextRun("หน้าปฏิทินแสดงภาพรวมลุคทั้งสัปดาห์ มีปุ่มกดจัดชุดของแต่ละวันด้วย AI ในคลิกเดียว โดยดึงข้อมูลกิจกรรม กาลเทศะ และช่วงเวลาที่ตั้งไว้มากรอกให้อัตโนมัติ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "6. วิเคราะห์โทนสีประจำตัว (Personal Color / Undertone Quiz): " }),
              new TextRun("แบบทดสอบเชิงลึก 4 ข้อ (สีเส้นเลือด, เครื่องประดับทอง/เงิน, แดดเผา, เสื้อขาว) วิเคราะห์จำแนก Warm, Cool หรือ Neutral พร้อมแสดงพาเลทสีที่ช่วยขับผิว 8 เฉดสี และพาเลทสีที่ควรระวัง เชื่อมต่อเข้ากับ AI Stylist ให้อัตโนมัติ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "7. อัลกอริทึมป้องกันการใส่ซ้ำ (Smart Repeat Avoidance): " }),
              new TextRun("บันทึกประวัติการใส่ชุดประจำวัน (Wear Logs) เพื่อคำนวณและลดโอกาสที่ AI จะจัดเสื้อผ้าตัวเดิมซ้ำในรอบสัปดาห์"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "8. ประวัติและชุดที่บันทึกไว้ (Outfit History & Favorites): " }),
              new TextRun("บันทึกชุดที่ชอบ เก็บประวัติคำแนะนำของ AI ย้อนหลัง และบันทึกโฆษณาสินค้าที่กดถูกใจ (Liked Ads)"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "9. ปรับแต่งธีมการแสดงผล (Appearance Customization - Pro): " }),
              new TextRun("สำหรับสมาชิก Pro สามารถปรับธีมแอปพลิเคชัน (Light / Dark / System) และเลือกสีหลัก (Accent Color: Olive, Navy, Mono) พร้อม Live Preview ทันที"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "10. ความเป็นส่วนตัวและความปลอดภัย (Privacy & Danger Zone): " }),
              new TextRun("สิทธิ์ในการเปิด/ปิดสัญญาณข้อมูลเพื่อการโฆษณา, ปุ่มรีเซ็ตสัญญาณความสนใจ, และฟังก์ชันส่งคำขอลบบัญชีถาวรตามมาตรฐาน PDPA"),
            ],
          }),

          // 3.2 Merchant Role
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "3.2 Role: ร้านค้าพันธมิตร (Merchant / Shop Partner)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "เครื่องมือทางธุรกิจสำหรับร้านค้าแฟชั่นในการเข้าถึงกลุ่มลูกค้าที่มีความต้องการจริง:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. การจัดการโปรไฟล์และแบรนดิ้งร้านค้า (Shop Branding): " }),
              new TextRun("ตั้งค่าข้อมูลร้านค้า, ลิงก์โซเชียลมีเดีย (Instagram, Website, Shopee), อัปโหลดโลโก้ร้านค้า (1:1) และภาพหน้าปกร้าน (Cover Banner) จัดเก็บในระบบ Storage ที่ปลอดภัย"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. หน้าร้านค้าสาธารณะ (Public Shop Storefront): " }),
              new TextRun("หน้ารวมสินค้าและโฆษณาของร้านค้าที่ URL เฉพาะ (/shops/[slug]) พร้อมระบบแบ่งหน้า (Pagination 20 รายการ/หน้า) และเลย์เอาต์ที่จัดวางชื่อร้านไม่ให้ทับรูปหน้าปก"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ระบบสร้างและจัดการแคมเปญโฆษณา (Ad Campaign Manager): " }),
              new TextRun("สร้างโฆษณาสินค้า กำหนดรูปภาพปกและแกลเลอรี, หัวข้อ, รายละเอียด, ประเภทโฆษณา (สินค้าเดี่ยว/เซตชุด/โปรโมชัน), ราคา, หมวดหมู่ และแท็กสไตล์"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "4. ระบบบริหารงบประมาณและประมาณการต้นทุน (Budget & Cost Estimator): " }),
              new TextRun("กำหนดงบประมาณโฆษณา คำนวณต้นทุนต่อคลิก (CPC) และระบบยืนยันค่าใช้จ่ายก่อนเริ่มแคมเปญ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "5. แดชบอร์ดวิเคราะห์ผลลัพธ์แบบเรียลไทม์ (Real-time Analytics): " }),
              new TextRun("ติดตามตัวชี้วัดสำคัญ ได้แก่ ยอดการมองเห็น (Impressions ผ่านระบบ Beacon ตรวจจับความถูกต้อง), ยอดคลิกจริง (Verified Clicks), อัตราการคลิกต่อการมองเห็น (CTR), จำนวนผู้กดถูกใจ, และงบประมาณคงเหลือ"),
            ],
          }),

          // 3.3 Admin Role
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "3.3 Role: ผู้ดูแลระบบ (Admin / Platform Governance)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ศูนย์ควบคุมมาตรฐาน ความโปร่งใส และความปลอดภัยของแพลตฟอร์ม:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ระบบตรวจสอบและอนุมัติร้านค้า (Shop Approval Workflow): " }),
              new TextRun("คัดกรองและตรวจสอบความถูกต้องของร้านค้าที่ลงทะเบียนใหม่ เพื่อป้องกันมิจฉาชีพและสินค้าที่ไม่ได้มาตรฐาน"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ระบบตรวจสอบคุณภาพและจริยธรรมโฆษณา (Ad Moderation Engine): " }),
              new TextRun("ตรวจสอบเนื้อหา รูปภาพ และคำบรรยายโฆษณาให้อยู่ในมาตรฐานจริยธรรมแฟชั่น ไม่มีการวิจารณ์รูปร่าง (Body Shaming) หรือการโฆษณาหลอกลวง"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ระบบบันทึกประวัติความโปร่งใส (Immutable Audit Logs): " }),
              new TextRun("บันทึกทุกการตัดสินใจ การอนุมัติ การปฏิเสธ และการปรับเปลี่ยนสถานะ พร้อมระบุเวลาและเหตุผลที่สามารถตรวจสอบย้อนหลังได้"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "4. การจัดการบทบาทและความปลอดภัย (Role & Identity Management): " }),
              new TextRun("ระบบ Row Level Security (RLS) และ Role-based Guardrails ป้องกันการเข้าถึงข้อมูลข้ามสิทธิ์อย่างเข้มงวด"),
            ],
          }),

          // Summary Comparison Table
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "3.4 ตารางสรุปฟังก์ชันการทำงานแยกตาม Role",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "1e3a8a" },
                    children: [new Paragraph({ children: [new TextRun({ text: "โมดูล / ฟีเจอร์", bold: true, color: "ffffff" })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "1e3a8a" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Customer", bold: true, color: "ffffff" })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "1e3a8a" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Merchant", bold: true, color: "ffffff" })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: "1e3a8a" },
                    children: [new Paragraph({ children: [new TextRun({ text: "Admin", bold: true, color: "ffffff" })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ตู้เสื้อผ้าดิจิทัลส่วนตัว (Wardrobe)")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("เต็มรูปแบบ (CRUD)")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("AI Stylist 3 ทิศทาง")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ใช้งานได้")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("โหมดทดสอบ")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("Missing Item Matching")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ดูคำแนะนำ + ไอเทมร้าน")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ได้รับโอกาส Match")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ควบคุมคุณภาพ")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("Personal Color Quiz & Undertone")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("วิเคราะห์ + บันทึกพาเลท")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("วางแผนลุค 7 วัน (Weekly Planner)")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("จัดชุด 1 คลิก")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ระบบโฆษณาและแคมเปญ (Ads Engine)")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ดูโฆษณาโปร่งใส/กดถูกใจ")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("สร้าง/ยิงแอด/คุมงบ")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("อนุมัติ/ระงับแอด")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("การจัดการร้านค้าและแบรนดิ้ง")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("เข้าชมหน้าร้านค้า")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("อัปโหลด Logo/Cover")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("อนุมัติการเปิดร้าน")] })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("Audit Logs & ความโปร่งใส")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("-")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ดูสถิติคลิก/การมองเห็น")] })] }),
                  new TableCell({ children: [new Paragraph({ children: [new TextRun("ดูประวัติบันทึกทั้งหมด")] })] }),
                ],
              }),
            ],
          }),

          // Section 4: Business Model & Sustainability
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "บทที่ 4: แบบจำลองธุรกิจและความยั่งยืน (Business Model & Monetization)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "YourStylist ออกแบบโครงสร้างรายได้แบบ Multi-Sided Revenue Model ที่สร้างความสมดุลระหว่างผลประโยชน์ของผู้ใช้และความสามารถในการทำกำไร:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. B2C Subscription (สมาชิก Pro Tier): " }),
              new TextRun("รายได้ค่าสมาชิกรายเดือน/รายปี สำหรับผู้ใช้ที่ต้องการฟีเจอร์ระดับสูง เช่น ไม่จำกัดจำนวนเสื้อผ้าในตู้, Smart Repeat Avoidance แบบเต็มขั้น, Personal Color AI Stylist, และการปรับแต่งธีม"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. B2B Performance-based Advertising (CPC / Missing Item Match): " }),
              new TextRun("รายได้จากร้านค้าพันธมิตร คิดค่าใช้จ่ายตามผลลัพธ์จริง (Pay-per-Click) เมื่อผู้ใช้คลิกดูสินค้าที่นำเสนอผ่านระบบ Missing Item Matching ซึ่งให้อัตราความคุ้มค่าแก่ร้านค้าสูงกว่าโซเชียลมีเดียทั่วไป"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ส่งเสริมเศรษฐกิจหมุนเวียน (Circular Fashion & Sustainability): " }),
              new TextRun("ช่วยลดขยะแฟชั่น (Fashion Waste) ด้วยการเพิ่มอัตราการใช้เสื้อผ้าเดิมซ้ำ (Higher Cost-per-Wear) ตอบสนองต่อเป้าหมายการพัฒนาที่ยั่งยืน (SDG Goal 12: Responsible Consumption and Production)"),
            ],
          }),

          // Section 5: Conclusion
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "บทที่ 5: สรุปผลและคุณค่าทางนวัตกรรม (Conclusion & Innovation Impact)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "โครงการ YourStylist มิใช่เพียงแค่แอปพลิเคชันแนะนำเสื้อผ้าทั่วไป แต่เป็น 'ระบบนิเวศนวัตกรรมแฟชั่นอัจฉริยะ' ที่พิสูจน์ให้เห็นว่าความต้องการของผู้บริโภค จริยธรรมของเทคโนโลยี และการเติบโตของธุรกิจร้านค้า สามารถดำเนินควบคู่กันได้อย่างลงตัว\n\n" +
                "การระบุปัญหาที่ชัดเจนตั้งแต่ Closet Paralysis ของผู้บริโภค ไปจนถึง High CAC ของร้านค้า ทำให้เกิดนวัตกรรมสร้างสรรค์ Missing Item Matching และ Smart Wardrobe Intelligence ที่สร้างคุณค่าแบบ Win-Win ให้กับทุกฝ่าย นับเป็นกรณีศึกษาที่สมบูรณ์แบบสำหรับรายวิชาการสร้างสรรค์และพัฒนานวัตกรรมทางธุรกิจ",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join("c:", "Users", "Lenovo", "OneDrive", "Desktop", "code", "fasion", "YourStylist_Business_Innovation_Report.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Successfully generated:", outPath);
}

generateDocx().catch((err) => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
