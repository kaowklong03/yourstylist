const { chromium } = require("@playwright/test");
const path = require("path");

async function main() {
  const htmlPath = path.resolve(__dirname, "presentation_slides.html");
  const pdfPath = path.resolve(__dirname, "YourStylist_Presentation_Slides.pdf");

  console.log("Launching browser with existing Chrome executable...");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Navigating to HTML file:", htmlPath);
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });

  console.log("Generating PDF...");
  await page.pdf({
    path: pdfPath,
    width: "16in",
    height: "9in",
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });

  console.log("PDF created successfully at:", pdfPath);
  await browser.close();
}

main().catch((err) => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
