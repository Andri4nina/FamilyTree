import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'nestjs-prisma';
import { AppGateway } from 'src/app.gateway';

@Module({
  providers: [UserService,PrismaService,AppGateway],
  controllers: [UserController]
})
export class UserModule {}
