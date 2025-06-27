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

  if (id) {
    const [rows] = await connection.execute(
      'SELECT * FROM submissions WHERE id = ?',
      [id]
    );

    await connection.end();

    if (rows.length) {
      const submission = rows[0];
      const payload = JSON.parse(submission.payload);

      payload.batteryStorage = payload.batteryStorage ? 'Yes' : 'No';
      payload.voltageOptimiser = payload.voltageOptimiser ? 'Yes' : 'No';
      payload.roofAccess = payload.roofAccess ? 'Yes' : 'No';
      payload.cleaningPerformed = payload.cleaningPerformed ? 'Yes' : 'No';
      payload.ramsCompleted = payload.ramsCompleted ? 'Yes' : 'No';

      const templatePath = path.join(__dirname, 'template.html');
      let html = fs.readFileSync(templatePath, 'utf8');
      
      const simpleMatches = [...html.matchAll(/{{\s*(\w+)\s*}}/g)];

      simpleMatches.forEach((match) => {
        html = html.replace(match[0], payload[match[1]] || '');
      });

      const functionMatches = [...html.matchAll(/!!\s*(\w+)\s*!!/g)];
      const functions = {
        limitations: formatLimitations(payload),
        invertersTasks: formatTasks(payload.invertersTasks),
        mainsConnectionTasks: formatTasks(payload.mainsConnectionTasks),
        electricalTestingTasks: formatTasks(payload.electricalTestingTasks),
        pvGeneratorTasks: formatTasks(payload.pvGeneratorTasks),
        visualChecksTasks1: formatTasks(payload.visualChecksTasks.slice(0, 4)),
        visualChecksTasks2: formatTasks([payload.visualChecksTasks[4]], 4),
        visualChecksTasks3: formatTasks([payload.visualChecksTasks[5]], 5),
        safetyRisksTasks1: formatTasks(payload.safetyRisksTasks.slice(0, 3)),
        safetyRisksTasks2: formatTasks([payload.safetyRisksTasks[3]], 3),
        safetyRisksTasks3: formatTasks([payload.safetyRisksTasks[4], payload.safetyRisksTasks[5]], 4),
      };

      functionMatches.forEach((match) => {
        html = html.replace(match[0], functions[match[1]] || '');
      });

      // Launch browser
      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();

      // Set content
      // await page.setContent(html, { waitUntil: 'load' });

      // Generate PDF
      // await page.pdf({
      //   path: 'output.pdf',
      //   format: 'A4',
      //   printBackground: true,
      //   margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
      // });

      // await browser.close();

      // return res.json({ error: 'The PDF report was successfully generated' });

      return res.send(html);
    }
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

const formatLimitations = (payload) => {
  return payload.limitations.map((limitation, index) => {
    return `
      <tr>
        <td>${index+1}</td>
        <td>${limitation.text}</td>
        <td>${limitation.checked ? 'X' : ''}</td>
      </tr>
    `;
  }).join('');
}

const formatTasks = (tasks, increments = 0) => {
  return tasks.map((task, index) => {
    return `
      <tr>
        <td>${index + 1 + increments}</td>
        <td>${task.label}</td>
        <td>${formatTaskValue(task.value)}</td>
      </tr>
    `;
  }).join('');
}

const formatTaskValue = (value) => {
  if (value === 'n/a') {
    return value.toUpperCase();
  } else if (value === 'fail') {
    return '<failure>Fail</failure>';
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

