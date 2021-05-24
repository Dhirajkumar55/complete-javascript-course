'use strict';

const flight = "LH123"
const dhiraj = {
    name: "dhiraj kumar",
    passport: 12345,
    luggage: [7,25],
};

console.log(dhiraj);

const checkin = (flightNum, passenger) => {
    
    flightNum = 'LH1234';
    console.log(flightNum);
    passenger.name = 'Mr.' + passenger.name;

    if (passenger.passport === 12345) {
        console.log('Checked in');
    } else {
        console.log('wrong passport');
    }
    let weight = 0;
    for (let w of passenger.luggage) {
        weight += w;
    }
    if (weight > 17) {
        passenger.luggage[1] -= 8;
    }
};

checkin(flight, { ...dhiraj });
console.log(flight);
console.log(dhiraj);


// higher order functions

function capitalizeFirstletter(str) {
    let s = str.split(' ');
    let ans = '';
    for (let i of s) {
       ans += i[0].toUpperCase() + i.slice(1) + " ";
    }
    return ans;
}


function transform(str, fn) {
    console.log(`original string: ${str}`);
    console.log(`tranformed string: ${fn(str)}`);
    console.log(`tranformed by function: ${fn.name}`);
}
let a = "hi this is dhiraj kumar chintada";

transform(a, capitalizeFirstletter);

// functions returning functions


const greet = function (greetMsg) {
    return function (nameMsg) {
        console.log(`${greetMsg} ${nameMsg}`);
    }
}


const greeting = greet('Hello');
greeting('Dhiraj');

// the above can also be done by
greet('Hello')('Dhiraj Kumar Ch'); 


//above function declaration using arrow functions
const greet1 = (greetMsg) => (nameMsg) => console.log(`${greetMsg} ${nameMsg}`);
   

const greeting1 = greet1('Hello');
greeting('john');

// the above can also be done by
greet1('Hello')('John');



const luftansa = {
    airline: 'luftansa',
    iataCode: 'LH',
    bookings: [],
    book(fNo, name) {
        console.log(`${name} booked a ticket in ${this.airline} flight ${this.iataCode}${fNo}`);
        this.bookings.push(
            {//object
                flight: `${this.iataCode}${fNo}`,
                name
            }
        );
    }, 
};

luftansa.book(23, 'dhiraj');
luftansa.book(25, 'rohan');

console.log(luftansa);

const book = luftansa.book;

const eurowings = {
    airline: 'eurowings',
    iataCode: "EW",
    bookings: [],
    
}


//call method
book.call(luftansa, 209, 'hema');
book.call(eurowings, 239, 'harry');
console.log(luftansa);
console.log(eurowings);


//apply method => it takes array as a data input

const flightData = ['234', 'Meghan'];
book.apply(eurowings, flightData);
console.log(eurowings);

//rewriting apply method to call method
book.call(luftansa, ...flightData);
console.log(luftansa);


//bind method 
//returns a function to which the intended this keyword is fixed to.

const bookLH = book.bind(luftansa);
const bookEW = book.bind(eurowings);
const bookEW23 = book.bind(eurowings, 23);

bookLH('234', 'rohit');
bookEW('345', 'roshan');
bookEW23('riya');
bookEW23('payal');


luftansa.planes = 100;
luftansa.buyPlane = function(){
    console.log(this);
    this.planes++;
    console.log(this.planes);
}


document.querySelector('.buy').addEventListener('click', luftansa.buyPlane.bind(luftansa));

//IIFE(Immediately invoked function expression)

(function () {
    console.log('this will run only once');
})();

//or

(() => { console.log('this will also run only once');})();



