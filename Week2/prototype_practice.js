
function Circle(radius) {
    this.radius = radius;
    this.getArea = function() {
        return Math.PI * this.radius ** 2;
    }
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

// radius 프로퍼티 값은 일반적으로 인스턴스마다 다르지만(같은 상태를 갖는 경우는 프로퍼티 값이 같다), getArea 메서드는 모든 인스턴스가 동일한 메서드를 사용한다.
// 이 경우 Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는 getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유된다. 이는 메모리를 불필요하게 낭비한다.

console.log(circle1.getArea() === circle2.getArea());

// 상속을 통해 불필요한 중복을 제거한다.

function Circle2(radius) {
    this.radius = radius;
}

// prototype은 Circle 생성사 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle2.prototype.getArea = function() {
        return Math.PI * this.radius ** 2;
}

// 모든 인스턴스는 부모 객체 역할을 하는 프로토타입 Circle.prototype으로부터 메서드를 상속받는다.
const circle3 = new Circle2(1);
const circle4 = new Circle2(2);

console.log(circle3.getArea() === circle4.getArea());