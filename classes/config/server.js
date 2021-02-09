const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');

const Database = require('./database');

class Server
{
	constructor()
	{
		this.app = express();
		this.port = process.env.PORT;

		/* Http Server */
		this.server = http.createServer( this.app );

		/* Configuración de la base de datos */
		this.db = new Database();
	}

	middlewares()
	{
		/* Desplegar el directorio público */
		this.app.use( express.static( path.resolve( __dirname, '../public') ));

		/* CORS */
		this.app.use( cors() );

		// Lectura y parseo del body
		this.app.use( express.json({ limit: '50mb' }) );
		this.app.use( express.urlencoded({ limit: '50mb', extended: true }) );
	}

	configSocketsAndDatabase()
	{
		this.db.connectInDatabase();
	}

	getRoutes()
	{
		this.app.use( '/auth', require('../../routes/auth') );
		this.app.use( '/user', require('../../routes/user') );
	}

	execute()
	{
		/* Inicializar middlewares */
		this.middlewares();

		/* Inicialzar sockets y base de datos */
		this.configSocketsAndDatabase();

		/* Inicialzar rutas */
		this.getRoutes();

		/* Inicializar server */
		this.server.listen( this.port , () => console.log(`Server corriendo en http://localhost:${ this.port }`) );
	}
}

module.exports = Server;