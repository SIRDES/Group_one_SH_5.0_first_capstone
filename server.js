const http = require("http");
const fs = require("fs").promises;
const os = require("os");

const HOST = "127.0.0.1";
const PORT = "5000";

const sendResponds = async (res, filePath, statusCode) => {
  const content = await fs.readFile(__dirname + filePath);
  res.writeHead(statusCode, { "content-Type": "text/html" });
  res.end(content);
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    sendResponds(res, "/pages/index.html", 200);
  } else if (req.url === "/about") {
    sendResponds(res, "/pages/about.html", 200);
  } else if (req.url === "/sys") {
    const systemInfo = {
      hostname: os.hostname(),
      platform: os.platform(),
      achitecture: os.arch(),
      numberOfCPUS: os.cpus().length,
      networkInterfaces: os.networkInterfaces(),
      uptime: `${os.uptime()} seconds`,
    };
    fs.writeFile("osinfo.json", JSON.stringify(systemInfo));

    res.writeHead(201, { "content-Type": "text/plain" });
    res.end("Your OS info has been saved successfully!");
  } else {
    sendResponds(res, "/pages/404.html", 404);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
