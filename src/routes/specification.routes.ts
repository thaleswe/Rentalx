import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification/indext";
import findSpecificationsController from "../modules/cars/useCases/findSpecification";

const specificationRoutes = Router();


specificationRoutes.post("/", (request, response) => {
    return createSpecificationController().handle(request,response)
})

specificationRoutes.get("/", (request, response) => {
    return findSpecificationsController().handle(request, response);
})

export {specificationRoutes};