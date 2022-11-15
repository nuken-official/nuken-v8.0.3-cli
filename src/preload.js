const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
		
			selectFolder: () => ipcRenderer.invoke('dialog:openFile'),
			addons: () => ipcRenderer.invoke('addons'),
			themes: () => ipcRenderer.invoke('themes'),
			templates: () => ipcRenderer.invoke('templates'),
			extract_file: (extract_object) => ipcRenderer.send('extract_file', extract_object),
            delete_file: (file) => ipcRenderer.send('delete_file', file),
            show_folder: (locat) => ipcRenderer.send('show_folder', locat),
            delete_folder: (directory) => ipcRenderer.send('delete_folder', directory),
			reload_nuken: () => ipcRenderer.invoke('reload_nuken'),


			
    }

	
	
	
);
