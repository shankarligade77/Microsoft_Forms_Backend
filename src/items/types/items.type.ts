import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
export class ItemsType extends BaseEntity{
    @Field(()=>ID)
    id: string

    @Field()
    question:string
    
    @Field()
    description:string

    @Field()
    QuestionType:string
}