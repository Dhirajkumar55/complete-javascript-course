'use strict';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours,

  orderDelivery({time ='12:00', address, main = 1,starter = 1}) {
    console.log(`Your order for ${this.mainMenu[main]}, ${this.starterMenu[starter]}, will be delivered to you by ${time} at ${address}`);
  },

  orderItem(obj2) {
    console.log(obj2);
    for (let i of obj2 ){
        console.log(i);
    }
  }
};
 

restaurant.orderDelivery({
  time: '12:30',
  address: 'Drno 39-19-77/1',
  main: 1,
  starter: 2
});

restaurant.orderDelivery({
  address:'drno 39-29-78/1'
})


// array destruction
// const arr = [1, 2, 3];
// let [a, , c] = arr;
// console.log(a, c);

// [a, c] = [c, a];
// console.log(a, c);


//objects destruction
const { name, openinghours, categories } = restaurant;
console.log(name, openinghours, categories);
const { name: rname, openinghours: hours, categories: cat } = restaurant;
console.log(rname, hours, cat);

let a = 2;
let b = 3;
const obj = { a: 20, b: 30 };

({ a, b } = obj);
console.log(a, b);

//nested object destruction
const { fri: {open,close} } = openingHours;
console.log(open,close);

// spread operator
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5, 6];
console.log(...newArr);


const orderItems = ["pasta", "noodles", "chicken manchuria"];
restaurant.orderItem(orderItems);


// spread oprertator on objects
const newRestaurent = { foundedIn: 1998, ...restaurant, foundedBy: "Dhiraj" };
console.log(newRestaurent);


//rest operator on arrays

const [x, y, ...others] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(x, y, others);


const [pizza, rissoto,...otherfoods] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, rissoto, otherfoods);


// rest element may not hava a trailing comma
// the below is not allowed
// const [pizza1, rissoto1,...otherfoods1, hello] = [...restaurant.mainMenu, ...restaurant.starterMenu];

const add = function (...numbers) {
  console.log(numbers);
}

add(1, 2, 3, 4);
add(1, 4, 5, 6, 7, 8, 9);
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);


const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

//for of loop
//here menu.entries() is an array iterator
for (const [i, el] of menu.entries()) {
  console.log(`${i}: ${el}`);
}

//optional chaining(symbol '?')
// {expression1?.expression2}
// in the above if expression1 exists then go for expression2 else do nothing
if (restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

//equivalent of above
console.log(restaurant.openingHours.mon?.open);

if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}

//equivalent of above
console.log(restaurant.openingHours?.mon?.open);

// for of loop for objects
for (let i of Object.keys(openingHours)) {
  console.log(i);
}

for (let i of Object.values(openingHours)) {
  console.log(i);
}

for (let [day,{open,close}] of Object.entries(openingHours)) {
  console.log(`on ${day} we open at ${open} and close at ${close}`);   
}


//sets

let orderSet = new Set(['one', 'two', 'three', 'one']);
console.log(orderSet);

console.log(orderSet.has('one'));

orderSet.add('four');
console.log(orderSet);

orderSet.delete('one');
console.log(orderSet);

console.log(orderSet.size);

for (let order of orderSet) {
  console.log(order);
}

// Maps

let mapArr = new Map();
mapArr.set(1, "one");
mapArr.set(2, "two");
mapArr.set(3, "three");

console.log(mapArr);

console.log(mapArr.get(1));

let mapArr2 = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
  [4, 'four'],
])

console.log(mapArr2);

//iterate over map
for (let [key, value] of mapArr2) { 
  console.log(`${key}: ${value}`);
}

// convert objects to maps
let mapObj = Object.entries(openingHours);
console.log(mapObj);

//covert map to array
let arr1 = [...mapArr2];
console.log(arr1);

//string operations

const airline = "Air India Express";
const plane = "Airbus A380";

console.log(airline.split(' '));// splitting via delimiter

console.log(airline.indexOf('a'));
console.log(airline.lastIndexOf('i'));

console.log(airline.slice(2));
console.log(airline.slice(2, 7));
console.log(airline.slice(4, -1));

console.log(typeof new String('Dhiru'));

const s = "hello from india, I love india";

console.log(s.replaceAll('india', 'India'));

console.log(s[0].toUpperCase()+s.slice(1));

