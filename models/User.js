const { Schema, model } = require('mongoose');

const UserSchema = Schema(
{
	email:
	{
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password:
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

module.exports = model( 'User', UserSchema );