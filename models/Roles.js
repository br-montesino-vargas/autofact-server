const { Schema, model } = require('mongoose');

const RolesSchema = Schema(
{
	idUser:
	{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	description:
	{
		type: String,
		required: true
	},
	createdAt:
	{
		type: Date,
		default: Date.now
	}
});

module.exports = model( 'Roles', RolesSchema );