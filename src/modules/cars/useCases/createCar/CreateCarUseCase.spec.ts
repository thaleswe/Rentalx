import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory; 

describe("Create car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Ferrari",
            description: "Carro rápido",
            daily_rate: 7000,
            license_plate: "ABC-1234",
            fine_amount: 500,
            brand: "brand",
            category_id: "category"
        });
    });

    it("Should not be able to create an existing car", () => {
        expect( async () => {
            await createCarUseCase.execute({
                name: "Ferrari",
                description: "Carro rápido",
                daily_rate: 7000,
                license_plate: "ABC-1234",
                fine_amount: 500,
                brand: "brand",
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "BadFerrari",
                description: "Carro rápido",
                daily_rate: 7000,
                license_plate: "ABC-1234",
                fine_amount: 500,
                brand: "brand",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    })
})