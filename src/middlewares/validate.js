const {validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.params)
    if (!errors.isEmpty()) {
        let error = {}; errors.array().map((err) => error[err.param] = err.msg);
        return res.status(422).json({error});
    }

    next();
};