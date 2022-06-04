import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid_v4 } from "uuid";
import { Category } from "./Category";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;
    
    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category) // Isso significa que terá muitos carros para uma só categoria

    @JoinColumn({name: "category_id"})
    category: Category;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid_v4();
            this.available = true;
        }
    }
}

export { Car };