// ./server/index.js

// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()
require("dotenv").config()
const connectDB = require('./config/db')

// 2. MIDDLEWARES
// BASE DE DATOS
connectDB()

// TODAS LAS PETICIONES Y RESPUESTAS SE MANEJAN
// EN PROTOLOCO JSON
app.use(express.json())

// 3. RUTAS
app.use("/guitars", require("./routes/guitars"))
app.use("/users", require("./routes/users"))


// 4. SERVER
app.listen(process.env.PORT, () => {

	console.log(`Servidor trabajando en ${process.env.PORT}`)

})