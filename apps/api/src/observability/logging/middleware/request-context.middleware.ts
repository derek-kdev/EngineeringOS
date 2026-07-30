import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from '../services/request-context.service';
import { randomUUID } from 'crypto';
import { RequestContext } from '../interfaces/request-context.interface';

// Augment Express Request type to include our custom properties
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      // user will be added by authentication guards; not set here
    }
  }
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const headers = req.headers;

    // 1. Normalize header values – handle string | string[] | undefined
    const requestIdHeader = headers['x-request-id'];
    const requestId =
      typeof requestIdHeader === 'string' ? requestIdHeader : randomUUID();

    // Attach correlation ID directly to the request object for easy access elsewhere
    req.requestId = requestId;

    // 2. Extract IP address with proper handling and IPv6-mapped IPv4 normalisation
    const ipAddress = this.getClientIp(req);

    // 3. Store headers once
    const userAgent = headers['user-agent'];

    // 4. Build context – no user info here (guards will add it later)
    const context: RequestContext = Object.freeze({
      requestId,
      ipAddress,
      userAgent,
      path: req.originalUrl || req.url || req.path,
      method: req.method,
      // userId and organizationId are intentionally omitted – they will be set by
      // the authentication guard via requestContextService.update() after the user is known.
    });

    // 5. Run the request with the immutable context
    this.contextService.run(context, () => {
      // Set response header for traceability
      res.setHeader('X-Request-ID', requestId);
      next();
    });
  }

  private getClientIp(req: Request): string {
    // Prefer X-Forwarded-For when present (behind proxies)
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }

    // Fallback to req.ip or socket address, normalise IPv6-mapped IPv4
    const ip = req.ip || req.socket?.remoteAddress;
    return ip?.replace(/^::ffff:/, '') ?? 'unknown';
  }
}
