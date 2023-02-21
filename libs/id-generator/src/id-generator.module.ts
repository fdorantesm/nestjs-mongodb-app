import { Module } from '@nestjs/common';
import { ID_GENERATOR_SERVICE } from './id-generator.interface';
import { UuidGeneratorService } from './uuid-generator.service';

@Module({
  providers: [
    {
      useClass: UuidGeneratorService,
      provide: ID_GENERATOR_SERVICE,
    },
  ],
  exports: [ID_GENERATOR_SERVICE],
})
export class IdGeneratorModule {}
