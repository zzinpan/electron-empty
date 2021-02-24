const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
	  if (frameName === 'modal') {
	    // open window as modal
	    event.preventDefault()
	    Object.assign(options, {
	      modal: true,
	      parent: win,
	      width: 1000,
	      height: 400
	    })
	    event.newGuest = new BrowserWindow(options)
	    event.newGuest.loadFile("inner.html")
	    
	  }
	})
  
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})