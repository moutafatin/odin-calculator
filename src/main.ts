import './style.css'
import { operate, type Operand } from "./calculator"




const digitBtns = document.querySelectorAll(".digit-btn") as NodeListOf<HTMLButtonElement>
const operationBtns = document.querySelectorAll(".operation-btn") as NodeListOf<HTMLButtonElement>
const resultBtn = document.querySelector(".result-btn") as HTMLButtonElement
const resultElm = document.querySelector(".calculator__result") as HTMLSpanElement
resultBtn.addEventListener("click", () => {

  const result = operate(operation as Operand, +firstOperand, +secondOperand).toString()
  resultElm.textContent = result
  firstOperand = result
  operation = ""
  secondOperand = ""
})

let firstOperand = ""
let secondOperand = ""
let operation = ""

digitBtns.forEach(digitBtn => {
  digitBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    if (!operation) {
      firstOperand += btn.textContent

    } else {
      secondOperand += btn.textContent

    }

    console.log(firstOperand, secondOperand, operation)
  })
})



operationBtns.forEach(operationBtn => {
  operationBtn.addEventListener("click", (e) => {
    const btn = e.currentTarget as HTMLButtonElement

    operation = btn.textContent ?? ""

  })
})