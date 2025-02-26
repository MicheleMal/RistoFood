import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { State } from 'src/enums/states.enum';
import { ApiPropertyOptional, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: "UpdateOrder"
})
export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Number person at the table',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  n_person?: number;

  @ApiPropertyOptional({
    description: 'Table number',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  n_table?: number;

  @ApiPropertyOptional({
    description: 'Order status',
    enum: State,
    default: State.WAIT,
    example: State.WAIT,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(State, {
    message: 'You must enter a role between admin and staff',
  })
  state?: State;
}
