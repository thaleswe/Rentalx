import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { FindSpecificationsController } from "../modules/cars/useCases/findSpecification/findSpecificationsController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const findSpecificationsController = new FindSpecificationsController();

specificationRoutes.post("/", createSpecificationController.handle)

specificationRoutes.get("/", findSpecificationsController.handle)

export {specificationRoutes};