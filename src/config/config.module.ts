import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_SERVICE } from './constants';

@Module({
  providers: [
    {
      provide: CONFIG_SERVICE,
      useClass: ConfigService,
    },
  ],
  exports: [CONFIG_SERVICE],
})
export class ConfigModule {}
