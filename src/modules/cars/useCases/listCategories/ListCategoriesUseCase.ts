import { Category } from "../../entities/Category";
import { ICategoryRepositroty } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoryRepositroty){};

    execute(): Promise<Category[]> {
        const categories = this.categoriesRepository.list();

        return categories;
    };
}

export { ListCategoriesUseCase };