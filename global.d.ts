declare function addDigitToCurrentOperand(value: string): void;
declare function setOperator(value: string): void;
declare function addZeroToCurrentOperand(): void;
declare function addDecimalSeparatorToCurrentOperand(): void;
declare function resolveOperation(): void;
declare function resetCalculator(): void;
declare function toggleNegative(): void;
declare function initCalculatorButtons(): void;
declare function toggleButtonGroupState(domNumberButtons: NodeListOf<HTMLButtonElement>, disableNumeric: boolean): void;
declare function toggleButtonState(button: HTMLButtonElement, disableNumeric: boolean): void;

declare let domNumberButtons: NodeListOf<HTMLButtonElement>;
declare let domOperatorsButtons: NodeListOf<HTMLButtonElement>;
declare let domEqualButton: HTMLButtonElement;
declare let domResetButton: HTMLButtonElement;
declare let domNegativeButton: HTMLButtonElement;
declare let domZeroButton: HTMLButtonElement;
declare let domDecimalButton: HTMLButtonElement;
