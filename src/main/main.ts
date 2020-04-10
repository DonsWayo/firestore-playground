import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow | null;

const createWindow = async () => {

    win = new BrowserWindow({ 
        width: 1000, 
        height: 600,
        minWidth: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (process.env.NODE_ENV !== 'production') {
        process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '0';
        win.loadURL(`http://localhost:2003`);
    } else {
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    if (process.env.NODE_ENV !== 'production') {
        win.webContents.once('dom-ready', () => {
            win!.webContents.openDevTools();
        });
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
