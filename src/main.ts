import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/contracts/config.service';
import { CONFIG_SERVICE } from './config/constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './global/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from './common/types/validation-error.type';
import { ValidationFailedError } from './common/exceptions/validation-failed.exception';
import { SuccessResponseHandlerInterceptor } from './global/interceptors/success-response-handler.interceptor';

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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        console.log(errors);
        const validationErrors: ValidationError[] = errors.map((error) => ({
          field: error.property,
          messages: Object.values(error.constraints),
        }));

        throw new ValidationFailedError(validationErrors);
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new SuccessResponseHandlerInterceptor());

  const port = configService.getAppConfig().port;

  await app.listen(port, () => {
    console.log(`App Is Running On Port ${port}`);
  });
}
bootstrap();
