const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const express = require('express');
const moment = require('moment');
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
      payload.followUpRequired = ucfirst(payload.followUpRequired);

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
        voltageOptimisersTasks: formatTasks(payload.voltageOptimisersTasks),
        performanceChecksTasks1: formatTasks([payload.performanceChecksTasks[0]]),
        performanceChecksTasks2: formatTasks(payload.performanceChecksTasks.slice(1, 3), 2),
        performanceChecksTasks3: formatTasks([payload.performanceChecksTasks[3]], 4),
        batterySystemsTasks: formatTasks(payload.batterySystemsTasks),
        timestamp: formatTimestamp(payload.date),
        inverters: formatInverters(payload.inverters),
        batterySystems: formatBatterySystems(payload.batterySystems),
        voltageOptimisers: formatVoltageOptimisers(payload.voltageOptimisers),
      };

      functionMatches.forEach((match) => {
        html = html.replace(match[0], functions[match[1]] || '');
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

  return ucfirst(value)
}

const formatTimestamp = (date) => {
  return moment.utc(date).local().format('DD/MM/YYYY [at] HH:mm');
}

const formatInverters = (inverters) => {
  let html = '';

  inverters.forEach(inverter => {
    html += `
      <table>
        <tr>
          <td>Inverter info</td>
          <td>Complete</td>
        </tr>
        <tr>
          <td>Inverter make</td>
          <td>${inverter.make}</td>
        </tr>
        <tr>
          <td>Inverter Model</td>
          <td>${inverter.model}</td>
        </tr>
        <tr>
          <td>Inverter serial number</td>
          <td>${inverter.serial}</td>
        </tr>
        <tr>
          <td>Size of inverter (kW)</td>
          <td>${inverter.size}</td>
        </tr>
        <tr>
          <td>No. of strings on inverter</td>
          <td>${inverter.strings}</td>
        </tr>
        <tr>
          <td>Inverter status (e.g. "Enter inverter display status or error code")</td>
          <td>${inverter.status}</td>
        </tr>
      <table>
    `
  });

  return html;
}

const formatBatterySystems = (batterySystems) => {
  let html = '';

  batterySystems.forEach(batterySystem => {
    html += `
      <table>
        <tr>
          <td>Inverter info</td>
          <td>Complete</td>
        </tr>
        <tr>
          <td>Battery make</td>
          <td>${batterySystem.make}</td>
        </tr>
        <tr>
          <td>Battery Model</td>
          <td>${batterySystem.model}</td>
        </tr>
        <tr>
          <td>Battery serial number</td>
          <td>${batterySystem.serial}</td>
        </tr>
        <tr>
          <td>Size of Battery (kW)</td>
          <td>${batterySystem.size}</td>
        </tr>
        <tr>
          <td>Battery status (e.g. "Enter battery display status or error code")</td>
          <td>${batterySystem.status}</td>
        </tr>
      <table>
    `
  });

  return html;
}

const formatVoltageOptimisers = (voltageOptimisers) => {
  let html = '';

  voltageOptimisers.forEach(voltageOptimiser => {
    html += `
      <table>
        <tr>
          <td>VO Info</td>
          <td>Complete</td>
        </tr>
        <tr>
          <td>VO make</td>
          <td>${voltageOptimiser.make}</td>
        </tr>
        <tr>
          <td>VO Model</td>
          <td>${voltageOptimiser.model}</td>
        </tr>
        <tr>
          <td>VO serial number</td>
          <td>${voltageOptimiser.serial}</td>
        </tr>
        <tr>
          <td>Size of VO (kW)</td>
          <td>${voltageOptimiser.size}</td>
        </tr>
        <tr>
          <td>VO status (e.g. "Enter VO display status or error code")</td>
          <td>${voltageOptimiser.status}</td>
        </tr>
      <table>
    `
  });

  return html;
}

const ucfirst = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
