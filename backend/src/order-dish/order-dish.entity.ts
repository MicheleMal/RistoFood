import { Dish } from "src/dishes/dish.entity";
import { Order } from "src/orders/order.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "order_dish"})
export class OrderDish{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "double"
    })
    single_price: number

    @Column({
        type: "int",
        default: 1
    })
    quantity: number

    @ManyToOne(()=>Order, (order)=>order.order_dishes)
    @JoinColumn({name: "id_order"})
    order: Order

    @ManyToOne(()=>Dish, (dish)=>dish.order_dishes)
    @JoinColumn({name: "id_dish"})
    dish: Dish
}