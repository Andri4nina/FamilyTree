import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FamilyMemberModule } from './family-member/family-member.module';
import { FamilyRelationShipModule } from './family-relation-ship/family-relation-ship.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'img'), // Path to your images folder
    serveRoot: '/static',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'pdf'),
    serveRoot: '/pdf',
  }),
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  AuthModule,
  UserModule,
  FamilyMemberModule,
  FamilyRelationShipModule,
  FileUploadModule,],
  controllers: [AppController],
  providers: [AppService ,AppGateway],
})
export class AppModule {}
