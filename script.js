/*  Functions to be made
    Refactor so that operation is smoother.
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

const numberListener = document.querySelectorAll('.numberPad');
const functionListener = document.querySelectorAll('.funct');
const hudEquation = document.querySelector('.display');
const equationString = document.querySelector('.result');

const clearHud = ( () => {
    hudEquation.innerText = '';
    equationString.innerText = '';
    return;    
});

const addToHud = ((newElement, operator) =>{
    console.log(newElement,operator)
    let currentHud = equationString.innerHTML;
    if (currentHud === '0'){
        currentHud = `${newElement}` + ` ${operator}`;
        equationString.innerHTML = currentHud;
        hudEquation.innerHTML = '';
        return;
    }
    if (operator === '='){
        equationString.innerText = `${currentHud}` + ` ${newElement}`;
        let userEquation = equationString.innerHTML.split(' ');
        console.log(userEquation);
        let answer = operateCalculatorInput(userEquation);
        return answer;
    }

    equationString.innerText = `${currentHud}` + ` ${newElement}` + ` ${operator}`;
    hudEquation.innerHTML = '';
    return;
});

numberListener.forEach(button => {

    button.addEventListener('click', e => {
        console.log(e);
        console.log(e.target.innerText);
        if (hudEquation.innerText.includes('.') && e.target.innerText === '.'){
            return;
        }

        hudEquation.innerText = `${hudEquation.innerHTML}` + `${e.target.innerText}`;

        
    });

});

functionListener.forEach(button => {
    button.addEventListener('click', e => {
        console.log(e.target);
        if(e.target.innerText === 'AC'){
            clearHud();
            return;
        }
        if(e.target.innerText === 'del'){
            let temp = hudEquation.innerText.slice(0,-1);
            hudEquation.innerText = temp;
            return;
        }
        if(e.target.innerText === '='){
            addToHud(hudEquation.innerText, e.target.innerText);
            
            return;
        }

        addToHud(hudEquation.innerHTML, e.target.innerHTML)
        
        
        
        
    });
});