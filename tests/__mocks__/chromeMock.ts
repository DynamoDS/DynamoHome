export const chromeMock = {
  webview: {
    hostObjects: {
      scriptObject: {
        SaveSettings: jest.fn(),
        ApplicationLoaded: jest.fn(),
        OpenFile: jest.fn(),
        StartGuidedTour: jest.fn(),
        OpenWorkspace: jest.fn(),
        ShowTempalte: jest.fn(),
        ShowBackupFilesInFolder: jest.fn(),
        NewWorkspace: jest.fn(),
        NewCustomNodeWorkspace: jest.fn(),
        ShowSampleFilesInFolder: jest.fn(),
        ShowSampleDatasetsInFolder: jest.fn(),
      },
    },
  },
};