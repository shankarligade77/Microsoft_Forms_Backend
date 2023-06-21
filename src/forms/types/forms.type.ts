import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FormsType{
    @Field(()=>ID)
    id:number

    @Field()
    title:string

    @Field()
    description:string
}