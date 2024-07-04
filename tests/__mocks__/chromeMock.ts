export const chromeMock = {
  webview: {
    hostObjects: {
      scriptObject: {
        ApplicationLoaded: jest.fn(),
      },
    },
  },
};