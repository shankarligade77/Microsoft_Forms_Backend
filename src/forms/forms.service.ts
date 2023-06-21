import { Injectable, NotFoundException } from '@nestjs/common';
import { FormEntity } from './entity/forms.entity';
import { FormsInputType } from './types/forms.input.type';

import { JwtService } from '@nestjs/jwt';
import { ItemEntity } from 'src/items/entity/items.entity';
@Injectable()
export class FormsService {
  constructor(private jwtService: JwtService) {}
  async forms(id: number) {
    return await FormEntity.findBy({id:id});
  }


  async createForm(input: FormsInputType) {
    const { title, description } = input;
    const form = await FormEntity.findOneBy({ title, description });
    if (form) {
      const payload = {
        id: form.id,
        name: form.title,
      };

      const token = this.jwtService.sign(payload);

      return { token };
    } else {
      const data = new FormEntity();
      data.title = title;
      data.description = description;
      await data.save();
      const form = await FormEntity.findOneBy({ title, description });

      const payload = {
        id: form.id,
        name: form.title,
      };

      const token = this.jwtService.sign(payload);

      return { token };
    }
  }

  // async deleteForm(id: number) {
  //   const form = await FormEntity.findBy({ id });
  //   console.log(form, 'formssssssssssssss');
  //   await FormEntity.remove(form);
  // }

  async deleteForm(id: number) {
    const form = await FormEntity.findOneBy({id});
    const data= await ItemEntity.findBy({ formId: id });
    console.log(data);
    data.map((val)=>{
      val.remove();
    })
    if (!form) {
      throw new NotFoundException(`Form with ID ${id} not found`);
    }
    await FormEntity.remove(form);
    const result=`Form with ID ${id} deleted successfully`
    return result;
  } 
}

