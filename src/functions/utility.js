/**
* A call to a backend function requesting to open a file
* @param {string} path | - the location of the file on the system
*/
export function openFile(path) {
  if (chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.OpenFile(path);
  }
}

/**
 * A call to a backend function requesting the start of a guided tour
 * @param {string} guidedTour - the type of guided tour to be started
 */
export function startGuidedTour(guidedTour) {
  if (chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.StartGuidedTour(guidedTour);
  }
}

/**
 * A call to different backedn functions based on the provided value
 * @param {string} value the type of command based on the UI request
 */
export function sideBarCommand(value) {
  if (value === 'open-file' && chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.OpenWorkspace();
  }
  if (value === 'open-template' && chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.ShowTempalte();
  }
  if (value === 'open-backup-locations' && chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.ShowBackupFilesInFolder();
  }
  if (value === 'workspace' && chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.NewWorkspace();
  }
  if (value === 'custom-node' && chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.NewCustomNodeWorkspace();
  }
}

/**
 * A call to a backend function requesting the execution of the ShowSampleFilesInFolder function
 */
export function showSamplesFilesInFolder() {
  if (chrome.webview !== undefined) {
    chrome.webview.hostObjects.scriptObject.ShowSampleFilesInFolder();
  }
}

/**
 * A call to a backend function requesting to save the current HomePage settings
 */
export function saveHomePageSettings(settings) {
  if (chrome.webview !== undefined) {
    const settingsJson = JSON.stringify(settings);
    chrome.webview.hostObjects.scriptObject.SaveSettings(settingsJson);
  }
}
