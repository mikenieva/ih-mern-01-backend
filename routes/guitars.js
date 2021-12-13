// ./server/routes/guitars.js

// 1. IMPORTACIONES
const express 		= require("express")
const router		= express.Router()

const guitarController	= require("./../controllers/guitarController")

// 2. RUTEO (ROUTER)

// CREAR GUITARRA
router.post("/create", guitarController.create)

// LEER GUITARRAS
router.get("/readall", guitarController.readAll)

// LEER UNA GUITARRA
router.get("/readone/:id", guitarController.readOne)

// ACTUALIZAR UNA GUITARRA
router.put("/edit/:id", guitarController.edit)

// BORRAR UNA GUITARRA
router.delete("/delete/:id", guitarController.delete)


// 3. EXPORTACIONES
module.exports = router