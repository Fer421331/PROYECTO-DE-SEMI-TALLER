import { Router } from "express";
import { body } from "express-validator";
import { verificarToken } from "../config/auth.middleware.js";
import {
  solicitarCambioPassword,
  confirmarCambioPassword,
} from "../controllers/usuarios/controladorCambioPassword.js";

const router: Router = Router();

router.use(verificarToken);

router.post(
  "/solicitar",
  [
    body("useremail")
      .trim()
      .notEmpty()
      .withMessage("El correo es obligatorio")
      .bail()
      .isEmail()
      .withMessage("El correo no tiene un formato válido"),

    body("password")
      .isString()
      .withMessage("La contraseña debe ser texto")
      .bail()
      .isLength({ min: 8, max: 72 })
      .withMessage("La contraseña debe tener entre 8 y 72 caracteres")
      .bail()
      .matches(/[A-Za-z]/)
      .withMessage("La contraseña debe incluir al menos una letra")
      .bail()
      .matches(/\d/)
      .withMessage("La contraseña debe incluir al menos un número"),
  ],
  solicitarCambioPassword,
);

router.post(
  "/confirmar",
  [
    body("useremail")
      .trim()
      .notEmpty()
      .withMessage("El correo es obligatorio")
      .bail()
      .isEmail()
      .withMessage("El correo no tiene un formato válido"),

    body("codigo")
      .trim()
      .matches(/^\d{6}$/)
      .withMessage("El código debe ser de 6 dígitos"),
  ],
  confirmarCambioPassword,
);

export default router;
