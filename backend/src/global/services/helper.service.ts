import { Injectable } from '@nestjs/common';
import { responseMsg } from 'src/utils';
import { responseType } from 'src/utils';

@Injectable()
export class Helper {
  constructor() { }

  response(code:number = 200, data:object = {}, message:string = "") : responseType {
    let returnObj : responseType = {}

    if(code) {
      returnObj.code = code;
    }
    if (message) {
      returnObj.message = message;
    } else {
      returnObj.message = responseMsg[code];
    }
    if (data) {
      returnObj.data = data;
    }
    return returnObj;
  }

  responseFormat(code: number = 200, data: object = {}, message: string = "Success") {
    let returnObj : responseType =  {
      code: code,
      message: message,
      data: data,
    };
    return returnObj
  }

  getMethodName() {
    var err = new Error();
    return /at \w+\.(\w+)/.exec(err.stack.split('\n')[2])[1]
}

}