// ./server/controllers/userController.js
const bcryptjs  = require("bcryptjs")
const jwt		= require("jsonwebtoken")

const User		= require("./../models/User")

// CREAR UN USUARIO
exports.create = async (req, res) => {

	// 1. OBTENER USUARIO, EMAIL Y PASSWORD DEL FORMULARIO (REQ)
	const { 
		nombre,
		apellido,
		pais,
		direccion,
		email,
		password
	 } = req.body

	// 2A. REALIZAR EL PROCESO ASÍNCRONO
	try {
		
		// 3. GENERAR PASSWORD PARA BASE DE DATOS
		const salt	= await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		// 4. CREAR USUARIO EN BASE DE DATOS
		const newUser = await User.create({
			nombre,
			apellido,
			pais,
			direccion,
			email,
			password: hashedPassword
		})

		// 5. AUTENTICACIÓN CON TOKENS
		// A. CREAR UN PAYLOAD (INFORMACIÓN DEL USUARIO)
		const payload = {
			user: {
				id: newUser._id // ID DE MONGODB DEL USUARIO
			}
		}

		// B. FIRMAR EL TOKEN
		jwt.sign(
			payload, // DATOS QUE ACOMPAÑARAN AL TOKEN
			process.env.SECRET, // PALABRA SECRETA (FIRMA)
			{
				expiresIn: 360000 // EXPIRACIÓN DEL TOKEN
			},
			(error, token) => {
				if(error) throw error

				res.json({
					msg: "Token correctamente generado.",
					data: token
				})
			}
		)


	} catch (error) {
	// 2B. EN CASO DE ERROR CON AWAIT
		res.status(500).json({
			msg: "Hubo un error con la creación de usuario.",
			error: error
		})

	}


}


// INICIAR SESIÓN
// AUTENTICAR QUE LA PERSONA PASE SU EMAIL Y CONTRASEÑA. COINCIDAN. Y SE LE ENVÍA UN TOKEN.
exports.login = async (req, res) => {

	// 1. OBTENER EL EMAIL Y EL PASSWORD DEL FORMULARIO (JSON)
	const { email, password } = req.body

	try {
		// 2. ENCONTRAR UN USUARIO EN BASE DE DATOS
		const foundUser = await User.findOne({ email })

		// 3. VALIDACIÓN - SI NO HUBO UN USUARIO...
		if(!foundUser) {
			return res.status(400).json({
				msg: "El usuario o la contraseña son incorrectos."
			})
		}

		// 4. SI TODO OK, EL USUARIO FUE ENCONTRADO, ENTONCES, EVALUAMOS LA CONTRASEÑA.
		const verifiedPass = await bcryptjs.compare(password, foundUser.password)

		// 5. VALIDACIÓN - SI EL PASSWORD NO COINCIDE...
		if(!verifiedPass) {
			return await res.status(400).json({
				msg: "El usuario o la contraseña no coinciden."
			})
		}

		// 6. SI TODO COINCIDE Y ES CORRECTO, GENERAMOS UN JSON WEB TOKEN

		console.log("foundUser:", foundUser)

		// 6A. ESTABLECER UN PAYLOAD (DATOS DEL USUARIO)
		const payload = {
			user: {
				id: foundUser.id
			}
		}

		// 6B. FIRMA DEL JWT
		jwt.sign(
			payload,
			process.env.SECRET,
			{
				expiresIn: 360000
			},
			(error, token) => {
				if(error) throw error

				res.json({
					msg: "Inicio de sesión exitoso.",
					data: token
				})
			}
		)
		
		return


	} catch (error) {
		console.log(error)
		res.status(500).json({
			msg: "Hubo un problema con la autenticación.",
			data: error
		})
	}

}

// VERIFICAR USUARIO
// CUANDO ESTAMOS ACCEDIENDO A DIFERENTES RUTAS (GUITARRAS COMO TIENDAS) PREGUNTAR SI EL USUARIO TIENE PERMISOS O NO. ENTONCES, PARA CONFIRMARLO, SE LE PIDE SU TOKEN.
// UNA RUTA QUE PIDE TOKENS PARA VERIFICAR
exports.verifyToken = async (req, res) => {


	try {
		
		// 1. BUSCAR EL ID DEL USUARIO (DEL TOKEN ABIERTO) EN BASE DE DATOS

		const foundUser = await User.findById(req.user.id).select("-password")

		return res.json({
			msg: "Datos de usuario encontrados.",
			data: foundUser
		})


	} catch (error) {
			console.log(error)

			res.status(500).json({
				msg: "Hubo un error con el usuario"
			})
	}

}
