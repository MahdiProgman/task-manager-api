import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/contracts/config.service';
import { CONFIG_SERVICE } from './config/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(CONFIG_SERVICE);
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('Documentation for best of the best')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  const port = configService.getAppConfig().port;

  await app.listen(port, () => {
    console.log(`App Is Running On Port ${port}`);
  });
}
bootstrap();
