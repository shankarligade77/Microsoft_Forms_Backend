import { createParamDecorator } from '@nestjs/common';

export const GetForm = createParamDecorator((data, obj) => {
  if (obj.args.length > 0) {
    const request = obj.args[2].req;
    console.log(request.user,"Get form cha data")
    return request.user;
  }
  return null;
});
