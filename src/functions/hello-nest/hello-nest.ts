import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../app.module';

import express from 'express';
import serverless from 'serverless-http';

const expressApp = express();

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix('.netlify/functions');
  return await app.init();
}

// then, in your handler function:
exports.handler = async (event, context) => {
  const app = await bootstrap();
  const appHandler = serverless(expressApp);
  return await appHandler(event, context);
}