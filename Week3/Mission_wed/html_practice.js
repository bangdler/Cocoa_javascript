
console.log(1)
//input2번에서 focusout 될 때 input1번값과 비교를 한다.

function checkInputValue() {
    const input1 =document.querySelector('input[name = "first_name"]')
    const input2 =document.querySelector('input[name = "second_name"]')

    input2.addEventListener("focusout", (e) => {
        const input1Value = input1.value;
        const input2Value = e.target.value;
        const messageNode = document.querySelector(".message")
        if(input1Value === input2Value) {
            messageNode.innerHTML = '';
            return;
        }

        messageNode.classList.toggle("addmessage")
        messageNode.innerHTML = '<span>아이디가 동일하지 않습니다.</span>'

        debugger;
    })

}

checkInputValue()