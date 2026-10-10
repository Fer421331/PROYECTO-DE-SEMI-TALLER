//index.ts

import express, { Router } from "express";
const router: Router = Router({ caseSensitive: true, strict: true });
import rolesRoutes from "./roles.routes.js";
import { login } from "../controllers/auth/auth.controller.js";

router.post("/auth/login", login);
router.use("/roles", rolesRoutes);

export default router;
