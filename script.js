let Operand1 = ''
let Operand2 = ''
let currentOperation = null
let ResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)


numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || ResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
  }

  function resetScreen() {
    currentOperationScreen.textContent = ''
    ResetScreen = false
  }

  function clear() {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    Operand1 = ''
    Operand2 = ''
    currentOperation = null
  }

  function appendPoint() {
    if (ResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
      currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
  }

  function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
      .toString()
      .slice(0, -1)
  }

  function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    Operand1 = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${Operand1} ${currentOperation}`
    ResetScreen = true
  }

  function evaluate() {
    if (currentOperation === null || ResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    Operand2 = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(currentOperation, Operand1, Operand2)
    )
    lastOperationScreen.textContent = `${Operand1} ${currentOperation} ${Operand2} =`
    currentOperation = null
  }

function add(a, b) {
    return a + b
  }
  
  function subtract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '−':
        return substract(a, b)
      case '×':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
  }