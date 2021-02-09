const jwt = require('jsonwebtoken');

const generateJWT = ( id, email, role ) =>
{
	return new Promise(( resolve, reject ) =>
	{
		const payload = { id, email, role };

		jwt.sign( payload, process.env.JWT_SECRET,
		{
			expiresIn: '2h'
		}, ( err, token ) =>
		{
			if( err )
			{
				reject('No se pudo generar el token');
			}

			resolve( token );
		});
	});
}

module.exports = { generateJWT };