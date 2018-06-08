const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

const hashedPassword = '$2a$10$NTgLeyqctUDPl5kULr4pgOfjGj74NI0Kf6Go/RU4pQHk7xDLa.zkW';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
// result: true



// -------

// const data = {
//   id: 10
// };

// // second param is the secret
// const token = jwt.sign(data, '123abc');
// console.log(token)

// const decoded = jwt.verify(token, '123abc');
// console.log(decoded);

// an example of a manual salt/hash implementation:

// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log('message', message);
// console.log('hash', hash);

// -------

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