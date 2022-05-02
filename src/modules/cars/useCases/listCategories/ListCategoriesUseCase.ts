import { Category } from "../../model/Category";
import { ICategoryRepositroty } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICategoryRepositroty){};

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    };
}

export { ListCategoriesUseCase };