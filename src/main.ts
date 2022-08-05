import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TomeOutInterceptor } from './common/interceptors/timeout.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TomeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
  .setTitle('Api vuelos v1')
  .setDescription('Vuelos programados')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app,options);

  SwaggerModule.setup('/api/docs',app,document,{
    swaggerOptions:{
      filter: true,
    }
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
