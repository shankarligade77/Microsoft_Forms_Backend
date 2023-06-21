import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import constants from './constant';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { FormEntity } from './entity/forms.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: constants.secret,
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const form = await FormEntity.findOneBy({ id });
    if (!form) {
      throw new UnauthorizedException('form not found');
    }

    return form;
  }
}
