import { Module, Global } from '@nestjs/common';
import {  Helper } from './services';
import { DaoModule } from 'src/dao/dao.module';

@Global()
@Module({
     imports: [
          DaoModule
        ],
     providers: [
          Helper,
     ],
     exports: [
          Helper,
     ],
})
export class GlobalModule {};