/*  Functions to be made
    Add
    Subtract
    multiply
    divide
    operate
 */


//Operation Object
const calcOperations = {
    '*': (arg1,arg2) => arg1 * arg2,
    '/': (arg1,arg2) => arg1 / arg2,
    '+': (arg1,arg2) => arg1 + arg2,
    '-': (arg1,arg2) => arg1 - arg2
};

//Grab index of arguments
const returnArgsIndex = (equation, operationIndex) => {
    let arg1 = Number(equation[operationIndex-1]),
        arg2 = Number(equation[operationIndex+1]);
    return [arg1, arg2];
};

//Reconstruct the equation array based on calculated value.
const returnSpliceEquation = (equation, newValue, index) => {
    equation.splice((index-1),3,newValue);
    return equation;
}

//Get arguments, calc arguments, and update equation array
const equationLogic = (equation, operationType, operationIndex) => {
    const getArgs = returnArgsIndex(equation, operationIndex);
    const newValue = calcOperations[operationType](getArgs[0],getArgs[1]);
    const newEquation = returnSpliceEquation(equation, newValue, operationIndex);
    return newEquation;
}

//Main Loop
const operateCalculatorInput = equation => {
    let operationIndex;

    Object.keys(calcOperations).forEach(operationType => {
        //Check if any operations are found in equation and perform steps
        while (equation.includes(operationType)) {
            operationIndex = equation.indexOf(operationType);
            equation = equationLogic(equation, operationType, operationIndex);
        }
    });
    return Number(equation);
}

const numPad = document.querySelectorAll('.numberPad');
const functPad = document.querySelectorAll('.funct');
const hudEquation = document.querySelector('.display');


numPad.forEach(button => {

    button.addEventListener('click', e => {
        console.log(e);
        console.log(e.target.innerText);
        if (hudEquation.innerText.includes('.') && e.target.innerText === '.'){
            return;
        }

        hudEquation.innerText = `${hudEquation.innerHTML}` + `${e.target.innerText}`;

        
    });

});

functPad.forEach(button => {
    button.addEventListener('click', e => {
        console.log(e.target);
        if(e.target.innerText === 'AC'){
            hudEquation.innerText = '';
            return;
        }
        if(e.target.innerText === 'del'){
            let temp = hudEquation.innerText.slice(0,-1);
            hudEquation.innerText = temp;
            return;
        }
    });
});