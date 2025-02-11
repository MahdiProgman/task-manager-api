import { AppConfig, Configuration } from 'src/config/config.interface';

export interface IConfigService {
  getEntireConfiguration: () => Configuration;
  getAppConfig: () => AppConfig;
}
