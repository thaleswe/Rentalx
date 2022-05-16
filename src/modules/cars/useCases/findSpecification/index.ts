import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { FindSpecificationsController } from "./findSpecificationsController";
import { FindSpecificationUseCase } from "./findSpecificationsUseCase";


export default():FindSpecificationsController => { 
    const specificationRepository = new SpecificationRepository();
    const findSpecificationsUseCase = new FindSpecificationUseCase(specificationRepository);
    const findSpecificationsController = new FindSpecificationsController(findSpecificationsUseCase);

    return findSpecificationsController;
};