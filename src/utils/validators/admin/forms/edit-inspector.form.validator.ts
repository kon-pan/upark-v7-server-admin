import { check } from 'express-validator';

const editInspectorValidator = [
  check('firstName')
    .trim()
    .stripLow()
    .not()
    .isEmpty()
    .withMessage('Εισάγετε τιμή σε αυτό το πεδίο.')
    .bail()
    .customSanitizer((value) => {
      let titleCased = value.toLowerCase();
      titleCased = titleCased.charAt(0).toUpperCase() + titleCased.slice(1);
      return titleCased;
    }),
  check('lastName')
    .trim()
    .stripLow()
    .not()
    .isEmpty()
    .withMessage('Εισάγετε τιμή σε αυτό το πεδίo.')
    .bail()
    .customSanitizer((value) => {
      let titleCased = value.toLowerCase();
      titleCased = titleCased.charAt(0).toUpperCase() + titleCased.slice(1);
      return titleCased;
    }),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Εισάγετε τιμή σε αυτό το πεδίo.')
    .bail()
    .isEmail()
    .withMessage('Εισάγετε μια σωστή διεύθυνση ηλ. ταχυδρομείου.')
    .bail(),
];

export default editInspectorValidator;
