// 동영상 재생기를 만들고 있다.
// 재생기에는 (1) 10초 전으로 이동 (2) 10초 후로 이동 (3) 오프닝 건너뛰기 기능이 있다.

// (1) 10초 전으로 이동
// prev 명령을 입력할 경우 동영상의 재생 위치를 현재 위치에서 10초 전으로 이동
// 현재 위치가 10초 미만인 경우 영상의 0분 0초로 이동

// (2) 10초 후로 이동
// next 명령을 입력할 경우 동영상의 재생 위치를 현재 위치에서 10초 후로 이동
// 영상의 마지막 위치 === 동영상의 길이

// (3) 오프닝 건너뛰기
// (op_start <= 현재 재생 위치 <= op_end)인 경우 자동으로 오프닝 끝으로 이동

let video_len = "34:33"
let pos = "13:00"
let op_start = "00:55"
let op_end = "02:55"
let commands = ["next", "prev"]

// function solution (video_len, pos, op_start, op_end, commands) {
//     if (commands === "prev") {

//     }
//     else if (commands === "next") {

//     }


// }

// 1. 각각의 변수에 담긴 시간 정보를 ":" 기준으로 분할해 Number형으로 변환
// (1) Array.prototype.map() & map(Number)
// map() 메소드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.

// 예시
const array1 = [2, 6, 443, 324, 75, 23];
const map1 = array1.map(x => x * 2)
console.log(map1); // 결과 : [ 4, 12, 886, 648, 150, 46 ]

// (2) String.prototype.split()
// split() 함수는 문자열을 구분자나 정규식을 기준으로 나누어 배열로 변환한다.

// 예시
const sentence = "코딩 어렵다 죽겠다 살려줘"
const newArray = sentence.split(" "); // 공백을 기준으로 나눔
console.log(newArray);

// 적용
let fullLength = video_len.split(":").map(Number);
let current = pos.split(":").map(Number);
let opStart = op_start.split(":").map(Number);
let opEnd = op_end.split(":").map(Number);

console.log(fullLength);
console.log(current);
console.log(opStart);
console.log(opEnd);

// 2. 시간 정보를 초로 변환 (분 * 60 + 초)
let opStartSec = opStart[0] * 60 + opStart[1];
let opEndSec = opEnd[0] * 60 + opEnd[1];

console.log(opStartSec + "초");
console.log(opEndSec + "초");

// 3. 현재 시간이 오프닝 구간일 경우 true를 반환하는 함수 작성
function isOpening() {
    let sec = current[0] * 60 + current[1];
    if (opStartSec <= sec && sec <= opEndSec) return true;
    return false;
}

// 4. command 배열을 하나씩 체크하고 현재 시간이 오프닝 구간이면 오프닝 엔딩 시간으로 변환
// (1) for문
// 1차원 배열에서 for문을 사용하여 배열 요소를 순회하고 접근할 수 있다.

// 예시
const fruits = ["apple", "banana", "kiwi"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
} // 결과: apple banana kiwi (배열 안의 값들을 돌면서 전부 출력)

// (2) if (function()) 에서 true와 false
// if () {} 문에서 ()안에 함수가 들어가면, 그 함수가 반환하는 값이 true 혹은 false인지에 따라 명령을 실행할 수 있다.

// 예시
function isGreaterThanFive(num) {
    return num > 5;
}

if (isGreaterThanFive(7)) {
    console.log("7은 5보다 커요."); // 결과값 : 함수의 반환값이 true이기 때문에 "7은 5보다 커요."를 출력
} else {
    console.log("7은 5보다 크지 않아요.")
}

// (3) 논리 연산자 ||
// || 는 "" 또는(or) "" 을 의미하며, 두 개의 조건 중 하나라도 true이면 전체 결과에서 true를 반환한다.

// 적용
for (let i = 0; i < commands.length; i++) {
    if (isOpening()) {
        current[0] = opEnd[0]
        current[1] = opEnd[1] // isOpening() 함수의 결과가 true이면 현재 시간을 오프닝 구간 끝으로 변경한한다.
    }

    // command에 next 명령이 있을 경우 +10초
    if (commands[i] === "next") {
        current[1] = current[1] + 10;
        // 10초를 더했을 때 60초 넘는 경우 분으로 넘기기
        if (current[1] > 59) {
            current[0]++;
            current[1] = current[1] - 60;
        }
        // 10초를 더했을 때 동영상의 전체 길이를 넘지 않도록 제한하기
        if (current[0] > fullLength[0] || (current[0] === fullLength[0] && current[1] > fullLength[1])) {
            current[0] = full[0];
            current[1] = full[1];
        }
    }

    // command에 prev 명령이 있을 경우 -10초
    else if (commands[i] === "next") {
        current[1] = current[1] - 10;
        // 10초를 뺐을 때 0초보다 작아지면 분으로 넘기기
        if (current[1] < 0) {
            current[0]--;
            current[1] = 60 + current[1];
        }
        // 10초를 뺐을 때 00:00초보다 작아지지 않도록 제한하기
        if (current[0] < 0) {
            current[0] = 0;
            current[1] = 0;
        }
    }

    // 명령어를 전부 순회해서 확인하고 처리한 다음의 현재 시간이 오프닝 구간인지 확인하고, true이면 오프닝 끝 구간으로 이동 처리하기
    if (isOpening()) {
        current[0] = opEnd[0];
        current[1] = opEnd[1];
    }

    answer = `${(current[0] + "").padStart(2, '0')}:${(current[1] + "").padStart(2, "0")}`

    return answer;
}


// 더 알아보기

// (1) 1차원 배열
// let fruits = ['apple', 'banana', 'kiwi'] 처럼 단순히 일렬로 데이터를 나열한 배열이다. 데이터에 접근하고 싶을 때는 fruits[0] 처럼 인덱스를 하나만 사용한다.

// (2) 2차원 배열
// let matrix = [
// [1, 2, 3],
// [4, 5, 6]
// ]; 처럼 여러 줄과 칸이 있는 데이터 구조이다. 데이터에 접근하고 싶을 때는 martix[0][1]처럼 두 개의 인덱스를 사용한다.