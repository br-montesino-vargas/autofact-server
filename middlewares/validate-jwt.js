const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = ( req, res = response, next ) =>
{
	const token = req.header('token');

	if( !token )
	{
		return res.status(401).json(
		{
			status: false,
			msg: 'No se encontro token en la petición'
		});
	}

	try
	{
		const { id, name, email } = jwt.verify( token, process.env.JWT_SECRET );

		req.id = id;
		req.name = name;
		req.email = email;
	}
	catch (error)
	{
		return res.status(401).json(
		{
			status: false,
			msg: 'Token no válido'
		});
	}

	next();
}

module.exports = { validateJWT };