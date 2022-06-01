import { compare } from "bcryptjs"
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { secretKey } from "../../../../secretKey";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"; 
import { AppError } from "@errors/AppError";


interface IRequest {
    email: string;
    password: string;
}

interface IReponse {
    user: {
        name: string,
        email: string
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor( 
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) {}
    async execute({ email, password }: IRequest): Promise<IReponse> {

        // Usuário existe

        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!")
        }


        // Senha está correta

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!")
        }

       
        // Gerar jwt

        const token = sign({}, secretKey, {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IReponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
 
    }
}

export { AuthenticateUserUseCase };