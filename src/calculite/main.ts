/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', initCalculator)

const MAX_DISPLAY_DIGIT_LENGTH = 9

let calculatorStatus: CalculatorStatus
let firstOperand: number = 0
let currentOperand: (string | number | undefined) = '' // we build the operands as strings to avoid the loss of trailing zeros when using a number
let operator: string = ''

function initCalculator () : void {
  calculatorStatus = new CalculatorStatus()
  initCalculatorButtons()
  updateDisplay(0)
}

function addDigitToCurrentOperand (numberValue: string) : void {
  resetCurrentOperandAfterOperator()
  currentOperand += numberValue
  updateCalculatorStatus()
}

function setOperator (operatorValue: string) : void {
  operator = operatorValue
  firstOperand = Number(currentOperand)
  calculatorStatus.setPendingResetCurrentOperand(true)
  calculatorStatus.setHasResult(false)
  updateCalculatorStatus()
}

function addZeroToCurrentOperand () : void {
  resetCurrentOperandAfterOperator()
  if (typeof currentOperand === 'string'){
    if (currentOperand.includes('.') || currentOperand !== '') {
      currentOperand += '0'
    }
  }
  console.log('Curent Operand: ', currentOperand)
  updateCalculatorStatus()
}

function addDecimalSeparatorToCurrentOperand () : void {
  resetCurrentOperandAfterOperator()
  if (typeof currentOperand === 'string') {
    currentOperand = currentOperand.replace('.', '')
  }
  currentOperand += currentOperand === '' ? '0.' : '.'
  updateCalculatorStatus()
}

function resolveOperation () : void {
  if (operator) {
    const result = calculateResult(firstOperand, Number(currentOperand)) // currentOperand is used as the 2nd operand
    currentOperand = formatResult(result) // we assign result to currentOperand to display the number
    calculatorStatus.setHasResult(true)
    operator = ''
  } else {
    resetCalculator()
  }
  updateCalculatorStatus()
}

function resetCalculator () : void {
  currentOperand = ''
  operator = ''
  calculatorStatus.reset()
  updateCalculatorStatus()
}

function toggleNegative () : void {
  if (currentOperand !== '' && currentOperand !== '0' && typeof currentOperand === 'string') {
    currentOperand = currentOperand?.startsWith('-') ? currentOperand?.replace('-', '') : '-' + currentOperand
  }
  updateCalculatorStatus()
}

function calculateResult (firstOperand: number, secondOperand: number) {
  console.log(firstOperand, secondOperand, operator)
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return secondOperand === 0 ? 'error' : firstOperand / secondOperand
    default:
      return 'error'
  }
}

function formatResult (result: (number | string)) {
  if (typeof result === 'string') return result
  else if (String(result).length > MAX_DISPLAY_DIGIT_LENGTH) return result.toExponential(2)
}

function resetCurrentOperandAfterOperator () {
  if (calculatorStatus.pendingResetCurrentOperand) {
    calculatorStatus.setPendingResetCurrentOperand(false)
    currentOperand = ''
  }
}

function updateCalculatorStatus () {
  updateDisplay(currentOperand === '' ? '0' : currentOperand)
  const [shouldDisableNumeric, shouldDisableToggle] = handleCalculatorState()
  toggleButtonsState(shouldDisableNumeric, shouldDisableToggle)
}

function updateDisplay(value: string | undefined | number) {
  if (value !== null && value !== undefined) {
    const displayElement = document.getElementById('calculatorDisplay') as HTMLInputElement | null;
    if (displayElement) {
      displayElement.value = String(value).replace('.', ',');
    }
  }
}

function handleCalculatorState () {
  let isOperandMaxLength: boolean = false;
  if (typeof currentOperand === 'string'){
    isOperandMaxLength = currentOperand.length >= MAX_DISPLAY_DIGIT_LENGTH
  }
  const hasResult: boolean = calculatorStatus.hasResult
  const shouldDisableNumeric = (isOperandMaxLength || hasResult) && !calculatorStatus.pendingResetCurrentOperand
  const shouldDisableToggle = hasResult || (isOperandMaxLength && Number(currentOperand) > 0)
  return [shouldDisableNumeric, shouldDisableToggle]
}

function toggleButtonsState (disableNumeric: boolean, disableToggle: boolean) {
  toggleButtonGroupState(domNumberButtons, disableNumeric)
  toggleButtonState(domDecimalButton, disableNumeric)
  toggleButtonState(domZeroButton, disableNumeric)
  toggleButtonState(domNegativeButton, disableToggle)
}
