const dotenv = require('dotenv');
dotenv.config();

const { app, BrowserWindow } = require('electron');
const cfg = require('electron-cfg');
const console = require('console');
const path = require('path');
app.console = new console.Console(process.stdout, process.stderr);

function createWindow() {
	const mainWindow = cfg.window().create({
		minWidth: 200,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
		frame: false,
	});

	mainWindow.loadURL(process.env.PAGE_URL);

	mainWindow.webContents.on('did-finish-load', function () {
		mainWindow.webContents.insertCSS(
			'::-webkit-scrollbar{ width: 10px;}' +
				'::-webkit-scrollbar-track{ background: #f1f1f1; } ' +
				'::-webkit-scrollbar-thumb{ background: #888; }' +
				'::-webkit-scrollbar-thumb:hover{ background: #555; }' +
				'div.notion-sidebar-container{display:none !important;}' + // 좌측 바
				'div.notion-frame > div:nth-child(1){display:none !important;}' + // 상단 바
				'div.notion-page-controls{display:none !important;}' + // 아이콘, 커버, 댓글 추가 버튼
				'div.notion-help-button{display:none !important;}' + // 도움말 버튼
				'div.notion-frame > div.notion-scroller{margin:40px 0 0 0;padding:20px 0 0 0;}' + // 스크롤
				'div.notion-frame > div.notion-scroller > div:nth-child(1) > div{left: 0px !important;padding:0px !important;height:40px !important;-webkit-app-region: drag;position: fixed;top: 0px;background-color: gray;z-index: 100;}' + // 제목 셀
				'div.notion-frame > div.notion-scroller.vertical.horizontal > div:nth-child(1) > div > div.notion-selectable.notion-page-block{height: 100%;}' + // 제목 셀 상단
				'div.notion-frame > div.notion-scroller.vertical.horizontal > div:nth-child(1) > div > div.notion-selectable.notion-page-block > div{font-size:15px;vertical-align: middle;margin-left: 20px;}' + // 제목 텍스트
				'div.notion-frame > div.notion-scroller > div:nth-child(2) > div{display:none !important;}' + // 제목 아래 여백
				'div.notion-page-content{padding:0 20px 0 20px !important;}' + // 내용 페이지
				'.notion-selectable{max-width: none !important;}' + // 각 셀
				''
		);
	});

	//mainWindow.webContents.openDevTools();
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
