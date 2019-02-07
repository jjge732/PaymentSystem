const router = require('express').Router();
const tokensController = require('../../controllers/tokensController');

router.route('/')
    .get(tokensController.getToken);

module.exports = router;