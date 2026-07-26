import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { VerifiedEmailInterceptor } from './interceptors/verified-email.interceptor';

@Global()
@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: VerifiedEmailInterceptor,
    },
  ],
  exports: [],
})
export class CommonModule {}
