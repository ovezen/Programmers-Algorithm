let video_len = "34:33"
let pos = "13:00"
let op_start = "00:55"
let op_end = "02:55"
let commands = ["next", "prev"]

function solution(video_len, pos, op_start, op_end, commands) {
    var answer = '';

    let fullLength = video_len.split(":").map(Number);
    let current = pos.split(":").map(Number);
    let opStart = op_start.split(":").map(Number);
    let opEnd = op_end.split(":").map(Number);

    let opStartSec = opStart[0] * 60 + opStart[1];
    let opEndSec = opEnd[0] * 60 + opEnd[1];

    function isOpening() {
        let sec = current[0] * 60 + current[1];
        if (opStartSec <= sec && sec <= opEndSec) return true;
        return false;
    }

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
                current[0] = fullLength[0];
                current[1] = fullLength[1];
            }
        }

        // command에 prev 명령이 있을 경우 -10초
        else if (commands[i] === "prev") {
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

        // 한 번 더 오프닝 구간인지 확인하기
        if (isOpening()) {
            current[0] = opEnd[0];
            current[1] = opEnd[1];
        }
    }

    answer = `${(current[0] + "").padStart(2, '0')}:${(current[1] + "").padStart(2, "0")}`

    return answer;
    
}