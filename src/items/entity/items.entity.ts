import { FormEntity } from "src/forms/entity/forms.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("items")
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  description: string;

  @Column()
  QuestionType: string;

  @Column()
  formId: number;

  @ManyToOne(() => FormEntity, (form) => form.items, { eager: false })
  form: FormEntity;
}
