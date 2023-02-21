import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { emailConfigLoader } from './../../core/infrastructure/config/loaders/email.loader';
import { DateService } from './services/date.service';

@Module({
  imports: [ConfigModule.forFeature(emailConfigLoader)],
  providers: [DateService],
  exports: [DateService],
})
export class SharedModule {}
