import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/petko/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/brand-guide-v2.html?print=1', {
  waitUntil: 'networkidle0',
  timeout: 30000,
});

// Wait for fonts
await page.evaluateHandle('document.fonts.ready');

await page.pdf({
  path: './AI ASSISTANT Brand Guide v2.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  scale: 0.75,
});

await browser.close();
console.log('PDF saved: AI ASSISTANT Brand Guide v2.pdf');
