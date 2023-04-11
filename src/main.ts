import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { generateDocument } from './doc';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  //接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  // 添加全局拦截器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
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
