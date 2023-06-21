import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FormsResponseType {
  @Field()
  token: string;
}
