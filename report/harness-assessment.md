# Strata 하네스 엔지니어링 평가 보고서

> **평가일**: 2026-03-01
> **대상**: Strata Design System v0.1.0-alpha.0
> **평가자**: Harness Engineering Specialist
> **범위**: 테스트 인프라 · 스토리북 하네스 · CI/CD · 접근성 검증 · 관측성

---

## 1. Executive Summary

| 영역            | 등급  | 판정                                                                           |
| --------------- | :---: | ------------------------------------------------------------------------------ |
| 테스트 인프라   | ★★★☆☆ | 프레임워크·패턴은 견고하나 깊이 양극화와 커버리지 도구 미설정이 치명적         |
| 스토리북 하네스 | ★★★★☆ | MCP 통합·a11y error 모드는 업계 선도적. play function 일관성 부족              |
| CI·자동화       | ★★★★☆ | 번들 예산·사이즈 라벨링·헬스체크 우수. 순차 실행과 VRT 부재가 약점             |
| 접근성 검증     | ★★★★☆ | ARIA 테스트·a11y 자동 스캔·키보드 네비게이션 검증 체계적. 일부 컴포넌트 미적용 |
| 관측성·모니터링 | ★★★★☆ | 주간 헬스체크·FMEA 카탈로그는 독보적. 성능 벤치마크와 mutation score 부재      |

**종합: ★★★½☆ — "원칙은 선도적, 실행은 추격 필요"**

ADR에 정의된 `test-scope-sixfold`, `coverage-ratchet`, `fixture-single-source` 등의 원칙은
업계 최상위 수준이나, 실제 이행률이 낮아 "설계-실행 갭"이 가장 큰 리스크다.
P0 항목 4개를 2주 내 해소하면 ★★★★☆ 진입이 가능하다.

---

## 2. 현재 상태 (As-Is)

### 2.1 수치 요약

| 지표               | 수치                | 비고                                                          |
| ------------------ | ------------------- | ------------------------------------------------------------- |
| 총 컴포넌트        | 57                  | primitives 34 · disclosure 13 · layout 5 · feedback 5         |
| 테스트 파일        | 52 / 57             | 91.2% — 미테스트 5개는 모두 layout/AspectRatio                |
| 스토리 파일        | 54 / 57             | 94.7% — 미스토리 3개: AppShell, AspectRatio, Icon             |
| 테스트 LOC         | 2,291               | 평균 44줄/컴포넌트, 중간값 35줄                               |
| 스토리 LOC         | 3,363               | 평균 62줄/스토리 파일                                         |
| play() 보유 스토리 | ~16 / 56            | 28.6% — 대부분 render-only                                    |
| CI 파이프라인      | 7단계 순차          | format → lint → typecheck → test → build → build:lib → bundle |
| 번들 예산          | 512KB               | PR 코멘트 + 사이즈 라벨 자동화                                |
| 헬스체크           | 주간 (월 09:00 UTC) | 자동 이슈 생성 + 이전 이슈 자동 닫기                          |

### 2.2 테스트 깊이 분포

```
284줄 ████████████████████████████████████  Button (6-fold 완전 준수)
 93줄 █████████████                         FormField
 92줄 ████████████                          Select
 87줄 ████████████                          Dialog
 77줄 ██████████                            Tabs
 75줄 ██████████                            Input
 67줄 █████████                             ToggleGroup
 ...
 35줄 █████                                 (중간값)
 ...
 18줄 ███                                   HoverCard
 17줄 ██                                    Truncate, Callout
 16줄 ██                                    Label
 15줄 ██                                    Popover
  0줄                                       AppShell, Container, Sidebar, TopBar, AspectRatio
```

**양극화 비율**: 최대 284줄 vs 최소 15줄 = **18.9배 차이**

### 2.3 6-fold 테스트 준수 현황

ADR `test-scope-sixfold`가 정의한 6개 테스트 카테고리:

| 카테고리       | 설명                     | 준수 컴포넌트 |
| -------------- | ------------------------ | ------------- |
| Rendering      | 기본 렌더링 확인         | 52/52 (100%)  |
| Props          | 속성 변경 반영 확인      | ~40/52 (77%)  |
| Happy-path     | 정상 인터랙션 시나리오   | ~30/52 (58%)  |
| Action failure | 비활성/로딩 시 차단 확인 | ~8/52 (15%)   |
| Keyboard       | 키보드 접근성 검증       | ~10/52 (19%)  |
| ARIA           | 접근성 속성 검증         | ~12/52 (23%)  |

**전체 6-fold 완전 준수: Button 1개 (1.9%)**

---

## 3. 강점 분석

### 3.1 ADR 기반 테스트 표준화

`.claude/heritage/adr.md`에 `test-scope-sixfold` 원칙이 명문화되어 있어
테스트 작성 기준이 명확하다. 6개 카테고리(rendering, props, happy-path, action failure, keyboard, ARIA)는
컴포넌트 테스트의 모범 사례와 일치한다.

```
# adr.md
- **test-scope-sixfold**: 6 test categories: rendering, props, happy-path,
  action failure, keyboard, ARIA
```

**장점**: 신규 컴포넌트 테스트 작성 시 명확한 가이드라인 제공.
주관적 판단 없이 체크리스트 기반 작성 가능.

### 3.2 Radix 폴리필 중앙화

`src/__tests__/setup.ts`에서 jsdom 환경의 Radix UI 호환성 문제를
ResizeObserver, scrollIntoView, hasPointerCapture 등 5개 API 폴리필로 일괄 해결한다.

```typescript
// setup.ts — 중앙화된 폴리필
globalThis.ResizeObserver = class ResizeObserver { ... };
Element.prototype.scrollIntoView = () => {};
Element.prototype.hasPointerCapture = () => false;
```

**장점**: 개별 테스트 파일에서 폴리필을 중복 선언할 필요 없음.
ADR `jsdom-polyfill-register`에 의해 관리되어 누락 위험 최소화.

### 3.3 시맨틱 쿼리 일관성

모든 52개 테스트 파일이 `screen.getByRole()` 우선 패턴을 준수한다.
구현 세부사항(CSS 클래스, DOM 구조)이 아닌 시맨틱 역할로 쿼리하여
리팩토링에 강한 테스트를 유지한다.

```typescript
// 좋은 패턴 (Strata 전체 적용)
screen.getByRole('button', { name: 'Click me' });
screen.getByRole('dialog');
screen.getByRole('checkbox');

// 안티패턴 (Strata에서 미발견)
document.querySelector('.btn-primary');
container.firstChild;
```

**장점**: 테스트가 사용자 관점에서 작성되어 접근성 문제를 자연스럽게 노출.
Testing Library 철학과 완벽히 일치.

### 3.4 Storybook MCP 통합

`.storybook/main.ts`에서 `@storybook/addon-mcp`와
`experimentalComponentsManifest: true`를 활성화하여
AI 에이전트가 HTTP MCP 엔드포인트(`localhost:6007/mcp`)를 통해
컴포넌트 API를 실시간 조회할 수 있다.

```typescript
// main.ts
addons: [
  { name: '@storybook/addon-mcp', options: { toolsets: { dev: true, docs: true } } },
],
features: { experimentalComponentsManifest: true },
```

**장점**: 디자인 시스템의 AI 소비성(consumability)을 극대화.
`llms.md` + Storybook MCP + 컴포넌트 `.md` 3-tier 전략은 업계 선도적.

### 3.5 A11y 자동 검증

`.storybook/preview.tsx`에서 `a11y: { test: 'error' }`를 설정하여
모든 스토리에 대해 axe-core 접근성 감사를 강제한다.
위반 시 스토리가 에러 상태로 표시된다.

```typescript
// preview.tsx
parameters: {
  a11y: {
    test: 'error';
  }
}
```

**장점**: "접근성은 선택이 아닌 기본값"이라는 원칙을 자동화로 보장.
수동 접근성 검토 부담 90% 이상 감소.

### 3.6 CI 번들 예산 자동화

`.github/workflows/ci.yml`에서 PR 시 번들 크기를 자동 측정하고
512KB 예산 대비 상태를 PR 코멘트로 게시한다.
추가로 PR diff 기반 사이즈 라벨(XS~XL)을 자동 부착한다.

```yaml
# ci.yml — Bundle size check
const status = kb > 512 ? '🔴' : kb > 400 ? '🟡' : '✅';
# PR size labeling
sizes: [{ label: 'size/XS', max: 10 }, ..., { label: 'size/XL', max: Infinity }]
```

**장점**: 번들 비대화를 PR 단계에서 조기 경고.
리뷰어가 변경 규모를 즉시 파악 가능.

### 3.7 주간 헬스체크

`.github/workflows/health-check.yml`이 매주 월요일 자동 실행되어
의존성 노후화·테스트 수·번들 크기·컴포넌트 수를 추적하고
GitHub Issue로 리포트를 생성한다. 이전 이슈는 자동 닫기.

```yaml
# health-check.yml
on:
  schedule:
    - cron: '0 9 * * 1' # Every Monday 09:00 UTC
```

**장점**: 점진적 품질 저하(boiling frog)를 주간 스냅샷으로 조기 감지.
수동 모니터링 없이 프로젝트 건강도 자동 추적.

### 3.8 FMEA 실패 패턴 카탈로그

`.claude/heritage/fmea.md`에 과거 실패 사례가 카테고리별로 기록되어
동일 실수의 반복을 방지한다.

```
# fmea.md 발췌
- **happy-path-only-tests**: Tests cover only rendering + basic interaction.
  Must cover 6 categories
- **ci-gate-bypass**: CI signals ignored when `gh run watch` returns 0
- **focus-ring-nonconformance**: Button used different ring pattern than Input/Select
```

**장점**: 조직 학습을 코드화. 새 기여자도 과거 실패를 학습하여
동일 패턴 재발률 감소.

---

## 4. 개선 영역

### P0 — 즉시 시행 (1~2주, 테스트 신뢰성 직결)

---

#### 4.1 테스트 깊이 양극화

**현상**: Button 284줄 vs Popover 15줄, HoverCard 18줄, Truncate 17줄.
52개 테스트 중 41개가 6-fold 기준 2개 이하 카테고리만 충족.
Popover·HoverCard는 "renders trigger content" 단일 테스트만 존재.

```typescript
// Popover.test.tsx — 전체 내용 (15줄)
describe('Popover', () => {
  it('renders trigger content', () => {
    render(<PopoverRoot><PopoverTrigger>Open</PopoverTrigger>...</PopoverRoot>);
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });
});
```

**영향**: Popover 열기/닫기, 키보드 Escape, 외부 클릭, 포커스 트랩 등
핵심 행동이 전혀 검증되지 않음. 리팩토링 시 회귀 감지 불가.

**개선안**:

- 6-fold 최소 테스트 템플릿을 `src/__tests__/templates/` 에 생성
- 인터랙티브 컴포넌트(disclosure, form)에 대해 최소 4개 카테고리 강제
- CI에 테스트 수 하한선 게이트 추가 (컴포넌트당 최소 3개 테스트)

| 장점                          | 단점                                            |
| ----------------------------- | ----------------------------------------------- |
| 결함 탈출률(escape rate) 감소 | 초기 테스트 작성 비용 ~40시간                   |
| 리팩토링 안전망 확보          | 단순 presentational 컴포넌트에 오버 테스팅 우려 |
| 6-fold ADR 이행               | —                                               |

---

#### 4.2 커버리지 도구 미설정

**현상**: ADR에 `coverage-ratchet` ("Threshold auto-rises to current - 1%")가
명시되어 있으나, `vite.config.ts`에 커버리지 설정이 전혀 없음.
`@vitest/coverage-v8` 미설치. CI에서 커버리지 리포트 미생성.

```typescript
// vite.config.ts — coverage 설정 없음
test: {
  projects: [{
    test: {
      name: 'unit',
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
      setupFiles: ['src/__tests__/setup.ts'],
      // ← coverage 미설정
    },
  }],
}
```

**영향**: "테스트가 있다"는 것만으로 안심하지만 실제 어떤 코드가 미검증인지 파악 불가.
커버리지 회귀가 무방비 상태.

**개선안**:

1. `pnpm add -D @vitest/coverage-v8`
2. `vite.config.ts`에 coverage 설정 추가 (provider: 'v8', thresholds)
3. CI에 `pnpm test:ci --coverage` + coverage ratchet 스크립트
4. PR 코멘트에 커버리지 변화 표시

| 장점                        | 단점                                    |
| --------------------------- | --------------------------------------- |
| ADR `coverage-ratchet` 이행 | CI 시간 ~15초 증가                      |
| 커버리지 회귀 자동 차단     | 커버리지 숫자 집착(Goodhart's Law) 위험 |
| 미검증 코드 경로 시각화     | —                                       |

---

#### 4.3 Layout 카테고리 무테스트

**현상**: Layout 5개 컴포넌트 중 4개(AppShell, Container, Sidebar, TopBar)가
테스트 파일 자체가 없음. Layout 카테고리 테스트 커버리지 20% (Stack만 보유).

**영향**: Sidebar는 복잡한 collapsible + 네비게이션 패턴을 포함하는
인터랙티브 컴포넌트임에도 불구하고 행동 검증이 전무.

**개선안**:

- 최소한 rendering + props + slot composition 테스트 작성
- Sidebar는 collapse/expand, 키보드, active state 테스트 필수
- Container/TopBar는 반응형 props 테스트

| 장점                              | 단점                                |
| --------------------------------- | ----------------------------------- |
| Layout 리팩토링 안전성 확보       | Container 같은 단순 래퍼의 ROI 낮음 |
| 91.2% → 100% 테스트 커버리지 달성 | 약 2~3시간 작업량                   |

---

#### 4.4 커스텀 render wrapper 부재

**현상**: 모든 52개 테스트가 `@testing-library/react`의 `render()`를
직접 사용. 테마 프로바이더, TooltipProvider 등 컨텍스트 없이 렌더링.

```typescript
// 현재 패턴 (모든 테스트)
import { render, screen } from '@testing-library/react';
render(<Button>Click</Button>);  // 프로바이더 없이 직접 렌더

// Tooltip은 예외적으로 스토리에서만 Provider 사용
// Tooltip.stories.tsx
const withTooltipProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TooltipProvider><Story /></TooltipProvider>
);
```

**영향**: 테마 전환(`data-theme`, `.dark` class) 시 발생하는 버그를 테스트에서 감지 불가.
TooltipProvider 의존 컴포넌트의 단위 테스트가 실제 환경과 괴리.

**개선안**:

- `src/__tests__/render.tsx`에 `renderWithProviders()` 유틸리티 생성
- 기본 프로바이더: ThemeProvider + TooltipProvider
- 선택적 옵션: `{ theme: 'blue', mode: 'light' }`

| 장점                                  | 단점                                                    |
| ------------------------------------- | ------------------------------------------------------- |
| 테마 의존 버그 조기 감지              | Radix는 대부분 프로바이더 불필요 (오버 엔지니어링 위험) |
| 테스트 환경과 실제 환경 일치도 향상   | 기존 52개 테스트 마이그레이션 비용                      |
| 향후 Context 추가 시 단일 수정점 확보 | —                                                       |

---

### P1 — 분기 내 시행 (1~2개월, 하네스 성숙도 향상)

---

#### 4.5 Visual Regression Testing (VRT) 부재

**현상**: `package.json`에 `playwright: ^1.52.0`이 설치되어 있고
`scripts/capture-screenshots.js`가 존재하나, 스크린샷 비교 파이프라인이
구축되어 있지 않음. 시각적 회귀를 사람 눈으로만 감지.

**영향**: 토큰 변경, Tailwind 업그레이드, 테마 수정 시 시각적 회귀를
PR 리뷰에서 놓칠 수 있음. 57개 컴포넌트 × 3테마 × 2모드 = 342개 조합.

**개선안**:

- **옵션 A**: Chromatic (Storybook 네이티브, SaaS) — 설정 최소
- **옵션 B**: Playwright screenshot + Argos/Percy — 오픈소스 친화적
- **옵션 C**: `scripts/capture-screenshots.js` 확장 + git diff 기반 로컬 비교

| 장점                                 | 단점                                                |
| ------------------------------------ | --------------------------------------------------- |
| 342개 시각적 조합 자동 검증          | Chromatic: 유료 ($149+/월 팀 플랜)                  |
| 토큰·테마 변경의 전파 영향 즉시 확인 | 셀프 호스팅: 인프라 운영 부담                       |
| 디자이너 리뷰 효율 극대화            | 미세 렌더링 차이(anti-aliasing 등)로 false positive |

---

#### 4.6 Play function 비일관성

**현상**: 56개 스토리 중 ~16개만 `play()` 함수 보유 (28.6%).
인터랙티브 disclosure 컴포넌트(13개) 중 Dialog, Dropdown, Tooltip, Tabs만 적용.
Accordion, Collapsible, Sheet, HoverCard, Popover 등은 play function 없음.

**영향**: 스토리북의 인터랙션 테스트 레이어가 부분적으로만 활성화.
브라우저 환경 특유의 버그(포탈 렌더링, 포커스 트랩, 애니메이션 간섭)를 놓침.

**개선안**:

- disclosure + form 카테고리 컴포넌트에 play function 의무화
- presentational 컴포넌트(Badge, Text 등)는 args-only 유지
- play function 템플릿: open → assert visible → keyboard close → assert hidden

| 장점                                          | 단점                       |
| --------------------------------------------- | -------------------------- |
| 브라우저 환경 행동 검증                       | 스토리 유지보수 비용 증가  |
| Storybook Vitest addon과 연계 시 CI 검증 가능 | jsdom 테스트와 중복 가능성 |
| 포탈·포커스 트랩 등 jsdom 한계 보완           | —                          |

---

#### 4.7 Storybook 인터랙션 테스트 CI 미연결

**현상**: `@storybook/addon-vitest`가 설치되어 있고
`.storybook/vitest.setup.ts`에서 a11y + project annotations가 등록되어 있으나,
CI 파이프라인(`ci.yml`)에서 Storybook 기반 테스트가 실행되지 않음.

```yaml
# ci.yml — Storybook 테스트 미포함
- name: Test
  run: pnpm test:ci # vitest run만 실행 (unit 프로젝트)
```

**영향**: play() 함수의 회귀가 CI에서 감지되지 않음.
개발자가 로컬 Storybook을 실행해야만 확인 가능.

**개선안**:

- vitest 설정에 storybook 테스트 프로젝트 추가
- 또는 CI에 별도 `storybook test` 스텝 추가
- `addon-vitest`의 browser mode 활용 검토

| 장점                             | 단점                              |
| -------------------------------- | --------------------------------- |
| play() 회귀 자동 감지            | CI 시간 ~2분 증가                 |
| a11y addon 검증도 CI에 포함      | Storybook 빌드 필요 (추가 리소스) |
| 테스트 피라미드 중간 레이어 확보 | —                                 |

---

#### 4.8 테스트 카테고리 태깅 없음

**현상**: ADR `test-scope-sixfold`가 6개 카테고리를 정의했으나,
테스트 파일 내에서 카테고리 구분은 주석 구분선(`// ── Keyboard ──`)에 의존.
Vitest 태그나 구조화된 마커 없음.

```typescript
// Button.test.tsx — 주석 구분선으로만 카테고리 표시
// ── Action failure scenarios ──────────────
// ── Keyboard navigation ───────────────────
// ── ARIA attributes ───────────────────────
```

**영향**: 특정 카테고리만 선택 실행 불가. "keyboard 테스트만 전체 실행"이 불가능.
카테고리별 통계·준수율 추적이 수동 작업.

**개선안**:

- `describe` 네이밍 컨벤션: `describe('Button > Keyboard', ...)`
- 또는 vitest의 `test.tag()` API 활용 (실험적)
- CI에서 카테고리별 테스트 수 리포트 자동 생성

| 장점                                     | 단점                             |
| ---------------------------------------- | -------------------------------- |
| 카테고리별 선택 실행 가능                | 기존 52개 파일 마이그레이션 비용 |
| 6-fold 준수율 자동 계측                  | vitest tag API는 아직 불안정     |
| 약한 카테고리 식별 및 개선 우선순위 도출 | —                                |

---

#### 4.9 토큰 검증 갭

**현상**: 테스트에서 `toHaveClass('bg-[--btn-solid-bg]')` 형태로
CSS 클래스 문자열만 검증. 실제 `--btn-solid-bg`가 올바른 색상값을 가리키는지는
jsdom 환경에서 확인 불가 (CSS custom properties 미지원).

```typescript
// Button.test.tsx — 클래스 문자열만 검증
expect(screen.getByRole('button')).toHaveClass('bg-[--btn-solid-bg]');
// 실제 --btn-solid-bg 값이 올바른지는 미확인
```

**영향**: 토큰 Layer 2→3 배선 오류(예: `--btn-solid-bg`가 잘못된 시맨틱 토큰 참조)를
테스트에서 감지 불가.

**개선안**:

- VRT(4.5)로 시각적 검증 보완 (우선)
- 토큰 배선 무결성 전용 단위 테스트: CSS 파일 파싱 → 참조 그래프 검증
- `tokens.json` export와 대조하는 스크립트 테스트

| 장점                              | 단점                                  |
| --------------------------------- | ------------------------------------- |
| 토큰 배선 오류 자동 감지          | jsdom 한계로 런타임 검증은 VRT에 의존 |
| 3-layer 토큰 시스템의 무결성 보장 | CSS 파싱 테스트 유지보수 부담         |

---

#### 4.10 CI 순차 실행

**현상**: `ci.yml`의 Quality Gate job이 7단계를 순차 실행.
format → lint → typecheck → test → build → build:lib → bundle.
lint와 typecheck는 독립적이나 순차로 실행되어 불필요한 대기.

```yaml
# ci.yml — 순차 실행
- name: Format → run: pnpm format:check
- name: Lint → run: pnpm lint
- name: Typecheck → run: pnpm typecheck
- name: Test → run: pnpm test:ci
- name: Build → run: pnpm build
```

**영향**: PR 피드백 루프가 불필요하게 길어짐.
lint 실패 시에도 typecheck까지 기다려야 함.

**개선안**:

- 병렬 job: `lint` + `typecheck` + `test` 동시 실행
- 순차 job: `build` + `build:lib` (이전 job 완료 후)
- GitHub Actions matrix 또는 parallel jobs 활용

| 장점                      | 단점                             |
| ------------------------- | -------------------------------- |
| CI 피드백 시간 ~40% 단축  | 워크플로 YAML 복잡도 증가        |
| 빠른 실패(fail-fast) 가능 | 체크아웃/설치 중복 (캐시로 완화) |
| —                         | 현재 단일 job의 단순함 상실      |

---

### P2 — 장기 개선 (분기+, 엔지니어링 우수성)

---

#### 4.11 E2E / Integration 테스트 부재

**현상**: 단위 테스트만 존재. 컴포넌트 간 조합(예: Dialog 안의 Select,
Form 안의 Input + Checkbox + Button)을 검증하는 통합 테스트 없음.
`src/demos/`에 12개 참조 구현이 있으나 테스트 미연결.

**영향**: 단위 테스트 통과 후에도 조합 시 발생하는 포커스 충돌,
z-index 겹침, 포탈 중첩 등의 문제를 감지 불가.

**개선안**:

- `src/demos/` 12개를 Playwright E2E 테스트 대상으로 활용
- 핵심 시나리오: form 제출, dialog 내 form, 네비게이션 흐름
- smoke test 수준으로 시작 → 점진적 확대

| 장점                      | 단점                             |
| ------------------------- | -------------------------------- |
| 실제 사용 시나리오 검증   | 플레이키(flaky) 테스트 관리 부담 |
| 조합 버그 조기 발견       | CI 시간 대폭 증가 (~5분+)        |
| 데모 페이지 유지보수 강제 | —                                |

---

#### 4.12 Fixture / Factory 패턴 미표준화

**현상**: `vi.fn()`이 인라인으로 사용되고 공유 fixture가 없음.
ADR `fixture-single-source` ("3+ stories sharing data → centralize in fixtures/")가
정의되어 있으나 테스트에는 미적용.
FMEA `mock-data-scatter`에도 동일 문제가 기록됨.

**영향**: 테스트 데이터 변경 시 N개 파일을 개별 수정해야 하는 산탄총 변경(shotgun surgery).

**개선안**:

- 컴포넌트별 `__fixtures__/` 또는 `src/__tests__/factories/`
- 공통 mock: `createMockHandler()`, `createMockItems()` 등
- ADR `fixture-single-source`와 일관된 임계값(3+) 적용

| 장점                 | 단점                             |
| -------------------- | -------------------------------- |
| 테스트 데이터 일관성 | 추가 디렉토리/파일 구조 오버헤드 |
| 변경 전파 비용 감소  | 현재 규모(52개)에서 ROI 불명확   |
| ADR + FMEA 이행      | —                                |

---

#### 4.13 Mutation Testing 미도입

**현상**: 테스트 존재 여부만 확인하고 테스트의 결함 감지 능력은 미검증.
"테스트가 통과한다"가 "코드가 정확하다"를 의미하지 않음.

**영향**: `toBeInTheDocument()`만 있는 테스트(Popover, HoverCard)는
컴포넌트 로직을 삭제해도 통과할 수 있음 (weak assertion).

**개선안**:

- Stryker.js 도입 (JavaScript mutation testing 표준)
- CI 외부에서 주기적 실행 (실행 시간 길어 매 PR 부적합)
- mutation score를 헬스체크에 추가

| 장점                              | 단점                              |
| --------------------------------- | --------------------------------- |
| 테스트 효과성 정량화              | 실행 시간 매우 큼 (수십 분)       |
| 약한 assertion 자동 발견          | CI 통합 어려움 (별도 스케줄 필요) |
| 테스트 깊이 양극화(4.1) 해소 촉진 | —                                 |

---

#### 4.14 Performance Benchmark 하네스 부재

**현상**: 번들 크기(512KB 예산)만 추적하고 렌더링 성능은 미측정.
컴포넌트 수가 57개로 증가하면서 성능 회귀 위험도 증가.

**영향**: 무거운 재렌더링, 불필요한 리렌더 등 성능 문제가
사용자 불만으로 이어질 때까지 감지 불가.

**개선안**:

- React Profiler API 기반 렌더링 시간 assertion
- Lighthouse CI (PR별 성능 점수 추적)
- `react-render-tracker` 또는 자체 벤치마크 harness

| 장점                         | 단점                                   |
| ---------------------------- | -------------------------------------- |
| 성능 회귀 조기 발견          | 벤치마크 노이즈(환경 의존성) 관리 필요 |
| 최적화 효과 정량적 측정 가능 | CI 환경과 실제 환경 차이               |
| 소비자 DX 품질 보장          | —                                      |

---

## 5. 우선순위 로드맵

### Phase 0 — 즉시 (1~2주)

```
┌─────────────────────────────────────────────────────────┐
│ 1. @vitest/coverage-v8 설치 + ratchet threshold 설정    │
│ 2. Layout 4개 컴포넌트 최소 테스트 작성                   │
│ 3. 얕은 테스트 10개 컴포넌트 6-fold 보강                  │
│    (Popover, HoverCard, Sheet, Collapsible,             │
│     AlertDialog, Callout, Truncate, Label,              │
│     Separator, ScrollArea)                               │
│ 4. renderWithProviders() 유틸리티 생성                    │
└─────────────────────────────────────────────────────────┘
  예상 효과: ★★★½☆ → ★★★★☆ 진입
```

### Phase 1 — 분기 내 (1~2개월)

```
┌─────────────────────────────────────────────────────────┐
│ 5. VRT 파이프라인 구축 (Chromatic 또는 Playwright)       │
│ 6. disclosure + form 스토리 play function 확대           │
│ 7. Storybook 인터랙션 테스트 CI 연결                     │
│ 8. describe 네이밍 컨벤션으로 6-fold 태깅                 │
│ 9. 토큰 배선 무결성 테스트                                │
│ 10. CI 병렬화 (lint+typecheck 동시 실행)                 │
└─────────────────────────────────────────────────────────┘
  예상 효과: ★★★★☆ 안정화
```

### Phase 2 — 장기 (분기+)

```
┌─────────────────────────────────────────────────────────┐
│ 11. 데모 기반 Playwright E2E 테스트                      │
│ 12. Fixture/Factory 패턴 표준화                          │
│ 13. Stryker.js mutation testing (주간 실행)              │
│ 14. Performance benchmark harness                       │
└─────────────────────────────────────────────────────────┘
  예상 효과: ★★★★½☆ 도달
```

---

## 6. 결론

Strata 디자인 시스템의 하네스 엔지니어링은 **원칙 수립 측면에서 업계 상위 10%**에 해당한다.
ADR의 `test-scope-sixfold`, `coverage-ratchet`, FMEA 카탈로그, Storybook MCP 통합은
대부분의 디자인 시스템이 갖추지 못한 수준이다.

그러나 **실행 이행률**에서 현저한 갭이 존재한다:

- 6-fold 완전 준수율 1.9% (Button만)
- 커버리지 도구 미설정 (ADR에 정의됨에도)
- Layout 카테고리 80% 무테스트
- Play function 28.6%만 적용

이 갭은 **"설계 부채"가 아닌 "실행 부채"**이다.
원칙이 이미 존재하므로 이행만 하면 되는, 가장 ROI가 높은 개선 기회다.

P0 4개 항목을 2주 내 해소하면 종합 등급 ★★★★☆ 진입이 가능하며,
P1까지 완료 시 동급 오픈소스 디자인 시스템(Radix Themes, shadcn/ui) 대비
하네스 성숙도에서 우위를 점할 수 있다.

---

_End of Report_
