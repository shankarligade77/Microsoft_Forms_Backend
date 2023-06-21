import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { FormsType } from './types/forms.type';
import { FormsInputType } from './types/forms.input.type';
import { FormsService } from './forms.service';
import { FormsResponseType } from './types/forms.response';
import { GetForm } from './get.form.decorator';
import { FormEntity } from './entity/forms.entity';
import { ItemEntity } from 'src/items/entity/items.entity';
import { ItemsType } from 'src/items/types/items.type';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';

@Resolver(() => FormsType)
export class FormsResolver {
  constructor(private formsService: FormsService) {}

  @Query(() => [FormsType])
  @UseGuards(JwtAuthGuard)
  forms(@GetForm('form') form: FormEntity) {
    return this.formsService.forms(form.id);
  }

 

  @Mutation(() => FormsResponseType)
  createform(@Args('input') input: FormsInputType) {
    return this.formsService.createForm(input);
  }

  @Mutation(() => FormsResponseType)
  deleteForm(@Args('id') id: number){
    return this.formsService.deleteForm(id);
  }
}
