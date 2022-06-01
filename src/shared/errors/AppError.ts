export class AppError {
    public readonly message: string;

    public readonly statusCode: number;

    // Se não vier nenhum statusCode como argumento, o default é 400
    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
}