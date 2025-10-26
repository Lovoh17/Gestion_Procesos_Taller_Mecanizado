process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-12345';

afterEach(() => {
  jest.clearAllMocks();
});