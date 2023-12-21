import dotenv from 'dotenv';

dotenv.config();
export const PORT = process.env.PORT;
export const MongoDbUrl = process.env.MONGO_URL;
