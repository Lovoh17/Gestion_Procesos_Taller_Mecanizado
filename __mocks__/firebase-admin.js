export default {
  apps: [],
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(() => ({}))
  },
  storage: jest.fn(() => ({
    bucket: jest.fn(() => ({
      file: jest.fn(() => ({
        save: jest.fn(async () => {}),
        download: jest.fn(async () => {}),
      }))
    }))
  }))
};
