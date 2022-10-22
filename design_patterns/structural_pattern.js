/***************************************************************************************************/
/* reference: https://www.joezimjs.com/javascript/javascript-design-patterns-chain-of-responsibility/
/* 
/* Structural Pattern - Adapter, Decorator, Facade, Proxy
/* => ways to assemble objects and classes into larger structures.
/***************************************************************************************************/

/***************************************************************************************************/
// Bridge: relationship between 2 Class Hierachies (Remote Control Interface -> Has A -> TV Interface)
// Power Remote extends Remote Control -> Sony TV extends TV
/***************************************************************************************************/
class RemoteControl {
    constructor(tv) {
        this.tv = tv;
    }
    on() {
        this.tv.on();
    };
    off() {
        this.tv.off();
    };
    setChannel(ch) {
        this.tv.tuneChannel(ch);
    };
}; 
/* Newer, Better Remote Control */

class PowerRemote extends RemoteControl {
    constructor(tv) {
        super();
        this.tv = tv;
        this.currChannel = 0;
    }
    setChannel(ch) {
        this.currChannel = ch;
        this.tv.tuneChannel(ch);
    };
    nextChannel() {
        this.setChannel(this.currChannel + 1);
    };
    prevChannel() {
        this.setChannel(this.currChannel - 1);
    };
}
//PowerRemote.prototype = new RemoteControl();
class TV {
    constructor() {}
    on() {}
    off() {}
    tuneChannel(ch) {}
}
/* Sony TV */
class SonyTV extends TV {
    on() {
        console.log('Sony TV is on');
    };
    off() {
        console.log('Sony TV is off');
    };
    tuneChannel(ch) {
        console.log('Sony TV tuned to channel ' + ch);
    };
}
/* Toshiba TV */
class ToshibaTV extends TV {
    on() {
        console.log('Welcome to Toshiba entertainment');
    };
    off() {
        console.log('Goodbye Toshiba user');
    };
    tuneChannel(ch) {
        console.log('Channel ' + ch + ' is set on your Toshiba television');
    };
}
const sony = new SonyTV(), 
      toshiba = new ToshibaTV(), 
      std_remote = new RemoteControl(sony),
      pwr_remote = new PowerRemote(toshiba);

    std_remote.on();            // prints "Sony TV is on"
    std_remote.setChannel(55);  // prints "Sony TV tuned to channel 55"
    std_remote.setChannel(20);  // prints "Sony TV tuned to channel 20"
    std_remote.off();           // prints "Sony TV is off"
    
    pwr_remote.on();            // prints "Welcome to Toshiba entertainment"
    pwr_remote.setChannel(55);  // prints "Channel 55 is set on your Toshiba television"
    pwr_remote.nextChannel();   // prints "Channel 56 is set on your Toshiba television"
    pwr_remote.prevChannel();   // prints "Channel 55 is set on your Toshiba television"
    pwr_remote.off();           // prints "Goodbye Toshiba user"

/***************************************************************************************************/
// Composite: Composites are _composed _of multiple parts to create one whole entity.
// => organizes objects into a tree structure => composite object has a method to get its children
// => two types: leaf and composite objects & its recursive => composite has children while leaf doesn't.
// => Ex: File Structure or Binary Tree => optimized to be primarily used to search through sortable data.
/***************************************************************************************************/
// 

/***************************************************************************************************/
// Adapter: allows two objects with incompatible interfaces to interact with each other.
/***************************************************************************************************/
class ToMillionsAdapter {
    constructor() {
        this.citiesHabitantsInMillions = [                // original array of cities
            { city: "London", habitants: 8.9 },
            { city: "Rome", habitants: 2.8 },
            { city: "New york", habitants: 8.8 },
            { city: "Paris", habitants: 2.1 },
        ];
    }
    addNewCity(ncity) {
        this.citiesHabitantsInMillions.push(ncity);
    }
    // adapter function converts habitants property to the same format of other cities
    convertToMillion(city) {
        city.habitants = parseFloat((city.habitants/1000000).toFixed(1));   
    }
    getMostHabitantsInMillions() {
        return Math.max(...this.citiesHabitantsInMillions.map(city => city.habitants))
    }
}
const tma = new ToMillionsAdapter();
const BuenosAires = {                                   // The new city we want to add
    city: "Buenos Aires",
    habitants: 3100000
}
tma.convertToMillion(BuenosAires);
tma.addNewCity(BuenosAires);
console.log('Adaptor: similar to Converter', tma.getMostHabitantsInMillions())          // 8.9

/***************************************************************************************************/
// Decorator: wrapper object for attaching new behaviors (Higher Order Component)
// => a way to add features to objects without subclassing or adding extra attributes.
// => we “decorate” (wrap) it with another object with the same interface that has the one feature we’re adding.
// => HOC: function returning another function with added behaviors
/***************************************************************************************************/
// Use Decorator Pattern to replace the following pattern
// var Car = function() {...};                      // Superclass
// var CarWithPowerLocks = function() {...};        // Subclasses with different features
// var CarWithPowerWindows = function() {...};
// var CarWithPowerLocksAndPowerWindows = function() {...};
// var CarWithAC = function() {...};
// var CarWithACAndPowerLocks = function() {...};
// var CarWithACAndPowerWindows = function() {...};
// var CarWithACAndPowerLocksAndPowerWindows = function() {...};
// ...
class Car {                                                    // Javascript: Car Interface
    constructor() {
        console.log('Assemble: build frame, add core parts');
    }
    start() {
        console.log('The engine starts with roar!');
    }
    drive() {
        console.log('Away we go!');
    }
    getPrice() {
        return 11000.00;
    }
}
// Wrapper Object wrapping around Car object
class CarDecorator extends Car {
    constructor(car) {
        super(car);
        this.car = car;
    }
    start(){
        this.car.start();
    }
    drive() {
        this.car.drive();
    }
    getPrice() {
        return this.car.getPrice();
    }
}
class PowerLocksDecorator extends CarDecorator {
    constructor(car) {
        super(car);                                 // calling a parent class' constructor            
        console.log('Assemble: add power locks');
    }
    drive() {
        this.car.drive();                           // 2 options: calling child object drive
        // CarDecorator.prototype.drive.call(this); // OR calling parent object drive
        console.log('The doors automatically lock');
    }
    
}
class PowerWindowDecorator extends CarDecorator  {
    constructor(car) {
        super(car);
        console.log('Assemble: add power windows');
    }
}
class ACDecorator extends CarDecorator  {
    constructor(car) {
        super(car);
        console.log('Assemble: add A/C unit');
    }
    start() {
        this.car.start();
        console.log('The cool air starts blowing.');
    }
}
let car = new Car();                      // log "Assemble: build frame, add core parts"
car = new PowerWindowDecorator(car);      // add power windows => log "Assemble: add power windows"
car = new PowerLocksDecorator(car);       // add some power locks and A/C => log "Assemble: add power locks"
car = new ACDecorator(car);               // log "Assemble: add A/C unit"
car.start();                              // log 'The engine starts with roar!' and 'The cool air starts blowing.'
car.drive();                              // log 'Away we go!' and 'The doors automatically lock'

//////////////////////////////////////////////////////////////////
// Example 2: Decorator Pattern
// HOC: function returning another function with added behaviors
// "add" function takes the function as a parameter for wrapping function where "print" is wrapped
//////////////////////////////////////////////////////////////////
class Decorator {
    constructor() {}
    decorated(fn) {
        return function(str) {
            fn(str + ' is Best')
        }
    }
}
const d = new Decorator();
function print(str) { console.log(str)}
console.log('Decorator of print ');  d.decorated(print)('GFG')

/***************************************************************************************************/
// Facade: any abstraction hidingg away complexity
// => provides a simplified interface to a library, a framework, or any other complex set of classes.
/***************************************************************************************************/
//
// Rather than doing repeated work as follows: 
// var foo = document.getElementById('foo');
//     foo.style.color = 'red';
//     foo.style.width = '150px';

// var bar = document.getElementById('bar');
//     bar.style.color = 'red';
//     bar.style.width = '150px';

// var baz = document.getElementById('baz');
//     baz.style.color = 'red';
//     baz.style.width = '150px';
// 
// Rewrite code as follows:
/* 
function setStyles(elements, styles) {
    for (var i=0, length = elements.length; i < length; i++) {
        var element = document.getElementById(elements[i]);

        for (var property in styles) {
            element.style[property] = styles[property];
        }
    }
}

//Now you can just write this:
setStyles(['foo', 'bar', 'baz'], {
    color: 'red',
    width: '150px'
});
*/

/***************************************************************************************************/
// Proxy: an object that has the same interface as another object and is used in place of that other object. 
// => useful when delaying instantiation of a large object, accessing a remote object, and access control.
// => (Virtual Proxy) put off that instantiation until we’re sure it’ll be used
/***************************************************************************************************/
/* var CarListProxy = function() {
    this.carList = null;                // Don't initialize the CarList yet.
};
CarListProxy.prototype = {
    // initialize the CarList only when needed.
    _init: function() {
        if (!this.carList) {
            this.carList = new CarList();
        }
    },
    getCar: function(...) {
        // every function makes this call to _init()
        this._init();
        return this.carList.getCar(...);
    },
    search: function(...) {
        this._init();
        return this.carList.search(...);
    },
    addCar: function(...) {
        this._init();
        return this.carList.addCar(...);
    }
}
*/
//////////////////////////////////////////////////////////////////
// (Remote) Proxy: Javascript middleware functions: execute before, in the middle, or after any request reaches our endpoints.
// => Ex: function that validates an authentication token - middleware will return the corresponding error response. 
// => With a valid token, the middleware calls next() function and the endpoint function will get executed next.
//////////////////////////////////////////////////////////////////
/* 
router.get('/:jobRecordId', authenticateToken, async (req, res) => {
try {
    const job = await JobRecord.findOne({_id: req.params.jobRecordId})
    res.status(200).send(job)

} catch (err) {
    res.status(500).json(err)
}
})
const jwt = require('jsonwebtoken')
module.exports = function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.status(401).send(JSON.stringify('No access token provided'))

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(JSON.stringify('Wrong token provided'))
    req.user = user
    next()
    })
}
*/

