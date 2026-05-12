import { openFile, startGuidedTour, sideBarCommand, showSamplesCommand, saveHomePageSettings } from '../../src/functions/utility';

type MutableWindow = Window & { chrome?: Window['chrome'] };

describe('utility functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('openFile', () => {
    it('calls scriptObject.OpenFile when chrome.webview exists', () => {
      openFile('/some/path/file.dyn');
      expect(window.chrome.webview.hostObjects.scriptObject.OpenFile).toHaveBeenCalledWith('/some/path/file.dyn');
    });

    it('does not throw when chrome is undefined', () => {
      const savedChrome = window.chrome;
      (window as unknown as MutableWindow).chrome = undefined;
      expect(() => openFile('/path')).not.toThrow();
      window.chrome = savedChrome;
    });
  });

  describe('startGuidedTour', () => {
    it('calls scriptObject.StartGuidedTour when chrome.webview exists', () => {
      startGuidedTour('geometry');
      expect(window.chrome.webview.hostObjects.scriptObject.StartGuidedTour).toHaveBeenCalledWith('geometry');
    });

    it('does not throw when chrome is undefined', () => {
      const savedChrome = window.chrome;
      (window as unknown as MutableWindow).chrome = undefined;
      expect(() => startGuidedTour('geometry')).not.toThrow();
      window.chrome = savedChrome;
    });
  });

  describe('sideBarCommand', () => {
    it('"open-file" calls OpenWorkspace', () => {
      sideBarCommand('open-file');
      expect(window.chrome.webview.hostObjects.scriptObject.OpenWorkspace).toHaveBeenCalled();
    });

    it('"open-template" calls ShowTempalte', () => {
      sideBarCommand('open-template');
      expect(window.chrome.webview.hostObjects.scriptObject.ShowTempalte).toHaveBeenCalled();
    });

    it('"open-backup-locations" calls ShowBackupFilesInFolder', () => {
      sideBarCommand('open-backup-locations');
      expect(window.chrome.webview.hostObjects.scriptObject.ShowBackupFilesInFolder).toHaveBeenCalled();
    });

    it('"workspace" calls NewWorkspace', () => {
      sideBarCommand('workspace');
      expect(window.chrome.webview.hostObjects.scriptObject.NewWorkspace).toHaveBeenCalled();
    });

    it('"custom-node" calls NewCustomNodeWorkspace', () => {
      sideBarCommand('custom-node');
      expect(window.chrome.webview.hostObjects.scriptObject.NewCustomNodeWorkspace).toHaveBeenCalled();
    });

    it('does not call any function when chrome is undefined', () => {
      const savedChrome = window.chrome;
      (window as unknown as MutableWindow).chrome = undefined;
      expect(() => sideBarCommand('open-file')).not.toThrow();
      window.chrome = savedChrome;
      expect(window.chrome.webview.hostObjects.scriptObject.OpenWorkspace).not.toHaveBeenCalled();
    });
  });

  describe('showSamplesCommand', () => {
    it('"open-graphs" calls ShowSampleFilesInFolder', () => {
      showSamplesCommand('open-graphs');
      expect(window.chrome.webview.hostObjects.scriptObject.ShowSampleFilesInFolder).toHaveBeenCalled();
    });

    it('"open-datasets" calls ShowSampleDatasetsInFolder', () => {
      showSamplesCommand('open-datasets');
      expect(window.chrome.webview.hostObjects.scriptObject.ShowSampleDatasetsInFolder).toHaveBeenCalled();
    });

    it('does not throw when chrome is undefined', () => {
      const savedChrome = window.chrome;
      (window as unknown as MutableWindow).chrome = undefined;
      expect(() => showSamplesCommand('open-graphs')).not.toThrow();
      window.chrome = savedChrome;
    });
  });

  describe('saveHomePageSettings', () => {
    it('calls SaveSettings with JSON.stringify of settings object when chrome.webview exists', () => {
      const settings = { recentPageViewMode: 'grid', sideBarWidth: '300' };
      saveHomePageSettings(settings);
      expect(window.chrome.webview.hostObjects.scriptObject.SaveSettings).toHaveBeenCalledWith(
        JSON.stringify(settings)
      );
    });

    it('does not throw when chrome is undefined', () => {
      const savedChrome = window.chrome;
      (window as unknown as MutableWindow).chrome = undefined;
      expect(() => saveHomePageSettings({ a: 1 })).not.toThrow();
      window.chrome = savedChrome;
    });
  });
});
