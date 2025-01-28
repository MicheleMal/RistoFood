import { OrderDish } from 'src/order-dish/order-dish.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

enum Category{
    ANTIPASTO = "antipasto",
    PRIMO = "primo",
    SECONDO = "secondo",
    CONTORNO = "contorno",
    DOLCE = "dolce",
    BEVANDA = "bevanda",
    PIZZA = "pizza"
}

@Entity({ name: 'dishes' })
export class Dish {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar"
    })
    name: string

    @Column({
        type: "varchar"
    })
    description: string

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price: number

    @Column({
        type: "enum",
        enum: Category
    })
    category: Category

    @OneToMany(()=>OrderDish, (orderDish)=>orderDish.dish)
    order_dishes: OrderDish[]

}
