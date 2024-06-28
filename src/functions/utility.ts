/**
* A call to a backend function requesting to open a file
* @param {string} path | - the location of the file on the system
*/
export function openFile(path:string) {
  if (window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.OpenFile(path);
  }
}

/**
 * A call to a backend function requesting the start of a guided tour
 * @param {string} guidedTour - the type of guided tour to be started
 */
export function startGuidedTour(guidedTour:string) {
  if (window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.StartGuidedTour(guidedTour);
  }
}

/**
 * A call to different backedn functions based on the provided value
 * @param {SidebarCommand} value the type of command based on the UI request
 */
export function sideBarCommand(value: SidebarCommand) {
  if (value === 'open-file' && window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.OpenWorkspace();
  }
  if (value === 'open-template' && window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.ShowTempalte();
  }
  if (value === 'open-backup-locations' && window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.ShowBackupFilesInFolder();
  }
  if (value === 'workspace' && window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.NewWorkspace();
  }
  if (value === 'custom-node' && window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.NewCustomNodeWorkspace();
  }
}

/**
 * A call to a backend function requesting the execution of the ShowSampleFilesInFolder function
 */
export function showSamplesFilesInFolder() {
  if (window.chrome?.webview !== undefined) {
    window.chrome.webview.hostObjects.scriptObject.ShowSampleFilesInFolder();
  }
}

/**
 * A call to a backend function requesting to save the current HomePage settings
 */
export function saveHomePageSettings(settings: any) {
  if (window.chrome?.webview !== undefined) {
    const settingsJson = JSON.stringify(settings);
    window.chrome.webview.hostObjects.scriptObject.SaveSettings(settingsJson);
  }
}
