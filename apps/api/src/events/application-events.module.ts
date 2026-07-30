import { Module, Global } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventBusService } from './event-bus.service';
import { EVENT_PUBLISHER } from './constants/tokens.constants';
import { LoggingModule } from '../observability/logging/logging.module';

@Global()
@Module({
  imports: [
    // EventEmitter2 configuration – can be extended later for Kafka, etc.
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: process.env.NODE_ENV !== 'production',
      ignoreErrors: false,
    }),
    LoggingModule, // provides AppLogger
    // Import any modules needed by handlers (Audit, Notifications, Analytics)
    // These modules should be available in the application.
  ],
  providers: [
    EventBusService,
    {
      provide: EVENT_PUBLISHER,
      useExisting: EventBusService, // or useClass: EventBusService
    },
    /* // Handlers
    ProjectCreatedAuditHandler,
    ProjectCreatedNotificationHandler,
    ProjectCreatedAnalyticsHandler,*/
  ],
  exports: [EVENT_PUBLISHER, EventBusService],
})
export class ApplicationEventsModule {}
