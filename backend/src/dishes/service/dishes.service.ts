import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '../dish.entity';
import { Between, Repository } from 'typeorm';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { Category } from 'src/enums/categories.enum';
import { UpdateDishDto } from '../dtos/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  async insertNewDish(createDishDto: CreateDishDto): Promise<CreateDishDto> {
    const newDish = await this.dishRepository.save(createDishDto);

    return newDish;
  }

  async getAllDishes(
    category?: Category,
    min_price?: number,
    max_price?: number,
  ): Promise<Dish[]> {
    const query = this.dishRepository
      .createQueryBuilder('dish')
      .orderBy('dish.id', 'ASC')
      .addOrderBy('dish.category', 'ASC');

    if (category) {
      query.where('dish.category = :category', { category });
    }

    if (min_price < max_price && min_price && max_price) {
      query.andWhere('dish.price >= :min_price', { min_price });
      query.andWhere('dish.price <= :max_price', { max_price });
    } else if (min_price >= max_price) {
      throw new BadRequestException(
        'Invalid price range: min_price must be less than max_price',
      );
    }

    const allDishes = await query.getMany();

    return allDishes;
  }

  //? Scrivere dto per la risposta dell'update andato a buon fine
  async updateDish(id: number, updateDishDto: UpdateDishDto) {
    const updateDish = await this.dishRepository.update(id, updateDishDto);

    if (updateDish.affected === 0) {
      throw new NotFoundException('No dish found');
    }

    const dish = await this.dishRepository.findOne({
      where: {
        id: id,
      },
    });

    return {
      message: 'Dish updated successfully',
      error: null,
      statusCode: 200,
      data: dish,
    };
  }

  async deleteDish(id: number): Promise<{
    message: string;
    error: number | null;
    statusCode: number;
  }> {
    const deleteDish = await this.dishRepository.delete(id);

    if (deleteDish.affected === 0) {
      throw new NotFoundException('No dish found');
    }

    return {
      message: 'Dish deleted successfully',
      error: null,
      statusCode: 200,
    };
  }
}
