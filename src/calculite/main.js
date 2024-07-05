/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', initCalculator)

const MAX_DISPLAY_DIGIT_LENGTH = 9

let calculatorStatus
let firstOperand = 0
let currentOperand = '' // we build the operands as strings to avoid the loss of trailing zeros when using a number
let operator = ''

function initCalculator () {
  calculatorStatus = new CalculatorStatus()
  initCalculatorButtons()
  updateDisplay(0)
}

function addDigitToCurrentOperand (numberValue) {
  resetCurrentOperandAfterOperator()
  currentOperand += numberValue
  updateCalculatorStatus()
}

function setOperator (operatorValue) {
  operator = operatorValue
  firstOperand = Number(currentOperand)
  calculatorStatus.setPendingResetCurrentOperand(true)
  calculatorStatus.setHasResult(false)
  updateCalculatorStatus()
}

function addZeroToCurrentOperand () {
  resetCurrentOperandAfterOperator()
  if (currentOperand.includes('.') || currentOperand !== '') {
    currentOperand += '0'
  }
  console.log('Curent Operand: ', currentOperand)
  updateCalculatorStatus()
}

function addDecimalSeparatorToCurrentOperand () {
  resetCurrentOperandAfterOperator()
  currentOperand = currentOperand.replace('.', '')
  currentOperand += currentOperand === '' ? '0.' : '.'
  updateCalculatorStatus()
}

function resolveOperation () {
  if (operator) {
    const result = calculateResult(firstOperand, Number(currentOperand)) // currentOperand is used as the 2nd operand
    currentOperand = formatResult(result) // format the result
    calculatorStatus.setHasResult(true)
    operator = ''
  } else {
    if (currentOperand !== '') {
      Number(updateDisplay(currentOperand))
      calculatorStatus.setHasResult()
    } else {
      resetCalculator()
    }
  }
  updateCalculatorStatus()
}

function resetCalculator () {
  currentOperand = ''
  operator = ''
  calculatorStatus.reset()
  updateCalculatorStatus()
}

function toggleNegative () {
  if (currentOperand !== '' && currentOperand !== '0') {
    currentOperand = currentOperand.startsWith('-') ? currentOperand.replace('-', '') : '-' + currentOperand
  }
  updateCalculatorStatus()
}

function calculateResult (firstOperand, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return secondOperand === 0 ? 'ERROR' : firstOperand / secondOperand
    default:
      return 'ERROR'
  }
}
function formatResult (result) {
  if (result !== 'ERROR') {
    result = Number(result).toFixed(7)
    result = Number(result)
    return String(result).length > MAX_DISPLAY_DIGIT_LENGTH ? result.toExponential(2) : result
  } else {
    return 'ERROR'
  }
}

function resetCurrentOperandAfterOperator () {
  if (calculatorStatus.pendingResetCurrentOperand) {
    calculatorStatus.setPendingResetCurrentOperand(false)
    currentOperand = ''
  }
}

function updateCalculatorStatus () {
  updateDisplay(currentOperand === '' ? 0 : currentOperand)
  const [shouldDisableNumeric, shouldDisableToggle] = handleCalculatorState()
  toggleButtonsState(shouldDisableNumeric, shouldDisableToggle)
}

function updateDisplay (value) {
  document.getElementById('calculatorDisplay').innerText = String(value).replace('.', ',')
}

function handleCalculatorState () {
  const isOperandMaxLength = currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH
  const hasResult = calculatorStatus.hasResult
  const shouldDisableNumeric = (isOperandMaxLength || hasResult) && !calculatorStatus.pendingResetCurrentOperand
  const shouldDisableToggle = hasResult || (isOperandMaxLength && Number(currentOperand) > 0) || result === 'ERROR'
  return [shouldDisableNumeric, shouldDisableToggle]
}

function toggleButtonsState (disableNumeric, disableToggle) {
  toggleButtonGroupState(domNumberButtons, disableNumeric)
  toggleButtonState(domDecimalButton, disableNumeric)
  toggleButtonState(domZeroButton, disableNumeric)
  toggleButtonState(domNegativeButton, disableToggle)
}
