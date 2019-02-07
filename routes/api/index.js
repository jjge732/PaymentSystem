const router = require('express').Router();

const tokenRoutes = require('./tokens');
const paymentRoutes = require('./payments');

router.use('/tokens', tokenRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
