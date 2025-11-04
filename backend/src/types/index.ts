import { z } from "zod";

export const VerifySignatureRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  signature: z
    .string()
    .regex(
      /^0x[a-fA-F0-9]{130}$/,
      "Invalid signature format. Expected hex string starting with 0x and 132 characters long"
    ),
});

export type VerifySignatureResponse = {
  isValid: boolean;
  signer: string;
  originalMessage: string;
};
