

const participant = ["leo", "kiki", "eden"]
const completion = ["eden", "kiki"]

const participant1 = ["mislav", "stanko", "mislav", "ana", "mislav"]
const completion1 = ["stanko", "mislav", "ana", "mislav"]

// 시간 초과됨...
function solution(participant, completion) {
    let answer = '';
    participant.forEach(function(name){
        if (completion.includes(name) === false) {
            answer = name;
            return;
        }
        else {
            let completionIndex = completion.indexOf(name)
            completion.splice(completionIndex, 1);
        }
    })
    return answer
}


function solution2(participant, completion) {
    let answer = '';
    let doubleCheck = {};
    participant.forEach(function(name){
        // 참가자 이름 중 완주자 명단에 없는 경우 이름을 바로 반환.
        if (completion.includes(name) === false) {
            answer = name;
            return;
        }
        // 동명이인인 경우를 대비해 처음 들어오는 사람을 체크해준다.
        if (!doubleCheck[name]) {
            doubleCheck[name] = 'exist';
        }
        // 동명이인 다시 등장할 경우 완주자 명단에서 index 를 구해 그 다음 index 부터 다시 index 를 찾고 없으면 answer.
        else {
            if (doubleCheck[name] === 'exist') {
                doubleCheck[name] = completion.indexOf(name);
            }
            doubleCheck[name] = completion.indexOf(name, doubleCheck[name]+ 1)
            if (doubleCheck[name] === -1) {
                answer = name;
                return;
            }
        }
    })
    return answer
}

// 객체를 이용하여 효율성 O(N) 으로 개선...
function solution3 (participant, completion) {
    let answer = '';
    let participantObj = {};
    // 완주자를 먼저 객체에 등록한다. 이름 수만큼 + 해준다.
    for (let i = 0; i < completion.length; i++) {
        let name = completion[i];
        if(!participantObj[name]) {
            participantObj[name] = 1;
        }
        else {
            participantObj[name] += 1;
        }
    }
    // 참가자 이름을 객체에서 -1 해주면서 -1이 되는 경우 answer 반환. 완주자에 없는 이름은 0으로 추가해준다.
    for (let i = 0; i < participant.length; i++) {
        let name = participant[i];
        if(participantObj[name] === undefined) {
            participantObj[name] = 0;
        }
        participantObj[name] -= 1;
        if (participantObj[name] === -1) {
            answer = name;
        }
    }
    return answer;
}


console.log(solution3(participant, completion))