import { Request, Response } from "express";
import { FindSpecificationUseCase } from "./findSpecificationsUseCase";
import { container } from "tsyringe";


class FindSpecificationsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;
        const findSpecificationUseCase = container.resolve(FindSpecificationUseCase)
        const allSpecifications = await findSpecificationUseCase.execute(name);

        return response.json(allSpecifications);
    }
}

export { FindSpecificationsController }; 