import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Console } from 'console';
import { HttpExceptionFilter, LoggingInterceptor, TimeoutInterceptor, TransformInterceptor } from 'common/index';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(),
  new TransformInterceptor(),
  new TimeoutInterceptor()
);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.use(ValidationPipe)
  //apply (bind) on all app
  await app.listen(process.env.PORT ?? 3000);
  console.log(process.env.PORT );
  
}
bootstrap();
