import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { ItemsType } from './types/items.type';
import { ItemsInputType } from './types/items.input.type';
import { FormEntity } from 'src/forms/entity/forms.entity';
import { GetForm } from 'src/forms/get.form.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/forms/jwt.auth.guard';
import { FormsResponseType } from 'src/forms/types/forms.response';
import { StringResponse } from './types/items.type.response';
import { FormsType } from 'src/forms/types/forms.type';

@Resolver(() => ItemsType)
@UseGuards(JwtAuthGuard)
export class ItemsResolver {
  constructor(private itemService: ItemsService) {}

  @Query(() => [ItemsType])
  Items(@GetForm('form') form: FormEntity) {
    // console.log(form.id,"form chi id");
    return this.itemService.Items(form.id);
  }

  @Mutation(() => StringResponse)
  addItems(
    @GetForm('form') form: FormEntity,
    @Args('input', { type: () => [ItemsInputType] }) input: ItemsInputType[],
  ) {
    return this.itemService.addItems(form, input);
  }

  @Mutation(() => StringResponse)
  updateItems(
    @Args('id') id: number,
    @GetForm('form') form: FormEntity,
    @Args('input', { type: () => [ItemsInputType] }) input: ItemsInputType[],
  ) {
    return this.itemService.updateItems(id, form, input);
  }

  @Mutation(() => FormsResponseType)
  deleteItem(@Args('id') id: number) {
    return this.itemService.deleteItem(id);
  }
}
