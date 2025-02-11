import * as DotenvFlow from 'dotenv-flow';
import { Configuration } from './config.interface';

DotenvFlow.config({
  default_node_env: 'development',
});

export default (): Configuration => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3000,
  },
});
