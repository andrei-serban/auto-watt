const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const express = require('express');
const multer = require('multer');
const moment = require('moment');
const mysql = require('mysql2');
const app = express();

require('dotenv').config();

const PORT = 3020;
const BASE_URL = 'http://localhost:3020';

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/downloads', express.static(path.join(__dirname, 'downloads')));

const dbConnection = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'auto-watt'
};

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

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
        systemComponents: formatSystemComponents(payload),
        limitations: formatLimitations(payload),
        invertersTasks: formatTasks(payload.invertersTasks),
        invertersTaskFailures: formatTaskFailures(payload.invertersTasks),
        mainsConnectionTasks: formatTasks(payload.mainsConnectionTasks),
        electricalTestingTasks: formatTasks(payload.electricalTestingTasks),
        pvGeneratorTasks: formatTasks(payload.pvGeneratorTasks),
        pvGeneratorPhotos: formatPhotos(payload.pvGeneratorPhotos),
        pvGeneratorStrings: formatStrings(payload.inverters),
        visualChecksTasks1: formatTasks(payload.visualChecksTasks.slice(0, 4)),
        visualChecksTasks2: formatTasks([payload.visualChecksTasks[4]], 4),
        visualChecksTasks2Photos: formatPhotos(payload.visualChecksTasks[4].photos ?? []),
        visualChecksTasks3: formatTasks([payload.visualChecksTasks[5]], 5),
        visualChecksTasks3Photos: formatPhotos(payload.visualChecksTasks[5].photos ?? []),
        safetyRisksTasks1: formatTasks(payload.safetyRisksTasks.slice(0, 3)),
        safetyRisksTasks2: formatTasks([payload.safetyRisksTasks[3]], 3),
        safetyRisksTasks2Photos: formatPhotos(payload.safetyRisksTasks[3].photos ?? []),
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
      const pdfPath = path.join(__dirname, 'downloads', `${id}.pdf`);

      // Set content
      await page.setContent(html, { waitUntil: 'load' });

      // Generate PDF
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
      });

      await browser.close();

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const recipients = [];

      if (payload.technicianEmail) {
        recipients.push(payload.technicianEmail);
      }

      if (payload.managerEmail) {
        recipients.push(payload.managerEmail);
      }

      if (recipients.length) {
        const mailOptions = {
          from: 'me@andreiserban.com',
          to: recipients,
          subject: 'AutoWatt PDF Report',
          text: 'Please find the PDF report attached.',
          attachments: [
            {
              filename: 'report.pdf',
              path: pdfPath,
              contentType: 'application/pdf'
            }
          ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error(error);
          }

          console.log(`Email sent to ${JSON.stringify(recipients)}: ${info.response}`);
        });
      }

      return res.send(`
          <a href="${BASE_URL}/downloads/${id}.pdf" target="_blank">PDF Report</a>
          <br/><br/>
          <hr/>
          <br/>
          ${html}`
      );
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

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.status(200).json({ message: 'Upload successful', file: req.file });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const formatSystemComponents = (payload) => {
  const formatComponent = (tasks) => {
    let status = 'N/A';
    const failures = tasks.filter(task => task.value === 'fail');
    const passes = tasks.filter(task => task.value === 'pass');

    if (failures.length > 0) {
      status = '<failure>Fail:</failure>';
    } else if (passes.length) {
      status = 'Pass';
    }

    return `
      <!--<td>
        ${tasks.map(task => {
          return JSON.stringify(task) + '<br/>';
        }).join('')}
      </td>-->
      <td>
        ${status}
      </td>
      <td>
        ${failures.map(task => {
          return `&bull;&nbsp;${task.label}`;
        }).join('<br/>')}
      </td>
    `;
  }

  return `
    <tr>
      <td>1</td>
      <td>Inverters / AC Distribution</td>
      ${formatComponent(payload.invertersTasks)}
    </tr>
    <tr>
      <td>2</td>
      <td>Mains Connection</td>
      ${formatComponent(payload.mainsConnectionTasks)}
    </tr>
    <tr>
      <td>3</td>
      <td>PV Generator (DC Side)</td>
      ${formatComponent(payload.pvGeneratorTasks)}
    </tr>
    <tr>
      <td>4</td>
      <td>Electrical Testing</td>
      ${formatComponent(payload.electricalTestingTasks)}
    </tr>
    <tr> 
      <td>5</td>
      <td>Performance Checks</td>
      ${formatComponent(payload.performanceChecksTasks)}
    </tr>
    <tr>
      <td>6</td>
      <td>Visual inspection</td>
      ${formatComponent(payload.visualChecksTasks)}
    </tr>
    <tr>
      <td>7</td>
      <td>System Safety Risks</td>
      ${formatComponent(payload.safetyRisksTasks)}
    </tr>
    <tr> 
      <td>8</td>
      <td>Battery Systems</td>
      ${formatComponent(payload.batterySystemsTasks)}
    </tr>
    <tr>
      <td>9</td>
      <td>Voltage Optimiser</td>
      ${formatComponent(payload.voltageOptimisersTasks)}
    </tr>
  `;
}

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

const formatTaskFailures = (tasks) => {
  const failures = [];
  
  tasks.filter((task) => task.value === 'fail').forEach((task) => {
    failures.push(`
      <p>
        <failure>Fail:</failure> ${task.label}
      </p>

      <p>
        <em>Category:</em> ${task.severity ?? ''}
      </p>
      
      <pretitle>Is the system safe to generate?</pretitle>
      <textbox>${task.safeNote ?? ''}</textbox>
     
      <pretitle>What remedial work was done?</pretitle>
      <textbox>${task.remedialWorkNote ?? ''}</textbox>

      <pretitle>What needs to happen next?</pretitle>
      <textbox>${task.stepsFurtherNote ?? ''}</textbox>

      <h3>
        Media upload of <failure>Fail</failure>:
      </h3>

      ${formatPhotos(task.photos ?? [])}
    `);
  });

  return failures.join('');
}

const formatPhotos = (photos) => {
  return photos.map((photo) => {
    return `<img src="${BASE_URL}/uploads/${photo.replace(/[^a-zA-Z0-9-]/g, '_')}.jpg" />`;
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

const formatStrings = (inverters) => {
  const strings = inverters.map(inverter => inverter.stringObjects).flat();

  return `
    <table>
      <tr>
        <th colspan="2">String</th>
        ${strings.map((string, index) => `<td>${index+1}</td>`).join('')}
      </tr>
      <tr>
        <th rowspan="3" valign="top">String Test</th>
        <th>
          V<small>oc</small>(V)
        </th>
        ${strings.map((string) => `<td>${string.voc}</td>`).join('')}
      </tr>
      <tr>
        <th>
          I<small>sc</small>(A)
        </th>
        ${strings.map((string) => `<td>${string.isc}</td>`).join('')}
      </tr>
      <tr>
        <th>Irradiance</th>
        ${strings.map((string) => `<td>${string.irr}</td>`).join('')}
      </tr>
      <tr>
        <th rowspan="3" valign="top">Array Test insulation</th>
        <th>Test Voltage (V)</th>
        ${strings.map((string) => `<td>${string.testVoltage}</td>`).join('')}
      </tr>
      <tr>
        <th>Pos – Earth (MΩ)</th>
        ${strings.map((string) => `<td>${string.pos}</td>`).join('')}
      </tr>
      <tr>
        <th>NEG – Earth (MΩ)</th>
        ${strings.map((string) => `<td>${string.neg}</td>`).join('')}
      </tr>
    </table>
  `;
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
