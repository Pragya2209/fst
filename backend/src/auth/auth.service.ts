// src/auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignupDto, SigninDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { Helper } from 'src/global';
import { UserDao } from 'src/dao';
import { responseCode, responseType } from 'src/utils';
import { User } from 'src/dao/entities';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly userDaoSerivce: UserDao,
        private readonly helperService: Helper,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }

    async signup(signupDto: SignupDto): Promise<responseType> {
        let responseObject = this.helperService.responseFormat();
        try {
            this.logger.log({
                methodName: this.helperService.getMethodName(),
                msg : 'signupDto obj',
                signupDto
            })
            const { email, name, password } = signupDto;
            const existingUser = await this.userDaoSerivce.findOneUser({ email });
            this.logger.log({
                methodName: this.helperService.getMethodName(),
                msg : 'existingUser',
                existingUser
            })
            if (existingUser) {
                responseObject = this.helperService.response(responseCode.USER_ALREADY_EXISTS, {
                    user: {
                        email: existingUser.email,
                        name: existingUser.name
                    }
                });
            }
            else {
                const byCryptSalt = this.configService.get('byCryptSalt');
                const salt = await bcrypt.genSalt(byCryptSalt);
                const hashedPassword = await bcrypt.hash(password, salt);

                const userObj: User = { email, name, password: hashedPassword };
                const newUser = await this.userDaoSerivce.insertUser(userObj);
                this.logger.log({
                    methodName: this.helperService.getMethodName(),
                    msg : 'newUser inserted',
                    newUser
                })
                responseObject = this.helperService.response(responseCode.SUCCESS, {
                    user: {
                        email: newUser.email,
                        name: newUser.name
                    }
                });
            }
        } catch (error) {
            this.logger.error(error);
           responseObject = this.helperService.response(responseCode.INTERNAL_SERVER_ERROR);
        }
        return responseObject
    }

    async signIn(signInDto: SigninDto): Promise<responseType> {
        let responseObject = this.helperService.responseFormat();
        try {
            this.logger.log({
                methodName: this.helperService.getMethodName(),
                msg : 'signInDto obj',
                signInDto
            })
            const { email, password } = signInDto;
            const user = await this.userDaoSerivce.findOneUser({ email });
            this.logger.log({
                methodName: this.helperService.getMethodName(),
                msg : 'user',
                signupDto: user
            })
            if (!user) {
                responseObject = this.helperService.response(responseCode.USER_NOT_FOUND);
            }
            else {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    responseObject = this.helperService.response(responseCode.UNAUTHORIZED);
                }
                else {
                    const payload = { email: user.email, name: user.name };
                    const accessToken = await this.jwtService.signAsync(payload)
                    responseObject = this.helperService.response(responseCode.SUCCESS, { accessToken });
                }
            }
        } catch (error) {
            this.logger.error(error);
           responseObject = this.helperService.response(responseCode.INTERNAL_SERVER_ERROR);
        }
        return responseObject
    }
}
