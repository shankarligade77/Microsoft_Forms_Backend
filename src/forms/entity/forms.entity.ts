import { ItemEntity } from "src/items/entity/items.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('forms')
export class FormEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title:string
    
    @Column()
    description:string

    @OneToMany(()=>ItemEntity,(item)=>item.form,{eager:false})
    items:ItemEntity[]
  
}