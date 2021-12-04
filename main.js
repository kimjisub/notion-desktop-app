const { app, BrowserWindow } = require('electron');
const cfg = require('electron-cfg');
const console = require('console');
const path = require('path');
const fs = require('fs');
app.console = new console.Console(process.stdout, process.stderr);

function createWindow() {
	const mainWindow = cfg.window().create({
		minWidth: 200,
		frame: false,
	});

	mainWindow.loadURL('https://www.notion.so');

	fs.readFile(__dirname + '/style.css', function (err, data) {
		if (err) console.log(err);

		mainWindow.webContents.on('did-finish-load', function () {
			mainWindow.webContents.insertCSS(data.toString());
		});
	});

	// mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});
