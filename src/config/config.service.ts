import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { IConfigService } from '@common/interfaces/config-service.interface';
import { AppConfig, Configuration } from './config.interface';

@Injectable()
export class ConfigService implements IConfigService {
  constructor(private readonly configService: NestConfigService) {}

  public getEntireConfiguration(): Configuration {
    return this.configService.get<Configuration>('');
  }

  public getAppConfig(): AppConfig {
    return this.configService.get<AppConfig>('app');
  }
}
