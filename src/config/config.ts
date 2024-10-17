import { GeneralConfig } from './config.types';

export default (): GeneralConfig => ({
  port: parseInt(process.env.CORE_PORT) || 3001,
  nats: {
    url: process.env.NATS_URL || 'nats://localhost:4222',
  },
});
