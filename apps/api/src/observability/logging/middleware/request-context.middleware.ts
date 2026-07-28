import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from '../services/request-context.service';
import { randomUUID } from 'crypto';
import { RequestContext } from '../interfaces/request-context.interface';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    req.headers['x-request-id'] = requestId;

    const context: RequestContext = {
      requestId,
      ipAddress: this.getClientIp(req),
      userAgent: req.headers['user-agent'],
      path: req.path,
      method: req.method,
    };

    // Extract user if already authenticated (set by JWT guard)
    const user = (req as any).user;
    if (user) {
      context.userId = user.id;
      // organizationId could be extracted from the user object if available
    }

    // Store context in AsyncLocalStorage
    this.contextService.run(context, () => {
      // Set response header with request ID
      res.setHeader('X-Request-ID', requestId);
      next();
    });
  }

  private getClientIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'] as string | undefined;
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    return req.ip || req.socket?.remoteAddress || 'unknown';
  }
}
