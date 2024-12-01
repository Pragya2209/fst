import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { responseType } from 'src/utils';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getProfile(@Req() req:any):Promise<responseType> {
        return this.userService.getProfile(req);
      }
}
