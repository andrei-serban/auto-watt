const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const PORT = 3020;

app.use(express.json());

app.get('/', async (req, res) => {
  const filePath = path.join(__dirname, 'template.html');
  const html = fs.readFileSync(filePath, 'utf8');

  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set content
  await page.setContent(html, { waitUntil: 'load' });

  // Generate PDF
  await page.pdf({
    path: 'output.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
  });

  await browser.close();

  res.send('✅ PDF created: output.pdf');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
