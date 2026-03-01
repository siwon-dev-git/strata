# Strata Design System — 오픈소스 감사 보고서

> 감사 일자: 2026-03-01
> 대상 버전: 0.1.0-alpha.0
> 감사자: Open-Source Readiness Audit (AI-assisted)

---

## 1. Executive Summary

**종합 등급: B+ (3.7 / 5.0)**

Strata Design System은 아키텍처적으로 야심 찬 AI-native 디자인 시스템이다. 3-layer OKLch 토큰 시스템, 27개 Radix UI 헤드리스 프리미티브, llms.md + Storybook MCP를 통한 AI 소비 계층 구조, ADR/FMEA 기반 heritage 시스템은 경쟁 제품(shadcn/ui, Chakra, Mantine)에서 찾아볼 수 없는 차별점이다. 57개 컴포넌트, 52개 테스트 파일, 55개 Storybook 스토리, 3개 GitHub Actions 워크플로우는 alpha 버전치고 높은 완성도를 보여준다. 그러나 **pre-commit 훅이 다른 프로젝트(`pulse-ui`)를 참조하여 완전히 고장**난 상태이고, **SECURITY.md 부재**, **테스트 커버리지 미측정**, **패키지명 불일치**(`@siwon-dev-npm/strata` vs `@strata-ds/core`) 등 공개 출시 전 반드시 해결해야 할 갭이 존재한다. 기반은 견고하며, 갭은 명확하고 수정 가능하다.

---

## 2. 점수 총괄

| 카테고리                    | 점수    | 가중치   | 가중점          |
| --------------------------- | ------- | -------- | --------------- |
| Documentation & Onboarding  | 4.5 / 5 | 15%      | 0.675           |
| CI/CD & Automation          | 3.5 / 5 | 15%      | 0.525           |
| Code Quality & Architecture | 4.5 / 5 | 20%      | 0.900           |
| Testing & QA                | 3.5 / 5 | 15%      | 0.525           |
| Security & Supply Chain     | 2.0 / 5 | 10%      | 0.200           |
| Community & Governance      | 3.0 / 5 | 10%      | 0.300           |
| Publishing & Distribution   | 4.0 / 5 | 10%      | 0.400           |
| Developer Experience        | 4.0 / 5 | 5%       | 0.200           |
| **합계**                    |         | **100%** | **3.725 / 5.0** |

---

## 3. 카테고리별 상세 분석

### 3.1 Documentation & Onboarding — 4.5 / 5

#### 장점

- **README.md** (258행, ~13KB): 경쟁사 비교표, 57개 컴포넌트 카탈로그, 3-layer 토큰 아키텍처, AI 소비 전략(llms.md → llms-full.md → Storybook MCP), 12개 데모 앱, 3단계 로드맵 시각화 포함
- **CONTRIBUTING.md** (198행, ~6KB): 개발 환경 설정, 프로젝트 구조, 컴포넌트 Tier 분류, 6-카테고리 테스트 구조, 토큰 시스템 가이드라인, Conventional Commits 예시까지 포괄
- **CODE_OF_CONDUCT.md**: Contributor Covenant v2.1 (업계 표준)
- **PR 템플릿**: 7항목 체크리스트 (typecheck, test, build, convention, semantic tokens, ARIA, llms 재생성)
- **이슈 템플릿**: YAML 기반 구조화 양식 — bug report (7필드), feature request (4필드 + 카테고리 드롭다운)
- **Heritage 시스템**: `adr.md` (60+ 결정), `fmea.md` (15+ 실패 패턴) — 오픈소스 디자인 시스템에서 극히 드문 제도적 지식 추적
- **AI 문서**: `llms.md` (106행), `llms-full.md` (2694행), Token `GLOSSARY.md`, `CLAUDE.md`

#### 단점

- **CHANGELOG.md 부재**: 릴리스 히스토리가 전혀 없음. 소비자는 버전별 변경 내역을 추적할 수 없다
- **README npm 배지 URL 불일치**: 배지가 `@strata-ds/core`를 가리키지만 실제 패키지명은 `@siwon-dev-npm/strata` (`README.md:9`)
- **CONTRIBUTING.md 오류**: `pnpm dev`가 "Storybook dev server"라고 기술되어 있으나, 실제 `package.json`에서 `"dev": "vite"` (Vite 개발 서버)로 매핑됨 (`CONTRIBUTING.md:23,33` vs `package.json:39`)
- **라이브 문서 사이트 없음**: Storybook이 유일한 인터랙티브 문서이나 배포된 인스턴스가 없음 (README 하단 링크가 `localhost:6007`)

#### 권고

1. **[High]** `CHANGELOG.md` 생성 + `changesets` 도입으로 자동화
2. **[High]** README 배지 URL을 실제 패키지명과 일치시키거나, v1 전 패키지명 확정
3. **[Medium]** Storybook을 GitHub Pages에 배포하는 워크플로우 추가
4. **[Medium]** CONTRIBUTING.md의 `pnpm dev` 설명 수정 → "Vite dev server" 또는 스크립트 자체를 storybook으로 변경

---

### 3.2 CI/CD & Automation — 3.5 / 5

#### 장점

- **ci.yml**: Format → Lint → Typecheck → Test → Build → Build:lib → Bundle Size 의 단일 잡 Quality Gate. Concurrency group으로 중복 실행 취소. PR에 번들 사이즈 코멘트 자동 게시 (512KB 예산, 색상 코딩)
- **publish.yml**: 태그 기반 트리거 (`v*.*.*`), 품질 게이트 선행, OIDC trusted publishing + `--provenance`, 자동 GitHub Release 생성, 태그-package.json 버전 일치 검증
- **health-check.yml**: 주간 월요일 자동 감사 — 의존성 상태, 번들 크기, 테스트 수, 컴포넌트/스토리 수 추적. 이전 이슈 자동 종료 후 새 리포트 이슈 생성
- **PR 자동화**: 사이즈 라벨링 (XS~XL), 500줄 초과 경고 코멘트
- **재사용 가능 setup action**: `.github/actions/setup-strata/action.yml` — pnpm + Node 22 + 캐시 설정을 3개 워크플로우에서 공유

#### 단점

- **pre-commit 훅 완전 고장**: `.husky/pre-commit:1`이 `cd projects/pulse-ui && npx lint-staged`로 시작 — 존재하지 않는 경로. 다른 프로젝트에서 복사된 것으로 추정. 로컬 품질 게이트가 전혀 작동하지 않음
- **lint-staged 미설치**: `.lintstagedrc*` 파일 없음, `devDependencies`에 `lint-staged` 패키지 없음. pre-commit 경로를 수정해도 동작하지 않는 상태
- **번들 예산 미강제**: 512KB 초과 시 코멘트만 게시하고 CI는 통과. 1MB 번들도 merge 가능
- **의존성 자동 업데이트 없음**: `dependabot.yml` / `renovate.json` 부재. health-check가 발견만 하고 PR을 생성하지 않음

#### 권고

1. **[Critical]** `.husky/pre-commit` 재작성: `pulse-ui` 참조 제거, `npx lint-staged`로 교체
2. **[Critical]** `lint-staged` 설치 + `.lintstagedrc.json` 생성 (`*.{ts,tsx}` → eslint + prettier)
3. **[High]** `dependabot.yml` 추가 (npm 생태계, 주간 스케줄, 그룹 업데이트)
4. **[High]** 번들 예산 강제: CI에서 512KB 초과 시 `exit 1`로 빌드 실패 처리

---

### 3.3 Code Quality & Architecture — 4.5 / 5

#### 장점

- **TypeScript 엄격도**: 모든 strict 플래그 활성화 (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`, `verbatimModuleSyntax`). ES2022 타겟
- **3-layer 토큰 아키텍처**:
  - Layer 1 (Primitive): 11개 OKLch 색상 팔레트, 14단계 간격, 8단계 타이포그래피, 모션/z-index/radius 스케일
  - Layer 2 (Semantic): Dark/Light 쌍, 3개 테마(default, blue, green), 3개 밀도(comfortable, compact, spacious), 반응형 타이포그래피, reduced motion 지원
  - Layer 3 (Component): 20+ 컴포넌트 토큰 그룹, 재사용 문서화 (`--menu-*`, `--checkbox-*`, `--input-*` 등)
- **토큰 단방향 흐름**: Component → Semantic → Primitive. 순환 의존 없음
- **컴포넌트 패턴**: Radix headless + `cva()` 변형 관리 + `cn()` 클래스 병합. Compound API와 Convenience wrapper 이중 제공 (예: `Dialog.Content` + `SimpleDialog`)
- **접근성 우선**: Radix UI ARIA 기본 제공, Storybook a11y addon `test: 'error'` (위반 시 에러), 터치 타겟 44x44px, `prefers-reduced-motion` 토큰 레벨 지원, icon-only 버튼의 `aria-label` 누락 경고
- **ESLint flat config**: typescript-eslint + react-hooks + react-refresh + Tailwind canonical class 순서 플러그인 + Storybook 린팅 + Prettier 통합

#### 단점

- **CI에 자동 a11y 테스트 없음**: Storybook a11y addon은 수동 개발 시에만 작동. CI 파이프라인에 axe-core 기반 자동 감사 부재
- **런타임 테마 검증 없음**: CSS-only 토큰 시스템의 강점이자 약점 — 커스텀 테마 생성 시 필수 토큰 정의 누락을 감지할 메커니즘 없음

#### 권고

1. **[Medium]** CI에 a11y 자동 감사 추가 (Storybook test runner + a11y addon 또는 독립 axe-core)
2. **[Low]** 토큰 완전성 검증 스크립트: Layer 3의 모든 참조가 Layer 2에 정의되어 있는지 확인

---

### 3.4 Testing & QA — 3.5 / 5

#### 장점

- **52개 테스트 파일**: 6-카테고리 구조 (렌더링, Props, 정상 인터랙션, 액션 실패, 키보드 내비게이션, ARIA 속성)
- **Button 테스트 (284행)**: 25개 테스트 케이스로 모범적 커버리지 — 렌더링, onClick, disabled, loading(aria-busy), asChild, variant 클래스, 액션 실패(disabled/loading 클릭 방지), 키보드(Enter/Space/Tab), 포커스 관리, icon-only, data 속성, fullWidth, className 병합
- **Vitest 4 + Testing Library**: 최신 테스트 스택. `play()` 함수로 Storybook 내 행동 테스트
- **jsdom 폴리필**: `src/__tests__/setup.ts`에 Radix 호환 폴리필 중앙 관리 (ResizeObserver, scrollIntoView, pointer capture)
- **FMEA 패턴 추적**: 알려진 테스트 실패 패턴을 카탈로그화 (`happy-path-only-tests`, `focus-ring-nonconformance`, `active-state-omission`)

#### 단점

- **테스트 커버리지 미측정**: `--coverage` 플래그가 어떤 스크립트에도 없음. 임계값 미설정. ADR에 "coverage ratchet" 패턴이 문서화되어 있으나 구현되지 않음
- **Visual Regression Testing 없음**: Playwright가 설치되지 않았으며, `capture-screenshots.js`는 untracked 상태. VRT 워크플로우 없음
- **E2E 테스트 없음**: `.gitignore`에 `playwright-report/`, `test-results/` 엔트리가 있으나 실제 Playwright 테스트나 설정 파일 없음
- **5개 컴포넌트 테스트 누락**: 57개 컴포넌트 중 52개만 테스트 파일 보유
- **2개 스토리 누락**: 57개 컴포넌트 중 55개만 Storybook 스토리 보유

#### 권고

1. **[High]** 커버리지 측정 구현: vitest config에 `coverage: { provider: 'v8', thresholds: { lines: 80 } }` 추가
2. **[High]** ADR에 문서화된 "coverage ratchet" 패턴 실제 구현 (현재 코드 = 임계값, 이후 하락만 차단)
3. **[Medium]** VRT 도입 (Chromatic 또는 Playwright screenshots)
4. **[Low]** 테스트/스토리 누락 5+3개 컴포넌트 식별 후 보완

---

### 3.5 Security & Supply Chain — 2.0 / 5

#### 장점

- **OIDC trusted publishing**: `publish.yml`이 `id-token: write` + `--provenance`로 npm 공급망 보안의 최고 수준을 충족. 패키지가 빌드한 GitHub Actions 워크플로우에 암호학적으로 연결됨
- **Frozen lockfile**: CI에서 `pnpm install --frozen-lockfile`으로 의존성 해결 드리프트 방지
- **최소 권한**: 모든 워크플로우가 명시적 `permissions` 블록 사용 (`contents: read`, `pull-requests: write`)
- **태그-버전 일치 검증**: 배포 전 `package.json` 버전과 git 태그 일치 확인

#### 단점

- **SECURITY.md 부재**: 보안 취약점 신고 절차가 문서화되어 있지 않음. 공개 오픈소스 프로젝트의 기본 요구사항
- **CI에 의존성 감사 없음**: `pnpm audit` 또는 `npm audit` 단계가 어떤 워크플로우에도 없음
- **dependabot/renovate 없음**: 의존성 업데이트 자동화 부재
- **CODEOWNERS 없음**: 파일 수준 소유권 미설정. write 권한자 누구나 어떤 파일이든 리뷰 없이 수정 가능
- **27개 Radix UI 런타임 의존성**: 넓은 의존성 표면적. 명시적 공급망 감사 없음

#### 권고

1. **[Critical]** `SECURITY.md` 생성: 취약점 신고 이메일, 예상 응답 시간, 지원 범위 명시
2. **[High]** `CODEOWNERS` 파일 추가: `src/tokens/`, `.github/workflows/`, `package.json` → 메인테이너 매핑
3. **[High]** `dependabot.yml` 추가: npm 생태계, 주간 스케줄
4. **[High]** CI에 `pnpm audit --audit-level=high` 단계 추가

---

### 3.6 Community & Governance — 3.0 / 5

#### 장점

- **CODE_OF_CONDUCT.md**: Contributor Covenant v2.1
- **이슈 템플릿**: 구조화된 YAML 양식 (bug report + feature request)
- **PR 템플릿**: 7항목 품질 체크리스트
- **Heritage 시스템 (ADR + FMEA)**: 오픈소스 디자인 시스템에서 매우 드문 제도적 지식 인프라. 기여자 이탈에도 결정 맥락이 보존됨
- **Conventional Commits**: 문서에 타입별 예시와 함께 규정

#### 단점

- **CODEOWNERS 없음**: 파일 소유권 및 필수 리뷰어 미설정
- **FUNDING.yml 없음**: 로드맵 Phase 3에 상업화 계획(Theme Studio SaaS, Enterprise MCP, Pro Components)이 있으나 커뮤니티 후원 채널 미설정
- **단독 메인테이너**: 모든 커밋이 단일 기여자. 외부 기여 흔적 없음
- **거버넌스 모델 부재**: GOVERNANCE.md 없음. 의사결정 프로세스, 메인테이너 역할, RFC 프로세스 미문서화
- **릴리스 주기 미공표**: 릴리스 일정이나 이슈 응답 SLA 없음

#### 권고

1. **[High]** `CODEOWNERS` 생성: 핵심 경로에 소유자 지정
2. **[Medium]** `.github/FUNDING.yml` 생성 (후원 수용 시)
3. **[Medium]** `GOVERNANCE.md` 작성: 1인 프로젝트라도 의사결정 원칙 명시가 성숙도의 신호
4. **[Low]** `all-contributors` 봇 도입 검토

---

### 3.7 Publishing & Distribution — 4.0 / 5

#### 장점

- **exports map**: 7개 subpath로 세밀한 소비 제어
  ```json
  ".": JS + Types
  "./tokens": semantic CSS
  "./tokens/primitive": L1 CSS
  "./tokens/semantic": L2 CSS
  "./tokens/component": L3 CSS
  "./tokens.json": DTCG 포맷
  "./styles": 통합 CSS
  "./preset": Tailwind 프리셋
  ```
- **Library 빌드**: `vite.lib.config.ts`에서 `preserveModules`로 최적 tree-shaking. 외부 의존성 자동 추출
- **Peer dependencies**: `react ^19.0.0`, `react-dom ^19.0.0`으로 올바르게 스코핑
- **Files whitelist**: `"files": ["dist", "tokens.json"]`으로 최소 게시 범위
- **sideEffects 선언**: `["**/*.css"]`로 CSS만 side effect 처리, 나머지 tree-shakeable

#### 단점

- **패키지명 불일치**: `package.json` = `@siwon-dev-npm/strata`, README 배지 = `@strata-ds/core`. 어느 것이 최종 이름인지 불분명
- **자동 버전 관리 없음**: 수동 `package.json` 편집 + git 태그. `changesets`/`semantic-release` 부재
- **프리릴리스 채널 미설정**: `0.1.0-alpha.0`이지만 `next`/`canary` npm dist-tag 설정 없음
- **아직 npm에 게시된 적 없음**: 로드맵에 "npm publish pipeline"이 미완으로 표시

#### 권고

1. **[Critical]** 패키지명 확정: `@siwon-dev-npm/strata` vs `@strata-ds/core` 중 결정 후 모든 참조 일치
2. **[High]** `changesets` 도입으로 자동 버전 관리 + CHANGELOG 생성
3. **[Medium]** npm dist-tag 설정: alpha, beta, next 채널 구성
4. **[Low]** `tokens.js` export 추가 (TypeScript 타입이 있는 JS 토큰 객체)

---

### 3.8 Developer Experience — 4.0 / 5

#### 장점

- **Storybook 10**: a11y addon (위반 = 에러), MCP addon (AI 도구 디스커버리), Vitest addon (브라우저 내 테스트), 테마 스위처 (3 테마 x 2 모드), docs addon
- **12+ 데모 앱**: Discord, Figma, GitHub, Linear, Notion, Reddit, Slack, Spotify, Trello, Twitter, VS Code, WhatsApp — 실제 합성 패턴 시연
- **AI-native DX**: Claude Code 스킬 (`/convention`, `/sprint`, `/commit`, `/research`), Storybook MCP, `prebuild` 훅으로 `llms.md` 자동 재생성
- **Convention 감사**: `/convention audit`로 Tier 준수 자동 검사
- **일관된 컴포넌트 API**: Radix primitive + cva variants + cn class merging + data-slot + semantic tokens

#### 단점

- **라이브 인터랙티브 데모 없음**: StackBlitz/CodeSandbox 스타터 없음. 온라인에서 바로 사용해볼 수 없음
- **컴포넌트 생성기 없음**: Convention 시스템이 있지만 `pnpm create:component` 스캐폴딩 스크립트 없음
- **screenshot 스크립트 미커밋**: `scripts/capture-screenshots.js`가 untracked 상태

#### 권고

1. **[Medium]** StackBlitz/CodeSandbox 스타터 템플릿 제공
2. **[Low]** `pnpm create:component <name> --tier <0-3>` 스캐폴딩 스크립트 추가
3. **[Low]** screenshot 스크립트 커밋 또는 `.gitignore` 처리

---

## 4. 우선순위 매트릭스

### Critical — 공개 출시 전 필수

| 항목                                                         | 카테고리   | 예상 소요 |
| ------------------------------------------------------------ | ---------- | --------- |
| `.husky/pre-commit` 재작성 (`pulse-ui` 참조 제거)            | CI/CD      | 30분      |
| `lint-staged` 설치 + `.lintstagedrc.json` 생성               | CI/CD      | 15분      |
| `SECURITY.md` 생성 (취약점 신고 절차)                        | Security   | 30분      |
| 패키지명 확정 (`@siwon-dev-npm/strata` vs `@strata-ds/core`) | Publishing | 15분      |

### High — v0.2.0 전 권장

| 항목                                    | 카테고리      | 예상 소요 |
| --------------------------------------- | ------------- | --------- |
| `CHANGELOG.md` 생성 + `changesets` 도입 | Documentation | 2시간     |
| README npm 배지 URL 수정                | Documentation | 5분       |
| CONTRIBUTING.md `pnpm dev` 설명 수정    | Documentation | 5분       |
| `CODEOWNERS` 파일 추가                  | Governance    | 15분      |
| `dependabot.yml` 추가                   | Security      | 15분      |
| CI에 `pnpm audit` 단계 추가             | Security      | 15분      |
| 번들 예산 강제 (512KB 초과 시 CI 실패)  | CI/CD         | 30분      |
| 테스트 커버리지 측정 + 임계값 설정      | Testing       | 1시간     |
| ADR "coverage ratchet" 패턴 실제 구현   | Testing       | 2시간     |

### Medium — v1.0 전 권장

| 항목                                   | 카테고리     | 예상 소요 |
| -------------------------------------- | ------------ | --------- |
| Storybook GitHub Pages 배포 워크플로우 | CI/CD        | 1시간     |
| CI 자동 a11y 감사 추가                 | Code Quality | 1시간     |
| Visual Regression Testing 도입         | Testing      | 4시간     |
| `.github/FUNDING.yml` 생성             | Governance   | 15분      |
| `GOVERNANCE.md` 작성                   | Governance   | 1시간     |
| npm dist-tag 프리릴리스 채널 설정      | Publishing   | 30분      |
| StackBlitz/CodeSandbox 스타터          | DX           | 1시간     |

### Low — 개선 사항

| 항목                                    | 카테고리      | 예상 소요 |
| --------------------------------------- | ------------- | --------- |
| llms.md 데모 설명 보강                  | Documentation | 30분      |
| 토큰 완전성 검증 스크립트               | Code Quality  | 2시간     |
| 누락 테스트/스토리 5+2개 보완           | Testing       | 3시간     |
| `pnpm create:component` 스캐폴딩        | DX            | 2시간     |
| `.gitignore` Playwright 엔트리 정리     | CI/CD         | 5분       |
| `CONTRIBUTORS.md` / all-contributors 봇 | Governance    | 30분      |

---

## 5. 경쟁 포지셔닝

### Strata vs shadcn/ui

| 차원          | Strata                                 | shadcn/ui                     |
| ------------- | -------------------------------------- | ----------------------------- |
| 컴포넌트 모델 | npm 라이브러리 (설치)                  | Copy-paste (CLI 생성)         |
| 토큰 시스템   | 3-layer OKLch CSS variables            | Tailwind CSS variables (flat) |
| AI 지원       | llms.md + llms-full.md + Storybook MCP | 없음                          |
| 테스트        | 52개 테스트 파일 + 6-카테고리 구조     | 미제공 (사용자 책임)          |
| 성숙도        | Pre-alpha (0.1.0-alpha.0)              | 프로덕션, 대규모 채택         |
| 커스터마이즈  | 토큰 오버라이드 + data-attribute CSS   | 소스 코드 직접 수정           |

**평가**: Strata가 토큰 시스템과 AI 통합에서 구조적 우위를 가지나, shadcn/ui는 압도적 커뮤니티 채택과 프로덕션 검증이 있다. 안정적 npm 배포가 경쟁의 전제 조건.

### Strata vs Chakra UI

| 차원        | Strata                                  | Chakra UI                    |
| ----------- | --------------------------------------- | ---------------------------- |
| 스타일링    | CSS variables + Tailwind (zero-runtime) | Emotion CSS-in-JS (런타임)   |
| 토큰 시스템 | 3-layer CSS custom properties           | JS 테마 객체                 |
| 테마 전환   | CSS class toggle (즉시)                 | Context 리렌더 (JS 오버헤드) |
| 색상 과학   | OKLch (지각적 균일)                     | HSL/hex                      |
| 컴포넌트 수 | 57                                      | 70+                          |

**평가**: zero-runtime CSS와 OKLch 색상 과학에서 기술적 우위. 단, Chakra의 JS 기반 테마가 더 유연. 안정 릴리스가 선결 과제.

### Strata vs Mantine

| 차원             | Strata                | Mantine                      |
| ---------------- | --------------------- | ---------------------------- |
| 컴포넌트 수      | 57                    | 100+                         |
| Hooks 라이브러리 | 없음 (Radix 처리)     | 60+ 커스텀 hooks             |
| 문서 사이트      | Storybook only (로컬) | 전용 문서 사이트             |
| AI 통합          | 3-tier AI 소비        | 없음                         |
| 폼/차트/날짜     | FormField만           | @mantine/form, dates, charts |

**평가**: Mantine이 폭(hooks, forms, dates, charts)에서 우세. Strata는 넓이보다 깊이(토큰 아키텍처, AI-native, heritage)에 집중해야 함.

### 경쟁 요약

Strata는 **"AI-native 디자인 시스템"**이라는 고유 포지션을 점유. 어떤 경쟁자도 제공하지 않는 것:

1. 3-tier AI 소비 계층 (llms.md → llms-full.md → Storybook MCP)
2. OKLch 기반 지각적 균일 색상 + 3-layer 토큰 아키텍처
3. ADR + FMEA 제도적 지식 인프라

**핵심 리스크는 성숙도.** 경쟁자는 모두 프로덕션 레디이나 Strata는 pre-alpha. 안정적 npm 배포 → 공개 Storybook 배포 → AI-native 워크플로우의 실제 채택 시연이 관련성 확보의 경로.

---

## 6. 검증된 이슈 (Evidence)

### E1. Pre-commit 훅 고장

**파일**: `.husky/pre-commit:1`

```bash
cd projects/pulse-ui && npx lint-staged
```

`projects/pulse-ui/` 디렉토리는 이 리포지토리에 존재하지 않는다. 다른 프로젝트(`pulse-ui`)에서 복사된 것으로 추정. 비주얼 베이스라인 가드(6-12행)도 같은 잘못된 경로를 참조.

### E2. lint-staged 미설치

- `.lintstagedrc*` 파일: **없음**
- `package.json` devDependencies에 `lint-staged`: **없음**
- pre-commit 경로를 수정해도 `lint-staged` 명령어 자체가 실행 불가

### E3. 패키지명 불일치

- `package.json:2` → `"name": "@siwon-dev-npm/strata"`
- `README.md:9` → `[![npm](https://img.shields.io/npm/v/@strata-ds/core?color=blue)](https://www.npmjs.com/package/@strata-ds/core)`

### E4. CONTRIBUTING.md 문서 오류

- `CONTRIBUTING.md:23` → `pnpm dev` (설명: "Start Storybook dev server")
- `CONTRIBUTING.md:33` → 표에서 `pnpm dev` = "Start Storybook dev server"
- `package.json:39` → `"dev": "vite"` (실제: Vite 개발 서버, Storybook 아님)

### E5. 부재 파일

| 파일                     | 상태        | 필요성              |
| ------------------------ | ----------- | ------------------- |
| `CHANGELOG.md`           | 루트에 없음 | 릴리스 전 필수      |
| `SECURITY.md`            | 루트에 없음 | 공개 프로젝트 필수  |
| `.github/CODEOWNERS`     | 없음        | 강력 권장           |
| `.github/dependabot.yml` | 없음        | 권장                |
| `.github/FUNDING.yml`    | 없음        | 상업화 계획 시 권장 |

---

## 7. 프로젝트 지표 스냅샷

| 지표                 | 값                                                      |
| -------------------- | ------------------------------------------------------- |
| 컴포넌트             | 57 (Primitives 34, Layout 5, Disclosure 13, Feedback 5) |
| 테스트 파일          | 52                                                      |
| Storybook 스토리     | 55                                                      |
| 컴포넌트 .md 문서    | 57                                                      |
| 데모 앱              | 13                                                      |
| 토큰 라인 (L1+L2+L3) | 526                                                     |
| Radix UI 프리미티브  | 27                                                      |
| ADR 결정             | 60+                                                     |
| FMEA 패턴            | 15+                                                     |
| CI 워크플로우        | 3                                                       |
| npm exports          | 7 subpaths                                              |
| 버전                 | 0.1.0-alpha.0                                           |
| 라이선스             | MIT                                                     |

---

_이 보고서는 코드베이스의 직접 검증을 기반으로 작성되었으며, 모든 "Evidence" 섹션의 파일 경로와 라인 번호는 실제 코드에서 확인된 사실이다._
