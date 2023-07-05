import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FormsInputType {
  map(arg0: (tmp: any) => Promise<void>) {
    throw new Error('Method not implemented.');
  }
  @Field()
  title: string;

  @Field()
  description: string;
}
