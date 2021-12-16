import express from "express";

import { Chart, ChartConfiguration } from 'chart.js';
import { promises as fs, utimes } from 'fs';
import { ChartJSNodeCanvas, ChartCallback } from 'chartjs-node-canvas';

import { registerFont, createCanvas } from 'canvas';

const app = express();

app.get("/", (req, res) => {
  res.send("Hello BMC World!");
});

app.get("/Hello", (req, res) => {
  res.send("World!");
});

app.get("/Chart", async (req, res) => {

  const width = 900;
  const height = 600;

  const logNumbers = (num: number) => {
    const data = [];

    for (let i = 0; i < num; ++i) {
      data.push(Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5)));
    }

    return data;
  };

  const actions = [
    {
      name: 'Randomize',
      handler(chart: { data: { datasets: any[]; labels: string | any[]; }; update: () => void; }) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = logNumbers(chart.data.labels.length);
        });
        chart.update();
      }
    },
  ];
  // </block:actions>
  // <block:setup:1>
  const DATA_COUNT = 7;
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

  const labels = months({ count: 7 });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: logNumbers(DATA_COUNT),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        fill: false,
      },
    ]
  };
  // </block:setup>
  // <block:config:0>
  const configuration: ChartConfiguration = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Line Chart - Logarithmic'
        }
      },
      scales: {
        x: {
          display: true,   
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          }       
        },
        y: {
          display: true,
          type: 'logarithmic',
        }
      }
    },
  };

  const chartCallback: ChartCallback = (ChartJS) => {
    ChartJS.defaults.responsive = true;
    ChartJS.defaults.maintainAspectRatio = false;
  };

  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width, height, chartCallback: (ChartJS) => {
      // Just example usage
      ChartJS.defaults.font.family = 'Arial';
      ChartJS.defaults.font.size = 16;
    }
  });

  chartJSNodeCanvas.registerFont('src/arial.ttf', { family: 'Arial' });
  chartJSNodeCanvas.registerFont('src/arialbd.ttf', { family: 'Arial', weight: 'bold' });
  chartJSNodeCanvas.registerFont('src/arialbi.ttf', { family: 'Arial', weight: 'bold', style: 'italic' });
  chartJSNodeCanvas.registerFont('src/ariali.ttf', { family: 'Arial', style: 'italic' });
  chartJSNodeCanvas.registerFont('src/ariblk.ttf', { family: 'Arial', weight: 'bold', style: 'black' });

  const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
  await fs.writeFile('./example.png', buffer, 'base64');

  let buf = Buffer.from(buffer);
  let base64 = buf.toString('base64');
  // console.log('Base64 ' + filename + ': ' + base64);
  console.log(base64);

  const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  const NAMED_COLORS = [
    CHART_COLORS.red,
    CHART_COLORS.orange,
    CHART_COLORS.yellow,
    CHART_COLORS.green,
    CHART_COLORS.blue,
    CHART_COLORS.purple,
    CHART_COLORS.grey,
  ];

  function namedColor(index: number) {
    return NAMED_COLORS[index % NAMED_COLORS.length];
  };

  function months(config: { count?: number; }) {
    var cfg = config || {};
    var count = cfg.count || 12;
    //var section = cfg.section;
    var values = [];
    var i, value;

    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];


    for (i = 0; i < count; ++i) {
      value = MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0));
    }

    return values;
  };
  //console.log(base64);
  res.send(base64);
});
/*
PORT could be set via environment variable (e.g. by Google Cloud
or some other could service). Fallback to your desired PORT.
*/
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  // only log this information in development.
  if (process.env?.NODE_ENV !== "production")
    console.log(`server listening at http://localhost:${PORT}`);
});
function fontFile(arg0: string): string {
  throw new Error("Function not implemented.");
}

