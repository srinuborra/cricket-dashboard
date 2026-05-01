const http = require("http");

const matches = [
    { name: "RCB vs MI", status: "🔴 LIVE - RCB 150/3 (16 overs)" },
    { name: "CSK vs GT", status: "🟡 Today 7:30 PM" },
    { name: "SRH vs KKR", status: "🔵 Tomorrow" }
];

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    let html = `
    <html>
    <head>
        <title>Cricket Dashboard</title>
        <meta http-equiv="refresh" content="10">
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI';
                background: linear-gradient(to right, #0f172a, #1e293b);
                color: white;
                text-align: center;
            }

            h1 {
                padding: 20px;
                color: #22c55e;
            }

            .container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 20px;
            }

            .card {
                background: #111827;
                padding: 20px;
                width: 320px;
                border-radius: 15px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                transition: transform 0.2s;
            }

            .card:hover {
                transform: scale(1.05);
            }

            .match {
                font-size: 20px;
                font-weight: bold;
            }

            .status {
                margin-top: 10px;
                font-size: 16px;
                color: #9ca3af;
            }
        </style>
    </head>
    <body>
        <h1>🏏 Live Cricket Dashboard</h1>
        <div class="container">
    `;

    matches.forEach(m => {
        html += `
        <div class="card">
            <div class="match">${m.name}</div>
            <div class="status">${m.status}</div>
        </div>
        `;
    });

    html += `
        </div>
    </body>
    </html>
    `;

    res.end(html);
});

server.listen(3000, () => {
    console.log("Server running...");
});
