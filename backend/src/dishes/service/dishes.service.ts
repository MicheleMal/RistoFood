import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '../dish.entity';
import { Repository } from 'typeorm';
import { CreateDishDto } from '../dtos/create-dish.dto';
import { Category } from 'src/enums/categories.enum';
import { UpdateDishDto } from '../dtos/update-dish.dto';
import { ResponseDishDto } from '../dtos/response-dish.dto';
import { ResponseDeleteDto } from 'src/dto/response-delete.dto';
import { Venue } from 'src/venues/venue.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
  ) {}

  async insertNewDish(
    id_venue: number,
    createDishDto: CreateDishDto,
  ): Promise<CreateDishDto> {
    const venue = await this.venueRepository.findOne({
      where: {
        id: id_venue,
      },
    });

    const newDish = await this.dishRepository.save({
      ...createDishDto,
      venue: venue,
    });

    return newDish;
  }

  async getAllDishes(
    id_venue: number,
    category?: Category,
    min_price?: number,
    max_price?: number,
    page?: number,
    limit?: number,
  ): Promise<ResponseDishDto[]> {
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

    if (page && limit) {
      const skip = (page - 1) * limit;

      query.limit(limit).offset(skip);
    }

    query.andWhere('dish.venue = :id_venue', {id_venue})
    const allDishes = await query.getMany();

    return allDishes;
  }

  async updateDish(
    id_venue: number,
    id_dish: number,
    updateDishDto: UpdateDishDto,
  ): Promise<ResponseDishDto> {

    const venue = await this.venueRepository.findOne({
      where: {
        id: id_venue
      }
    })

    const updateDish = await this.dishRepository.update({
      id: id_dish,
      venue: venue
    }, updateDishDto);

    if (updateDish.affected === 0) {
      throw new NotFoundException('No dish found');
    }

    const dish = await this.dishRepository.findOne({
      where: {
        id: id_dish,
        venue: venue
      },
    });

    return dish;
  }

  async deleteDish(id_venue: number, id_dish: number): Promise<ResponseDeleteDto> {

    const venue = await this.venueRepository.findOne({
      where: {
        id: id_venue
      }
    })

    const deleteDish = await this.dishRepository.delete({
      id: id_dish,
      venue: venue
    });

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
