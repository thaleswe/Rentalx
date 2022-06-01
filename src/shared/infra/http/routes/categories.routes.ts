import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/importCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { Router } from "express";
import multer from "multer";




const categoriesRoutes = Router();
const upload = multer({
    dest: ".../../tmp" //Aqui é onde os uploads ficarão de modo temporário. Caso você só queira ler os arquivos, basta só deixar "const upload = multer()"
})

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file") ,importCategoryController.handle);

export { categoriesRoutes }; 