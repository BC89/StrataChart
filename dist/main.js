"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var chartjs_node_canvas_1 = require("chartjs-node-canvas");
var app = express_1.default();
app.get("/", function (req, res) {
    res.send("Hello BMC World!");
});
app.get("/Hello", function (req, res) {
    res.send("World!");
});
app.get("/Chart", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    function namedColor(index) {
        return NAMED_COLORS[index % NAMED_COLORS.length];
    }
    function months(config) {
        var cfg = config || {};
        var count = cfg.count || 12;
        //var section = cfg.section;
        var values = [];
        var i, value;
        var MONTHS = [
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
    }
    var width, height, logNumbers, actions, DATA_COUNT, NUMBER_CFG, labels, data, configuration, chartCallback, chartJSNodeCanvas, buffer, buf, base64, CHART_COLORS, NAMED_COLORS;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                width = 900;
                height = 600;
                logNumbers = function (num) {
                    var data = [];
                    for (var i = 0; i < num; ++i) {
                        data.push(Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5)));
                    }
                    return data;
                };
                actions = [
                    {
                        name: 'Randomize',
                        handler: function (chart) {
                            chart.data.datasets.forEach(function (dataset) {
                                dataset.data = logNumbers(chart.data.labels.length);
                            });
                            chart.update();
                        }
                    },
                ];
                DATA_COUNT = 7;
                NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };
                labels = months({ count: 7 });
                data = {
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
                configuration = {
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
                chartCallback = function (ChartJS) {
                    ChartJS.defaults.responsive = true;
                    ChartJS.defaults.maintainAspectRatio = false;
                };
                chartJSNodeCanvas = new chartjs_node_canvas_1.ChartJSNodeCanvas({
                    width: width,
                    height: height,
                    chartCallback: function (ChartJS) {
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
                return [4 /*yield*/, chartJSNodeCanvas.renderToBuffer(configuration)];
            case 1:
                buffer = _a.sent();
                return [4 /*yield*/, fs_1.promises.writeFile('./example.png', buffer, 'base64')];
            case 2:
                _a.sent();
                buf = Buffer.from(buffer);
                base64 = buf.toString('base64');
                // console.log('Base64 ' + filename + ': ' + base64);
                console.log(base64);
                CHART_COLORS = {
                    red: 'rgb(255, 99, 132)',
                    orange: 'rgb(255, 159, 64)',
                    yellow: 'rgb(255, 205, 86)',
                    green: 'rgb(75, 192, 192)',
                    blue: 'rgb(54, 162, 235)',
                    purple: 'rgb(153, 102, 255)',
                    grey: 'rgb(201, 203, 207)'
                };
                NAMED_COLORS = [
                    CHART_COLORS.red,
                    CHART_COLORS.orange,
                    CHART_COLORS.yellow,
                    CHART_COLORS.green,
                    CHART_COLORS.blue,
                    CHART_COLORS.purple,
                    CHART_COLORS.grey,
                ];
                ;
                ;
                //console.log(base64);
                res.send(base64);
                return [2 /*return*/];
        }
    });
}); });
/*
PORT could be set via environment variable (e.g. by Google Cloud
or some other could service). Fallback to your desired PORT.
*/
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, function () {
    var _a;
    // only log this information in development.
    if (((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== "production")
        console.log("server listening at http://localhost:" + PORT);
});
function fontFile(arg0) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=main.js.map