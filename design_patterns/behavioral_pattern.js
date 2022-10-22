/***************************************************************************************************/
/* reference: https://www.joezimjs.com/javascript/javascript-design-patterns-chain-of-responsibility/
/* 
/* Behavioral Pattern - Command, Chain of Responsibility, Iterator, Observer
/* => control communication and the assignment of responsibilities between different objects.
/***************************************************************************************************/

/***************************************************************************************************/
// Command: callback functions
// 4 parts: command object, client, invoker, receiver
// => its purpose is to decouple senders and receivers 
/***************************************************************************************************/

/***************************************************************************************************/
// Chain of Respoinsibility: passes requests along a chain of handlers.
// => Each handler decides either to process the request or to pass it to the next handler in the chain.
// => middlewares or ETL
/***************************************************************************************************/
class MoneyStack {
    constructor(billSize){
        this.billSize = billSize;
        this.next = null;
    }
    withdraw(amount) {
        let numOfBills = Math.floor(amount / this.billSize);

        if (numOfBills > 0) {
            this._ejectMoney(numOfBills);                   // Eject the bills
            amount = amount - (this.billSize * numOfBills); // Shrink the amount by how much money we ejected
        }
        // If there is any money left to withdraw and if we have
        // another stack in the line, pass the request on
        amount > 0 && this.next && this.next.withdraw(amount);
    }
    // set the stack that comes next in the chain
    setNextStack (stack) {
        this.next = stack;
    }
    _ejectMoney(numOfBills) {
        console.log(numOfBills + " $" + this.billSize
            + " bill(s) has/have been spit out");
    }
}
class ATM {
    constructor() {
        // Create the stacks of money
        this.stack100 = new MoneyStack(100),
        this.stack50 = new MoneyStack(50),
        this.stack20 = new MoneyStack(20),
        this.stack10 = new MoneyStack(10),
        this.stack5 = new MoneyStack(5),
        this.stack1 = new MoneyStack(1);

        // Set the hierarchy for the stacks
        this.stack100.setNextStack(this.stack50);
        this.stack50.setNextStack(this.stack20);
        this.stack20.setNextStack(this.stack10);
        this.stack10.setNextStack(this.stack5);
        this.stack5.setNextStack(this.stack1);

        // Set the top stack as a property
        this.moneyStacks = this.stack100;
    }
    withdraw(amount) {
        this.moneyStacks.withdraw(amount);
    }
}
const atm = new ATM();
atm.withdraw(186);
atm.withdraw(72);

/***************************************************************************************************/
// Iterator: used to traverse elements of a collection - 
/***************************************************************************************************/

/***************************************************************************************************/
// Observer: a subscription mechanism to notify multiple objects about any events 
// that happen to the object they’re observing.
/***************************************************************************************************/

//////////////////////////////////////////////////////////////////
// Example #1: push method
//////////////////////////////////////////////////////////////////
let Observer = function (data) {
    console.log(data);
}
class Observable {
    constructor() {
        this.subscribers = [];
    }
    subscribe(cb) {
        // TO DO: check to see if the callback already exists 
        this.subscribers.push(cb);
    }
    unsubscribe(cb) {
        var i = 0, len = this.subscribers.length;
        for (; i < len; i++) {                  // search for cb => remove cb once it is found
            if (this.subscribers[i] === cb) {
                this.subscribers.splice(i, 1);
                return;                         // break out of loop once cb is found
            }
        }
    }
    publish(data) {
        var i = 0, len = this.subscribers.length;
        for (; i < len; i++) {
            this.subscribers[i](data);           // call every cb function
        }
    }
}
const observable = new Observable();
observable.subscribe(Observer);
observable.publish('Push Method: We published!');

//////////////////////////////////////////////////////////////////
// Example #1: pull method
// => Use Timer to check on the status of the observable(s) it is subscribed to
//////////////////////////////////////////////////////////////////
class Observable_Pull {
    constructor() {
        this.status = "constructed";
    }
    getStatus() {
        return this.status;
    }
}
class Observer_Pull {
    constructor() {
        this.subscriptions = [];
    }
    subscribeTo(observable) {
        this.subscriptions.push(observable);
    }
    unsubscribeFrom(observable) {
        var i = 0, len = this.subscriptions.length;
        for (; i < len; i++) {                              // search for observable & remove it if found
            if (this.subscriptions[i] === observable) {
                this.subscriptions.splice(i, 1);
                return;                                     // break the loop when found
            }
        }
    }
    doSomethingIfOk(){
        var i = 0, len = this.subscriptions.length;
        // Iterate through the subscriptions and determine
        // whether the status has changed to ok on each of them,
        // and do something for each subscription that has
        for (; i < len; i++) {
            if (this.subscriptions[i].getStatus() === "ok") {
                // Do something because the status of the
                // observable is what we want it to be
                console.log('Pull Method on a Timer: Check Status of Observables')
            }
        }
    }
}
const observer_pull = new Observer_Pull(), observable_pull = new Observable_Pull();
observer_pull.subscribeTo(observable_pull);
// Use Timer here
observer_pull.doSomethingIfOk();                                 // Nothing will happen because the status hasn't changed
observable_pull.status = "ok";                                   // // Change the status to "ok" so now something will happen
observer_pull.doSomethingIfOk();


