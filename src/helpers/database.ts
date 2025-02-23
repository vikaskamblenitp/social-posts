import { envConfig } from "#configs";
import { connect } from "mongoose"
import { logger } from "./logger";

export const connectDb = async () => {
    await connect(envConfig.DB_CONNECTION as string);
    logger.info(`Database connected successfully!!!`);
}