import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import multer from "multer";


const categoriesRoutes = Router();
const upload = multer({
    dest: ".../../tmp" //Aqui é onde os uploads ficarão de modo temporário. Caso você só queira ler os arquivos, basta só deixar "const upload = multer()"
})

categoriesRoutes.post("/", (request, response) => {
    console.log("iai?")
   return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request,response) => {
   return listCategoriesController.handle(request,response);
});

categoriesRoutes.post("/import", upload.single("file") ,(request, response) => {
    return importCategoryController.handle(request, response);
});

export { categoriesRoutes };