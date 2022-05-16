import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string,
    description: string
}


interface ICategoryRepositroty {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create({name, description}: ICreateCategoryDTO): Promise<void>;
};

export { ICategoryRepositroty, ICreateCategoryDTO }; 