import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API that records projects developed or maintained by IMB')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
