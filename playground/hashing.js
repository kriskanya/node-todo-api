const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10
};

// second param is the secret
const token = jwt.sign(data, '123abc');
console.log(token)

const decoded = jwt.verify(token, '123abc');
console.log(decoded);

// an example of a manual salt/hash implementation:

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log('message', message);
// console.log('hash', hash);

// const data = {
//   id: 4
// };
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// // salting a hash adds 'somesecret' to the string before converting to hash

// // man in the middle
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was changed. do not trust');
// }