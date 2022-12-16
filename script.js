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

    if (isNaN(arg1)) arg1 = 0;
    if (isNaN(arg2)) arg2 = 0;

    return [arg1, arg2];
};

//Reconstruct the equation array based on calculated value.
const returnSpliceEquation = (equation, newValue, index) => {
    //check for first value negative.
    if(index === 0 && equation[0] === '-'){
        equation.splice((index),2,newValue);
        return equation;
    }
    //If operation is the last element, ignore it 
    if(index === equation.length - 1){
        equation.splice((index),1)
        return equation;
    }
        
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
    if (equation.length < 3){
        return;
    }

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



const clearInput = (() => {hudEquation.innerHTML = '';});

const clearHud = ( () => {
    hudEquation.innerText = '';
    equationString.innerText = '';
    return;    
});

const divByZero = ( equation => {
    let equationTemp = [...equation];
    while(equationTemp.includes('/')){
        let check = equationTemp.findIndex(element => element === '/');
        if (check == -1){
            check = 0;
            return false;
        }
        if (equationTemp[check + 1] == 0){
            check = 0;
            return true;
        }
        
        equationTemp.splice(check,1);
    }
    return false;
});

const addToHud = ((newElement, operator) =>{
    console.log(newElement,operator)
    let currentHud = equationString.innerText;
    if (currentHud === '0'){
        currentHud = `${newElement}` + ` ${operator}`;
        equationString.innerText = currentHud;
        clearInput();
        return;
    }
    if (operator === '='){
        equationString.innerText = `${currentHud}` + ` ${newElement}`;
        let userEquation = equationString.innerText.split(' ');
        let divisionByZero = divByZero(userEquation);
        
        if(divisionByZero){
            divisionByZero = false;
            clearInput();
            return 'Nice try... Maybe next time';
        }

        let answer = operateCalculatorInput(userEquation).toFixed(6);
        clearInput();
        return answer;
    }

    equationString.innerText = `${currentHud}` + ` ${newElement}` + ` ${operator}`;
    clearInput();
    return;
});

numberListener.forEach(button => {

    button.addEventListener('click', e => {
        if(equationString.innerText === 'Nice try... Maybe next time'){
            clearHud();
        }

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
            equationString.innerText = addToHud(hudEquation.innerText, e.target.innerText);
            return;
        }

        addToHud(hudEquation.innerHTML, e.target.innerHTML)
    });
});