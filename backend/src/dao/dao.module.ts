import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../dao/entities';
import { UserDao } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]
  )],
  controllers: [],
  providers: [UserDao],
  exports: [UserDao]
})
export class DaoModule {}
