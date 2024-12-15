import { Module } from '@nestjs/common';
import { FamilyRelationShipService } from './family-relation-ship.service';
import { FamilyRelationShipController } from './family-relation-ship.controller';

@Module({
  providers: [FamilyRelationShipService],
  controllers: [FamilyRelationShipController]
})
export class FamilyRelationShipModule {}
