
// The Clockwork Town of Tempora - 시계 동기화 시스템
// 콘솔 애플리케이션 (Node.js)
//
// 대형 시계탑(Grand Clock Tower) 기준 시간: 15:00
// 마을 시계: 14:45, 15:05, 15:00, 14:40
// 각 시계가 대형 시계탑보다 몇 분 앞섰는지(+) 또는 뒤처졌는지(-) 계산
// 오류 처리 및 명확한 문서 포함

/**
 * 시계 시간 문자열(HH:MM)을 분 단위로 변환
 * @param {string} timeStr - 'HH:MM' 형식의 시간 문자열
 * @returns {number} 총 분(minute)
 */
function timeStringToMinutes(timeStr) {
    const match = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(timeStr);
    if (!match) {
        throw new Error(`잘못된 시간 형식: ${timeStr}`);
    }
    const [, hour, minute] = match;
    return parseInt(hour, 10) * 60 + parseInt(minute, 10);
}

/**
 * 시계 동기화 결과를 출력
 * @param {string[]} clockTimes - 마을 시계들의 시간 배열
 * @param {string} grandClockTime - 대형 시계탑 시간
 */
function printClockDifferences(clockTimes, grandClockTime) {
    let grandMinutes;
    try {
        grandMinutes = timeStringToMinutes(grandClockTime);
    } catch (e) {
        console.error(`대형 시계탑 시간 오류: ${e.message}`);
        return;
    }
    console.log(`대형 시계탑(Grand Clock Tower) 기준 시간: ${grandClockTime}`);
    console.log('--- 마을 시계 동기화 결과 ---');
    clockTimes.forEach((clock, idx) => {
        try {
            const clockMinutes = timeStringToMinutes(clock);
            const diff = clockMinutes - grandMinutes;
            const status = diff > 0 ? '앞섬' : (diff < 0 ? '뒤처짐' : '동기화');
            console.log(`시계 #${idx + 1} (${clock}) → ${diff}분 (${status})`);
        } catch (e) {
            console.error(`시계 #${idx + 1} 오류: ${e.message}`);
        }
    });
}

// 메인 실행
(function main() {
    // 대형 시계탑 시간
    const grandClockTime = '15:00';
    // 마을 시계들
    const clockTimes = ['14:45', '15:05', '15:00', '14:40'];
    printClockDifferences(clockTimes, grandClockTime);
})();

// 테스트 코드 (간단 검증)
if (require.main === module) {
    // 잘못된 시간 입력 테스트
    try {
        timeStringToMinutes('25:00');
    } catch (e) {
        console.log('테스트 통과: 잘못된 시간 입력 감지');
    }
}
