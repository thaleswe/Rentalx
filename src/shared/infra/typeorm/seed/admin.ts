import { v4 as uuid_v4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";


async function create() {
    const connection = await createConnection("localhost");

    const id = uuid_v4();
    const password = await hash("admin", 8)

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_licence ) values('${id}', 'admin', 'admin@rentalx.com', '${password}', true, 'now()', 'xxx-123')` 
    )

    await connection.close;
}

create().then(() => {console.log("User admin created")});