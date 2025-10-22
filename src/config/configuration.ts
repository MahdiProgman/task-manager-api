import * as DotenvFlow from 'dotenv-flow';
import { AppConfig, Configuration } from './config.interface';
import * as Joi from 'joi';

DotenvFlow.config({
  default_node_env: 'development',
});

const configSchema = Joi.object<Configuration, true>({
  app: Joi.object<AppConfig>({
    port: Joi.number(),
  }),
});

export function getConfigs(): Configuration {
  const config = {
    app: {
      port: parseInt(process.env.APP_PORT) || 3000,
    },
  };

  const { error } = configSchema.validate(config);

  if (error) throw new Error(`Invalid Configs : ${error}`);

  return config;
}
