import { Request, Response } from "express";
import { FindSpecificationUseCase } from "./findSpecificationsUseCase";


class FindSpecificationsController {
    constructor(private findSpecificationUseCase: FindSpecificationUseCase) {};

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;
        const allSpecifications = await this.findSpecificationUseCase.execute(name);

        return response.json(allSpecifications);
    }
}

export { FindSpecificationsController };