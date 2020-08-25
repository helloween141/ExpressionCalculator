class Calculator {
    private operators: Array<string> = [
        '+', '-', '*', '/', '^'
    ]

    /*
        Получить результат
    */
    public calcResult(expression: string): number {
        const postfixOutput: string = this.getPostfixOutput(this.prepareExpression(expression))
        if (postfixOutput) {
            return this.computePostfixExpression(postfixOutput)
        } 

        return 0
    }

    /*
        Расчет результата по постфиксному выражению
    */
    private computePostfixExpression(postfixExpression: string): number {
        let stack: Array<number> = []
        let pieces: Array<string> = postfixExpression.split(' ')

        for (const symb of pieces) {
            if (this.isDigit(symb)) {
                stack.push(+symb)           
            } else if (this.isSign(symb)) {
                const firstDigit: number = stack.pop()
                const secondDigit: number = stack.pop()
                let result: number = 0

                switch (symb) {
                    case '+': result = secondDigit + firstDigit; 
                    break
                    case '-': result = secondDigit - firstDigit;
                    break
                    case '*': result = secondDigit * firstDigit;
                    break
                    case '/': result = secondDigit / firstDigit; 
                    break
                    case '^': result = Math.pow(secondDigit, firstDigit); 
                    break
                }
                stack.push(result)
            }
        }

        return stack.reduce((acc, currentValue) => acc + currentValue)
    }

    /*
        Получить постфиксную запись выражения
        Алгоритм: Обратная польская нотация
    */
    private getPostfixOutput(expression: string): string {
        let stack: Array<string> = []
        let output: Array<string> = []
        
        let digitFlag: boolean = false
        for (const symb of expression) {
            if (this.isDigit(symb)) {
                if (!digitFlag) {
                    output.push(symb)
                    digitFlag = true
                } else {
                    output[output.length - 1] += symb
                } 
            } else {
                digitFlag = false
                if (symb === '(') {
                    stack.push(symb)
                } else if (symb === ')') {
                    while (stack[stack.length - 1] !== '(') {
                        output.push(stack.pop())
                    } 
                    stack.pop()
                }
                else if (this.isSign(symb)) {
                    if (stack.length > 0) {
                        while (this.getPriority(symb) <= this.getPriority(stack[stack.length - 1])) {
                            output.push(stack.pop())
                        } 
                    }
                    stack.push(symb)
                }
            }
        }
        const result: string = output.concat(stack.reverse()).join(' ')
        return result ?? ''
    }

    /*
        Получить приоритет оператора
    */
    private getPriority(symb: string): number {
        switch(symb) {
            case '(': return 0
            case ')': return 1
            case '+': return 2
            case '-': return 2
            case '*': return 3
            case '/': return 3
            case '^': return 4
        }
        return 0
    }

    /*
        Проверить символ на принадлежность к оператору
    */
    private isSign(symb: string): boolean {
        return this.operators.find(operator => operator === symb) ? true : false
    }

    /*
        Проверить символ на цифру
    */
    private isDigit(symb: string): boolean {
        return symb >= '0' && symb <= '9' 
    }

    /*
        Приготовить выражение
    */
    private prepareExpression(expression: string): string {
        return expression.replace(/ /g,'')
    }
}

export default Calculator