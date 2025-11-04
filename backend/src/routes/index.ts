import type { Request, Response } from "express";
import { Router } from "express";
import { verifySignatureController } from "../controllers/verifySignatureController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend Root Route" });
});

router.post("/verify-signature", [], verifySignatureController);

export default router;
