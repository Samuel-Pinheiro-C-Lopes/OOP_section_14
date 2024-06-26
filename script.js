'use strict';

// Objects are building blocks of applications, they can interact with one another
// Interaction happen through the API - public interfase 
// OOP is a programming paradigm, meaning it's a way to structure the code - better than 
// spaghetti code structure in maintainability 

// Classes are like blueprints from which it's possible to create new objects
/*
User {
    user
    password
    email

    login (password) {
    
    }

    sendMessage (str) {
    
    }
}
*/
// It's a plan, it doesn't have the data yet - it has the blueprint for a use,
// for example
/*
new User('Jonas')
{
    user = 'Jonas'
    password = 'ps213'
    email = 'something@gmail.cm'

    ...
}

it's a User created with the user class, meaning that the class
can be used to create - instace - multiple objects with
the same blueprint
*/

/*
Four fundamental principles of OOP - 

1 - Abstraction - omit details that doesn't matter in the context - doesn't matter
in the implementing

2 - Encapsulation - keep properties and methods private inside the class,
so they are not accessible from outside the class.
Some can be exposed as a public interface - named API
Those properties and methos can be accessed from within the class, 
but not outside 
Prevents external code to manipulate internal state directly
- being state the data

3 - Inheritance - a admin is a user, having - inheriting - the
properties and methods from the user class - being admin a child class,
and user the parent class.
The child class extend the parent class.
inheritance makes possible to reuse logic implemented in both classes, formes
a hierarchical relationship and model real-world relationships.
Admin is a extended user - additional functionalities

4 - Polymorphism - A child class can overwrite a method
it inherited from a parent class.
The login (password) for user, admin and author may be different,
meaning the child method overwrites the parent one.


*/


///////////////////////////////////////////////////////

// OOP in JS: prototypes
// each object has a prototype
/*
That behavior is called prototypal inheritance - all the objects linkes to a 
certaing prototype object inherit 
the prototype has methods (behavior) that are accessible to all objects
linked to it
Behavior is delegated to the linked prototype object
prototype contains the method, and the object can access the methods
In classical OOP the behavior is copied from class to all instances,
while in JS the behavior is delegated by a object to the prototype
that contains that method

*/

const num = [1, 2, 3];
num.map(v => v * 2);

// Array.prototype.map() is the method, the num.map is
// delegating that method from the Array.prototype that 
// has it

// How to implement OOP inheritance in JS:

// 1 - Constructor functions
/**
1 - Technique to create objects from a function;
2 - This is how build-in objects like Arrays, Maps or Sets
are actually implemented
*/


// 2 - ES6 Classes

/*
1 - Modern alternative to constructor function syntax;
(it's still prototype inheritance, but more modern) 
2 - "syntactic sugar", those classes work exactly like
constructor functions)
*/

// 3 - Object.create()

/*
1 - The easiest and more straightfoward way of linking an
object to prototype object. 
*/


///////////////////////////////////////////////////

// Constructor functions have the first letter in capital
// built-in are the same, with first letter in capital
const Person = function(firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never do this
    // * this.calcAge = function () {
        // * console.log(2037 - this.birthYear);
    // * };
    // if there should be a thousand objects, each one would
    // have a function - which means a thousand functions
    // It's better to use prototype inherintance 
};
// Arrow functions doesn't have the this keyword, meaning they 
// don't work as a constructor function

const jonas = new Person('Jonas', 1991);
console.log(jonas);
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
/* 
Something alike to...
{} is the this keyword of the function, that will be the __proto__ of
 the "instances", and it's linked to the prototype property of the
 "class", meaning that Person.prototype === person.__proto__ and, also
 meaning that writing Person.prototype.function = function() {} creates
 a function in the Person.prototype object that then is "passed" to
 the __proto__ of the "instances" - which would be the delegation
*/
// 4. function automatically return {} (this)
// that way, all the this.<something> and this.<somethingElse> are
// returned and attributed to the jonas object

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
// JS doesn't really have classes, these objects are created from a
// constructor function - used since the beggining of js to simulate classes

// it's a "instance", or can be called so
console.log(jonas instanceof Person);
// as it's possible to see, that returns true, but...

const rever = {firstName: "rever", birthYear: 1889};
console.log(rever instanceof Person);
// doesn't return true

//////////////////////////////////////////////////////

// Prototypes
console.log(Person.prototype);

// It's one single function that every "instance" uses
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
    // the This keyword is set to the object that is
    // calling the method
}

// it works for every "instace" of Person
jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // it's true
// Person.prototype isn't the prototype of Person, but the prototype
// used for all the "instances" of it

// to prove it even further...
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// that property is more equal to .prototypeOfLinkedObjects than
// .propotype, if it would have a more clear naming


///////////////////////////////////////

// They can inherit an attribute as well
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// The prototype chain works almost the same as the scope chain, 
// in which when an property or method that's no inside an object,
// it will be searched in it's prototype - linked by the .__proto__ property
// and, if it still doesn't find it, it will look even further - the
// .__proto__ is linked to and object that has a .__proto__ as well, it's own
// prototype

console.log(jonas.hasOwnProperty('firstName')); // true, since it has that property
console.log(jonas.hasOwnProperty('species')); // false, since it doesn't have it,
// it's the prototype that has it

console.log(".__proto__ of __proto__: ", jonas.__proto__.__proto__); // .__proto__ of jonas prototype will be
// , in this case, the top of the prototype chain - the prototype which the .__proto__ is null

// that proves us it is the last element of the prototype chain
console.log(".__proto__ of __proto__ of __proto__: ", jonas.__proto__.__proto__.__proto__);

// The same happens to arrays, that are type of objects, after all

const arr = [1, 3, 3, 5, 6, 6]; // new Array === []...
const arr2 = new Array(1, 3, 6);
console.log(arr2); // that proves it...

// and now, the prototype chain for the arrays is...
console.log("The arr: ", arr); // the array itself
console.log("The .__proto__ of arr: ", arr.__proto__ === Array.prototype); // it will be Array.prototype
console.log("The .__proto__ of .__proto__ of arr: ", arr.__proto__.__proto__); // it will be Object.prototype
console.log("The .__proto__ of .__proto__ of .__proto__ of arr: ", arr.__proto__.__proto__.__proto__); // null...

// to confirm it...
console.log(arr.__proto__ === Array.prototype);

// All the arrays will inherit the method bellow...
Array.prototype.unique = function () {
    return [...new Set(this)];
};

// Proved here
console.log(arr.unique());

// It's bad to do because there has a chance the js update
// adds a method with the same name and, when working with a team
// of developers, different methods with the same name will cause
// a lot of bugs...

const h1 = document.querySelector('h1');

// in that case, it's possible to see that the h1 object has
// a .__proto__ property that points to the parent element in the DOM
// - which also has a .__proto__ pointing to it's parent element, all the way
// to the end of the prototype chain - the eventTarget element
console.dir(h1);

///////////////////////////////////////////////////
//  CODING CHALLENGE #1 
/* 
1. Use a constructor function to implement a car. A car has a mark and a speed
property. The speed property is the current speed of the car in km/h;
2. Implement an "accelerate" methot that will increase the car's speed by 10,
and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console.
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake'
multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK =)


*/
/*

const Car = function (mark, speed) {

    // Properties
    this.mark = mark
    this.speed = speed + ' km/h';
}

Car.prototype.accelerate = function () {
    const speedInt = Number.parseInt(this.speed, 10);
    this.speed = speedInt + 10 + ' km/h';
    return this.speed;
}

Car.prototype.brake = function () {
    const speedInt = Number.parseInt(this.speed, 10);
    this.speed = speedInt - 5 + ' km/h';
    return this.speed;
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
*/

//////////////////////////////////////////

// class expression
// const PerconCl = class {}

// class declaration
// it's more friendly to developers from other programming languages and
// can make code structure more clear and concise in bigger projects when compared
// to constructor functions
// "Syntactic sugar"

// content about getters and setters are in this and the next block

class PersonCl {
    // Properties
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    // Methods
    calcAge () {
        console.log(2037 - this.birthYear);
    }
    // is writted that way, but it's still at the prototype

    // getter and setter are useful for data validation

    get age () {
        return 2037 - this.birthYear;
    }

    set fullName(name) {
        console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name`)
        // in that case, the constructor actually has the syntax to
        // "call" the setter with the fullName as a argument, meaning
        // that instead of creating a variable fullName it calls the setter
        // that creates the _fullName variable - the name must be different
        // so the logic doesn't resume in conflict and errors

        // in that case, it validates if the full name is valid and then
        // make _fullName withing the class be equal to the fullName parameter
        // which means that the fullName will not be a property of PersonCl class, 
        // but _fullName instead

    }

    // since there is no fullName property, the getter returns _fullName when the
    // some code tries to reach a fullName property from within the created objects
    get fullName() {
        return this._fullName;
    }
}

// * const john = new PersonCl('John', 1894); // it should alert us with an error and
// don't set neither a _fullName or a fullName property for it

const jessica = new PersonCl('Jessica Davis', 1996);
console.log('Jessica = ', jessica);
jessica.calcAge();
// works the same...

// the getter...
console.log('Jessica has ', jessica.age, ' years.');

console.log(jessica.__proto__ === PersonCl.prototype); // Should return true


PersonCl.prototype.greet = function () {
    console.log('Hey, ', this.firstName, ' is calling you.');
}

jessica.greet(); // and it will work the same, since the prototype concept is still the same, just
// abstracted a little bit

// 1. Classes are NOT hoisted - can't be used before declaration
// 2. Classes are first-class citizens - can be passed and returned by function,
// as it's a JS function behind the scene
// 3. Classes are executed in strict mode

/////////////////////////////////////////////////

const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    // read data as a property but with calculations before
    get latest () {
        return this.movements.slice(-1).pop();
    },

    // account.latest = 50 // pushes 50 to the movement array
    set latest(mov) {
        this.movements.push(mov);
    }

};

console.log(account.latest);

account.latest = 50;

console.log(account.latest);


/*
const Animal = function (legs, hasScale, hasFeather, isExtinct) {
    this.legs = legs;
    this.hasScale = hasScale;
    this.hasFeather = hasFeather;
    this.isExtinct = isExtinct;
}

Animal.prototype.move = function () {
    if (this.isExtinct) return "It can't, it's dead";
    else return 'It moved';
};

const bear = new Animal(4, false, false, false);
const dodo = new Animal(2, false, true, true);
*/



/////////////////////////////////////////////////////

// STATIC METHOD

// created in a constructor of Array, Number and other, but not within the
// prototype of it's children - meaning it's static, like the Array.from() and
// the Number.parseFloat() methods

class Worker {
    constructor (name, profession){
        this.name = name;
        this.profession = profession;
    }

    // Instance method, because it's passed to instances
    sayProfession () {
        return this.profession;
    }

    // to create a static method only available in the Worker object - not inherited
    static sayHi () {
        return 'Hello!';
    }
}

// It's possible to do the same here:
Worker.sayBye = function () {
    return 'Bye';
}

const paulo = new Worker ('paulo', 'medic');
// paulo has the instance method, but doesn't have neither of the static
// methods of Worker - since inheritance works with the prototype, not the
// constructor function itself 

////////////////////////////////////////////////////////////////

// OBJECT.CREATE

// this object literal will be the prototype for all the Person objects
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    // manual way to initialize the object once it's created and has the
    // .__proto__ linked to this object literal - now it will be the prototype
    // of every object bellow
    init (firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // it works, since the prototype inheritance has been
// implemented in a different way, but still implemented

// to seriously use the Object.create() static method, it's better to create
// a method that inits the object with it's meant variables, as it's seen
// bellow the calcAge() method in the PersonProto object literal.

// using it to define a Person sarah
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1975);
sarah.calcAge(); // and it should work since the birthYear was initialized already


////////////////////////////////////////////////////

// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in
mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h
(but converts it to km/h before storing the value, by multiplying the
input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with
the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK =)


*/

/*
class Car {

    // properties
    constructor (make, speed) {
        this.make = make;
        this.speed = speed;
    }

    // instance methods

    accelerate () {
        this.speed += 10;
        return `The current speed is ${this.speed} km/h`;
    }

    brake () {
        this.speed -= 5;
        return `The current speed is ${this.speed} km/h`;
    }

    // getters and setters for the speed in us

    get speedUS() {
        return `The current speed is ${this.speed / 1.6} mi/h.`;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
        // * return `The current speed is ${this.speed} km/h and ${speed} mi/h.`;
    }

}

// new instance of Car
const ford = new Car('Ford', 120);

*/

/////////////////////////////////////////////

const _Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    // * console.log('this constructor function have been called', this);
}

_Person.prototype.calcAge = function () {
    return 2037 - this.birthYear;
};

const _Student = function(firstName, birthYear, course) {   

    //_Person(firstName, birthYear); // throws an error because the this keyword is setted to undefined when
    // the function is called that way - not as a method of some sort

    // the .call allow us to pass the this keyword as an argument to the function call, thus making the code
    // within the _Person constructor function work as intended...
    _Person.call(this, firstName, birthYear);

    // * this.firstName = firstName; // code being repeated
    // * this.birthYear = birthYear; // is never a good idea
    this.course = course;
}

// Linking prototypes
_Student.prototype = Object.create(_Person.prototype);
// * _Student.prototype = _Person.prototype // It's bad code, making both objects
// the same and not linking them as prototype chain was meant to work

_Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`)
}

const mike = new _Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
console.log(mike.calcAge());

console.log(mike.__proto__); // here it says that Mike is of type Person, which
// should not be the case
console.log(mike.__proto__.__proto__);

console.log(_Student.prototype.constructor); // it should point to _Student,
// but it points to _Person because of the Object.create() - and it can be fixed,
// since sometimes it's necessary to rely on the constructor

console.log(mike instanceof _Student);
console.log(mike instanceof _Person);
console.log(mike instanceof Object);

_Student.prototype.constructor = _Student;

/*
const testFunction = function (testData) {
    console.log(this);
    console.log(testData + 10);
}
*/

/////////////////////////////////////////////////////////////

// CODING CHALLENGE #3

/*
1. Use a constructor function to implement an Eletric Car (called EV) 
as a CHILD "class" of Car. Besides a make and current speed, the EV
also has the current battery in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo'
and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed
by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going
at 140 km/h, with a charge of 22%;
4. Create an eletric car object and experiment with calling 'accelerate', 'brake'
, and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'!
HINT: review the definition of polymorphism

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK

*/

const _Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

_Car.prototype.accelerate = function () {
    this.speed += 10;
    return this.speed;
};

_Car.prototype.brake = function () {
    this.speed -= 5;
    return this.speed;
};

const _EV = function (make, speed, charge) {
    _Car.call(this, make, speed);
    this.charge = charge + '%';
};

_EV.prototype = Object.create(_Car.prototype);

_EV.prototype.constructor = _EV;

_EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo + '%';
}

_EV.prototype.accelerate = function () {
    this.speed += 10;
    this.charge = Number.parseInt(this.charge) - 1 + '%';
    return `${this.make} is goint at ${this.speed} km/h with a charge of ${this.charge}`;
}

const tesla = new _EV('Tesla', 120, 23);

console.log(tesla instanceof _EV);
console.log(tesla instanceof _Car);
console.log(tesla instanceof Object);

//////////////////////////////////////////////////////////////////