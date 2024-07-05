// eslint-disable-next-line no-unused-vars
class CalculatorStatus {
  constructor () {
    this._pendingResetCurrentOperand = false
    this._hasResult = false
    this._isError = false
  }

  get pendingResetCurrentOperand () {
    return this._pendingResetCurrentOperand
  }

  setPendingResetCurrentOperand (value) {
    this._pendingResetCurrentOperand = value
  }

  get hasResult () {
    return this._hasResult
  }

  setHasResult (value) {
    this._hasResult = value
  }

  get isError () {
    return this._isError
  }

  setIsError (value) {
    this._isError = value
  }

  reset () {
    this._pendingResetCurrentOperand = false
    this._hasResult = false
    this._isError = false
  }
}
