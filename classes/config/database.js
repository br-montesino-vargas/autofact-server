const mongoose = require('mongoose');

class Database
{
	constructor()
	{
		this.connection = process.env.DB_CNN;
	}

	/* Conexión a base de datos */
	async connectInDatabase ()
	{
		try
		{
			await mongoose.connect( this.connection,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			});
	
			console.log('DB Online');
		}
		catch (error)
		{
			console.log(error);
			throw new error('Error a la hora de inicializar BD');
		}
	}
}

module.exports = Database;