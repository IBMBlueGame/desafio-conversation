const router = require('express').Router();
router.post('/chatbot/', require('./conversation'));

module.exports = router;
