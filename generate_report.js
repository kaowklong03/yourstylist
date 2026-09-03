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
  console.log("Generating Comprehensive Academic DOCX Report...");

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
            spacing: { before: 0, after: 360 },
            children: [
              new TextRun({
                text: "Midterm Project: Innovation Venture Pitch",
                size: 40, // 20pt
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 480 },
            children: [
              new TextRun({
                text: "รายวิชา: 0903 464 การสร้างสรรค์และพัฒนานวัตกรรมทางธุรกิจ\n(Business Innovation and Creative Development)",
                size: 32,
                bold: true,
                color: "475569",
              }),
            ],
          }),

          // Project Box
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "F1F5F9", type: ShadingType.CLEAR },
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 12, color: "1E3A8A" },
                      bottom: { style: BorderStyle.SINGLE, size: 12, color: "1E3A8A" },
                      left: { style: BorderStyle.SINGLE, size: 12, color: "1E3A8A" },
                      right: { style: BorderStyle.SINGLE, size: 12, color: "1E3A8A" },
                    },
                    margins: { top: 240, bottom: 240, left: 360, right: 360 },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: "ชื่อโครงการนวัตกรรม: ", bold: true, size: 36 }),
                          new TextRun({
                            text: "YourStylist (ระบบนิเวศจัดสไตล์และบริหารตู้เสื้อผ้าอัจฉริยะ)",
                            bold: true,
                            size: 36,
                            color: "1e3a8a",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 120 },
                        children: [
                          new TextRun({
                            text: "โมเดลธุรกิจ: AI-Powered Wardrobe Intelligence & Ethical Fashion Marketplace\nช่องทางติดต่อเจ้าหน้าที่: LINE: @Yoursylist | เบอร์โทรศัพท์: 0888888888",
                            size: 28,
                            color: "64748b",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 480, after: 240 } }),

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
                text: "โครงการ 'YourStylist' เกิดขึ้นเพื่อปฏิวัติวงการแฟชั่นและการแต่งตัวในชีวิตประจำวัน ผ่านการแก้ปัญหาสำคัญ 2 ประการที่เกิดขึ้นพร้อมกันในสังคมยุคปัจจุบัน ได้แก่ (1) วิกฤต 'มีเสื้อผ้าเต็มตู้แต่ไม่รู้จะใส่อะไร' ของผู้บริโภค ซึ่งก่อให้เกิดความเหนื่อยล้าในการตัดสินใจ (Decision Fatigue) ความสูญเปล่าทางการเงิน และผลกระทบต่อสิ่งแวดล้อม และ (2) ปัญหาต้นทุนการตลาดที่พุ่งสูงและภาวะผู้บริโภคเมินเฉยต่อโฆษณา (Ad Blindness) ของร้านค้าแฟชั่นอิสระและผู้ประกอบการ SME",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "YourStylist นำเสนอทางออกเชิงนวัตกรรมผ่านโมเดล 'Shop Your Own Closet First' ด้วยระบบ Neutral AI Stylist ที่จัดชุดจาก 'เสื้อผ้าที่มีอยู่จริงในตู้ของผู้ใช้ก่อน 100%' โดยไม่แทรกแซงโฆษณาในผลลัพธ์การแต่งตัว พร้อมสร้างโมเดลความร่วมมือกับร้านค้าผ่าน 'Missing Item Matching' เพื่อแนะนำเฉพาะไอเทมชิ้นสำคัญที่ตู้เสื้อผ้าของผู้ใช้ยังขาดอย่างเป็นธรรมชาติ สร้างความคุ้มค่าและความพึงพอใจสูงสุดแก่ผู้บริโภค ควบคู่กับการสร้างยอดขายที่มีอัตราการแปลงเป็นผู้ซื้อจริง (High Conversion Rate) ให้แก่พันธมิตรร้านค้าแฟชั่นไทย",
              }),
            ],
          }),

          // Chapter 1: Problem Clarity
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 1: ความชัดเจนของปัญหาหรือความต้องการของลูกค้า (Problem Validation & Customer Needs)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "การพัฒนานวัตกรรมนี้เริ่มต้นจากการวิเคราะห์ปัญหาที่แท้จริง (Root Causes) ของผู้มีส่วนได้ส่วนเสียในระบบนิเวศแฟชั่น โดยแบ่งออกเป็น 2 กลุ่มเป้าหมายหลักอย่างชัดเจน:",
              }),
            ],
          }),

          // 1.1 Customer
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "1.1 ปัญหาและความต้องการของผู้บริโภค (Customer Pain Points)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ปรากฏการณ์ตู้เสื้อผ้าอัมพาต (Closet Paralysis): " }),
              new TextRun("ผู้บริโภคคนรุ่นใหม่มีเสื้อผ้าเฉลี่ย 60-120 ชิ้นต่อคน แต่ใช้งานจริงเพียง 20% เสื้อผ้ากว่า 80% ถูกลืมทิ้งไว้ในตู้เนื่องจากผู้ใช้มองไม่เห็นภาพรวมของตู้เสื้อผ้า ส่งผลให้รู้สึกว่าไม่มีเสื้อผ้าใส่และวนกลับไปซื้อของใหม่อย่างไม่สิ้นสุด"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ความเหนื่อยล้าในการตัดสินใจทุกเช้า (Morning Decision Fatigue): " }),
              new TextRun("ผลสำรวจพบว่าคนทำงานใช้เวลาเฉลี่ย 15-25 นาทีต่อวันในการยืนหน้าตู้เสื้อผ้าเพื่อลองชุด ถอดเปลี่ยน และส่องกระจก ทำให้เกิดความเครียดตั้งแต่เริ่มต้นวัน"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ความไม่มั่นใจในสัดส่วนและโทนสี (Color & Silhouette Mismatch): " }),
              new TextRun("ผู้ใช้ส่วนใหญ่ไม่ทราบ Personal Color (Undertone ผิว) และสัดส่วนร่างกายที่แท้จริง ทำให้ซื้อเสื้อผ้าตามกระแสแฟชั่นมาแล้วใส่ไม่สวย ไม่เข้ากับรูปร่าง จนสูญเสียความมั่นใจ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "4. ความซับซ้อนของสภาพภูมิอากาศในไทย (Thai Climate Dynamics): " }),
              new TextRun("การใช้ชีวิตประจำวันต้องเผชิญกับสภาพอากาศ 2 โลกสลับกัน คือ ความร้อนชื้นจัดภายนอก (32-38°C) กับความเย็นจัดในห้องแอร์ออฟฟิศ/รถไฟฟ้า (22-24°C) การเลือกเนื้อผ้าและการเลเยอร์ชุดจึงผิดพลาดบ่อยครั้ง"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "5. ความกังวลด้านข้อมูลส่วนบุคคล (Data Privacy Anxiety): " }),
              new TextRun("ผู้ใช้ไม่สบายใจที่จะแชร์รูปถ่ายในตู้เสื้อผ้า รูปส่วนตัว หรือข้อมูลน้ำหนัก/สัดส่วน หากระบบจะนำข้อมูลดังกล่าวไปแอบยิงโฆษณาสินค้า"),
            ],
          }),

          // 1.2 Merchant
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({
                text: "1.2 ปัญหาและความต้องการของร้านค้าแฟชั่น (Merchant Pain Points)",
                size: 34,
                bold: true,
                color: "526042",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ค่าโฆษณาแพงขึ้นแต่วัดผลยาก (Skyrocketing CAC): " }),
              new TextRun("ค่าโฆษณาบน Meta/TikTok เพิ่มขึ้นกว่า 35-50% ทุกปี ขณะที่ยอด Conversion ต่ำลงเรื่อยๆ เนื่องจากโฆษณาถูกยิงแบบกวาด ไม่ตรงจังหวะเวลาที่ลูกค้าต้องการใช้จริง"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ผู้บริโภคมีพฤติกรรมเมินเฉยต่อโฆษณา (Ad Blindness): " }),
              new TextRun("ผู้ใช้รู้สึกถูกรบกวนจากสปอนเซอร์ที่ยัดเยียด ทำให้มองข้ามโฆษณาแฟชั่นทั่วไป"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ขาดบริบทความต้องการที่แท้จริง (Lack of Contextual Intent): " }),
              new TextRun("ร้านค้าไม่สามารถรู้ได้ว่าลูกค้ากำลังจะไปงานแต่งงาน ไปทะเล หรือกำลังหาเบลเซอร์มาแมตช์กับกางเกงที่มีอยู่เดิมในตู้"),
            ],
          }),

          // Chapter 2: Creative Solution
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 2: ความคิดสร้างสรรค์ของแนวทางแก้ไขปัญหา (Creative Solution & Innovation Logic)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ความคิดสร้างสรรค์ที่เป็นหัวใจของ YourStylist คือการเปลี่ยนมุมมองจากการ 'ยัดเยียดขายเสื้อผ้าใหม่' สู่การเป็น 'ผู้จัดการตู้เสื้อผ้าส่วนตัวที่ซื่อสัตย์' ผ่าน 4 เสาหลักนวัตกรรม:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. ปรัชญา Neutral AI Stylist (Ethical AI 100%): " }),
              new TextRun("AI ออกแบบชุดโดยตั้งต้นจากตู้เสื้อผ้าของผู้ใช้เป็นอันดับแรกเสมอ คำนวณ 3 ทิศทางสไตล์ (เช่น ทิศทางสุภาพเป็นทางการ, ทิศทางสมาร์ทแคชชวล, ทิศทางมินิมอลผ่อนคลาย) โดยไม่มีการขายของแทรกในผลลัพธ์การสไตลิ่ง ทำให้ผู้ใช้ไว้วางใจระบบอย่างแท้จริง"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. นวัตกรรม Missing Item Matching (สะพานเชื่อมร้านค้าแบบ Win-Win): " }),
              new TextRun("เมื่อ AI สไตลิ่งแล้วพบว่าลุคจะสมบูรณ์แบบได้ต้องมีไอเทมชิ้นสำคัญที่ตู้เสื้อผ้าของผู้ใช้ยังขาด (เช่น ลุคนี้ขาดเบลเซอร์สีกรมท่าโอเวอร์ไซซ์ หรือรองเท้าโลฟเฟอร์หนัง) ระบบจึงจะแสดงกล่องแนะนำขนาดกะทัดรัดว่า 'ตู้เสื้อผ้าของคุณยังไม่มีชิ้นนี้ ดูไอเทมคุณภาพใกล้เคียงจากสตูดิโอพันธมิตร' ผู้ใช้รู้สึกว่าได้รับคำแนะนำที่มีประโยชน์ ไม่รู้สึกถูกยัดเยียด ขณะที่ร้านค้าได้ลูกค้าที่มีความต้องการซื้อจริงสูงสุด"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. ระบบคำนวณ Multi-Factor Contextual Logic: " }),
              new TextRun("ผสาน 4 มิติข้อมูลเข้าด้วยกัน ได้แก่ (1) สภาพอากาศและเซนเซอร์จริงในไทย (อุณหภูมิและความชื้น), (2) กาลเทศะและระดับความเป็นทางการ (Formality Level), (3) ทฤษฎี Personal Color (Undertone ร้อน/เย็น และคอนทราสต์ผิว), และ (4) ตารางกิจวัตรประจำสัปดาห์ (7-Day Routine Memory)"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "4. ระบบป้องกันการใส่ชุดซ้ำอัจฉริยะ (Repeat Prevention Matrix): " }),
              new TextRun("ระบบบันทึกประวัติการสวมใส่ (Wear Log) และคำนวณรอบการหมุนเวียนชุด เพื่อแจ้งเตือนอัตโนมัติไม่ให้ใส่ชุดเดิมซ้ำในรอบ 7 วัน ช่วยให้ผู้ใช้มีความมั่นใจสูงสุด"),
            ],
          }),

          // Chapter 3: Innovation Components
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 3: องค์ประกอบของนวัตกรรมในผลิตภัณฑ์หรือบริการ (Product/Service Innovation Architecture)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "YourStylist ถูกพัฒนาขึ้นบนสถาปัตยกรรมเทคโนโลยีระดับสากล โดยแบ่งองค์ประกอบนวัตกรรมออกเป็น 3 เลเยอร์หลัก:",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({ text: "3.1 สถาปัตยกรรมทางเทคโนโลยี (Technical Innovation Layers)", size: 34, bold: true }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. Computer Vision & Garment Recognition Engine: " }),
              new TextRun("เมื่อผู้ใช้อัปโหลดรูปเสื้อผ้า ระบบจะจำแนกประเภท (Top, Bottom, Dress, Outerwear), เนื้อผ้า (Linen, Cotton, Wool, Silk), เฉดสี และระดับความเป็นทางการ พร้อมตัดพื้นหลังและสร้าง Tagging อัตโนมัติ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. Wardrobe Graph Database & Styling Engine: " }),
              new TextRun("จัดเก็บไอเทมในตู้เสื้อผ้าของผู้ใช้ในรูปแบบ Relational Graph เชื่อมโยงคู่สี ทฤษฎีวงล้อสี (Color Wheel Harmony) และความเข้ากันของรูปทรง (Silhouette Compatibility)"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. Ethical Advertising Sandbox: " }),
              new TextRun("ระบบแยกพื้นที่ประมวลผลข้อมูลส่วนตัวออกจากระบบโฆษณา 100% ข้อมูลรูปถ่ายและสัดส่วนจะไม่ถูกส่งออกไปยังบุคคลภายนอกตามหลัก PDPA by Design"),
            ],
          }),

          // Chapter 4: BMC & Value Proposition
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 4: ความเหมาะสมของ Business Model Canvas (BMC) และ Value Proposition",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "โมเดลธุรกิจของ YourStylist ถูกออกแบบให้มีความสอดคล้องอย่างสมบูรณ์ระหว่างคุณค่าที่ส่งมอบและกลไกการสร้างรายได้ (Strategic Alignment):",
              }),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({ text: "4.1 ตาราง Business Model Canvas (BMC 9 ช่อง)", size: 34, bold: true }),
            ],
          }),

          // BMC Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "1. Key Partners (พันธมิตรหลัก)", bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 34, type: WidthType.PERCENTAGE },
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "2. Key Activities (กิจกรรมหลัก)", bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 33, type: WidthType.PERCENTAGE },
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "3. Value Propositions (คุณค่าที่ส่งมอบ)", bold: true })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• ร้านค้าแฟชั่นแบรนด์ไทยและดีไซเนอร์อิสระ\n• แพลตฟอร์ม E-Commerce (Shopee, Lazada, TikTok Shop)\n• สถาบันที่ปรึกษาด้านภาพลักษณ์และ Personal Color\n• ผู้ให้บริการระบบชำระเงินและคลาวด์")] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• พัฒนาและเทรนโมเดล AI สไตลิ่งและ Computer Vision\n• คัดกรองและตรวจสอบมาตรฐานร้านค้า/โฆษณา (Moderation)\n• ดูแลความปลอดภัยของข้อมูลและระบบคลาวด์\n• การตลาดดิจิทัลและสร้างคอมมูนิตี้แฟชั่นยั่งยืน")] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• สำหรับผู้ใช้: ประหยัดเวลา 20 นาที/วัน แต่งตัวมั่นใจ ลดการซื้อซ้ำซ้อน มีสไตลิสต์ส่วนตัว 24 ชม. ปลอดภัยเรื่องข้อมูลส่วนบุคคล\n• สำหรับร้านค้า: เข้าถึงลูกค้าตรงบริบท ได้ Lead คุณภาพสูงแบบไม่รู้สึกถูกยัดเยียด")] }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "4. Key Resources (ทรัพยากรหลัก)", bold: true })] })],
                  }),
                  new TableCell({
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "5. Customer Relationships (ความสัมพันธ์)", bold: true })] })],
                  }),
                  new TableCell({
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "6. Channels (ช่องทางการเข้าถึง)", bold: true })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• อัลกอริทึม AI สไตลิ่งและฐานข้อมูลแฟชั่น\n• ระบบโครงสร้างพื้นฐานคลาวด์และฐานข้อมูล Graph\n• ฐานข้อมูลตู้เสื้อผ้าและแคมเปญโฆษณาพันธมิตร\n• ทีมวิศวกรซอฟต์แวร์และผู้เชี่ยวชาญด้านแฟชั่น")] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• ความไว้วางใจด้านความโปร่งใส (Ethical AI & Privacy First)\n• การให้บริการแบบ Self-service ผ่าน Web/Mobile App\n• ทีมซัพพอร์ตผ่าน LINE Official (@Yoursylist) และโทร 0888888888")] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• เว็บแอปพลิเคชัน YourStylist (Responsive & PWA)\n• สื่อโซเชียลมีเดีย (Instagram, TikTok, Lemon8)\n• กิจกรรม Workshop Personal Color ร่วมกับองค์กร\n• พันธมิตรร้านค้าแฟชั่นแนะนำ")] }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "7. Customer Segments (กลุ่มลูกค้า)", bold: true })] })],
                  }),
                  new TableCell({
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "8. Cost Structure (โครงสร้างต้นทุน)", bold: true })] })],
                  }),
                  new TableCell({
                    shading: { fill: "E2E8F0", type: ShadingType.CLEAR },
                    children: [new Paragraph({ children: [new TextRun({ text: "9. Revenue Streams (โครงสร้างรายได้)", bold: true })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• กลุ่มผู้บริโภค: วัยทำงาน First Jobbers, ผู้บริหารรุ่นใหม่, ผู้สนใจ Personal Color และ Capsule Wardrobe\n• กลุ่มร้านค้า: แบรนด์แฟชั่นอิสระ, ดีไซเนอร์ไทย, ร้านค้าแฟชั่นบน IG/Shopee ที่ต้องการยอดขายคุณภาพ")] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• ค่าบริการ AI API และ GPU Server Hosting\n• ค่าพัฒนาและบำรุงรักษาแพลตฟอร์ม\n• ค่าการตลาดและการดึงดูดผู้ใช้งาน (User Acquisition)\n• ค่าตรวจสอบคอนเทนต์ร้านค้าและฝ่ายบริการลูกค้า")] }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun("• ค่าสมาชิกพรีเมียม (Freemium Pro Subscription: 29 บ./ด. โปรโมชั่นเดือนแรก 9 บ.)\n• ค่าบริการเปิดร้านค้าและแคมเปญ (Merchant Store: 199 บ./ด.)\n• ค่าธรรมเนียมส่วนแบ่งยอดขาย (Affiliate Commission: 8-15%)\n• ค่าบริการวิเคราะห์ข้อมูลตลาดเชิงลึกสำหรับแบรนด์ (B2B Insights)")] }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 360 } }),

          // Chapter 5: Feasibility & Operations
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 5: ความเป็นไปได้ในการดำเนินการ (Feasibility, Operations & Risk Management)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "การประเมินความเป็นไปได้ในการดำเนินธุรกิจครอบคลุม 4 มิติสำคัญ ได้แก่ ทรัพยากร ต้นทุน ประมาณการรายได้ และการบริหารความเสี่ยง:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. การจัดสรรทรัพยากร (Resource Allocation): " }),
              new TextRun("ใช้เทคโนโลยี Next.js 15, Supabase Postgres, และโมเดล OpenAI Vision/LLM ซึ่งมีความพร้อมสูง ไม่ต้องลงทุนสร้างศูนย์ข้อมูลของตนเอง ลดระยะเวลา Time-to-Market ลงเหลือเพียง 3 เดือน"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. ประมาณการทางการเงิน (Financial Projections): " }),
              new TextRun("ปีที่ 1 ตั้งเป้าฐานผู้ใช้ 30,000 คน สมาชิก Pro 1,500 คน (Conversion 5%) และร้านค้าพันธมิตร 60 ร้าน คาดการณ์รายได้รวม 5.2 ล้านบาท จุดคุ้มทุน (Breakeven) อยู่ในเดือนที่ 11"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. แผนการบริหารความเสี่ยง (Risk Mitigation): " }),
              new TextRun("ความเสี่ยงด้านกฎหมาย PDPA รับมือด้วยระบบ Zero-Knowledge Privacy ไม่ส่งข้อมูลสัดส่วนไปให้บุคคลภายนอก, ความเสี่ยงด้านคำแนะนำผิดพลาดรับมือด้วยกลไก Human-in-the-loop ให้ผู้ใช้ตรวจสอบและยืนยันก่อนเสมอ"),
            ],
          }),

          // Chapter 6: Customer Value
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 6: คุณค่าที่มอบให้ลูกค้าและความเหมาะสมกับกลุ่มเป้าหมาย (Customer Value & Target Fit)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "คุณค่าที่ YourStylist ส่งมอบไม่ได้จำกัดอยู่เพียงเรื่องความสวยงาม แต่ส่งมอบคุณค่ารอบด้าน (Holistic Value Proposition):",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "1. Functional Value (คุณค่าเชิงการใช้งาน): " }),
              new TextRun("ประหยัดเวลาเฉลี่ย 100 ชั่วโมงต่อปีในการยืนเลือกชุด ลดความกังวลเรื่องการแต่งตัวผิดกาลเทศะหรือชุดไม่เหมาะกับสภาพอากาศ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "2. Emotional Value (คุณค่าทางอารมณ์): " }),
              new TextRun("เสริมสร้างความมั่นใจในตนเอง (Self-confidence) รู้สึกดีกับร่างกายและเสื้อผ้าที่ตนเองมีอยู่ ลดความรู้สึกผิดจากการซื้อเสื้อผ้ามาดองไว้"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "3. Social & Environmental Value (คุณค่าเชิงสังคมและสิ่งแวดล้อม): " }),
              new TextRun("สนับสนุนแนวคิด Circular Fashion และ Sustainable Wardrobe ด้วยการใช้ประโยชน์จากเสื้อผ้าเดิมให้คุ้มค่าที่สุดก่อนซื้อใหม่ และช่วยกระจายรายได้สู่ผู้ประกอบการแฟชั่นไทย"),
            ],
          }),

          // Chapter 7: Role Features
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 7: รายละเอียดฟีเจอร์ทั้งหมดแยกตาม Role (Comprehensive Feature Matrix by Role)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "YourStylist ถูกออกแบบระบบจัดการสิทธิ์ (Role-Based Access Control: RBAC) ออกเป็น 3 บทบาทหลักที่เชื่อมโยงกันอย่างสมบูรณ์แบบ ได้แก่:",
              }),
            ],
          }),

          // Role 1
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({ text: "7.1 บทบาทที่ 1: ลูกค้า / ผู้บริโภคทั่วไป (Customer Role)", size: 34, bold: true, color: "526042" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Digital Wardrobe Vault: " }),
              new TextRun("บันทึกและจัดการตู้เสื้อผ้าออนไลน์ ถ่ายรูป แยกหมวดหมู่ ระบุเนื้อผ้า สี สถานะความพร้อม (พร้อมใส่/ส่งซัก)"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• AI Stylist 3 Directions: " }),
              new TextRun("จัดลุคอัจฉริยะ 3 ทิศทางสไตล์ตามกิจกรรม สภาพอากาศจริง และระดับความเป็นทางการ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• 7-Day Routine Memory: " }),
              new TextRun("จัดตารางชุดล่วงหน้า 7 วัน พร้อมระบบ Repeat Prevention ป้องกันการใส่ชุดซ้ำ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Personal Color Studio: " }),
              new TextRun("แบบทดสอบวิเคราะห์ Undertone ผิว และเลือกพาเลทสีที่ช่วยขับผิวให้ดูสดใส"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Missing Item Recommendations: " }),
              new TextRun("รับคำแนะนำไอเทมที่ขาดเพื่อเติมเต็มลุค เชื่อมต่อกับร้านค้าพันธมิตรคุณภาพ"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Wear Log & Feedback: " }),
              new TextRun("บันทึกประวัติการใส่ชุด คะแนนความสบาย และส่งความเห็นเพื่อสอน AI ให้ฉลาดขึ้น"),
            ],
          }),

          // Role 2
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({ text: "7.2 บทบาทที่ 2: ร้านค้าแฟชั่น (Merchant Role)", size: 34, bold: true, color: "526042" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Merchant Studio Dashboard: " }),
              new TextRun("แผงควบคุมสถิติการเข้าชม Impressions, Clicks, Likes, และ CTR แบบเรียลไทม์"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Ad Campaign Creator: " }),
              new TextRun("เครื่องมือสร้างแคมเปญ อัปโหลดรูปภาพสินค้า กำหนดแท็กสไตล์ เนื้อผ้า และกลุ่มเป้าหมาย"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Contextual Matching Setup: " }),
              new TextRun("กำหนดเงื่อนไขการนำเสนอสินค้าเป็น Missing Item ในผลการสไตลิ่งของลูกค้า"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Shop Profile & Social Links: " }),
              new TextRun("จัดการข้อมูลร้านค้า ช่องทางติดต่อ เว็บไซต์ ลิงก์ Shopee / Instagram / LINE"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Official Support Channel: " }),
              new TextRun("ติดต่อเจ้าหน้าที่ผู้ดูแลร้านค้าโดยตรงผ่าน LINE: @Yoursylist หรือเบอร์ 0888888888"),
            ],
          }),

          // Role 3
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 360, after: 180 },
            children: [
              new TextRun({ text: "7.3 บทบาทที่ 3: ผู้ดูแลระบบ (Admin Role)", size: 34, bold: true, color: "526042" }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Admin Console Overview: " }),
              new TextRun("ดูภาพรวมของระบบ จำนวนผู้ใช้งาน ตู้เสื้อผ้า แคมเปญโฆษณา และรายได้"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Merchant Verification & Approval: " }),
              new TextRun("ตรวจสอบความถูกต้อง น่าเชื่อถือ และเอกสารของร้านค้าก่อนอนุญาตให้ลงโฆษณา"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Ad Creative Moderation: " }),
              new TextRun("ระบบพรีวิวรูปภาพความละเอียดสูง (Image Preview Dialog) เพื่ออนุมัติหรือปฏิเสธโฆษณา"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• User & Data Governance (PDPA): " }),
              new TextRun("จัดการคำขอลบบัญชีและทำลายข้อมูลส่วนบุคคลอย่างปลอดภัย (Multi-stage Deletion)"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "• Audit Trail & Activity Logs: " }),
              new TextRun("บันทึกการกระทำสำคัญในระบบเพื่อความโปร่งใสและตรวจสอบย้อนหลังได้ 100%"),
            ],
          }),

          // Chapter 8: Presentation & Q&A Guide
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 600, after: 240 },
            children: [
              new TextRun({
                text: "ข้อที่ 8: ทักษะการนำเสนอและการเตรียมพร้อมตอบคำถาม (Presentation & Q&A Defense Guide)",
                size: 40,
                bold: true,
                color: "1e3a8a",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "เพื่อคะแนนเต็มในส่วนการนำเสนอและการตอบข้อซักถามของคณะกรรมการ ทีมงานได้เตรียมแนวทางการตอบคำถามสำคัญ (Q&A Defense Guide) ดังนี้:",
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "คำถามที่ 1: แตกต่างจาก AI Chatbot ทั่วไปอย่าง ChatGPT หรือ Pinterest อย่างไร?\n" }),
              new TextRun({ bold: true, text: "แนวทางตอบ: " }),
              new TextRun("ChatGPT ให้คำแนะนำเป็นตัวหนังสือลอยๆ โดยไม่รู้ว่าในตู้เสื้อผ้าจริงของผู้ใช้มีอะไรอยู่ ขณะที่ Pinterest แสดงเฉพาะรูปภาพสวยงามแต่หาซื้อยากและไม่ได้มาจากเสื้อผ้าของเรา YourStylist เป็นแพลตฟอร์มเดียวที่จัดการ Digital Inventory ในตู้จริง และคำนวณจากของที่มีอยู่จริง 100%"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "คำถามที่ 2: ร้านค้าจะได้ประโยชน์อย่างไร หาก AI ไม่ยอมยัดเยียดโฆษณา?\n" }),
              new TextRun({ bold: true, text: "แนวทางตอบ: " }),
              new TextRun("การยัดเยียดโฆษณาสร้าง Conversion ต่ำมาก (เฉลี่ยไม่ถึง 1%) แต่กลไก 'Missing Item Matching' ของเรา นำเสนอสินค้าในจังหวะที่ผู้ใช้ต้องการจริง เช่น ลุคขาดเบลเซอร์สีกรมท่า ทำให้เกิด High-intent Contextual Lead ซึ่งมีอัตราการตัดสินใจซื้อสูงกว่าโฆษณาทั่วไปถึง 4-5 เท่า"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "คำถามที่ 3: จัดการกับปัญหาข้อมูลส่วนตัวของผู้ใช้ (PDPA) อย่างไร?\n" }),
              new TextRun({ bold: true, text: "แนวทางตอบ: " }),
              new TextRun("ระบบใช้แนวคิด Privacy by Design โดยแยกตู้เสื้อผ้าและสัดส่วนร่างกายเป็นพื้นที่ปิด ข้อมูลเหล่านี้จะไม่ถูกนำไปใช้ในอัลกอริทึมโฆษณา และผู้ใช้มีสิทธิ์ลบข้อมูลทั้งหมดออกจากระบบได้ทันทีในคลิกเดียว"),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: "คำถามที่ 4: การขยายสเกล (Scalability) ในอนาคตมีแผนอย่างไร?\n" }),
              new TextRun({ bold: true, text: "แนวทางตอบ: " }),
              new TextRun("เราวางแผนขยายสู่บริการเชื่อมต่อกับตู้เสื้อผ้าอัจฉริยะ (IoT Smart Wardrobe), บริการส่งซักแห้งพรีเมียม (Laundry On-Demand Integration), และการจำหน่าย B2B Trend Forecasting Insights ให้แก่แบรนด์แฟชั่นระดับประเทศ"),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, "YourStylist_Business_Innovation_Report.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log("Successfully generated:", outputPath);
}

generateDocx().catch((err) => {
  console.error("Error generating docx:", err);
  process.exit(1);
});
