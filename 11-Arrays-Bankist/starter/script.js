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




const printMove = function (mov) {
  containerMovements.innerHTML = '';
  mov.forEach(function (amt, idx, arr) {
    const type = amt > 0? 'deposit':'withdrawal';  
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${idx + 1} deposit</div>
    <div class="movements__value">${amt}€</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

printMove(account1.movements);

// const user = 'hello dhiraj'

// const userName = user.toLowerCase().split(" ").map((name) => name[0]).join("");

// console.log(userName);

const createUsername = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(" ").map((name) => name[0]).join("");
  });  
};

createUsername(accounts);
console.log(accounts);

const calcBalance = function(mov) {
  const balance =  mov.reduce((acc, amt, idx) => {
    return acc + amt;
  }, 0);
  const html = `${balance}€`;
  labelBalance.innerText = html;
}

calcBalance(account1.movements);

const calcSummary = function (mov) {
  const deposit = mov.filter(amt => amt > 0).reduce((acc, amt) => acc + amt, 0);
  const withdrawl = mov.filter(amt => amt < 0).reduce((acc, amt) => acc + amt, 0);
  const interest = mov.filter(amt => amt > 0).map(amt => amt*0.012).filter(int => int > 1).reduce((acc, amt) => acc + amt, 0);
  labelSumIn.innerText = `${deposit}€`;
  labelSumOut.innerText = `${withdrawl}€`;
  labelSumInterest.innerText = `${interest}€`;
};

calcSummary(account1.movements);
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
const mov1 = movements.map((amt,idx,arr) => {
  
  return `${idx}: ${amt * euroToUsd}`;
});

console.log(movements);
console.log(mov1);

// filter
const deposits = movements.filter((amt) => {
  return amt > 0;
})

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

