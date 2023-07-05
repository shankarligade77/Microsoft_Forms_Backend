import { Injectable, NotFoundException } from '@nestjs/common';
import { FormEntity } from './entity/forms.entity';
import { FormsInputType } from './types/forms.input.type';

import { JwtService } from '@nestjs/jwt';
import { ItemEntity } from 'src/items/entity/items.entity';
@Injectable()
export class FormsService {
  constructor(private jwtService: JwtService) {}
  async forms() {
    return await FormEntity.find();
  }


  async createForm(input: FormsInputType) {
    const { title, description } = input;
    const form = await FormEntity.findOneBy({ title, description });
    if (form) {
      const payload = {
        id: form.id,
        name: form.title,
      };
      console.log(payload.id,"form chi id ahe 1")
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
      console.log(payload.id,"form chi id ahe 2")
      const token = this.jwtService.sign(payload);

      return { token };
    }
  }

 
 

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

    await form.remove();
 
  console.log(form,"delete form data")
    return form;
  } 





  async editForm(id: number) {
    const data= await ItemEntity.findBy({ formId: id });
    // console.log(data);
   
    if (!data) {
      throw new NotFoundException(`Form with ID ${id} has no data`);
    }
    data.map((val)=>{
      console.log(val);
    })
   
    return data;
  } 
}


