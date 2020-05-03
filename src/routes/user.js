const express = require('express');
const {check} = require('express-validator');
const User = require('../controllers/user');
const multer = require('multer');
const upload = multer().single('profileImage');

const router = express.Router();

router.get('/', User.index);
router.get('/:id',  User.show);
router.put('/:id', upload, User.update);

module.exports = router;
