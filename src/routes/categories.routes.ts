import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController"
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";


const categoriesRoutes = Router();
const upload = multer({
    dest: ".../../tmp" //Aqui é onde os uploads ficarão de modo temporário. Caso você só queira ler os arquivos, basta só deixar "const upload = multer()"
})

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (request,response) => {
   return listCategoriesController.handle(request,response);
});

categoriesRoutes.post("/import", upload.single("file") ,(request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };