import './style.css'
import { operate, type Operand } from "./calculator"


type Token = { type: 'number', value: number } | { type: 'operator', value: string }

let runningOperation: Token[] = []
let justEvaluated = false



const digitBtns = document.querySelectorAll(".digit-btn") as NodeListOf<HTMLButtonElement>
const operationBtns = document.querySelectorAll(".operation-btn") as NodeListOf<HTMLButtonElement>
const resultBtn = document.querySelector(".result-btn") as HTMLButtonElement
const resultElm = document.querySelector(".calculator__result") as HTMLSpanElement

const clearBtn = document.querySelector(".clear-btn") as HTMLButtonElement
const backspaceBtn = document.querySelector(".backspace-btn") as HTMLButtonElement

clearBtn.addEventListener("click", handleClear)
backspaceBtn.addEventListener("click", handleBackspace)


function handleClear() {
  runningOperation = []
  buffer = ""
  resultElm.textContent = "0"
  justEvaluated = false
  updateCurrentOperationDisplay()
}

function handleBackspace() {
  if (justEvaluated) return

  if (runningOperation.length === 2 && !buffer) {
    runningOperation.pop()
    currentOperationDisplay.textContent = getCalculationText() + buffer
    return
  }

  buffer = buffer.slice(0, -1)

  currentOperationDisplay.textContent = getCalculationText() + buffer

}

const currentOperationDisplay = document.querySelector(".current-operation") as HTMLSpanElement
resultBtn.addEventListener("click", () => {
  if (buffer) {
    runningOperation.push({ type: "number", value: +buffer })
    buffer = ""

  }

  if (runningOperation.length === 3) {
    resultElm.textContent = evaluate(runningOperation).toString()
    updateCurrentOperationDisplay()
    runningOperation = [{ type: 'number', value: evaluate(runningOperation) }]

    justEvaluated = true
  }


})



let buffer = ""

digitBtns.forEach(digitBtn => {
  digitBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement
    buffer += btn.textContent


    currentOperationDisplay.textContent = getCalculationText() + buffer

  })
})


function getCalculationText() {
  let text = ""

  runningOperation.forEach(opr => {
    text += `${opr.value} `
  })
  return text
}




function updateCurrentOperationDisplay() {
  currentOperationDisplay.textContent = getCalculationText()

}





operationBtns.forEach(operationBtn => {
  operationBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    if (!buffer && runningOperation.length === 0) return

    if (justEvaluated) {
      justEvaluated = false
      runningOperation.push({ type: 'operator', value: btn.textContent! })
      updateCurrentOperationDisplay()
      return
    }

    if (buffer) {
      runningOperation.push({ type: "number", value: +buffer })
      buffer = ""

      if (runningOperation.length === 3) {
        runningOperation = [{ type: 'number', value: evaluate(runningOperation) }]
      }

      runningOperation.push({ type: 'operator', value: btn.textContent! })
      updateCurrentOperationDisplay()
      return
    }


    const last = runningOperation[runningOperation.length - 1]
    if (last?.type === 'operator') {
      runningOperation.pop()
    }
    runningOperation.push({ type: 'operator', value: btn.textContent! })

    console.log(runningOperation)
    updateCurrentOperationDisplay()


  })
})


function evaluate(calculation: Token[]) {
  const [a, op, b] = calculation

  if (a.type !== 'number' || op.type !== 'operator' || b.type !== 'number') {
    alert("SOMETHING WRONG HERE")
    return 0
  }

  return operate(op.value as Operand, a.value, b.value)
}



