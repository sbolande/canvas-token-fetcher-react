import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("presetsAPI", {
  getPresets: () => ipcRenderer.invoke("get-presets"),
  setPresets: (presets) => ipcRenderer.invoke("set-presets", presets),
});

contextBridge.exposeInMainWorld("tokenAPI", {
  fetch: (args) => ipcRenderer.invoke("fetch-token", args),
});
