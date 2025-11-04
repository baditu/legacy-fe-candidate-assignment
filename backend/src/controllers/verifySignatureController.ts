import type { NextFunction, Request, Response } from "express";
import { recoverMessageAddress, isAddress } from "viem";
import {
  VerifySignatureRequestSchema,
  type VerifySignatureResponse,
} from "../types";
import { CustomError } from "../utils/customError";

export const verifySignatureController = async (
  req: Request,
  res: Response<VerifySignatureResponse>,
  next: NextFunction
) => {
  try {
    const providedAddress = req.headers["x-wallet-address"] as string;

    if (!providedAddress) {
      throw new CustomError("Missing x-wallet-address header", 400);
    }

    const normalizedAddress = providedAddress.toLowerCase();

    if (!isAddress(normalizedAddress)) {
      throw new CustomError(
        "Invalid Ethereum address in x-wallet-address header",
        400
      );
    }

    const { message, signature } = VerifySignatureRequestSchema.parse(req.body);

    let isValid = false;
    let signer = "";

    try {
      signer = await recoverMessageAddress({
        message,
        signature: signature as `0x${string}`,
      });

      isValid = isAddress(signer) && signer.toLowerCase() === normalizedAddress;
    } catch (error) {
      console.error("Signature recovery failed:", error);
      isValid = false;
      signer = "";
    }

    const response: VerifySignatureResponse = {
      isValid,
      signer,
      originalMessage: message,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
