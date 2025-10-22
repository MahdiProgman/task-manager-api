import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/contracts/config.service';
import { CONFIG_SERVICE } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(CONFIG_SERVICE);

  const port = configService.getAppConfig().port;

  await app.listen(port, () => {
    console.log(`App Is Running On Port ${port}`);
  });
}
bootstrap();
