import './style.css'
import { operate, type Operand } from "./calculator"




const digitBtns = document.querySelectorAll(".digit-btn") as NodeListOf<HTMLButtonElement>
const operationBtns = document.querySelectorAll(".operation-btn") as NodeListOf<HTMLButtonElement>
const resultBtn = document.querySelector(".result-btn") as HTMLButtonElement
const resultElm = document.querySelector(".calculator__result") as HTMLSpanElement

const clearBtn = document.querySelector(".clear-btn") as HTMLButtonElement

clearBtn.addEventListener("click", handleClear)

let resultPressed = false

const currentOperationDisplay = document.querySelector(".current-operation") as HTMLSpanElement
resultBtn.addEventListener("click", () => {

  if (!prevOperation) return
  if (+secondOperand === 0) {
    // TODO: add UI element to show error
    alert("You can't divide by 0")
    handleClear()
    return
  }
  const result = operate(prevOperation as Operand, +firstOperand, +secondOperand).toString()
  resultElm.textContent = result
  firstOperand = result
  prevOperation = ""
  secondOperand = ""
  resultPressed = true
})

let firstOperand = ""
let secondOperand = ""
let prevOperation = ""

digitBtns.forEach(digitBtn => {
  digitBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    if (!prevOperation) {
      firstOperand += btn.textContent
      currentOperationDisplay.textContent += `${btn.textContent}`

    } else {
      secondOperand += btn.textContent
      currentOperationDisplay.textContent += `${btn.textContent}`

    }

    console.log(firstOperand, secondOperand, prevOperation)
  })
})





operationBtns.forEach(operationBtn => {
  operationBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    const currentOperation = btn.textContent ?? ""

    if (prevOperation && prevOperation === currentOperation) {
      return
    } else if (prevOperation && prevOperation !== currentOperation) {
      currentOperationDisplay.textContent = currentOperationDisplay.textContent?.replace(prevOperation, "") ?? ""

    }

    prevOperation = btn.textContent ?? ""

    if (firstOperand && secondOperand && prevOperation) {
      firstOperand = operate(prevOperation as Operand, +firstOperand, +secondOperand).toString()
      secondOperand = ""

    }

    if (resultPressed && resultElm.textContent !== "0") {
      currentOperationDisplay.textContent = resultElm.textContent
      resultPressed = false

    }


    currentOperationDisplay.textContent += ` ${prevOperation} `

  })
})




function handleClear() {
  firstOperand = ""
  secondOperand = ""
  prevOperation = ""
  resultElm.textContent = "0"
  currentOperationDisplay.textContent = ""
}