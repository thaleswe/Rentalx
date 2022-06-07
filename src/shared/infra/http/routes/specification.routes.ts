import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { FindSpecificationsController } from "@modules/cars/useCases/findSpecification/findSpecificationsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";



const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const findSpecificationsController = new FindSpecificationsController();

specificationRoutes.post("/", ensureAuthenticated,ensureAdmin,createSpecificationController.handle)

specificationRoutes.get("/", findSpecificationsController.handle)

export {specificationRoutes}; 