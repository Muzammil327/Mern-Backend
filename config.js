import env from './utils/ValidateEnv.js'

export const PORT = 8000 || env.PORT;
export const MONGO_URL = env.MONGO_URL;
export const DEV_MODE = env.DEV_MODE;
export const JWT_SECRET_KEY = env.JWT_SECRET_KEY;