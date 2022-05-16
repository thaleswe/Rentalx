import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

class FindSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {};

    async execute(name: string): Promise<Specification> {
        const specification = await this.specificationRepository.findByName(name);

        return specification;
    }
}

export { FindSpecificationUseCase }