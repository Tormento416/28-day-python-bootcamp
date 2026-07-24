const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  isPortableDesktop: true,
  platform: process.platform
});
