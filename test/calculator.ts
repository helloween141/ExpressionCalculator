import { expect } from 'chai';
import Calculator from '../calculator'

const calculator = new Calculator();

describe('Calculator tests', () => {
    it('(3+2)*2 should be 10', () => {
        const result = calculator.calcResult('(3+2)*2')
        expect(result).to.equal(10)
    })

    it('100/50+10*2 should be 22', () => {
        const result = calculator.calcResult('100/50+10*2')
        expect(result).to.equal(22)
    })

    it('2/4+1 should be 14', () => {
        const result = calculator.calcResult('2/4+1')
        expect(result).to.equal(1.5)
    })

    it('1+1-1 should be 1', () => {
        const result = calculator.calcResult('1+1-1')
        expect(result).to.equal(1)
    })

    it('0*0+10*0 should be 0', () => {
        const result = calculator.calcResult('0*0+10*0')
        expect(result).to.equal(0)
    })
});



