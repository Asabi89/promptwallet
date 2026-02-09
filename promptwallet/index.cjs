const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Load the app - use built files in production, dev server in development
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  // Create application menu
  const menuTemplate = [
    {
      label: 'Prompt',
      submenu: [
        {
          label: 'List',
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            mainWindow.webContents.executeJavaScript('window.location.hash = "#/"');
          }
        },
        {
          label: 'New',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.executeJavaScript('window.location.hash = "#/form"');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Info',
      submenu: [
        {
          label: 'CGU',
          click: () => {
            mainWindow.webContents.executeJavaScript('window.location.hash = "#/cgu"');
          }
        },
        {
          label: 'About',
          click: () => {
            mainWindow.webContents.executeJavaScript('window.location.hash = "#/about"');
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Dark Mode',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.executeJavaScript(`
              document.body.classList.toggle('dark-mode');
              localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            `);
          }
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Register global shortcuts
  globalShortcut.register('CmdOrCtrl+L', () => {
    mainWindow.webContents.executeJavaScript('window.location.hash = "#/"');
  });

  globalShortcut.register('CmdOrCtrl+N', () => {
    mainWindow.webContents.executeJavaScript('window.location.hash = "#/form"');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
