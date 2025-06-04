import './style.css'
import { operate, type Operand } from "./calculator"




const digitBtns = document.querySelectorAll(".digit-btn") as NodeListOf<HTMLButtonElement>
const operationBtns = document.querySelectorAll(".operation-btn") as NodeListOf<HTMLButtonElement>
const resultBtn = document.querySelector(".result-btn") as HTMLButtonElement
const resultElm = document.querySelector(".calculator__result") as HTMLSpanElement

const clearBtn = document.querySelector(".clear-btn") as HTMLButtonElement

clearBtn.addEventListener("click", handleClear)

let resultPressed = false

const currentOperation = document.querySelector(".current-operation") as HTMLSpanElement
resultBtn.addEventListener("click", () => {

  if (!operation) return
  const result = operate(operation as Operand, +firstOperand, +secondOperand).toString()
  resultElm.textContent = result
  firstOperand = result
  operation = ""
  secondOperand = ""
  resultPressed = true
})

let firstOperand = ""
let secondOperand = ""
let operation = ""

digitBtns.forEach(digitBtn => {
  digitBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    if (!operation) {
      firstOperand += btn.textContent
      currentOperation.textContent += `${btn.textContent}`

    } else {
      secondOperand += btn.textContent
      currentOperation.textContent += `${btn.textContent}`

    }

    console.log(firstOperand, secondOperand, operation)
  })
})





operationBtns.forEach(operationBtn => {
  operationBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    operation = btn.textContent ?? ""

    if (firstOperand && secondOperand && operation) {
      firstOperand = operate(operation as Operand, +firstOperand, +secondOperand).toString()
      secondOperand = ""

    }

    if (resultPressed && resultElm.textContent !== "0") {
      currentOperation.textContent = resultElm.textContent
      resultPressed = false

    }


    currentOperation.textContent += ` ${operation} `

  })
})




function handleClear() {
  firstOperand = ""
  secondOperand = ""
  operation = ""
  resultElm.textContent = "0"
  currentOperation.textContent = ""
}