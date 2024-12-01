import { Injectable, Logger } from '@nestjs/common';
import { UserDao } from 'src/dao';
import { Helper } from 'src/global';
import { responseCode, responseType } from 'src/utils';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name,{ timestamp: true });
    constructor(
        private readonly userDaoSerivce: UserDao,
        private readonly helperService: Helper,
    ) { }
    
    async getProfile(req: any): Promise<responseType> {
        let responseObject = this.helperService.responseFormat()
        try {
            const { email } = req.user;
            this.logger.log({
                methodName: this.helperService.getMethodName(),
                msg : 'req info',
                user: req.user
            })
            let user = await this.userDaoSerivce.findOneUser({email});
            this.logger.log({
                methodName: this.helperService.getMethodName(),
                msg : 'user info',
                user
            })
            let responseData = {
                email: user.email,
                name: user.name,
            }
            responseObject = this.helperService.response(responseCode.SUCCESS, {user:responseData});
        }
        catch(error) {
            console.error(error);
            responseObject = this.helperService.response(responseCode.INTERNAL_SERVER_ERROR);
        }
        return responseObject
    }
}
