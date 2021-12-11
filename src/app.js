const fs = require('fs');

let rawdata = fs.readFileSync('data/gigaplay-cognito-users.json');
let cognito = JSON.parse(rawdata);

// get congito users
let users = cognito.Users;

console.log("sample record:");
console.log(users[7]);

console.log("count unconfirmed:");
console.log(users.filter(user => {
    return user.UserStatus === 'UNCONFIRMED';
}).length);
console.log();

console.log("count phone_number_verified === 'false:");
console.log(users.filter(user => {
    return user.Attributes[1].Value === 'false';
}).length);
console.log();

// select users created on Dec 11, 2021 between 3pm & 5:30pm OR
//        users modified on Dec 11, 2021 between 3pm & 5:30pm
console.log("count users created on Dec 11, 2021 between 3pm & 5:30pm OR");
console.log("      users modified on Dec 11, 2021 between 3pm & 5:30pm");
console.log(users.filter(user => {
    return (new Date(user.UserCreateDate) >= new Date('2021-12-11T15:00:00+08:00')
      & new Date(user.UserCreateDate) <= new Date('2021-12-11T17:30:00+08:00')) |
      (new Date(user.UserLastModifiedDate) >= new Date('2021-12-11T15:00:00+08:00')
      & new Date(user.UserLastModifiedDate) <= new Date('2021-12-11T17:30:00+08:00'))
}).length);
console.log();

// bring it all together :)
console.log(users.filter(user => {
    return ((new Date(user.UserCreateDate) >= new Date('2021-12-11T15:00:00+08:00')
      & new Date(user.UserCreateDate) <= new Date('2021-12-11T17:30:00+08:00')) |
      (new Date(user.UserLastModifiedDate) >= new Date('2021-12-11T15:00:00+08:00')
      & new Date(user.UserLastModifiedDate) <= new Date('2021-12-11T17:30:00+08:00')))

      & user.Attributes[1].Value === 'false'
}).length);
console.log();