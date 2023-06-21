import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ItemsInputType {
  @Field()
  question: string;

  @Field()
  description: string;

  @Field()
  QuestionType: string;
}
