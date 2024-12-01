import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DaoModule } from 'src/dao';
import { GlobalModule } from 'src/global';
import { AuthModule } from 'src/auth';

@Module({
  imports:[
    DaoModule,
    GlobalModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
