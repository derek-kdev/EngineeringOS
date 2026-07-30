export interface RequestContext {
  requestId: string;
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  path?: string;
  method?: string;
  correlationId?: string;
  [key: string]: unknown;
}
