const { Router } = require('express');
// const { check } = require('express-validator');
const router = Router();

const { userAddQuiz } = require('../classes/controllers/_user');

const { reqValidator } = require('../middlewares/req-validator');
const { validateJWT } = require('../middlewares/validate-jwt');


router.post('/addQuiz', [ validateJWT ], userAddQuiz );

module.exports = router;