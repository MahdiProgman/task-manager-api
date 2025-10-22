import { AppConfig, Configuration } from '../config.interface';

export interface ConfigService {
  getEntireConfiguration(): Configuration;
  getAppConfig(): AppConfig;
}
