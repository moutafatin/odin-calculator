

type Operand = "+" | "-" | "*" | "/"

export function add(firstOperand: number, secondOperand: number) {
    return firstOperand + secondOperand
}


export function subtract(firstOperand: number, secondOperand: number) {
    return firstOperand - secondOperand
}


export function multiply(firstOperand: number, secondOperand: number) {
    return firstOperand * secondOperand
}


export function divide(firstOperand: number, secondOperand: number) {
    return firstOperand / secondOperand
}


const operations: {
    [key in Operand]: (operand1: number, operand2: number) => number
} = {
    '+': add,
    "-": subtract,
    "*": multiply,
    "/": divide
}




export function operate(operand: Operand, firstOperand: number, secondOperand: number) {
    return operations[operand](firstOperand, secondOperand)
}