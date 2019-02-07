const router = require('express').Router();
const paymentsController = require('../../controllers/paymentsController');

router.route('/')
    .post(paymentsController.makePayment);

module.exports = router;