# Knowledge Cartographer (Akashic Archives Demo)

## 시스템 개요

- **MCP 도구**(FireCrawl, FileSystem)를 통해 웹에서 지식 데이터를 수집·정리
- 구조화된 JSON 파일(`entities.json`, `relationships.json`, `sources.json` 등)로 워크스페이스 내에 저장
- Node.js CLI 애플리케이션(`The-Knowledge-Cartographer.js`)이 이 데이터를 읽고, 분석, 탐색, 시각화
- 신비로운 콘솔 테마와 대화형 CLI 제공

## 실행 방법

```bash
cd Solutions/JavaScript
node The-Knowledge-Cartographer.js
```

## 주요 명령어

- `list-topics` : 모든 지식 도메인(토픽) 나열
- `show-topic <id>` : 토픽의 엔터티, 관계, 출처 요약
- `find-entity <name>` : 이름으로 엔터티 검색(모든 토픽)
- `explore-entity <id> <topic>` : 엔터티의 관계 및 연결 탐색
- `show-source <id> <topic>` : 출처 상세 보기
- `help` : 명령어 도움말
- `exit` : 종료

## MCP → 파일 → 애플리케이션 아키텍처

- **MCP 도구**: 외부 웹 스크래핑, 파일 시스템 조직 담당
- **구조화 파일**: `akashic-archives-demo/topics/`, `indexes/` 내 JSON
- **애플리케이션**: Node.js 표준 모듈만 사용, 데이터 읽기/분석/탐색 담당

## 샘플 워크플로우

1. `list-topics` 입력 → 토픽 목록 확인
2. `show-topic quantum-computing` → 양자 컴퓨팅 도메인 요약
3. `find-entity Qubit` → Qubit 엔터티 검색
4. `explore-entity qbit quantum-computing` → Qubit의 관계 탐색
5. `show-source src1 quantum-computing` → 출처 상세 보기

## 참고
- MCP 서버 설정은 `.vscode/mcp.json` 참고
- 외부 라이브러리 없이 Node.js 표준 모듈만 사용
- 오류 처리 및 신비로운 콘솔 테마 적용
