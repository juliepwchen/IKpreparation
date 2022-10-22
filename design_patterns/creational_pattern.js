/***************************************************************************************************/
/* Reference: https://www.freecodecamp.org/news/javascript-design-patterns-explained/
/*
/* Creational Pattern - Singleton, Factory Method, Abstract Factory, Builder, Prototype
/* => refers to different mechanisms used to create objects.
/***************************************************************************************************/

/***************************************************************************************************/
// Singleton: useful for immutable single source of truth
// Ex: store app's configuration & cannot be modified
/***************************************************************************************************/
class Config {
    constructor() {}
    start() { console.log('App started') }
    update() { console.log('App updated') }
}
const instance = new Config();
Object.freeze(instance);

/***************************************************************************************************/
// Factory Method: Define an interface for creaating object, but let subclass decided which class to instantiate.
// => provides an interface for creating objects that can be modified after creation
// => logic for creating our objects is centralized in a single place
/***************************************************************************************************/
class Alien {
    constructor (name, phrase) {
        this.name = name
        this.phrase = phrase
        this.species = "alien"
    }
    fly() { console.log("Zzzzzziiiiiinnnnnggggg!!") }
    sayPhrase() { console.log(this.phrase) }
}
const alien1 = new Alien("Ali", "I'm Ali the alien!")
console.log(alien1.name) // output: "Ali"

/***************************************************************************************************/
// Abstract Factory: produce families of related objects without specifying concrete classes
// => useful when need to create objects that share only some properties and met
// We have a class or "concrete factory" for each vehicle type
/***************************************************************************************************/
class Car {
    constructor () {
        this.name = "Car"
        this.wheels = 4
    }
    turnOn() { console.log("Chacabúm!!") }
}
class Truck {
    constructor () {
        this.name = "Truck"
        this.wheels = 8
    }
    turnOn() { console.log("RRRRRRRRUUUUUUUUUMMMMMMMMMM!!") }
}
class Motorcycle {
    constructor () {
        this.name = "Motorcycle"
        this.wheels = 2
    }
    turnOn() { console.log("sssssssssssssssssssssssssssssshhhhhhhhhhham!!") }
}
// And and abstract factory that works as a single point of interaction for our clients
// Given the type parameter it receives, it will call the corresponding concrete factory
class VehicleFactory {
    constructor() {}
    createVehicle(type) {
        switch (type) {
            case "car":
                return new Car().turnOn()
            case "truck":
                return new Truck().turnOn()
            case "motorcycle":
                return new Motorcycle().turnOn()
            default:
                return null
        }
    }
}
const car = new VehicleFactory().createVehicle("car") // Car { turnOn: [Function: turnOn], name: 'Car', wheels: 4 }
const truck = new VehicleFactory().createVehicle("truck") // Truck { turnOn: [Function: turnOn], name: 'Truck', wheels: 8 }
const motorcycle = new VehicleFactory().createVehicle("motorcycle") // Motorcycle { turnOn: [Function: turnOn], name: 'Motorcycle', wheels: 2 }

/***************************************************************************************************/
// Builder: create objects in "steps". 
// => useful when create an object and apply to it only the "steps" we need, which is a more flexible approach.
/***************************************************************************************************/
class Bug {
    constructor() {
        this.name= "Buggy McFly",
        this.phrase= "Your debugger doesn't work with me!"
    }
}
class Butterfly {
    constructor() {
        this.name= "Martiniano Buggland",
        this.phrase ="Can't touch this! Na na na na..."
    }
}
// These functions take an object as parameter and add a method to them
class Fly {
    constructor() {}
    addability(obj) {
        obj.fly = ()=>{
            console.log(`Now ${obj.name} can fly`)
        }
    }
}
class Speak {
    constructor() {}
    addability(obj) {
        obj.speak = ()=>{
            console.log(`Now ${obj.name} walks the walk and talks the talk!`)
        }
    }
}
const bug = new Bug(), butterfly = new Butterfly();
const fly = new Fly(), speak = new Speak();
fly.addability(bug); speak.addability(butterfly);
// Finally we call the builder functions passing the objects as parameters
bug.fly();  butterfly.speak()

/***************************************************************************************************/
// Prototype: create an object using another object as a blueprint, inheriting its properties and methods.
// Prototypal inheritance: properties and methods can be shared between objects without depending on the same class.
// => similar to using "extends", Ex: bug1 extends enemy
/***************************************************************************************************/
class Enemy {
    constructor() {}
    attack() {
        return "Pim Pam Pum!";
    }
    flyAway() {
        return "Flyyyy like an eagle!";
    }
}
class Bugger extends Enemy {
    constructor() {
        super();
        this.name = "Buggy McFly"
        this.phrase="Your debugger doesn't work with me!"
    }
}
// // We declare our prototype object with two methods
// const enemy = {
//     attack: () => console.log("Pim Pam Pum!"),
//     flyAway: () => console.log("Flyyyy like an eagle!")
// }
// // We declare another object that will inherit from our prototype
// const bug1 = {
//     name: "Buggy McFly",
//     phrase: "Your debugger doesn't work with me!"
// }
// // With setPrototypeOf we set the prototype of our object
// Object.setPrototypeOf(bug1, enemy)
// // With getPrototypeOf we read the prototype and confirm the previous has worked
// console.log(Object.getPrototypeOf(bug1)) // { attack: [Function: attack], flyAway: [Function: flyAway] }

const bug1 = new Bugger();
console.log(bug1.phrase)        // Your debugger doesn't work with me!
console.log(bug1.attack())      // Pim Pam Pum!
console.log(bug1.flyAway())     // Flyyyy like an eagle!

