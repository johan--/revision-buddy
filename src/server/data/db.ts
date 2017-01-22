import * as mongoose from "mongoose";

export class Db {
    public static connect(): mongoose.Connection {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("connected to the database");
        });

        this.mongooseInstance = mongoose.connect(process.env.DATABASE_CONNECTIONSTRING);
        return this.mongooseInstance;
    }

    private static mongooseInstance: any;
    private static mongooseConnection: mongoose.Connection;
}
