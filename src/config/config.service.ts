import { Injectable } from '@nestjs/common';
import { ConfigService as IConfigService } from './contracts/config.service';
import { AppConfig, Configuration } from './config.interface';
import { getConfigs } from './configuration';

@Injectable()
export class ConfigService implements IConfigService {
  private readonly config: Configuration;

  constructor() {
    this.config = getConfigs();
  }

  public getEntireConfiguration(): Configuration {
    return this.config;
  }

  public getAppConfig(): AppConfig {
    return this.config.app;
  }
}
