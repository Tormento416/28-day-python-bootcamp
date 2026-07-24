const { app, BrowserWindow } = require("electron");
const path = require("path");
const http = require("http");
const fs = require("fs");

let mainWindow;
let localServer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1024,
    minHeight: 720,
    title: "Pythonia - 28-Day RPG Python Bootcamp",
    autoHideMenuBar: true,
    backgroundColor: "#020617",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false
    }
  });

  const isDev = !app.isPackaged && process.env.NODE_ENV === "development";

  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    // Production portable mode: Serve exported static files or load local build
    const outPath = path.join(__dirname, "../out");

    if (fs.existsSync(outPath)) {
      // Local HTTP file server for Next.js static output
      localServer = http.createServer((req, res) => {
        let filePath = path.join(outPath, req.url === "/" ? "index.html" : req.url);

        // If file doesn't exist directly, try adding .html (Next.js route structure)
        if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
          filePath = filePath + ".html";
        } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, "index.html"))) {
          filePath = path.join(filePath, "index.html");
        }

        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          ".html": "text/html",
          ".js": "text/javascript",
          ".css": "text/css",
          ".json": "application/json",
          ".png": "image/png",
          ".jpg": "image/jpg",
          ".wasm": "application/wasm",
          ".svg": "image/svg+xml"
        };

        const contentType = mimeTypes[ext] || "application/octet-stream";

        fs.readFile(filePath, (err, content) => {
          if (err) {
            // Fallback to main index.html for client SPA routing
            fs.readFile(path.join(outPath, "index.html"), (indexErr, indexContent) => {
              if (indexErr) {
                res.writeHead(500);
                res.end("Error loading static app.");
              } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(indexContent, "utf-8");
              }
            });
          } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf-8");
          }
        });
      });

      localServer.listen(0, "127.0.0.1", () => {
        const port = localServer.address().port;
        mainWindow.loadURL(`http://127.0.0.1:${port}`);
      });
    } else {
      mainWindow.loadURL("http://localhost:3000");
    }
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
    if (localServer) localServer.close();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
