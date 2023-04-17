import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { FastifyLogger } from './common/logger';
import { generateDocument } from './doc';
import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';

declare const module: any;
async function bootstrap() {
  // logger
  const fastifyInstance = fastify({
    logger: FastifyLogger,
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );
  //接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  // 启动全局字段校验
  app.useGlobalPipes(new ValidationPipe());
  // 添加全局拦截器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

  app.register(fastifyCookie, {
    secret: 'ch666', // for cookies signature
  });

  // 统一响应格式
  app.useGlobalInterceptors(new TransformInterceptor());
  // 创建文档
  generateDocument(app);

  // 热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(3000);
}
bootstrap();
