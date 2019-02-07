const gateway = require('../gateway');

module.exports = {
    makePayment: async (req, res) => {
        const newCustomer = await gateway.customer.create();
        gateway.paymentMethod.create({
            customerId: newCustomer.customer.id,
            paymentMethodNonce: req.body.payment_method_nonce,
            options: {
                verificationMerchantAccountId: process.env.MERCHANT_ACCOUNT_NAME,
            }
        })
        .then(verification => {
            if(!verification.success) {
                const unsuccessful = 'Your checkout was unsuccessful. ';
                switch(verification.verification.processorResponseCode) {
                    case '1000':
                        res.send(unsuccessful + `The ${verification.verification.gatewayRejectionReason} was not verified.`)
                        return;
                    case '2000':
                        res.send(unsuccessful + 'The payment method has been declined. Contact your bank for further details.')
                        return;
                    case '2001':
                        res.send(unsuccessful + 'Insufficient funds.')
                        return;
                    case '2002':
                        res.send(unsuccessful + 'Withdrawal limit exceeded.')
                        return;
                    case '2003':
                        res.send(unsuccessful + 'Account activity limit exceeded.')
                        return;
                    case '2004':
                        res.send(unsuccessful + 'Card expired.')
                        return;
                    case '2005':
                        res.send(unsuccessful + 'Invalid credit card number.')
                        return;
                    case '2006':
                        res.send(unsuccessful + 'Invalid expiration date.')
                        return;
                    case '2015':
                        res.send(unsuccessful + 'Transaction not allowed by bank.')
                        return;
                    case '2016':
                        res.send(unsuccessful + 'Duplicate transaction.')
                        return;
                    default:
                        res.send(unsuccessful + 'An error occurred sending card verification to the processor.')
                        return;  
                }
            }
            return gateway.transaction.sale({
                amount: req.body.amount,
                paymentMethodToken: verification.creditCard.token,
                options: {
                    submitForSettlement: true
                }
            })
        })
        .then(result => result ? res.send('Your payment was successful! Thank you for your patronage!') : null)
        .catch(err => {
            console.log(err);
            res.send('There was an error processing your request. Please try again later.');
        });
    }
}