import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos extras do DTO
      forbidNonWhitelisted: true, // Lança erro se houver campos extras
      transform: true, // Converte automaticamente para instâncias de classes
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
