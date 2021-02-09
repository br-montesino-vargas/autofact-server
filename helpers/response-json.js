            /* Codigos de estado */

const StatusOK = ( res, status, data ) =>
{
	return res.status(200).json({ status, ...data });
}

const StatusCreated = ( res, status, data ) =>
{
	return res.status(201).json({ status, ...data });
}

const StatusBadRequest = ( res, status, msg ) =>
{
	return res.status(400).json({ status, msg });
}

const StatusUnauthorized = ( res, status, msg ) =>
{
	return res.status(401).json({ status, msg });
}

const StatusNotFound = ( res, status, msg ) =>
{
	return res.status(404).json({ status, msg });
}

const StatusInternalServerError = ( res, status, msg ) =>
{
	return res.status(500).json({ status, msg });
}

module.exports = {
	StatusOK,
	StatusCreated,
	StatusBadRequest,
	StatusUnauthorized,
	StatusNotFound,
	StatusInternalServerError
}