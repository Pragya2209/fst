import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { responseType } from 'src/utils';
import { SignupDto, SigninDto } from './dto';
import { Public } from 'src/decorators';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUo(@Body() signupDto: SignupDto): Promise<responseType> {
    return await this.authService.signup(signupDto);
  }

  @Post('signin')
  async signIn(@Body() signupDto: SigninDto): Promise<responseType> {
    return await this.authService.signIn(signupDto);
  }
}
