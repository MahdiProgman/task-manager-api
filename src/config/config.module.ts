import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { ConfigService } from './config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      load: [configuration],
      ignoreEnvFile: true,
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
