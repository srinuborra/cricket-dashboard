const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    https.get("https://api.cricapi.com/v1/matches?apikey=demo", (apiRes) => {
        let data = "";

        apiRes.on("data", chunk => data += chunk);

        apiRes.on("end", () => {
            let html = `
            <html>
            <head>
                <title>Live Cricket Dashboard</title>
                <meta http-equiv="refresh" content="10">
                <style>
                    body { font-family: Arial; background:#0f172a; color:white; text-align:center; }
                    .card { background:#1e293b; margin:20px auto; padding:20px; width:320px; border-radius:10px; }
                    h1 { color:#22c55e; }
                </style>
            </head>
            <body>
                <h1>🏏 Live Cricket Dashboard</h1>
            `;

            try {
                const json = JSON.parse(data);

                if (json.data && json.data.length > 0) {
                    json.data.slice(0, 3).forEach(match => {
                        html += `
                        <div class="card">
                            <h3>${match.name || "Match"}</h3>
                            <p>${match.status || "No status"}</p>
                        </div>
                        `;
                    });
                } else {
                    // fallback data
                    const fallback = [
                        { name: "RCB vs MI", status: "Live - RCB 150/3" },
                        { name: "CSK vs GT", status: "Today 7:30 PM" },
                        { name: "SRH vs KKR", status: "Tomorrow" }
                    ];

                    fallback.forEach(match => {
                        html += `
                        <div class="card">
                            <h3>${match.name}</h3>
                            <p>${match.status}</p>
                        </div>
                        `;
                    });
                }

            } catch (e) {
                html += `<p>API Error - Showing demo data</p>`;

                const fallback = [
                    { name: "RCB vs MI", status: "Live - RCB 150/3" },
                    { name: "CSK vs GT", status: "Today 7:30 PM" },
                    { name: "SRH vs KKR", status: "Tomorrow" }
                ];

                fallback.forEach(match => {
                    html += `
                    <div class="card">
                        <h3>${match.name}</h3>
                        <p>${match.status}</p>
                    </div>
                    `;
                });
            }

            html += "</body></html>";
            res.end(html);
        });

    }).on("error", () => {
        res.end("<h1>API Connection Error</h1>");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
