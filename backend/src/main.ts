import { NestFactory } from '@nestjs/core';
import { FastifyAdapter,NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import multipart from '@fastify/multipart';
import { Logger } from '@nestjs/common';
import helmet from '@fastify/helmet'
import fastifyCsrf from '@fastify/csrf-protection';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    logger.log('Starting the application...');
    const fastifyAdapter = new FastifyAdapter({
      logger: true,
    });
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyAdapter,
    );
    app.enableCors()
    app.register(multipart, {
      attachFieldsToBody: true,
    });  
    app.register(helmet);
    await app.register(fastifyCsrf);

    fastifyAdapter.getInstance().addContentTypeParser('*', 
    (_request, _payload, done) => {
      done(null, {});
    });
    app.setGlobalPrefix('api/v1/fst-backend');
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
    }));
    
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    app.useLogger(new Logger());

    await app.listen(port);
    logger.log('Application successfully started');
  }
  catch(error) {
    logger.error('Error: while starting application!', error);
  }
}
bootstrap();
