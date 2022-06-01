import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);

        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_licence: "495876",
            email: "userr@test.com",
            password: "1234",
            name: "Usesr test"
        }

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", () => {
        expect( async () => {
            await authenticateUserUseCase.execute({
                email: "email@false.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError); // Ou seja, eu espero que essa função seja rejeitada e que sua instância seja de AppError
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect( async () => {
            const user: ICreateUserDTO = {
                driver_licence: "346",
                email: "user@user.com",
                password: "1234",
                name: "User Test"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorretPassword"
            });
        }).rejects.toBeInstanceOf(AppError)
    })
})