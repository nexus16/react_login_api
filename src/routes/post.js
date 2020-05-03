const express = require('express');
const {check} = require('express-validator');
const Post = require('../controllers/post');
const validate = require('../middlewares/validate');
const multer = require('multer');
const upload = multer().single('image');
const router = express.Router();

router.get('/', Post.index);
router.get('/:id',  Post.show);

//STORE
router.post('/', upload, [
  check('content').not().isEmpty().withMessage('Content is required'),
  check('title').not().isEmpty().withMessage('title is required'),
], validate, Post.store);
router.put('/:id', Post.update);

module.exports = router;
