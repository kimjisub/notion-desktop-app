const dotenv = require('dotenv');
dotenv.config();

const { app, BrowserWindow } = require('electron');
const console = require('console');
const path = require('path');
app.console = new console.Console(process.stdout, process.stderr);

function createWindow() {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 1300,
		height: 1080,
		minWidth: 200,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		frame: false,
	});

	// and load the index.html of the app.
	mainWindow.loadURL(process.env.PAGE_URL);

	mainWindow.webContents.on('did-finish-load', function () {
		mainWindow.webContents.insertCSS(
			//'html{box-sizing: border-box;border-style: solid;border-color: slategray;border-radius: 5px;}' + // 전체 페이지
			'::-webkit-scrollbar{ width: 10px;}' +
				'::-webkit-scrollbar-track{ background: #f1f1f1; } ' +
				'::-webkit-scrollbar-thumb{ background: #888; }' +
				'::-webkit-scrollbar-thumb:hover{ background: #555; }' +
				'div.notion-sidebar-container{display:none !important;}' + // 좌측 바
				'div.notion-frame > div:nth-child(1){display:none !important;}' + // 상단 바
				'div.notion-page-controls{display:none !important;}' + // 아이콘, 커버, 댓글 추가 버튼
				'div.notion-help-button{display:none !important;}' + // 도움말 버튼
				'div.notion-frame > div.notion-scroller{margin:90px 0 0 0;}' + // 스크롤
				'div.notion-frame > div.notion-scroller > div:nth-child(1) > div{left: 0px !important;padding:20px !important;height:90px !important;-webkit-app-region: drag;position: fixed;top: 0px;background-color: gray;z-index: 100;}' + // 제목
				'div.notion-frame > div.notion-scroller > div:nth-child(2) > div{display:none !important;}' + // 제목 아래 여백
				'div.notion-page-content{padding:0 20px 0 20px !important;}' + // 내용 페이지
				'.notion-selectable{max-width: none !important;}' + // 각 셀
				''
		);
	});

	// Open the DevTools.
	mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
