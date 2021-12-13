// ./server/controllers/guitarController.js
const Guitar = require("./../models/Guitar")

exports.create = async (req, res) => {

	// DEL FORMULARIO, CREAMOS VARIABLES Y ASIGNAMOS VALORES.
		const { 
			nombre,
			precio,
			color,
			imagen,
			descripcion
		 } = req.body

	// CREAR UNA GUITARRA EN BASE DE DATOS
	try {
		const newGuitar = await Guitar.create({
			nombre,
			precio,
			color,
			imagen,
			descripcion
		})

		// DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
		res.json({
			msg: "Guitarra creada con éxito",
			data: newGuitar		
		})

	} catch (error) {
		
		res.status(500).json({
			msg: "Hubo un error creando la guitarra",
			error: error
		})

	}


}

exports.readAll = async (req, res) => {

	try {
		
		const guitars = await Guitar.find({})

		res.json({
			msg: "Guitarras obtenidas con éxito.",
			data: guitars
		})


	} catch (error) {
		
		res.status(500).json({
	 		msg: "Hubo un error obteniendo los datos",
			error: error
		})

	}

}

exports.readOne = async (req, res) => {

	const { id } = req.params

	try {
		
		const guitar = await Guitar.findById(id)

		res.json({
			msg: "Guitarra obtenida con éxito.",
			data: guitar
		})

	} catch (error) {
		res.status(500).json({
			msg: "hubo un error obteniendo los datos.",
			error: error
		})
	}


}

exports.edit = async (req, res) => {
	
	const { id } = req.params

	const { 
		nombre,
		precio,
		color,
		imagen,
		descripcion 
	} = req.body


	try {
		const updatedGuitar = await Guitar.findByIdAndUpdate(
			id, // ID DE GUITARRA
			{
				nombre,
				precio,
				color,
				imagen,
				descripcion // PROPIEDADES A CAMBIAR
			}, 
			{new: true}
		)

		res.json({
			msg: "Guitarra actualizada con éxito.",
			data: updatedGuitar
		})

		
	} catch (error) {
		
		res.status(500).json({
			msg: "Hubo un error con la actualización de guitarra.",
			error: error
		})

	}

}

exports.delete = async (req, res) => {

	const { id } = req.params

	try {
		
		const deletedGuitar = await Guitar.findByIdAndRemove({_id: id})

		res.json({
			msg: "Guitarra borrada con éxito.",
			data: deletedGuitar
		})

	} catch (error) {
		res.status(500).json({
			msg: "Hubo un error borrando la guitarra.",
			error: error
		})
	}

}

