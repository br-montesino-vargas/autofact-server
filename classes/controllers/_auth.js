const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../../helpers/jwt');

const User = require('../../models/User');
const Roles = require('../../models/Roles');
const { StatusOK, StatusCreated, StatusBadRequest, StatusInternalServerError } = require('../../helpers/response-json');

/**
	* Metodo que registra un nuevo usuario.
*/
const authRegister = async ( req, res = response ) =>
{
	const { email, password } = req.body;

	try
	{
		const userFind = await User.findOne({ email });

		if( userFind ) return StatusBadRequest( res, false, 'El email ya esta registrado.' );

		const user = new User( req.body );

		/* Encriptar contraseña */
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync( password, salt );

		/* Guardar usuario */
		await user.save();

		/* Guardar rol */
		const roles = new Roles({ idUser: user.id, description: 'Usuario' });
		await roles.save();

		// Obtener Roles
		const { description: role } = await Roles.findOne({ idUser: user.id });

		// Generar JWT
		const token = await generateJWT( user.id, user.email, role );

		return StatusCreated( res, true,
		{
			id : user.id,
			email: user.email,
			role,
			token
		});
	}
	catch (error)
	{
		return StatusInternalServerError( res, false, 'Ah ocurrido un error, favor contactarse con el administrador.' );
	}

};

/**
	* Metodo que autentica al usuario.
*/
const authLogin = async ( req, res = response ) =>
{
	const { email, password } = req.body;

	try
	{
		const user = await User.findOne({ email });

		if( !user ) return StatusBadRequest( res, false, 'Email y/o contraseña invalido.' );

		// Validar pasword
		const validPass = bcrypt.compareSync( password, user.password );

		if( !validPass ) return StatusBadRequest( res, false, 'Email y/o contraseña invalido.' );

		// Obtener Roles
		const { description: role } = await Roles.findOne({ idUser: user.id });

		// Generar JWT
		const token = await generateJWT( user.id, user.email, role );

		return StatusCreated( res, true,
		{
			id : user.id,
			email: user.email,
			role,
			token
		});
	}
	catch (error)
	{
		return StatusInternalServerError( res, false, 'Ah ocurrido un error, favor contactarse con el administrador.' );
	}
};

/**
	* Metodo que renueva el JWT.
*/
const authRenew = async ( req, res = response ) =>
{
	const { id, email } = req;

	const { description: role } = await Roles.findOne({ idUser: id });


	const token = await generateJWT( id, email, role );

	return StatusOK( res, true, { id, email, token, role });
};

module.exports = { authRegister, authLogin, authRenew };