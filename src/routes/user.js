const express = require('express');
const {check} = require('express-validator');
const User = require('../controllers/user');
const router = express.Router();

router.get('/', User.index);
module.exports = router;
