import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository) {};

    async execute(name: string): Promise<Specification> {
        const specification = await this.specificationRepository.findByName(name);

        return specification;
    }
}

export { FindSpecificationUseCase }