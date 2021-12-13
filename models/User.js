// ./server/models/User.js
// 1. IMPORTACIONES
const mongoose = require("mongoose")

// 2. SCHEMAS
const userSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true
	},
	apellido: {
		type: String,
		default: ""
	},
	pais: {
		type: String,
		default: ""
	},
	direccion: {
		type: String,
		default: ""
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

// 3. MODELOS
const User = mongoose.model("User", userSchema)

// 4. EXPORTACIÓN
module.exports = User

