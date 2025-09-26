GitHub Copilot Agent Mode와 MCP 도구를 사용해 완전한 Knowledge Cartographer 시스템을 만들어 주세요. 이 작업은 두 개의 단계(Phase)로 진행됩니다:

PHASE 1: MCP 도구로 지식 수집 및 정리
먼저, 구성해 둔 Firecrawl 및 server-filesystem MCP 서버와 함께 Agent Mode를 사용하여 지식 데이터를 수집·정리하세요.

1. FireCrawl MCP Server 도구 사용:
   - "양자 컴퓨팅(quantum computing)", "인공지능(artificial intelligence)" 같은 주제에 대한 웹 콘텐츠를 스크래핑한다.
   - 스크래핑한 콘텐츠에서 핵심 엔터티, 개념, 관계를 추출한다.
   - 콘텐츠 품질 및 출처 신뢰도를 분석한다.

2. File System MCP Server 도구 사용:
   - 워크스페이스 루트에 구조화된 지식 베이스 디렉터리 `./akashic-archives-demo`를 생성한다.
   - 데이터를 `topics/`와 `indexes/` 하위 디렉터리로 조직한다.
   - 엔터티, 관계, 출처를 JSON(`entities.json`, `relationships.json`, `sources.json`)으로 저장한다.
   - 각 지식 도메인에 대한 메타데이터와 인덱스 파일을 생성한다.

PHASE 2: 지식 베이스 탐색 애플리케이션 만들기
조직된 데이터를 읽고 분석하는 Node.js/javascript 애플리케이션을 만든다. Node.js의 `fs`, `path`, `readline` 모듈만 사용하고, 외부 라이브러리나 프레임워크는 사용하지 않는다.

3. 지식 베이스 리더(Reader) 구축:
   - MCP 도구가 만든 구조화된 JSON 파일을 읽는다.
   - `./akashic-archives-demo`에서 엔터티, 관계, 출처 정보를 로드한다.
   - 복수의 지식 도메인/토픽을 지원한다.

4. 지식 그래프 분석 구현:
   - 엔터티 간 관계를 분석한다.
   - 연결 패턴과 강도를 식별한다.
   - 개념 클러스터와 연관성을 탐색한다.

5. 대화형 탐색 인터페이스 만들기:
   - 지식 도메인을 탐색하는 커맨드라인 인터페이스(CLI)를 제공한다.
   - 토픽 로드, 엔터티 연결 찾기, 관계 탐색 등의 명령을 제공한다.
   - 원본 출처 자료와 메타데이터를 표시한다.
   - 신비로운(mystical) 테마의 보기 좋은 콘솔 출력을 제공한다.

6. 포괄적인 오류 처리와 문서화를 추가한다.

핵심 아키텍처: MCP Tools → Structured Files → Your Application
- MCP 도구: 외부 작업(웹 스크래핑, 파일 조직) 담당
- 애플리케이션: 데이터 읽기, 분석, 탐색에 집중

샘플 지식 도메인을 포함해 이 전체 시스템을 구현하고, 탐색 워크플로우를 시연해 주세요.