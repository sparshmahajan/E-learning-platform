export const envConfig = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.DB_URL) {
    throw new Error("DB_URL must be defined");
  }
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY must be defined");
  }
};
