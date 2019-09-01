'use strict'

const keys = document.querySelector('.keys-container');
const displayRaw = document.querySelector('.raw');
const displayClean = document.querySelector('.clean');
const varArr = [];
const operators = ['add', 'subtract', 'multiply', 'divide'];
const opSymbols = ['\u002B', '\u002D', '\u00D7', '\u00F7'];
let keyPressed, lastKeyPressed;
let mathArr = ['0'];
let last = 0;


keys.addEventListener('click', e => {
	const target = e.target;
	const key = e.target.value;
	const ctrl = e.target.textContent;
	const action = e.target.dataset.action;
	displayCalc('', 'clean');

	if (!action) {
		if (mathArr[last] === '0' || lastKeyPressed === 'compute') {
			mathArr[last] = key;
		} else  if (opSymbols.includes(lastKeyPressed)) {
			mathArr.push(key);
		} else {
			mathArr[last] += key;
		}
		lastIt(key);
	} else {
		if (action === 'decimal') {
			if (opSymbols.includes(lastKeyPressed)) {
				mathArr.push('0');
				lastIt();
			} else if (lastKeyPressed === 'compute') {
				mathArr = ['0'];
			}
			mathArr[last].indexOf('.') !== -1 ? mathArr[last] = mathArr[last] : mathArr[last] += '.';
			lastIt('.');
		} else {
			last = mathArr.length - 1;
			if (operators.includes(action)) {
				if (lastKeyPressed === '.') {
					mathArr[last] += '0';
				}
				if (opSymbols.includes(mathArr[last])) {
					mathArr[last] = ctrl;
				} else {
					mathArr.push(ctrl);
				}
				lastIt(ctrl);
			} else if (action === 'clear') {
				clearScreen();
			} else if (action === 'delete') {
				backSpace();
			} else if (action === 'compute') {
				if (lastKeyPressed === '.') {
					mathArr[last] += '0';
				} else if (opSymbols.includes(mathArr[last])) {
					mathArr.pop();
				}
				displayCalc(compute(), 'clean');
			}
		}
	}
console.log(mathArr);
displayCalc(mathArr.reduce((acc,currValue) => acc+currValue, ''), 'raw');
console.log('last: '+last)
});

const compute = () => {
	let userEntry = mathArr.reduce((acc,currValue) => acc+currValue, '');
	userEntry = userEntry.replace('\u00D7', '*');
	userEntry = userEntry.replace('\u00F7', '/');

	let evaluation = eval(userEntry);
	mathArr = [`${evaluation}`];
	lastIt('compute');

	return `=${evaluation}`;
}

const clearScreen = _ => {
	displayRaw.textContent = 0;
	displayClean.textContent = '';
	mathArr = ['0'];
	lastIt('');
}

const backSpace = _ => {
	if (mathArr[last].length === 1) {
		mathArr.pop();
	} else {
		mathArr[last] = mathArr[last].slice(0, mathArr[last].length - 1);
	}
}

const writeMath = keyValue => {
	if (displayRaw.textContent === '0') {
		displayRaw.textContent = keyValue;
	} else {
		displayRaw.textContent += keyValue;
	}
}

const lastIt = ctrl => {
	lastKeyPressed = ctrl;
	last = mathArr.length - 1;
}

const displayCalc = (answer, div) => {
	if (div === 'clean') {
		displayClean.textContent = answer;
	} else {
		displayRaw.textContent = answer;
	}
}

