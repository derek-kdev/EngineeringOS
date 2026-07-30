import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext } from './interfaces/request-context.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestContextService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

  run(store: RequestContext, callback: () => void): void {
    this.asyncLocalStorage.run(store, callback);
  }

  getContext(): RequestContext | undefined {
    return this.asyncLocalStorage.getStore();
  }

  set(key: keyof RequestContext, value: unknown): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store[key] = value;
    }
  }

  get<T = unknown>(key: keyof RequestContext): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store?.[key] as T | undefined;
  }

  getRequestId(): string {
    return this.get('requestId') || randomUUID();
  }
}
