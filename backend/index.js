const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const downloadsDir = path.join(__dirname, "downloads");

// Get network interfaces to support multiple IPs
const os = require("os");
const networkInterfaces = os.networkInterfaces();

// Function to get all server IP addresses
function getServerIPs() {
  const ips = [];
  Object.keys(networkInterfaces).forEach((iface) => {
    networkInterfaces[iface].forEach((details) => {
      if (details.family === "IPv4" && !details.internal) {
        ips.push(details.address);
      }
    });
  });
  return ips;
}

app.get("/files", (req, res) => {
  fs.readdir(downloadsDir, (err, files) => {
    if (err) {
      console.error("Error reading downloads directory:", err);
      return res.status(500).json({ error: "Unable to scan files" });
    }

    const fileList = files.map((file) => {
      const filePath = path.join(downloadsDir, file);
      const stats = fs.statSync(filePath);
      const serverIPs = getServerIPs();

      // Create download URLs for all available IPs
      const urls = serverIPs.map((ip) => ({
        ip,
        url: `http://${ip}:${port}/downloads/${encodeURIComponent(file)}`,
      }));

      return {
        name: file,
        size: `${(stats.size / (1024 * 1024)).toFixed(2)} MB`,
        urls, // Array of available download URLs with different IPs
      };
    });
    res.json(fileList);
  });
});

// Serve static files from the downloads directory
app.use(
  "/downloads",
  express.static(downloadsDir, {
    setHeaders: (res, filePath) => {
      // Set proper headers for all file types
      const ext = path.extname(filePath);
      if (ext === ".pdf") {
        res.setHeader("Content-Type", "application/pdf");
      } else if (ext === ".jpg" || ext === ".jpeg") {
        res.setHeader("Content-Type", "image/jpeg");
      } else if (ext === ".png") {
        res.setHeader("Content-Type", "image/png");
      } else if (ext === ".zip") {
        res.setHeader("Content-Type", "application/zip");
      } else if (ext === ".txt") {
        res.setHeader("Content-Type", "text/plain");
      }
      // Add more MIME types as needed
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${path.basename(filePath)}"`,
      );
    },
  }),
);

app.listen(port, () => {
  const ips = getServerIPs();
  console.log(`Backend server listening on port ${port}`);
  console.log("Available on these IP addresses:");
  ips.forEach((ip) => console.log(`http://${ip}:${port}`));
});
