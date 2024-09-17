const {
    app,
    BrowserWindow,
    screen,
    ipcRenderer
} = require('electron');

let appWindow;

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize

    appWindow = new BrowserWindow({ width, height });
    appWindow.maximize();
    appWindow.loadFile('dist/path/index.html');

    appWindow.on('closed', () => {
        appWindow = null;
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
                    minHeight: display.workAreaSize.height
                });
                win.maximize();
                win.loadFile('dist/path/index.html');
            },500);
        });
    }
}

app.whenReady().then(() => {
    createWindow();
});