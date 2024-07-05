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
  resetCurrentOperandAfterResult()
  currentOperand += numberValue
  updateCalculatorStatus()
}

function setOperator (operatorValue) {
  operator = operatorValue
  console.log('Operator: ', operator)
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
  updateCalculatorStatus()
}

function addDecimalSeparatorToCurrentOperand () {
  resetCurrentOperandAfterOperator()
  currentOperand = currentOperand.replaceAll('.', '')
  if (currentOperand === '') {
    currentOperand = '0.'
  } else {
    currentOperand += '.'
  }
  updateCalculatorStatus()
}

function resolveOperation () {
  if (operator) {
    const result = calculateResult(firstOperand, Number(currentOperand)) // currentOperand is used as the 2nd operand
    currentOperand = formatResult(result) // we assign result to currentOperand to display the number
    calculatorStatus.setHasResult(true)
    operator = ''
  } else if (operator === '-' && !firstOperand) {
    currentOperand = '-' + currentOperand
  } else {
    currentOperand = String(Number(currentOperand))
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
  if (result == 'ERROR') {
    return result
  }

  result = Number(result).toFixed(7) // Fix decimals to 7 to avoid miscalculation language problems
  result = Number(result) // Remove trailing zeros
  return String(result).length > MAX_DISPLAY_DIGIT_LENGTH ? result.toExponential(2) : result
}

function resetCurrentOperandAfterOperator () {
  if (calculatorStatus.pendingResetCurrentOperand) {
    calculatorStatus.setPendingResetCurrentOperand(false)
    currentOperand = ''
  }
}

function resetCurrentOperandAfterResult () {
  if (calculatorStatus.hasResult) {
    calculatorStatus.setHasResult(false)
    currentOperand = ''
  }
}

function updateCalculatorStatus () {
  updateDisplay(currentOperand === '' ? '0' : currentOperand)
  const [shouldDisableNumeric, shouldDisableToggle, shouldDisableOperators, shouldDisableEqual, shouldDisableComma] = handleCalculatorState()
  if (calculatorStatus.hasResult && currentOperand == 'ERROR') {
    toggleButtonsState(shouldDisableNumeric, shouldDisableToggle, shouldDisableOperators, shouldDisableEqual, shouldDisableComma)
  } else {
    toggleButtonsState(shouldDisableNumeric, shouldDisableToggle, shouldDisableOperators, shouldDisableEqual, shouldDisableComma)
  }
}

function updateDisplay (value) {
  document.getElementById('calculatorDisplay').innerText = String(value).replace('.', ',')
  console.log('Display: ', value)
}

function handleCalculatorState () {
  const isOperandMaxLength = currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH
  const resultIsError = currentOperand == 'ERROR'
  if (resultIsError) {
    return [true, true, true, true, true]
  }
  const hasResult = calculatorStatus.hasResult
  const shouldDisableComma = calculatorStatus.pendingResetCurrentOperand || isOperandMaxLength || hasResult
  const shouldDisableNumeric = ((isOperandMaxLength) && !calculatorStatus.pendingResetCurrentOperand) || resultIsError
  const shouldDisableToggle = hasResult || (isOperandMaxLength && Number(currentOperand) > 0)
  const shouldDisableOperators = resultIsError
  const shouldDisableEqual = resultIsError
  return [shouldDisableNumeric, shouldDisableToggle, shouldDisableOperators, shouldDisableEqual, shouldDisableComma]
}

function toggleButtonsState (disableNumeric, disableNegative, disableOperators, disableEqual, disableComma) {
  toggleButtonGroupState(domNumberButtons, disableNumeric)
  toggleButtonGroupState(domOperatorsButtons, disableOperators)
  toggleButtonState(domEqualButton, disableEqual)
  // toggleButtonState(domDecimalButton, disableNumeric)
  toggleButtonState(domDecimalButton, disableComma)
  toggleButtonState(domNegativeButton, disableNegative)
}
