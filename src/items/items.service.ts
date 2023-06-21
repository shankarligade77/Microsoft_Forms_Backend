import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemEntity } from './entity/items.entity';
import { ItemsInputType } from './types/items.input.type';
import { FormEntity } from 'src/forms/entity/forms.entity';
import { ID } from '@nestjs/graphql';

@Injectable()
export class ItemsService {
  async Items(id: number) {
    return await ItemEntity.findBy({ formId: id });
  }

 


  async addItems(form: FormEntity, input: ItemsInputType[]){
    input.map(async (tmp) => {
      const { question, description,QuestionType } = tmp;
      const item = new ItemEntity();
      item.question = question;
      item.description = description;
      item.QuestionType=QuestionType;
      item.form = form;
      await item.save();
    });

    var result = `Items Inserted successfully!!`;
    return { result };
  }
  async deleteItem(id: number) {
    const item = await ItemEntity.findOneBy({ id });
    if (!item) throw new NotFoundException('Item not Found');
    await item.remove();
    var result = `Item with id ${id} deleted`;
    return { result };
  }
}
