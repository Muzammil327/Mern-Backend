import { cleanEnv, str, email, json, port } from "envalid";

const env = cleanEnv(process.env, {
  MONGO_URL: str(),
  PORT: port(),
  DEV_MODE: str(),
  PASSWORD_SECRET_KEY: str(),
  JWT_SECRET_KEY: str(),
});

export default env