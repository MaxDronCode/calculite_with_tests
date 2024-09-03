import type { ToggleButtonProps } from './definitions.js'
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let domNumberButtons: NodeListOf<HTMLButtonElement>
let domOperatorsButtons: NodeListOf<HTMLButtonElement>
let domEqualButton: HTMLButtonElement
let domResetButton: HTMLButtonElement
let domNegativeButton: HTMLButtonElement
let domZeroButton: HTMLButtonElement
let domDecimalButton: HTMLButtonElement

function initCalculatorButtons () {
  gatherDomButtons()
  addEventListeners()
}

function gatherDomButtons () {
  domNumberButtons = document.querySelectorAll('.numbers button')
  domOperatorsButtons = document.querySelectorAll('.operators button')
  domEqualButton = document.getElementById('equal') as HTMLButtonElement
  domResetButton = document.getElementById('reset') as HTMLButtonElement
  domNegativeButton = document.getElementById('toggleNegative') as HTMLButtonElement
  domZeroButton = document.querySelector('button[value="0"]') as HTMLButtonElement
  domDecimalButton = document.querySelector('button[value="."]') as HTMLButtonElement
}

// The click events should generate a state instead of executing functions
function addEventListeners () {
  domNumberButtons.forEach(button => button.addEventListener('click', () => addDigitToCurrentOperand(button.value)))
  domOperatorsButtons.forEach(button => button.addEventListener('click', () => setOperator(button.value)))
  domZeroButton.addEventListener('click', addZeroToCurrentOperand)
  domDecimalButton.addEventListener('click', addDecimalSeparatorToCurrentOperand)
  domEqualButton.addEventListener('click', resolveOperation)
  domResetButton.addEventListener('click', resetCalculator)
  domNegativeButton.addEventListener('click', toggleNegative)
}

function toggleButtonState (button: HTMLButtonElement, shouldDisable: boolean) {
  button.disabled = shouldDisable
  button.classList.toggle('disabled-number-buttons', shouldDisable)
}

function toggleButtonGroupState (buttons: NodeListOf<HTMLButtonElement>, shouldDisable: boolean) {
  buttons.forEach(button => toggleButtonState(button, shouldDisable))
}
