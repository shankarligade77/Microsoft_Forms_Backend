import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FormsInputType {
  @Field()
  title: string;

  @Field()
  description: string;
}
