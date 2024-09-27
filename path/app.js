const {
    app,
    BrowserWindow,
    screen,
    ipcRenderer
} = require('electron');

let appWindow;

function createWindow() {
    const secundaryDisplay = [];
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize

    appWindow = new BrowserWindow({ width, height });
    appWindow.maximize();
    // appWindow.loadFile('dist/path/index.html');
    appWindow.loadURL('http://localhost:7777/');
    
    appWindow.on('closed', () => {
        appWindow = null;
        secundaryDisplay.map((display) => {
            display.close();
        });
    });
    
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.filter((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
    });
    
    if(externalDisplay) {
        externalDisplay.map((display) => {
            setTimeout(() => {
                let win = new BrowserWindow({
                    x: display.bounds.x,
                    y: display.bounds.y,
                    minWidth: display.workAreaSize.width,
                    minHeight: display.workAreaSize.height,
                    frame: false
                });
                win.maximize();
                secundaryDisplay.push(win);
                // win.loadFile('dist/path/index.html');
                win.loadURL('http://localhost:7777/');

                // Abre o DevTools quando a janela estiver pronta
                win.webContents.on('did-finish-load', () => {
                    win.webContents.openDevTools();
                });
            },500);
        });
    }
}

app.whenReady().then(() => {
    createWindow();
});