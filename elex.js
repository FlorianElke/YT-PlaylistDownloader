const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow } = electron;

let mainWindow;

//Listens for the app to open
app.on('ready', () => {
	//Creates a new browser Window
	mainWindow = new BrowserWindow({
		width: 900,
		height: 750,
		resizable: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	//Loads the HTML file
	mainWindow.loadURL('http://127.0.0.1:8080');
	//Removes the top menue
	mainWindow.removeMenu();
	//Dev tools, remove later
	//mainWindow.webContents.openDevTools();
});