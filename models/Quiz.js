const { Schema, model } = require('mongoose');

const QuizSchema = Schema(
{
	idUser:
	{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	},
	question1:
	{
		type: String,
		required: true
	},
	question2:
	{
		type: String,
		required: true
	},
	question3:
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

module.exports = model( 'Quiz', QuizSchema );