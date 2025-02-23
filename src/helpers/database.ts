import { envConfig } from "#configs";
import { connect } from "mongoose"
import { logger } from "./logger";

export const connectDb = async () => {
    await connect(envConfig.DB_CONNECTION as string, {
        user: envConfig.DB_USERNAME,
        pass: envConfig.DB_PASSWORD,
        dbName: envConfig.DB_NAME
    });
    logger.info(`Database connected successfully!!!`);
}