'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
console.log(accounts);

let currentUser;

// Display transactions

const printMove = function (movements, sort = false) {
  const mov = sort ? movements.slice().sort((a, b) => a > b) : movements;
  containerMovements.innerHTML = '';
  mov.forEach(function (amt, idx) {
    const type = amt > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      idx + 1
    } deposit</div>
    <div class="movements__value">${amt}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// const user = 'hello dhiraj'

// const userName = user.toLowerCase().split(" ").map((name) => name[0]).join("");

// console.log(userName);

// Disaplay Balance

const calcBalance = function (account) {
  account.balance = account.movements.reduce((acc, amt, idx) => {
    return acc + amt;
  }, 0);
  const html = `${account.balance}€`;
  labelBalance.innerText = html;
};

//Display Summary

const calcSummary = function (user) {
  const deposit = user.movements
    .filter(amt => amt > 0)
    .reduce((acc, amt) => acc + amt, 0);
  const withdrawl = user.movements
    .filter(amt => amt < 0)
    .reduce((acc, amt) => acc + amt, 0);
  const interest = user.movements
    .filter(amt => amt > 0)
    .map(amt => (amt * user.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, amt) => acc + amt, 0);
  labelSumIn.innerText = `${deposit}€`;
  labelSumOut.innerText = `${withdrawl}€`;
  labelSumInterest.innerText = `${interest}€`;
};

const updateUI = function (user) {
  printMove(user.movements);
  calcBalance(user);
  calcSummary(user);
};

//Login

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentUser = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentUser);

  if (currentUser?.pin === Number(inputLoginPin.value)) {
    inputLoginUsername.value = inputLoginPin.value = '';
    labelWelcome.innerText = `Welcome back, ${currentUser.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUI(currentUser);
  }
});

let receiverAcc;
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  console.log(receiverAcc);

  if (
    receiverAcc?.username === inputTransferTo.value &&
    currentUser !== receiverAcc
  ) {
    const transferAmt = inputTransferAmount.value;
    if (transferAmt > 0 && transferAmt < currentUser.balance) {
      currentUser.movements.push(-1 * transferAmt);
      receiverAcc.movements.push(1 * transferAmt);
      updateUI(currentUser);
    }
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('clicked');
  if (
    currentUser.username === inputCloseUsername.value &&
    currentUser.pin === Number(inputClosePin.value)
  ) {
    console.log('entered');
    const index = accounts.findIndex(
      acc => acc.username === currentUser.username
    );
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amt = inputLoanAmount.value;
  if (amt > 0 && currentUser.movements.some(amount => amount >= amt * 0.1)) {
    currentUser.movements.push(1 * amt);
    updateUI(currentUser);
  }
  inputLoanAmount.value = '';
});

let isSorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  printMove(currentUser.movements, !isSorted);
  isSorted = !isSorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
for (const i of movements) {
  if (movements > 0) {
    console.log(`Amount ${i} has been credited to your account`);
  }
  else {
    console.log(`Amount ${Math.abs(i)} has been withdrawn from your account`);
  }
}

// counter implementation

for (const [i,amt] of movements.entries()) {
  if (movements > 0) {
    console.log(`${i+1}: Amount ${amt} has been credited to your account`);
  }
  else {
    console.log(`${i+1}: Amount ${Math.abs(amt)} has been withdrawn from your account`);
  }
}

//for each loop
console.log('For Each Loop');
movements.forEach((amt, i, arr) => {
  if (movements > 0) {
    console.log(`${i+1}: Amount ${amt} has been credited to your account`);
  }
  else {
    console.log(`${i+1}: Amount ${Math.abs(amt)} has been withdrawn from your account`);
  }
});

// for each for maps

currencies.forEach((val, key, map) => {
  console.log(`${key}: ${val}`);
});

// for each for sets

const set1 = new Set(['USD','EUR','GBP',]);

set1.forEach((val, key, set1) => {
  console.log(`${val}`);
});

*/

const euroToUsd = 1.1;

//map
const mov1 = movements.map((amt, idx, arr) => {
  return `${idx}: ${amt * euroToUsd}`;
});

console.log(movements);
console.log(mov1);

// filter
const deposits = movements.filter(amt => {
  return amt > 0;
});

console.log(deposits);

const withdrawls = movements.filter(amt => amt < 0);

console.log(withdrawls);

// reduce

// const balance = movements.reduce((acc, amt, idx) => {
//   return acc + amt;
// },0);

// console.log(balance);

// const euroToinr = 89.07;

// const depositIninr = movements.map(amt => amt * euroToinr).filter(amt => amt > 0).reduce((acc, amt) => acc + amt, 0);
// console.log(depositIninr);

//find returns only first element matching the expression.
const first = movements.find(amt => amt < 0);
console.log(first);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// movements.slice(1, 2);
// console.log(movements);
// movements.splice(1, 1);
// console.log(movements);

// includes == checks only for a quality or does equality checks

const isThere = movements.includes(-130);
console.log(isThere);

// some == returns true if there is any value matching the given condition

const isThereAny = movements.some(amt => amt > 5000); // checking if there is any transaction greater than 5000
console.log(isThereAny);

// every == returns true if and only if all of the elements satiify the given condition via call back function

const isThereEvery = account4.movements.every(amt => amt > 0);
console.log(isThereEvery);

//DNT (DO NOT REPEAT YOURSELF)

const cond = amt => amt > 0;
console.log(movements.includes(-130));
console.log(movements.some(cond));
console.log(movements.every(cond));

// flat => arr.flat(x) here x tells about the deepness that the array should be flatened.

const arr = [1, 2, 3, [4, [5, 6]], [7, 8, 9], [[10, 11], 12]];

console.log(arr.flat());
console.log(arr.flat(2));

// to check the balance of the bank

// const totalMovMap = accounts.map(mov => mov.movements);
// console.log(totalMovMap);

// const totalMov = totalMovMap.flat();
// console.log(totalMov);

// const BankBalance = totalMov.reduce((acc, amt) => acc + amt);
// console.log(BankBalance);

// same as above commented code

const overallBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((acc, amt) => acc + amt);
console.log(overallBalance);

// flatMap => includes fumctionalitites of both flat and map methods
// can only be applied for deepness of level 1 (i.e.) [[1,3,2],4,5,6,7]
//doesn't work for [1, 2, 3, [4, [5, 6]], [7, 8, 9], [[10, 11], 12]]

const overallBalnc = accounts
  .flatMap(account => account.movements)
  .reduce((acc, amt) => acc + amt);
console.log(overallBalnc);

const sorted = movements.sort((a, b) => a > b);
console.log(sorted);
