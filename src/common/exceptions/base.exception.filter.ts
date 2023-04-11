import { FastifyReply, FastifyRequest } from 'fastify';
import { Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    request.log.error(exception);
    const status = exception.getStatus ? exception.getStatus() : 500;
    const message = exception.message ? exception.message : '服务器错误';
    response.status(status).send({
      statusCode: status,
      message,
      path: request.url,
    });
  }
}
