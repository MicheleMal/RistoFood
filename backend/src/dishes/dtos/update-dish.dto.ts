import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';
import { ApiSchema } from '@nestjs/swagger';

@ApiSchema({
    name: "UpdateDish"
})
export class UpdateDishDto extends PartialType(CreateDishDto) {}
