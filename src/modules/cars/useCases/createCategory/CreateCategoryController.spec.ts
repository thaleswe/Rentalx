import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import { v4 as uuid_v4 } from "uuid";
import request from "supertest";

import createConnection from "@shared/infra/typeorm/";
import { Connection } from "typeorm";

let connection: Connection;
describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations(); // rodar as migrations

        const id = uuid_v4();
        const password = await hash("admin", 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_licence ) values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'xxx-123')`
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new category", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new category if it already exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentalx.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(400);
    });

});