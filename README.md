# Payment System

This project uses the Braintree API (sandbox access) to accept payments. React.js as a framework for the front-end and Node.js for the back-end. Yarn was used for package management.

## Features

- Client-side validation for incomplete or inaccurate fields with error messages for the user.
- Server-side validation that checks the credit card information for the ability to be processed with error messages for the user.

## Walkthrough

The app will request a client token on page load and, when it is received, the form will be available for use and submission. Once submitted, the form will be validated on the client-side. If the data is validated, it will be sent to the server for further validation. If this validation check is passed, the information will be stored in the merchant's Vault and the transaction will be processed. The form container will then re-render with a message stating the success of the transaction. If either of the validations fail, the form container will re-render and an error message will be displayed to the user. 

## Credits

[Background Photo](https://www.pexels.com/photo/beach-calm-clouds-coast-457881/) courtesy of Ibrahim Asad and [pexels.com](https://www.pexels.com/)