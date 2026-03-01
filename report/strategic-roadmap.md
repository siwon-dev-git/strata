# Strata Design System — Strategic Roadmap & Execution Plan

> 6개 보고서 교차 분석 기반 종합 로드맵. 기술 명세, 비즈니스 모델, 실행 전략 포함.

## Context

Strata는 React 19 + TypeScript 5.9 + Tailwind CSS v4.2 + Radix UI 기반의 디자인 시스템으로,
현재 `v0.1.0-alpha.0` 단계에 57개 컴포넌트, 3-layer OKLch 토큰, AI 3-tier 소비 모델을 보유하고 있다.

### 6개 보고서 교차 진단 결과

| 보고서                                        | 점수       | 핵심 평가                                    |
| --------------------------------------------- | ---------- | -------------------------------------------- |
| System Architecture (`strata-review.md`)      | 8.5/10     | 토큰 위반 13건, 커버리지 래칫 미작동         |
| Visual Design (`visual-design-review.md`)     | 8.0/10     | OKLch 업계 상위 5%, 다크모드 깊이 부족       |
| Design Audit (`design-audit.md`)              | 7.5/10     | line-height 부재, 컨테이너 패딩 불일치       |
| Frontend Expert (`review.md`)                 | 7.5/10     | SSR/RSC 미지원, 트리셰이킹 미검증            |
| Harness Engineering (`harness-assessment.md`) | ★★★½☆      | 테스트 양극화 (Button 284줄 vs Popover 15줄) |
| Open-Source Audit (`open-source-audit.md`)    | B+ (3.7/5) | pre-commit 깨짐, SECURITY.md 부재            |

**공통 합의:** "아키텍처는 프로급, 실행 갭은 해소 가능"

### 오너 비전

AI가 코드레벨을 대체한다. 소비자는 이미지와 느낌을 던진다. 디자인 시스템이 검증된 구현체를 배치한다. AI 자가 개선 사이클로 기술 가속에 대응한다.

**핵심 이득:** 인간은 디자인 규칙, 테마, 컨셉 문서, 이미지를 기반으로 단단한 구현체를 가지게 된다.

---

## Part 1: Foundation Hardening (Phase 0)

> 모든 P0 결함을 제거하여 시스템 신뢰도를 확보한다.

### 0.1 토큰 레이어 위반 수정

**문제:** `layer3-component.css`에서 L3 토큰이 L2를 건너뛰고 L1 원시값을 직접 참조하는 위반 14건.

**검증된 위반 목록 (색상 12건 + 하드코딩 2건):**

```
# L3 → L1 색상 건너뛰기 (12건)
--tooltip-bg: var(--sp-gray-800)             → L2 --surface-inverted (신규)
--tooltip-fg: var(--sp-gray-50)              → L2 --fg-on-inverted (신규)
--switch-bg: var(--sp-gray-600)              → L2 --surface-control (신규)
--switch-thumb: var(--sp-gray-50)            → L2 --fg-on-accent
--slider-track: var(--sp-gray-700)           → L2 --surface-control
--slider-thumb: var(--sp-gray-50)            → L2 --fg-on-accent
--progress-track: var(--sp-gray-700)         → L2 --surface-control
--checkbox-fg: var(--sp-gray-50)             → L2 --fg-on-accent
--skeleton-bg: var(--sp-gray-700)            → L2 --surface-loading (신규)
--skeleton-shine: var(--sp-gray-600)         → L2 --surface-loading-shine (신규)
--scrollarea-thumb: var(--sp-gray-500)       → L2 --surface-control
--scrollarea-thumb-hover: var(--sp-gray-400) → L2 --surface-control-hover (신규)

# 하드코딩 oklch (2건)
--input-ring: oklch(0.62 0.21 260 / 25%)    → L2 --focus-ring-color / 25%
--overlay-bg: oklch(0 0 0 / 50%)            → L2 --surface-scrim (신규)
```

**수정 파일:**

- `src/tokens/layer2-semantic.css` — 신규 L2 토큰 7개 추가
- `src/tokens/layer3-component.css` — 14건 참조 재연결
- `src/tokens/GLOSSARY.md` — 신규 토큰 문서화

**신규 컨벤션:** `ADR: l3-never-references-l1` — L3는 반드시 L2만, L2는 반드시 L1만 참조. CI 린트로 강제.

### 0.2 "use client" 디렉티브 추가

**문제:** 전체 코드베이스에 `"use client"` 0건. Next.js App Router(RSC 기본) 호환 불가.

**규칙:**

- 모든 `.tsx` 컴포넌트 파일에 `"use client"` 추가 (React hooks/DOM API 사용 시)
- `.type.ts`, `.variant.ts`, 순수 유틸리티는 서버 호환 유지
- barrel `index.ts`는 re-export만 하므로 디렉티브 불필요

**수정 범위:** ~57개 컴포넌트 .tsx + Provider + Hook 파일

### 0.3 타이포그래피 리듬 토큰

**문제:** `layer1-primitive.css`에 텍스트 크기만 있고 line-height 토큰 없음.

**추가할 토큰:**

```css
/* L1 */
--sp-leading-tight: 1.25;
--sp-leading-snug: 1.375;
--sp-leading-normal: 1.5;
--sp-leading-relaxed: 1.625;

/* L2 */
--type-display-leading: var(--sp-leading-tight);
--type-body-leading: var(--sp-leading-normal);
--type-label-leading: var(--sp-leading-normal);
```

**수정 파일:** `layer1-primitive.css`, `layer2-semantic.css`, `GLOSSARY.md`

### 0.4 다크모드 표면 대비 강화

**문제:** `--surface-base`(0.08) → `--surface-raised`(0.13) = Δ0.05. 최소 Δ0.07 필요.

**수정:** `--sp-gray-950`을 `oklch(0.06 0.004 250)`으로 조정 (더 깊은 base)

### 0.5 CI 강화

**현재 CI** (`.github/workflows/ci.yml`): format → lint → typecheck → test → build → bundle comment

**문제:** 커버리지 래칫 미작동, 번들 예산 경고만 (실패 안 함)

**추가 사항:**

- `pnpm test:ci -- --coverage` + 래칫 임계값 강제
- 번들 512KB 초과 시 hard-fail 게이트
- `--sp-` 패턴이 L3에 있으면 CI 실패하는 린트 스크립트

### 0.6 Pre-commit 훅 수정

**문제:** `.husky/pre-commit`이 존재하지 않는 `projects/pulse-ui` 경로 참조.

**수정:** Strata 루트 기준으로 재작성 + lint-staged 설정

### 0.7 테스트 균등화

**문제:** Button 284줄 vs Popover 15줄 (18.9배). Layout 4/5 테스트 없음.

**수정:**

- AppShell, Container, TopBar 테스트 파일 생성
- Popover, HoverCard 최소 50줄로 보강 (keyboard, ARIA 추가)
- 6-fold 최소 템플릿 적용: rendering, props, happy-path, action failure, keyboard, ARIA

---

## Part 2: Consumer DX (Phase 1)

> 인간과 AI 소비자 모두에게 마찰 없는 경험을 제공한다.

### 1.1 SSR/RSC 호환 레이어

- `StrataServerProvider.tsx` — 서버 안전 래퍼 (props only, no useState)
- Next.js App Router 통합 예제 (`examples/next-app-router/`)
- Next 15 canary 테스트

### 1.2 아이콘 트리셰이킹

**문제:** 61개 아이콘이 단일 `Icon.tsx`에 존재. 1개 임포트 시 61개 번들.

**수정:**

- `src/components/primitives/Icon/icons/` 하위 개별 파일 분리
- `package.json` subpath exports: `"./icons/*"`
- `preserveModules: true`로 트리셰이킹 검증

### 1.3 createTheme 유틸리티

**문제:** 테마 커스텀 시 CSS 수동 복사 필요.

```typescript
// src/lib/createTheme.ts
export function createTheme(
  name: string,
  overrides: Partial<SemanticTokens>,
): string;
// CSS custom property 블록 생성, StrataProvider themes prop으로 등록
```

### 1.4 색상 팔레트 완성

- Yellow: 5 → 8+ 단계
- Purple: 5 → 8+ 단계
- Orange: 3 → 8+ 단계
- 모든 값 OKLch 일관성 유지

### 1.5 Play 함수 표준화

- 인터랙티브 컴포넌트 100% `play()` 필수 (현재 28.6%)
- Dialog, Select, Tabs, Accordion 등 disclosure/form 우선
- `ADR: play-function-required-interactive` 신규 등록

### 1.6 CHANGELOG + 릴리스 관리

- CHANGELOG.md (Keep a Changelog 형식)
- changeset 또는 수동 changelog 게이트

---

## Part 3: AI-Native Pipeline (Phase 2)

> AI 에이전트가 Strata 기반 UI를 소비하고 생산하는 인프라를 구축한다.

### 2.1 인텐트 어휘 시스템

**핵심:** "느낌을 설명하면 토큰으로 변환"

```json
{
  "professional": {
    "density": "comfortable",
    "radius": "md",
    "palette": "blue",
    "motion": "fast"
  },
  "playful": {
    "density": "spacious",
    "radius": "xl",
    "palette": "purple",
    "motion": "spring"
  },
  "minimal": {
    "density": "compact",
    "radius": "none",
    "palette": "gray",
    "motion": "fast"
  }
}
```

`resolveIntent(mood) → TokenOverrideSet` — createTheme과 통합

### 2.2 이미지-투-컴포넌트 분석 계약

**핵심:** 스크린샷 분석 결과의 표준 스키마 정의

```typescript
interface ScreenAnalysis {
  layout: { type: LayoutPattern };
  components: Array<{
    name: string; // Strata 컴포넌트명
    region: BoundingBox;
    props: Record<string, unknown>;
  }>;
  theme: { mode: 'light' | 'dark'; density: Density; accentHue: number };
}
```

- 비전 모델(Claude/GPT-4V)이 이 스키마를 출력
- `analysisToJSX(analysis)` → 유효한 Strata JSX 생성
- 데모 레지스트리 13개가 ground truth로 활용

### 2.3 합성 레시피

- `src/recipes/` — 컴포넌트 조합 패턴
  - SettingsPage: AppShell + Sidebar + Tabs + FormField
  - DataDashboard: TopBar + Container + Card + Table
  - AuthFlow: Dialog + Input + Button + FormField
- `llms.md`에 레시피 인덱스 자동 생성

### 2.4 VRT (Visual Regression Testing)

- Playwright `toHaveScreenshot()` — 무료, Chromatic 아님
- Storybook 스토리 기반 스크린샷 캡처
- CI 단계 추가: build 후 VRT 실행
- 목표: 전체 컴포넌트 default + dark/light = ~114 베이스라인

### 2.5 Spring 이징 활성화

**문제:** `--sp-ease-spring` 정의됨, 사용 0건.

**적용 대상:** Sheet 열기/닫기, Dialog 진입, Accordion 확장, Tooltip 진입

### 2.6 Storybook MCP 강화

- 모든 스토리에 `tags: ['autodocs']`
- `argTypes`에 시맨틱 설명 추가
- 토큰-컴포넌트 매핑 노출

---

## Part 4: Ecosystem & Distribution (Phase 3)

> Strata를 배포 가능하고, 커뮤니티가 활용할 수 있게 만든다.

### 3.1 W3C DTCG 토큰 규격 준수

- `tokens.json` DTCG 스키마 검증
- `$type`, `$description` 필드 추가
- Style Dictionary / Tokens Studio 연동 (Figma 동기화)

### 3.2 npm 패키지 정비

- 컴포넌트별 subpath exports
- `sideEffects` 배열 (CSS 파일 정확 지정)
- `browserslist` 추가
- `pnpm publish --dry-run` 검증

### 3.3 Figma 연동

- tokens.json → Tokens Studio → Figma 양방향 동기화
- 디자이너 페르소나 워크플로우: Figma에서 디자인 → 토큰 동기화 → 코드

### 3.4 예제 애플리케이션

- `examples/next-app-router/` — Next.js 15 통합
- `examples/vite-react/` — 바닐라 Vite + React
- 각 예제: 설치, 테마 설정, 컴포넌트 사용, 다크모드 토글

### 3.5 커뮤니티 인프라

- SECURITY.md 추가 (취약점 공개 정책)
- 이슈 템플릿: 버그, 컴포넌트 요청, 테마 요청
- PR 템플릿: 토큰 준수, 테스트 커버리지, 스토리, .md 체크리스트

---

## Part 5: AI Intelligence Layer (Phase 4)

> AI가 사용 패턴을 학습하고, 자동 개선을 제안하며, 자가 치유한다.

### 4.1 AI Agent API (4-Layer 소비 전략)

기존 3-tier를 4-layer로 확장:

| Layer | 아티팩트            | 프로토콜    | 컨텍스트 비용 | 용도                   |
| ----- | ------------------- | ----------- | ------------- | ---------------------- |
| L1    | `llms.md`           | Static      | ~5K 토큰      | 발견: "뭐가 있어?"     |
| L2    | Storybook MCP       | HTTP/MCP    | On-demand     | 탐색: "상세 보여줘"    |
| L3    | Assembly MCP (신규) | MCP tools   | On-demand     | 조립: "이거 만들어줘"  |
| L4    | `tokens.json`       | Static/DTCG | ~15K 토큰     | 통합: non-React 도구용 |

**L3 Assembly MCP 도구:**

| 도구               | 설명                                     |
| ------------------ | ---------------------------------------- |
| `strata/recommend` | 작업에 맞는 컴포넌트 추천                |
| `strata/component` | 단일 컴포넌트 상세 (props, tokens, a11y) |
| `strata/assemble`  | 자연어 → 페이지 조립                     |
| `strata/tokens`    | 토큰 쿼리                                |
| `strata/demo`      | 데모 레퍼런스 코드                       |

### 4.2 테마 인텔리전스

- 브랜드 에셋(로고, 색상)에서 OKLch 스케일 자동 생성
- 단일 색상 → 11단계 스케일 알고리즘 (L1 구조 재활용)
- WCAG AA 대비 자동 검증
- 무드 프리셋 → 토큰 복합 매핑

### 4.3 자가 개선 사이클

```
사용 데이터 → 갭 탐지기 → 우선순위 스코어링 → 스프린트 큐 → /sprint 자동 실행
     ↑                                                              |
     └──────────────── Heritage(ADR/FMEA) 성장 ←───────────────────┘
```

- 갭 탐지 규칙: `component_not_found` × 3+ = 신규 컴포넌트 후보
- `token_overridden` × 5+ = 신규 변형/토큰 후보
- 우선순위 = (영향도 × 빈도) / 노력
- Heritage 등록: 3회 반복, 신뢰도 ≥0.7 → trait 등록

### 4.4 컴포넌트 품질 스코어링

자동 품질 점수 (컴포넌트별):

- 테스트 커버리지 + 6-fold 깊이 + 스토리 커버리지
- 토큰 준수 + Play 함수 + axe-core a11y
- 문서 완성도 (.md)
- 목표: 전체 ≥ 80/100

---

## Part 6: Business Model & Positioning

### 소비자 페르소나

| 페르소나          | 현재 고통점                    | Strata 제공 가치                           |
| ----------------- | ------------------------------ | ------------------------------------------ |
| **디자이너**      | 코드 안 봄, 토큰 수동 매핑     | Figma 동기화 + createTheme + 무드 프리셋   |
| **개발자**        | SSR 미지원, 테마 커스텀 어려움 | "use client" + subpath exports + 예제 앱   |
| **AI 에이전트**   | llms.md만으로는 조립 불가      | 4-Layer API + 레시피 + ScreenAnalysis 계약 |
| **프로덕트 오너** | "이 스크린샷처럼 만들어줘"     | 이미지 파이프라인 + 인텐트 어휘            |

### Open-Core 전략

| Tier                | 내용                                                   | 가격         |
| ------------------- | ------------------------------------------------------ | ------------ |
| **Community** (MIT) | 57 컴포넌트, 3 테마, 13 데모, llms.md, MCP             | 무료         |
| **Pro**             | 프리미엄 테마 10+, Theme Builder UI, Figma 라이브러리  | $29/mo/seat  |
| **Enterprise**      | 인텐트 커스텀, 사용 분석 대시보드, AI 감사 보고서, SSO | $199/mo/seat |

### 경쟁 포지셔닝

| 축            | Strata           | shadcn/ui     | Radix Themes | Mantine   | MUI          |
| ------------- | ---------------- | ------------- | ------------ | --------- | ------------ |
| AI 준비도     | 4-Layer API      | llms.txt 부분 | 없음         | 없음      | 없음         |
| 토큰 아키텍처 | OKLch 3-layer    | Tailwind 변수 | CSS vars     | CSS-in-JS | Theme object |
| 자가 개선     | Heritage 46 패턴 | 없음          | 없음         | 없음      | 없음         |
| 데모          | 13 실제 앱 클론  | 3-5 블록      | 3 예제       | 10+ 예제  | 5 템플릿     |

**UVP:** "AI 에이전트가 실제로 사용할 수 있는 유일한 디자인 시스템"

---

## Part 7: Execution Strategy

### Sprint 매핑 (기존 S1-S10 → Phase 0-4)

| 기존 Sprint              | Phase           | 정렬                      |
| ------------------------ | --------------- | ------------------------- |
| S1: CVA + VRT            | Phase 0 + 2.4   | CVA 완료. VRT는 Phase 2로 |
| S2: Motion + Headless    | Phase 0.3 + 2.5 | line-height + spring      |
| S3: Density + Responsive | Phase 1         | 토큰 구조 이미 양호       |
| S4: Demo Schema          | Phase 2.3       | 합성 레시피로 진화        |
| S5: Accessibility        | Phase 0.7 + 1.5 | 테스트 균등화 + play      |
| S6: Advanced Components  | Phase 3         | 기반 다진 후              |
| S7: Elevation + z-index  | Phase 0.1       | 토큰 수정에 통합          |
| S8: W3C DTCG             | Phase 3.1       | 토큰 규격                 |
| S9: Distribution         | Phase 3.2-3.5   | npm + 예제                |
| S10: Performance + v1.0  | Phase 3 마무리  | 번들 + 폴리시             |

### 병렬 실행 트랙

```
Track A: Phase 0 → Phase 2 (Image Pipeline + VRT + Self-Improvement)
Track B: Phase 0 → Phase 1 → Phase 3 (Consumer DX + Ecosystem)
Track C: Phase 2.1~2.3 (Intent + Recipes — 독립 작업 가능)
```

### 우선순위별 실행 순서

**Week 1-2 (즉시 시작):**

1. Pre-commit 훅 수정 (0.6) — 30분
2. "use client" 디렉티브 추가 (0.2) — 2시간
3. 토큰 레이어 위반 수정 (0.1) — 4시간

**Week 3-4:** 4. Line-height 토큰 추가 (0.3) — 2시간 5. 다크모드 대비 조정 (0.4) — 1시간 6. CI 커버리지 래칫 + 번들 게이트 (0.5) — 3시간 7. 테스트 균등화 시작 (0.7) — 진행형

**Week 5-8 (Phase 1):** 8. createTheme 유틸리티 + 색상 팔레트 완성 9. 아이콘 트리셰이킹 + subpath exports 10. Play 함수 표준화

**Week 9-14 (Phase 2):** 11. 인텐트 어휘 시스템 + 합성 레시피 12. VRT 인프라 구축 13. ScreenAnalysis 스키마 정의

**Week 15-20 (Phase 3):** 14. DTCG 규격 + Figma 연동 15. 예제 앱 + npm 정비 16. 커뮤니티 인프라

**Week 21+ (Phase 4):** 17. Assembly MCP 서버 18. 테마 인텔리전스 19. 자가 개선 사이클

---

## Part 8: Conventions & Rules (신규 제정)

### 토큰 거버넌스 규칙

| 규칙                          | 설명                                        | 강제 방법                     |
| ----------------------------- | ------------------------------------------- | ----------------------------- |
| `l3-never-references-l1`      | L3 → L2 → L1 엄격 체인                      | CI 린트: `--sp-` in L3 = fail |
| `no-hardcoded-oklch`          | L3에 원시 oklch() 금지                      | CI grep                       |
| `token-reuse-group`           | 공유 그룹 컴포넌트는 별도 토큰 생성 금지    | PR 리뷰 체크리스트            |
| `new-token-requires-glossary` | 신규 토큰 추가 시 GLOSSARY.md 동시 업데이트 | CI 체크                       |

### 컴포넌트 품질 규칙

| 규칙                     | 설명                              | 강제 방법   |
| ------------------------ | --------------------------------- | ----------- |
| `use-client-boundary`    | 모든 .tsx 컴포넌트에 "use client" | ESLint 규칙 |
| `play-function-required` | 인터랙티브 컴포넌트 play() 필수   | 스토리 리뷰 |
| `sixfold-test-minimum`   | 테스트 6개 범주 중 최소 3개       | CI 경고     |
| `test-depth-floor`       | 비트리비얼 컴포넌트 최소 30줄     | CI 경고     |

### AI 통합 규칙

| 규칙                    | 설명                                       | 강제 방법  |
| ----------------------- | ------------------------------------------ | ---------- |
| `four-tier-consumption` | L1→L2→L3→L4 소비 레이어                    | ADR 등록   |
| `recipe-per-pattern`    | 레이아웃 패턴별 합성 레시피 1개 이상       | 체크리스트 |
| `intent-validated`      | 인텐트 어휘 추가 시 3개 이상 데모에서 검증 | 테스트     |

---

## Part 9: Risk Assessment

| 리스크                                | Phase    | 영향 | 완화                                |
| ------------------------------------- | -------- | ---- | ----------------------------------- |
| 토큰 시각 변경으로 데모 깨짐          | 0.1, 0.4 | 높음 | VRT 전/후 비교                      |
| "use client"가 non-Next 소비자에 영향 | 0.2      | 낮음 | RSC 아닌 번들러는 무시              |
| 아이콘 분리로 기존 임포트 깨짐        | 1.2      | 중간 | barrel re-export 유지               |
| AI 인텐트 어휘의 주관성               | 2.1      | 중간 | 5개 검증 인텐트로 시작, 점진 확장   |
| VRT 베이스라인 관리 부담              | 2.4      | 중간 | main에서 자동 업데이트, PR에서 리뷰 |
| Figma 동기화 드리프트                 | 3.3      | 중간 | 주간 자동 검증                      |
| AI 자가 개선의 잘못된 제안            | 4.3      | 낮음 | 인간 리뷰 게이트                    |

---

## Part 10: Verification

### Phase 0 완료 기준

```bash
# 토큰 위반 0건 확인
grep -c '\-\-sp-gray\|oklch(' src/tokens/layer3-component.css
# 예상 출력: --sp-radius-* 만 남음 (radius는 L2 없어 허용)

# "use client" 존재 확인
grep -rl '"use client"' src/components/ | wc -l
# 예상 출력: 57+

# CI 통과
pnpm typecheck && pnpm test:ci && pnpm build
```

### Phase 1 완료 기준

```bash
# createTheme 동작 확인
node -e "import('@siwon-dev-npm/strata').then(m => console.log(typeof m.createTheme))"

# 아이콘 트리셰이킹 검증
npx source-map-explorer dist/index.js --json | jq '.results[0].files'
```

### Phase 2 완료 기준

```bash
# VRT 베이스라인 생성
npx playwright test --update-snapshots

# 인텐트 어휘 테스트
pnpm test -- --grep "resolveIntent"
```

### 전체 기술 검증

```bash
pnpm typecheck    # tsc -b
pnpm test:ci      # vitest run (with coverage)
pnpm build        # tsc -b && vite build
pnpm build:lib    # library build
```

---

## 핵심 수정 파일 목록

| 파일                                          | Phase    | 수정 내용                     |
| --------------------------------------------- | -------- | ----------------------------- |
| `src/tokens/layer2-semantic.css`              | 0.1, 0.3 | 신규 L2 토큰 추가             |
| `src/tokens/layer3-component.css`             | 0.1      | 14건 참조 재연결              |
| `src/tokens/layer1-primitive.css`             | 0.3, 0.4 | line-height, gray 대비        |
| `src/tokens/GLOSSARY.md`                      | 0.1, 0.3 | 신규 토큰 문서화              |
| `.github/workflows/ci.yml`                    | 0.5      | 커버리지 래칫 + 번들 게이트   |
| `.husky/pre-commit`                           | 0.6      | 경로 수정                     |
| `src/components/primitives/Icon/Icon.tsx`     | 1.2      | 61개 아이콘 분리              |
| `src/components/providers/StrataProvider.tsx` | 0.2, 1.1 | "use client" + createTheme    |
| `package.json`                                | 1.2, 3.2 | subpath exports + sideEffects |
| `.claude/heritage/adr.md`                     | 전체     | 신규 ADR 5+ 등록              |
