import { Module } from '@nestjs/common';
import { DaoController } from './dao.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../dao/entities';
import { UserDao } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]
  )],
  controllers: [DaoController],
  providers: [UserDao],
  exports: [UserDao]
})
export class DaoModule {}
