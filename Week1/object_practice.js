let roles = {
    'red' : 'apple',
    'yellow' : 'banana'
}

console.log(roles.red)


for(let name in roles){
    console.log('object =>', name, 'value =>', roles[name]);
}

console.log(this)

function foo(a) {
    this.a = a;
    this.b = 20;
}

var bar = new foo(2);
console.log(bar.a)
console.log(bar.b)