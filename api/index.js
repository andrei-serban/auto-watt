const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3020;

app.use(express.json());

const dbConnection = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'auto-watt'
};

app.get('/', async (req, res) => {
  const connection = mysql.createConnection(dbConnection).promise();
  const id = req.query.id;

  const [rows] = await connection.execute(
    'SELECT * FROM submissions WHERE id = ?',
    [id]
  );

  await connection.end();

  if (rows.length) {
    const submission = rows[0];
    const payload = JSON.parse(submission.payload);

    const templatePath = path.join(__dirname, 'template.html');
    let html = fs.readFileSync(templatePath, 'utf8');
    const matches = [...html.matchAll(/{{\s*(\w+)\s*}}/g)];

    matches.forEach((match) => {
      html = html.replace(match[0], payload[match[1]] || '');
    });

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

    return res.json({ error: 'The PDF report was successfully generated' });
  }

  return res.json({ error: 'The submission was not found' });
});

app.post('/', async (req, res) => {
  const connection = mysql.createConnection(dbConnection).promise();
  const [result] = await connection.execute(
    'INSERT INTO submissions (payload, created_at) VALUES (?, ?)', 
    [JSON.stringify(req.body), new Date()]
  );

  await connection.end();

  return res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
