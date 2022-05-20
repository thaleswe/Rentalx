import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

import { secretKey } from "../secretKey";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    // 401 é o erro de autorização
    if(!authHeader) {
        throw new AppError("Token missing", 401)
    }

    // O valor de authHeader é Bearer reopfiuefiefepjf(token)...
    // Então, a única parte que interessa é o token, logo deve-se
    // dar um split bem no espaço entre "Bearer" e o token.

    // Como retornará um array, e queremos apenas o segundo item dele (o token),
    // é feita uma desestruturação nesse array, o qual o primeiro valor é ignorado, e 
    // apenas o segundo é dado um nome
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, secretKey) as IPayload;
        
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);

        if(!user) {
            throw new AppError("User does not exists!", 401)
        }

        next();

    }catch {
        throw new AppError("Invalid token!", 401);
    }
}