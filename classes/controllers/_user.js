const { response } = require("express");

const Quiz = require("../../models/Quiz");
const { StatusOK, StatusInternalServerError } = require("../../helpers/response-json");

/**
 	* Metodo para obtener los datos del usuario
 */
const userAddQuiz = async ( req, res = response ) =>
{
	const { id } = req;
	const questions = req.body;

	try
	{
		const quiz = new Quiz({ idUser: id, ...questions });
		await quiz.save();

		return StatusOK( res, true, { msg: 'Quiz agregado con exito!' });
	}
	catch (error)
	{
		return StatusInternalServerError( res, false, 'Ah ocurrido un error, favor contactarse con el administrador.' );
	}
}

module.exports = { userAddQuiz };