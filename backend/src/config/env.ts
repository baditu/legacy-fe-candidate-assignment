import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).pipe(z.number().positive()),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  CORS_ORIGIN: z.string().default("*"),
});

const parseEnv = () => {
  const result = envSchema.safeParse({
    PORT: process.env.PORT || "3001",
    NODE_ENV: process.env.NODE_ENV || "development",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  });

  if (!result.success) {
    console.error("Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment variables");
  }

  return result.data;
};

export const config = parseEnv();
