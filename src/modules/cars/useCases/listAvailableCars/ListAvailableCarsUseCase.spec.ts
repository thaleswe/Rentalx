import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory); // Ou seja, antes de cada é teste (it) é iniciada uma nova instância dessa classe
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro bonito só que menos",
            daily_rate: 110,
            license_plate: "CBI-4676",
            fine_amount: 400,
            brand: "Audi",
            category_id: "category_id"
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);

    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Audi A2",
            description: "Carro bonito só que menos",
            daily_rate: 110,
            license_plate: "CBI-2222",
            fine_amount: 400,
            brand: "Audi",
            category_id: "category_id"
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Audi"
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Audi A3",
            description: "Carro bonito só que menos",
            daily_rate: 110,
            license_plate: "CBI-3333",
            fine_amount: 400,
            brand: "Audi",
            category_id: "category_id"
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: "Audi A3"
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Audi A4",
            description: "Carro bonito só que menos",
            daily_rate: 110,
            license_plate: "CBI-4444",
            fine_amount: 400,
            brand: "Audi",
            category_id: "1234"
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "1234"
        });

        expect(cars).toEqual([car]);
    });
})