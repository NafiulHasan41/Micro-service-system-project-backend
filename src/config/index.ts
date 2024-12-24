import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  dbName: process.env.MONGO_DB_NAME,
  bcryptSalt: process.env.BCRYPT_SALT_ROUNDS,
  jwtSecret: process.env.JWT_SECRET,
};
