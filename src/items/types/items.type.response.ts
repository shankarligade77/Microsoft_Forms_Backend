import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StringResponse {
  @Field()
  result: string;
}