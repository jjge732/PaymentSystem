const gateway = require('../gateway');

module.exports = {
    getToken: (req, res) => {
        gateway.clientToken.generate({
            customerId: req.body.customerId || null
        })
            .then(response => res.send(response.clientToken))
            .catch(err => res.json(err));
    }
}