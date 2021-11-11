
class calculator {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add() {
        let result = this.a + this.b;
        console.log(result)
    }

    multiply() {
        let result = this.a * this.b;
        console.log(result)
    }
}


let calculator1 = new calculator(2, 3)

calculator1.add()
calculator1.multiply()