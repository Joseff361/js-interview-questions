/*
  Functions are values. They can be assigned, copied or declared
  in any place of the code. If the function is declared as a 
  separate statement in the main code flow, that's called a 
  “Function Declaration”. If the function is created as a part of
  an expression, it's called a “Function Expression”.
*/

// Funcion declaration
function triangle(num) {} // Params
triangle(10); // Arguments

// Function expression
const square = function (num) {
  return num * num;
};

/*
  First-Class Function: A programming language is said to have 
  First-class functions if functions in that language are treated
  like other variables. So the functions can be assigned to any
  other variable or passed as an argument or can be returned by
  another function.
*/
function displaySquare(fn) {
  console.log('Square is: ' + fn(5));
}

displaySquare(square);

/*
  What is an IIFE? An IIFE (Immediately Invoked Function Expression)
  is a function that runs the moment it is invoked or called in the 
  JavaScript event loop. Having a function that behaves that way can
  be useful in certain situations. IIFEs prevent pollution of the
  global JS scope.
*/
(function multiply(num) {
  return num * 10;
})();

/*
  The scope is the current context of execution in which values and 
  expressions are "visible" or can be referenced.If a variable or 
  expression is not in the current scope, it will not be available
  for use. Scopes can also be layered in a hierarchy, so that child
  scopes have access to parent scopes, but not vice versa.
*/

/*
  Function Scope
  Outup => 0, 1, 2, 3, 4 ... 5, 5, 5, 5, 5
  "var" does not have block scope
 */
function test() {
  for (var i = 0; i < 5; i++) {
    console.log(i);
    setTimeout(() => {
      console.log(i);
    }, [0]);
  }
}

/*
  Hoisting is JavaScript's default behavior of moving declarations to the top.
  https://www.w3schools.com/js/js_hoisting.asp
*/
printName();

function printName() {
  console.log('Ella Purnell');
}

// Interview Question. Output => undefined
var x = 21;

var fun = function () {
  console.log(x);
  var x = 20;
};

/*
  Rest Operator must be last formal parameter!
*/
// Rest Operator
function display(first, ...nums) {
  console.log(first, nums); // Output => 10, [5, 6]
}

var arr = [5, 6];
display(10, ...arr); // Spread Operator

/*
  Callback functionCallback function
  A callback function is a function passed into another function as an argument, 
  which is then invoked inside the outer function to complete some kind of routine
  or action.A callback function is a function passed into another function as an 
  argument, which is then invoked inside the outer function to complete some kind 
  of routine or action.
*/
const theCoolestFunction = () => null;
document.addEventListener('click', theCoolestFunction);

// Arrow functions can not use "this" and "argument" keywords, normal functions can
// In arrow functions, "this" points to the global scope, not the following scope

/*
  A closure is the combination of a function bundled together (enclosed) with references
  to its surrounding state (the lexical environment). In other words, a closure gives
  you access to an outer function's scope from an inner function. In JavaScript,
  closures are created every time a function is created, at function creation time.
*/
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() {
    // displayName() is the inner function, that forms the closure
    console.log(name); // use variable declared in the parent function
  }
  displayName();
}
init();

/*
  Closure scope chain
  Every closure has three scopes:
  - Local scope (Own scope)
  - Enclosing scope (can be block, function, or module scope)
  - Global scope
*/
// global scope
const e = 10;
function sum(a) {
  return function (b) {
    return function (c) {
      // outer functions scope
      return function (d) {
        // local scope
        return a + b + c + d + e;
      };
    };
  };
}

console.log(sum(1)(2)(3)(4)); // 20

// Closure Test Case
function createBase(base) {
  return function (num) {
    return base + num;
  };
}

var addSix = createBase(6);
addSix(10); // Returns 16
addSix(15); // Returns 21

// Block scope => 'i' variable is used as a local scope in the inner function
for (var i = 0; i < 3; i++) {
  function inner() {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }

  inner(i);
}

// Private counter with closure
function counter() {
  var _counter = 0;

  function add(increment = 1) {
    _counter += increment;
  }

  function printCounterValue() {
    console.log(`Counter: ${_counter}`);
  }

  return { add, printCounterValue };
}

const myCounter = counter();
myCounter.add(5);
myCounter.add(10);
myCounter.printCounterValue();

/*
  The module pattern is a design pattern used for improving the maintainability and
  reusability of the code by creating public and private access levels. Sometimes
  called encapsulation, it protects the value inside a module from being accessed
  from other scopes.

  The module pattern keeps the privacy of the state and organizes using closures. It
  protects the pieces from the global scope, avoiding possible errors and conflicts.

  The module pattern is quite similar to an IIFE (immediately invoked functional 
  expression), but a module always returns an object instead of a function.
*/
var HTMLChanger = (function () {
  var contents = 'contents';

  var changeHTML = function () {
    var element = document.getElementById('attribute-to-change');
    element.innerHTML = contents;
  };

  return {
    callChangeHTML: function () {
      changeHTML();
      console.log(contents);
    },
  };
})();

HTMLChanger.callChangeHTML(); // Outputs: 'contents'
console.log(HTMLChanger.contents); // undefined

// Run once generic function
function once(func, context) {
  let ran;

  return function () {
    if (func) {
      /*
        Apply executes the function
        In this case, ran value is undefined, but the console.log function was executed
      */
      ran = func.apply(context || this, arguments);
      func = null;
    }

    // Returns undefined
    return ran;
  };
}

const hello = once((a, b) => console.log('Hello!', a, b));

// Returns 'Hello! 1 2'
hello(1, 2);

/* 
  Returns nothing. The if condition won't be executed, so the console log wont be executed.
  hello returns undefined, but the method is not printed
*/
hello(1, 2);

// Implement Caching/Memoize Function
function memoize(fn, context) {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }

    return res[argsCache];
  };
}

const clumsySquare = (num1, num2) => {
  for (let i = 1; i <= 100000000; i++);
  return num1 * num2;
};

console.time('First call');
console.log(clumsySquare(9467, 7649));
console.timeEnd('First call');

console.time('Second call');
console.log(clumsySquare(9467, 7649));
console.timeEnd('Second call');

const cleverSquare = memoize(clumsySquare);
console.time('First call');
console.log(cleverSquare(9467, 7649));
console.timeEnd('First call');

console.time('Second call');
console.log(cleverSquare(9467, 7649));
console.timeEnd('Second call');

/*
  Currying in JavaScript is a process that allows you to transform a
  function with multiple arguments into a sequence of nesting functions.
*/
function add(a) {
  return b => {
    return c => {
      return a + b + c;
    };
  };
}

console.log('add:', add(1)(2)(3));

const Calculation = {
  sum: (a, b) => a + b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  substract: (a, b) => a - b,
};

function evaluate(a) {
  return b => {
    return c => {
      return Calculation[a](b, c) || Calculation.sum(b, c);
    };
  };
}

console.log('sum', evaluate('sum')(4)(6));
console.log('multiply', evaluate('multiply')(4)(6));
console.log('divide', evaluate('divide')(4)(6));
console.log('substract', evaluate('substract')(4)(6));

// Infinite Currying => infiniteSum(1)(2)(3)...()
function infiniteSum(a) {
  return b => {
    return !!b ? infiniteSum(a + b) : a;
  };
}

console.log('infiniteSum', infiniteSum(5)(2)(4)(8)());

/*
  Definitions
  Application: 
    The process of applying a function to its arguments in order to
    produce a return value.

  Partial Application: 
    The process of applying a function to some of its arguments. 
    The partially applied function gets returned for later use. In
    other words, a function that takes a function with multiple
    parameters and returns a function with fewer parameters. Partial
    application fixes (partially applies the function to) one or
    more arguments inside the returned function, and the returned
    function takes the remaining parameters as arguments in order
    to complete the function application.

  Curry: 
    A function that takes a function with multiple parameters as
    input and returns a function with exactly one parameter.
*/

// Currying use case: Manipulating DOM
function updateElementText(id) {
  return function (content) {
    document.querySelector('#' + id).textContent = content;
  };
}

const updateHeader = updateElementText('heading');
updateHeader('DOM');
updateHeader('cyberia!');

// Final Question: curry() implementation

function anonymus(a, b, c, d) {
  return a + b + c + d;
}

// return 4 (4 arguments)
console.log('anonymus length', anonymus.length);

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...nextArg) => {
        return curried(...args, ...nextArg);
      };
    }
  };
}

const curriedAnonymus = curry(anonymus);
console.log('curry', curriedAnonymus(1)(2)(3)(4));
