import {createParamDecorator} from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, incomingReq) => {
  const req = incomingReq.args[2]?.req;
  return req.user;
});
