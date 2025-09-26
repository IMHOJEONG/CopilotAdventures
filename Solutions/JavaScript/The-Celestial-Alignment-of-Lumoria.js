/**
 * 루모리아 항성계 행성 데이터
 * name: 행성 이름
 * distance: 태양으로부터의 거리 (AU)
 * diameter: 행성 지름 (km)
 */
const lumoriaPlanets = [
    { name: '머큐리아', distance: 0.4, diameter: 4879 },
    { name: '비누시아', distance: 0.7, diameter: 12104 },
    { name: '어스시아', distance: 1.0, diameter: 12742 },
    { name: '마르시아', distance: 1.5, diameter: 6779 },
];




/**
 * 그림자 규칙:
 * - Full: 앞에 더 큰 행성이 없음
 * - Partial: 앞에 더 큰 행성이 1개
 * - None (Multiple Shadows): 앞에 더 큰 행성이 2개 이상
 */
function getShadowRule(closerLargerCount) {
    if (closerLargerCount === 0) return 'Full';
    if (closerLargerCount === 1) return 'Partial';
    if (closerLargerCount >= 2) return 'None (Multiple Shadows)';
    return 'Unknown';
}

function printPlanetarySystem(planets) {
    console.log('\n🌌 루모리아 항성계 행성 정보 🌌');
    planets.forEach(p => {
        console.log(`  🪐 ${p.name} | 거리: ${p.distance} AU | 지름: ${p.diameter} km`);
    });
    console.log('---------------------------------------------');
}

function calculateLightIntensity(planets) {
    // 거리순 정렬
    const sorted = [...planets].sort((a, b) => a.distance - b.distance);
    console.log('\n✨ [계산 과정] 태양으로부터의 거리순 정렬:');
    sorted.forEach((p, i) => {
        console.log(`  ${i + 1}. ${p.name} (${p.distance} AU)`);
    });
    console.log('---------------------------------------------');

    // 각 행성별 빛 강도 및 그림자 규칙 계산
    const results = sorted.map((planet, idx) => {
        // 자신보다 태양에 더 가까운 행성들 중, 자신보다 큰 행성 개수
        const closer = sorted.slice(0, idx);
        const closerLarger = closer.filter(p => p.diameter > planet.diameter);
        const closerLargerCount = closerLarger.length;
        const shadowRule = getShadowRule(closerLargerCount);

        // 계산 과정 출력
        console.log(`\n🪐 ${planet.name} 계산:`);
        if (closer.length === 0) {
            console.log('  - 앞에 더 가까운 행성 없음 (가장 안쪽 행성)');
        } else {
            console.log(`  - 더 가까운 행성: ${closer.map(p => p.name).join(', ')}`);
            if (closerLarger.length > 0) {
                console.log(`  - 그 중 더 큰 행성: ${closerLarger.map(p => p.name).join(', ')}`);
            } else {
                console.log('  - 더 큰 행성 없음');
            }
        }
        console.log(`  - 그림자 규칙 적용: ${shadowRule}`);
        return {
            ...planet,
            shadowRule
        };
    });
    return results;
}

function printResults(results) {
    console.log('\n🌠 루모리아 행성별 빛 강도 결과 🌠');
    results.forEach(p => {
        let icon = '🔆';
        if (p.shadowRule.startsWith('Partial')) icon = '🌗';
        if (p.shadowRule.startsWith('None')) icon = '🌑';
        console.log(`  ${icon} ${p.name} | 거리: ${p.distance} AU | 지름: ${p.diameter} km | 빛 강도: ${p.shadowRule}`);
    });
    console.log('\n✨ 모든 계산이 완료되었습니다! ✨\n');
}

// 메인 실행
try {
    printPlanetarySystem(lumoriaPlanets);
    const results = calculateLightIntensity(lumoriaPlanets);
    printResults(results);
} catch (err) {
    console.error('🚨 오류 발생:', err.message);
}

/**
 * 사용법: node The-Celestial-Alignment-of-Lumoria.js
 *
 * 본 코드는 루모리아 항성계의 각 행성이 받는 빛의 강도를 계산하고,
 * 계산 과정을 콘솔에 아름답게 출력합니다.
 *
 * CopilotAdventures 스타일에 맞춰 작성되었습니다.
 */
