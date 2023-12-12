import express from "express";
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil } from "../controllers/usuarioController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()

// Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar) //Crea un nuevo usuario
router.post("/login", autenticar) //Autenticacion del usuario
router.get("/confirmar/:token", confirmar) //Confirmar usuario
router.post("/olvide-password", olvidePassword) //Cambiar contraseña
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)//Comprobar el token al cambiar contraseña //Comprobar el token al cambiar contraseña

router.get("/perfil", checkAuth, perfil)

export default router