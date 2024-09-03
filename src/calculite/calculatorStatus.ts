// eslint-disable-next-line no-unused-vars
class CalculatorStatus {
  private _pendingResetCurrentOperand: boolean
  private _hasResult: boolean

  constructor () {
    this._pendingResetCurrentOperand = false
    this._hasResult = false
  }

  get pendingResetCurrentOperand () : boolean {
    return this._pendingResetCurrentOperand
  }

  setPendingResetCurrentOperand (value: boolean) : void {
    this._pendingResetCurrentOperand = value
  }

  get hasResult () : boolean {
    return this._hasResult
  }

  setHasResult (value: boolean) : void {
    this._hasResult = value
  }

  reset () : void {
    this._pendingResetCurrentOperand = false
    this._hasResult = false
  }
}
