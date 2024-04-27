import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  MONGO_URI: env.get('MONGO_URI').required().asString(),
  PORT: env.get('PORT').required().asPortNumber(),
};
