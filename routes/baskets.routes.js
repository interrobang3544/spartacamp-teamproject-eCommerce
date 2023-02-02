const express = require('express');
const router = express.Router();

router.route('/').get().post();
router.route('/:id').patch().delete();

exports.module = router;
