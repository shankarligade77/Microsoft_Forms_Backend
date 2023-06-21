import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './entity/forms.entity';
import { FormsResolver } from './forms.resolver';
import { FormsService } from './forms.service';
import constants from './constant';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.auth.guard';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([FormEntity]),
    PassportModule,
    JwtModule.register({
      secret: constants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [FormsResolver, FormsService, JwtStrategy,JwtAuthGuard],
  exports: [JwtStrategy, PassportModule, JwtAuthGuard],
})
export class FormsModule {}
