// ./server/routes/users.js

// 1. IMPORTACIONES
const express	= require("express")
const router	= express.Router()	

const userController	= require("./../controllers/userController")

const authorization 	= require("./../middleware/authorization")

// 2. ROUTER
// CREAR USUARIO
router.post("/create", userController.create)

// INICIAR SESIÓN DE USUARIO
router.post("/login", userController.login)

// VERIFICACIÓN DE USUARIO
router.get("/verifytoken", authorization, userController.verifyToken)


// 3. EXPORTACIÓN
module.exports = router