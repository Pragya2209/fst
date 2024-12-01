
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { FastifyRequest } from 'fastify';
  import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from 'src/decorators';
import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if(isPublic) {
        return true;
      }
      const http = context.switchToHttp();
        const request = http.getRequest<FastifyRequest>();

      const token = this.extractTokenFromHeader(request);
      if (!token) {
       false;
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('jwtSecret'),
          }
        );
        request['user'] = payload;
      } catch {
        return false;
      }
      return true;
    }
  
    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  