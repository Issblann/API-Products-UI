import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  JWT_SECRET: env.get('JWT_SECRET').required().asString(),
  MONGO_URL: env.get('MONGO_URL').required().asString(),
};
