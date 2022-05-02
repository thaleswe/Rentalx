import { Category } from "../../model/Category";
import { ICategoryRepositroty, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoryRepositroty {
    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    } //o "private" antes do constructor impede o "new CategoriesRepository()"

    public static getInstance(): CategoriesRepository {
        if(!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        } 

        return CategoriesRepository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category(); // esse new Category() chama a função constructor dentro da classe.

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name:string): Category {
        const category = this.categories.find(category => category.name === name);

        return category;
    }
}

export { CategoriesRepository };