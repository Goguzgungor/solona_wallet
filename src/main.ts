import { NestFactory } from '@nestjs/core';


import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WalletModule } from './routes/wallet/wallet.module';

async function bootstrap() {
  const app = await NestFactory.create(WalletModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
