import './style.scss'
import Calculator from './calculator'

const calculator: Calculator = new Calculator()

const calcButton: HTMLElement = document.getElementById('calc-btn')

calcButton.addEventListener('click', function(e) {
    const expression: string = (<HTMLInputElement>document.getElementById('expression-input')).value
    const resultValue: number = calculator.calcResult(expression)

    const resultElement: HTMLElement = document.getElementById('result') as HTMLElement
    resultElement.innerHTML = 'Результат: ' + resultValue.toString()
})


