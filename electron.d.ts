interface Window {
  electron?: {
    ipcRenderer: import('electron').IpcRenderer;
    getCurrentWindow: () => import('electron').BrowserWindow;
  };
}
