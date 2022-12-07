/*  Functions to be made
    Add
    Subtract
    multiply
    divide
    operate
 */

const add  = (a,b) => a + b;

const subtract = (a,b) => a - b;

const multiply = (a,b) => a * b;

const divide =  (a,b) => a / b;

const operate = (symbol, a, b) => {
    if (symbol === '+')
        add(a,b);
    if (symbol === '-')
        subtract(a,b);
    if (symbol === '*')
        multiply(a,b);
    if (symbol === '/')
        divide(a,b);
        
}