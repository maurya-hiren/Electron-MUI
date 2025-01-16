const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    // Log to verify the correct path
    const appPath = path.join(__dirname, 'renderer/build/index.html');
    console.log(`Loading React build from: ${appPath}`);

    // Load React build
    mainWindow.loadFile(appPath);

    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

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
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
