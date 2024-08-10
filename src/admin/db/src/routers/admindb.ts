import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("admin-back/db/index.tsx", { data: "Hola mundo" });
});

export default router;
