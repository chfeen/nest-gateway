import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { BusinessException } from './business.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: any) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const message = exception.message;
    // 处理业务运行中预知且主动抛出的异常
    if (exception instanceof BusinessException) {
      const error = exception.getResponse();
      response.status(status).send({
        statusCode: error['code'],
        message: error['message'],
        path: request.url,
      });
      return;
    }
    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      path: request.url,
    });
  }
}
