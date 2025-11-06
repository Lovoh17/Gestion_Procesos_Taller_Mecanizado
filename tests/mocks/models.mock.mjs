// tests/mocks/models.mock.mjs
import { jest } from '@jest/globals';
import { mockTransaccionFinancieraModel } from './Transaccion_Financiera.mock.mjs';

export const setupModelMocks = () => {
  jest.unstable_mockModule('../../src/modules/Transaccion_Financiera/Transaccion_Financiera.js', () => ({
    Transaccion_Financiera: mockTransaccionFinancieraModel
  }));
};