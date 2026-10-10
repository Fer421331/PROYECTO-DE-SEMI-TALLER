import { Router } from "express";
import { verificarToken } from "../config/auth.middleware.js"; // Ajusta la ruta a tu middleware
import { 
  getAllRoles, 
  getRoleById, 
  createRole, 
  updateRole, 
  deleteRole 
} from "../controllers/roles/roles.controller.js";

const router: Router = Router();

router.use(verificarToken);

router.get("/all", getAllRoles);
router.get("/one", getRoleById);

router.post("/", createRole);

router.put("/", updateRole);

router.delete("/", deleteRole);

export default router;
