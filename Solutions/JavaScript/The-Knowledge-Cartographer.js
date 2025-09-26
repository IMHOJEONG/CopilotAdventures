#!/usr/bin/env node
/**
 * The Knowledge Cartographer of the Akashic Archives
 *
 * 신비로운 콘솔 테마와 함께, MCP 도구가 만든 구조화된 지식 베이스를 탐색하는 CLI 애플리케이션.
 * Node.js 표준 모듈(fs, path, readline)만 사용. 외부 라이브러리 불가.
 *
 * 사용법:
 *   node The-Knowledge-Cartographer.js
 *
 * 주요 명령:
 *   list-topics                - 모든 지식 도메인(토픽) 나열
 *   show-topic <id>            - 토픽의 엔터티, 관계, 출처 요약
 *   find-entity <name>         - 이름으로 엔터티 검색(모든 토픽)
 *   explore-entity <id> <topic>- 엔터티의 관계 및 연결 탐색
 *   show-source <id> <topic>   - 출처 상세 보기
 *   help                       - 명령어 도움말
 *   exit                       - 종료
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 워크스페이스 루트 기준으로 절대경로를 지정 (실행 위치와 무관하게 동작)
const ARCHIVE_ROOT = path.resolve(__dirname, '../../akashic-archives-demo');
const TOPICS_INDEX = path.join(ARCHIVE_ROOT, 'indexes/topics.json');
const TOPICS_DIR = path.join(ARCHIVE_ROOT, 'topics');

function mysticalPrint(msg) {
  // 신비로운 테마: 보라색, 별, 구름, 테두리
  const border = '\x1b[35m' + '★'.repeat(40) + '\x1b[0m';
  console.log(border);
  msg.split('\n').forEach(line => {
    console.log('\x1b[36m☁  ' + line + '\x1b[0m');
  });
  console.log(border);
}

function loadJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return null;
  }
}

function listTopics() {
  const topics = loadJSON(TOPICS_INDEX);
  if (!topics) return mysticalPrint('토픽 인덱스를 불러올 수 없습니다.');
  mysticalPrint('Akashic Archives의 지식 도메인 목록:');
  topics.forEach(t => {
    console.log(`  [${t.id}]  ${t.name} - ${t.description}`);
  });
}

function showTopic(id) {
  const topicPath = path.join(TOPICS_DIR, id);
  const meta = loadJSON(path.join(topicPath, 'meta.json'));
  const entities = loadJSON(path.join(topicPath, 'entities.json'));
  const relationships = loadJSON(path.join(topicPath, 'relationships.json'));
  const sources = loadJSON(path.join(topicPath, 'sources.json'));
  if (!meta || !entities || !relationships || !sources) {
    mysticalPrint('해당 토픽 데이터를 불러올 수 없습니다.');
    return;
  }
  mysticalPrint(`『${meta.name}』\n- 엔터티: ${meta.entityCount}개\n- 관계: ${meta.relationshipCount}개\n- 출처: ${meta.sourceCount}개`);
  console.log('\n주요 엔터티:');
  entities.forEach(e => {
    console.log(`  [${e.id}] ${e.name} (${e.type}) - ${e.description}`);
  });
  console.log('\n주요 관계:');
  relationships.forEach(r => {
    console.log(`  ${r.source} --${r.type}→ ${r.target}`);
  });
  console.log('\n주요 출처:');
  sources.forEach(s => {
    console.log(`  [${s.id}] ${s.title} (${s.url})`);
  });
}

function findEntity(name) {
  const topics = loadJSON(TOPICS_INDEX);
  if (!topics) return mysticalPrint('토픽 인덱스를 불러올 수 없습니다.');
  let found = false;
  topics.forEach(t => {
    const entities = loadJSON(path.join(TOPICS_DIR, t.id, 'entities.json'));
    if (!entities) return;
    entities.forEach(e => {
      if (e.name.toLowerCase().includes(name.toLowerCase())) {
        if (!found) mysticalPrint('엔터티 검색 결과:');
        found = true;
        console.log(`  [${e.id}] ${e.name} (${e.type}) - ${e.description}  <${t.name}>`);
      }
    });
  });
  if (!found) mysticalPrint('해당 이름의 엔터티를 찾을 수 없습니다.');
}

function exploreEntity(id, topicId) {
  const topicPath = path.join(TOPICS_DIR, topicId);
  const entities = loadJSON(path.join(topicPath, 'entities.json'));
  const relationships = loadJSON(path.join(topicPath, 'relationships.json'));
  if (!entities || !relationships) return mysticalPrint('토픽 데이터를 불러올 수 없습니다.');
  const entity = entities.find(e => e.id === id);
  if (!entity) return mysticalPrint('해당 엔터티를 찾을 수 없습니다.');
  mysticalPrint(`『${entity.name}』의 연결 탐색:`);
  relationships.forEach(r => {
    if (r.source === id) {
      const target = entities.find(e => e.id === r.target);
      if (target) console.log(`  → (${r.type}) ${target.name}`);
    }
    if (r.target === id) {
      const source = entities.find(e => e.id === r.source);
      if (source) console.log(`  ← (${r.type}) ${source.name}`);
    }
  });
}

function showSource(id, topicId) {
  const sources = loadJSON(path.join(TOPICS_DIR, topicId, 'sources.json'));
  if (!sources) return mysticalPrint('출처 데이터를 불러올 수 없습니다.');
  const src = sources.find(s => s.id === id);
  if (!src) return mysticalPrint('해당 출처를 찾을 수 없습니다.');
  mysticalPrint(`출처: ${src.title}\nURL: ${src.url}\n품질: ${src.quality}\n신뢰도: ${src.trust}`);
}

function help() {
  mysticalPrint(`명령어 목록:
  list-topics
  show-topic <id>
  find-entity <name>
  explore-entity <id> <topic>
  show-source <id> <topic>
  help
  exit`);
}

function main() {
  mysticalPrint('Akashic Archives에 오신 것을 환영합니다! (Knowledge Cartographer)');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '\x1b[35m◆ Archives > \x1b[0m' });
  rl.prompt();
  rl.on('line', line => {
    const [cmd, ...args] = line.trim().split(/\s+/);
    switch (cmd) {
      case 'list-topics': listTopics(); break;
      case 'show-topic': showTopic(args[0]); break;
      case 'find-entity': findEntity(args.join(' ')); break;
      case 'explore-entity': exploreEntity(args[0], args[1]); break;
      case 'show-source': showSource(args[0], args[1]); break;
      case 'help': help(); break;
      case 'exit': rl.close(); return;
      default: mysticalPrint('알 수 없는 명령입니다. help를 입력하세요.');
    }
    rl.prompt();
  });
  rl.on('close', () => {
    mysticalPrint('Akashic Archives의 문이 닫힙니다.');
    process.exit(0);
  });
}

if (require.main === module) main();
