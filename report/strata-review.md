# Strata Design System — 프론트엔드 전문가 리뷰 리포트

> **작성일**: 2026-03-01
> **대상 버전**: v0.1.0-alpha.0
> **스택**: React 19 · TypeScript 5.9 · Tailwind CSS v4.2 · Radix UI · Vite 7 · Storybook 10
> **평가 영역**: 토큰 아키텍처 · 컴포넌트 설계 · 접근성 · 테스트 · 빌드/배포 · DX · AI 통합 · 거버넌스

---

## 1. 총평

Strata는 3-layer OKLch 토큰 아키텍처와 Radix UI 기반 headless 패턴을 핵심으로 한 57개 컴포넌트 디자인 시스템이다. 토큰 설계의 엄밀함(하드코딩 색상 0건), 6-fold 테스트 전략, ADR/FMEA 기반 거버넌스는 1인 개발 프로젝트로서 이례적인 성숙도를 보여준다. AI 통합(llms.md 자동 생성 + Storybook MCP + 컴포넌트 .md 문서)은 2026년 디자인 시스템 트렌드의 선두에 위치한다. 다만, SSR/RSC 미지원(`"use client"` directive 0건), 트리쉐이킹 미최적화, 커스텀 테마 API 부재는 프로덕션 도입 전 반드시 해결해야 할 과제이다.

| 영역                     | 점수         |
| ------------------------ | ------------ |
| 토큰 아키텍처            | 9 / 10       |
| 접근성                   | 8.5 / 10     |
| Radix UI 통합            | 9 / 10       |
| 테스트 전략              | 8 / 10       |
| AI 통합                  | 9 / 10       |
| CI/CD                    | 8.5 / 10     |
| DX                       | 8 / 10       |
| 거버넌스                 | 9 / 10       |
| **종합 프로덕션 준비도** | **7.5 / 10** |

---

## 2. 평가 방법론

본 리뷰는 다음 원칙에 따라 수행되었다.

- **8개 평가 영역**: 토큰 아키텍처, 컴포넌트 설계(접근성 포함), Radix 통합, 테스트, AI 통합, CI/CD, DX, 거버넌스
- **업계 비교 기준**: Shadcn/ui, Radix Themes, Mantine, Chakra UI 등 주요 React 디자인 시스템과 정성 비교
- **코드 근거 원칙**: 모든 평가에 구체적 파일 경로와 코드 라인을 첨부. 추측이 아닌 코드에서 확인된 사실만 기술
- **장단점 균형**: 각 영역에서 강점과 개선 여지를 함께 분석

---

## 3. 프로젝트 현황 스냅샷

| 지표                | 수치  | 비고                                                  |
| ------------------- | ----- | ----------------------------------------------------- |
| 컴포넌트 수         | 57    | primitives 34 · disclosure 13 · layout 5 · feedback 5 |
| 토큰 라인 수        | 526줄 | L1: 129 · L2: 211 · L3: 186                           |
| Radix UI 프리미티브 | 27종  | accordion ~ tooltip                                   |
| 테스트 파일         | 52개  | `*.test.tsx`                                          |
| 스토리 파일         | 55개  | `*.stories.tsx`                                       |
| 아이콘              | 61개  | `Icon.tsx` 내 `createIcon` 팩토리                     |
| 데모                | 12개  | Linear, Slack, Discord 등 레퍼런스 구현               |
| 번들 예산           | 512KB | ADR `bundle-budget-g3`                                |
| Node 요구사항       | ≥ 22  | ESM only (`"type": "module"`)                         |

---

## 4. 강점 분석

### 4.1 토큰 아키텍처 — 9/10

Strata의 토큰 시스템은 3-layer 계층 구조로, 디자인 시스템 업계에서도 상위 수준의 설계를 보여준다.

**Layer 구조:**

```
L1 Primitive (--sp-*)  →  L2 Semantic (--fg-*, --surface-*, --border-*)  →  L3 Component (--btn-*, --dialog-*)
```

- **L1** (`src/tokens/layer1-primitive.css`): OKLch 색공간 기반 51개 색상값, spacing(14단계), typography(8단계), motion(13단계), radius(6단계). OKLch는 인지적 균일성(perceptual uniformity)을 제공하여 WCAG 대비비 계산이 직관적이다.
- **L2** (`src/tokens/layer2-semantic.css`): interactive/danger/success/warning 상태 색상, surface 계층(base → raised → overlay → inset), foreground 계층(default → muted → subtle → disabled). Dark/Light 모드, accent 테마(`blue`, `green`), density(`compact`, `spacious`) 모두 이 레이어에서 오버라이드한다.
- **L3** (`src/tokens/layer3-component.css`): 19개 컴포넌트 그룹, 90+ 토큰. `--menu-*`가 DropdownMenu/ContextMenu/Menubar/NavigationMenu에 공유되고, `--checkbox-*`가 RadioGroup과 공유되는 등 **토큰 재사용 그룹** 설계가 탁월하다.

**핵심 근거:**

- **하드코딩 색상 0건**: ADR `semantic-token-only`로 명문화. 모든 컴포넌트는 `var(--xxx)` 형태의 CSS custom property만 참조
- **Layer skip 방지**: 컴포넌트가 L1(`--sp-*`)을 직접 참조하는 경우는 L3에서만 허용. Button, Input 등은 오직 L3 토큰만 사용
- **Tailwind 통합**: `@theme inline`에서 CSS var를 Tailwind 테마로 매핑하여 JIT 최적화와 토큰 오버라이드를 동시 달성 (`src/index.css`)

**장점:**

- 테마 전환이 CSS custom property 오버라이드만으로 즉시 반영 — JS 리렌더링 없음
- 소비자가 L3 토큰만 오버라이드하면 개별 컴포넌트 리스킨 가능
- `src/tokens/GLOSSARY.md`에 접두사 규칙, 접미사 의미, 재사용 그룹이 문서화됨

**한계:**

- 커스텀 accent 테마 추가 시 L2 CSS를 직접 복제해야 함 (5.3에서 상세 기술)

---

### 4.2 접근성 — 8.5/10

접근성이 아키텍처 수준에서 내재되어 있다.

**터치 타겟 (WCAG 2.5.8):**
`src/components/primitives/Button/Button.variant.ts`에서 invisible `before` pseudo-element로 최소 44px(2.75rem) 터치 타겟을 보장한다. ADR `btn-touch-target-pseudo`에 따르면, 이 접근법은 compact density에서의 높이 충돌을 방지한다.

```css
before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2
before:min-h-[--btn-touch-target] before:min-w-[--btn-touch-target]
```

**포커스 링:**
`--focus-ring-width: 2px`, `--focus-ring-offset: 2px`로 L2에 정의되고, L3에서 `--btn-focus-ring-*`로 컴포넌트별 커스터마이징 가능. ADR `focus-ring-component-tokens`에 따라 Button/Input/Select/Textarea가 동일한 패턴을 공유한다.

**Reduced motion:**
`src/tokens/layer2-semantic.css:97-107`에서 `@media (prefers-reduced-motion: reduce)` 시 모든 L1 duration을 0ms로 설정. JS 애니메이션용으로는 `usePrefersReducedMotion` hook(`src/hooks/usePrefersReducedMotion.ts`)이 `useSyncExternalStore` 패턴으로 SSR-safe하게 구현됨.

**ARIA 적용:**

- `Button.tsx`: `aria-busy={loading}`, icon-only 시 `aria-label` 미설정 경고 (dev-only console.warn)
- `Input.tsx`: `aria-invalid={error}`
- Storybook addon-a11y: `.storybook/preview.tsx`에서 `a11y: { test: 'error' }` — 접근성 위반 시 에러 처리

**장점:**

- 접근성이 "추가 기능"이 아닌 토큰 계층에 내장됨
- 6-fold 테스트 중 "keyboard nav"과 "ARIA" 카테고리가 필수로 지정됨 (ADR `test-scope-sixfold`)

**한계:**

- 색상 대비비 자동 검증 도구 없음 (OKLch 기반이므로 수동 계산은 용이)
- 스크린 리더 실제 테스트 결과 미문서화

---

### 4.3 Radix UI 통합 — 9/10

27개 Radix UI headless 프리미티브를 얇은(thin) 래퍼로 감싸는 실용적 전략을 채택했다.

**패턴 1: Pass-through + Styled wrapper**
`src/components/disclosure/Dialog/Dialog.tsx`에서 `DialogRoot`, `DialogTrigger`, `DialogClose`는 Radix를 그대로 re-export하고, `DialogContent`, `DialogHeader`, `DialogBody`, `DialogFooter`만 스타일링 래퍼를 추가한다.

**패턴 2: Compound + Convenience dual API**
`SimpleDialog` 편의 래퍼가 compound API를 단일 props 인터페이스로 감싼다. ADR `convenience-wrapper-missing`(FMEA)에서 식별한 "verbose assembly" 문제를 해결한다.

**패턴 3: React 19 ref 패턴**
`forwardRef` 대신 props에서 직접 `ref`를 수신하는 React 19 스타일을 채택. `ComponentPropsWithRef<'button'>` 확장으로 네이티브 HTML props를 완벽 전달한다.

**장점:**

- Radix의 접근성/동작 보장을 그대로 상속 — 자체 a11y 구현 부담 제거
- Power user는 compound API로 세밀한 제어 가능, 일반 사용자는 convenience wrapper로 빠른 적용
- 배럴 파일에서 named export + namespace object 패턴 모두 지원

**한계:**

- Radix 27개 중 일부(Toolbar)는 컴포넌트 래퍼 없이 dependency에만 존재

---

### 4.4 테스트 전략 — 8/10

ADR `test-scope-sixfold`에 정의된 6개 테스트 카테고리가 전 컴포넌트에 적용된다.

**6-fold 테스트 카테고리:**

1. **렌더링** — 올바른 role/content로 렌더되는가
2. **Props** — variant/size/className이 적용되는가
3. **Happy-path** — 사용자 액션에 콜백이 실행되는가
4. **Action failure** — disabled/loading 시 콜백이 차단되는가
5. **Keyboard** — Enter/Space/Tab/Arrow 키 탐색
6. **ARIA** — 올바른 aria-\* 속성 설정

**골드 스탠다드: `Button.test.tsx`** — 29개 테스트 케이스, 284줄. 모든 6개 카테고리 완전 커버. `@testing-library/react` + `@testing-library/user-event` 조합으로 실제 사용자 상호작용 시뮬레이션.

**Storybook play() 함수:**
`Button.stories.tsx`(362줄)에서 `play()` 함수로 Storybook 내 behavioral testing 수행. 구조 검증을 넘어 `userEvent.click()` → `expect(args.onClick).toHaveBeenCalledOnce()` 패턴으로 실제 동작 검증.

**jsdom 폴리필 중앙화:**
`src/__tests__/setup.ts`에서 `ResizeObserver`, `scrollIntoView`, `pointerCapture` 등 Radix가 필요로 하는 브라우저 API를 폴리필 (ADR `jsdom-polyfill-register`).

**장점:**

- 6-fold 카테고리가 ADR로 명문화되어 테스트 누락 방지
- play() 함수로 Storybook이 living documentation + test harness 역할 겸임

**한계:**

- Layout 카테고리(AppShell, Container, Sidebar, TopBar) 4개 컴포넌트 테스트 부재 (5.4에서 상세)
- E2E 테스트(Playwright) 설정은 있으나 실제 테스트 파일 미확인

---

### 4.5 AI 통합 — 9/10

ADR `three-tier-ai-consumption`에 정의된 3-tier AI 소비 전략:

1. **llms.md** (인덱스 tier): `pnpm generate:llms`로 자동 생성(`scripts/generate-llms-txt.js`). prebuild hook으로 항상 최신 상태 보장. ~2K 토큰의 컴팩트한 컴포넌트 목록
2. **Storybook MCP** (실시간 tier): `@storybook/addon-mcp@0.3.3`이 `http://localhost:6007/mcp`에서 component manifest를 노출. `experimentalComponentsManifest: true` 활성화
3. **컴포넌트 .md** (딥 tier): Button, Dialog, Select, Input 등의 `.md` 파일에 Role, Tier, Tokens, Props, Constraints, Override Patterns 구조화

**장점:**

- LLM이 코드베이스를 이해하는 데 필요한 3가지 깊이 수준을 모두 커버
- AI-first 디자인 시스템 접근은 업계에서 매우 드문 선구적 시도

**한계:**

- 12개 데모가 llms.md에서 "Reference implementation"이라는 동일한 설명만 반복 (5.12에서 상세)

---

### 4.6 CI/CD — 8.5/10

`.github/workflows/ci.yml`에서 6-gate sequential chain을 구현:

```
format:check → lint → typecheck → test:ci → build → build:lib → bundle size check
```

- **번들 예산**: 512KB 이하 필수 (ADR `bundle-budget-g3`), PR에 자동 코멘트 (400KB 이상 yellow, 512KB 이상 red)
- **PR 사이즈 체크**: XS/S/M/L/XL 라벨 자동 부여, 500줄 이상 경고
- **Concurrency 제어**: 브랜치별 그룹화, 새 push 시 이전 실행 자동 취소

**장점:**

- 순차적 gate 체인으로 정적 분석 실패 시 하류 작업 차단 (ADR `ci-needs-chain`)
- 번들 사이즈 모니터링이 CI에 내장

---

### 4.7 DX (Developer Experience) — 8/10

- **`cn()` 유틸리티** (`src/lib/utils.ts`): `clsx` + `tailwind-merge` 조합으로 Tailwind 클래스 충돌 자동 해결
- **Data attributes**: `data-slot`, `data-variant`, `data-size`, `data-loading`으로 외부 CSS 타겟팅 가능 — 소비자가 Strata 내부 구현에 의존하지 않고 스타일 오버라이드
- **CVA (class-variance-authority)**: `Button.variant.ts`에서 타입 안전한 variant 조합. `buttonVariants({ variant, size })` 함수 export로 외부 재사용 가능
- **Density 시스템**: `data-density` attribute로 compact/comfortable/spacious 전환. `--density-item-height`, `--density-padding-x`, `--density-gap` 등 4개 토큰이 전 컴포넌트에 일관 적용
- **asChild 패턴**: Radix `Slot`을 활용한 polymorphic rendering — `<Button asChild><a href="...">Link</a></Button>`

**장점:**

- 소비자가 기존 스타일링 시스템과 충돌 없이 통합 가능
- Density가 단일 attribute 전환으로 전체 UI 밀도 조정

---

### 4.8 거버넌스 — 9/10

`.claude/heritage/adr.md`에 30+ 설계 결정이 명문화되어 있다.

**주요 ADR:**

- `semantic-token-only`: 하드코딩 CSS 색상 금지
- `test-scope-sixfold`: 6개 테스트 카테고리 의무
- `external-from-manifest`: Rollup external을 package.json에서 자동 derive (수동 리스트 금지)
- `btn-touch-target-pseudo`: 터치 타겟 확장에 pseudo-element 사용

`.claude/heritage/fmea.md`에 15+ 실패 패턴이 카탈로그화:

- `token-mapping-boilerplate`: 소비자 60줄 보일러플레이트 문제
- `happy-path-only-tests`: 6-fold 미준수 경고
- `external-peer-drift`: deps 변경 시 rollup external 미반영 위험

**장점:**

- 결정 근거와 실패 방지 메커니즘이 코드와 분리되어 관리됨
- FMEA 패턴이 실제 코드 개선으로 이어짐 (예: `focus-ring-nonconformance` → L3 토큰 정렬)

---

## 5. 개선 권고사항

### Tier 1: 프로덕션 도입 전 필수

#### 5.1 SSR/RSC `"use client"` 부재 — P0

**문제:** 전체 컴포넌트 파일에 `"use client"` directive가 0건이다. React 19의 Server Components 전략과 호환되지 않는다. `src/__fixtures__/strata-data.ts`의 문자열 리터럴에만 해당 텍스트가 존재할 뿐, 실제 directive로 사용되는 곳은 없다.

**영향:** Next.js App Router, Remix 등 RSC 프레임워크에서 import 시 번들 전체가 client-side로 분류된다. 소비자의 서버 사이드 최적화를 원천 차단하는 셈이다.

**해결 방안:**

1. 모든 interactive 컴포넌트(Button, Dialog, Select 등) 파일 상단에 `"use client"` directive 추가
2. 순수 렌더링 컴포넌트(Text, Badge, VisuallyHidden, Icon 등)는 Server Component 호환 유지 검토
3. `StrataProvider`를 client boundary로 설정

**노력:** M (2-3일) — 전 컴포넌트 분류 + directive 일괄 추가

---

#### 5.2 트리쉐이킹 최적화 — P0

**문제:** `vite.lib.config.ts`에서 `preserveModules: true`로 모듈 구조를 보존하지만, `package.json`의 `exports` 필드에 component-level 진입점이 없다. `sideEffects`는 `"**/*.css"`만 선언되어 있어, bundler가 미사용 컴포넌트를 안전하게 제거하기 어렵다.

**영향:** 57개 중 5개만 사용하는 소비자도 전체 컴포넌트 코드를 가져올 수 있다.

**해결 방안:**

1. Component-level exports 추가: `"./Button": "./dist/components/primitives/Button/Button.js"` 등
2. 또는 각 컴포넌트 디렉토리에 `package.json`(`"sideEffects": false`) 배치
3. rollup-plugin-visualizer로 실제 번들 구성 시각화

**노력:** M (2-3일)

---

#### 5.3 커스텀 테마 API — P1

**문제:** `src/themes/index.ts`에서 `THEME_NAMES = ['default', 'blue', 'green'] as const`로 3개 테마만 하드코딩. 소비자가 커스텀 accent color를 추가하려면 `src/tokens/layer2-semantic.css`의 `[data-theme='blue']` 블록을 직접 복제하여 `--color-interactive` 계열 5개 + `--border-interactive` 1개를 오버라이드해야 한다.

**영향:** 엔터프라이즈 화이트라벨, 브랜드 커스터마이징 진입 장벽이 높다.

**해결 방안:**

1. `createTheme({ accent: 'oklch(0.62 0.21 280)' })` 유틸리티 함수로 interactive 계열 CSS custom property 세트를 자동 생성
2. `StrataProvider`에 `customTheme` prop 추가
3. CSS-only approach: `[data-theme='custom']` 패턴 문서화 (최소 비용)

**노력:** L (4-5일)

---

#### 5.4 Layout 컴포넌트 테스트 부재 — P1

**문제:** Layout 카테고리의 AppShell, Container, Sidebar, TopBar 중 테스트가 충분히 커버되지 않는 컴포넌트가 존재한다. 6-fold 테스트 카테고리(ADR `test-scope-sixfold`)가 적용되지 않았다.

**영향:** 레이아웃 리팩토링 시 regression 감지 불가.

**해결 방안:** Sidebar의 collapsed/expanded 전환, TopBar의 반응형 동작, Container의 breakpoint 제약 등에 대해 6-fold 테스트 추가.

**노력:** S (1-2일)

---

#### 5.5 버전 관리 및 Changelog — P1

**문제:** `package.json`이 `0.1.0-alpha.0`이지만, CHANGELOG.md가 없고, 1.0 전환 로드맵이 문서화되지 않았다. Button.md에 "History" 섹션이 있으나 전역 changelog는 부재.

**영향:** 소비자가 업그레이드 리스크를 평가할 수 없다. Breaking change 발생 시 대응 불가.

**해결 방안:**

1. `@changesets/cli` 도입으로 PR 단위 changelog 항목 수집
2. CHANGELOG.md 자동 생성 파이프라인
3. Alpha → Beta → 1.0 전환 조건 명문화

**노력:** S (1일)

---

#### 5.6 소비자 온보딩 문서 개선 — P1

**문제:** FMEA `token-mapping-boilerplate`에서 자체 인식한 문제. 소비자가 Strata를 사용하려면 `@theme inline`에 60+ 줄의 CSS var → Tailwind 매핑을 복사해야 한다. `preset.css` export(`./preset`)가 이미 존재하지만 README/CONTRIBUTING에서 primary 경로로 안내되지 않는다.

**영향:** 첫 사용까지의 시간이 불필요하게 길어진다.

**해결 방안:** README "Quick Start" 섹션에서 `import '@siwon-dev-npm/strata/preset'`를 primary 설치 경로로 안내. `@theme inline` 복사는 advanced customization으로 분류.

**노력:** XS (문서 업데이트만 필요 — 기능은 이미 구현됨)

---

### Tier 2: 생태계 경쟁력 강화

#### 5.7 누락 컴포넌트 — P1

**문제:** Combobox/Autocomplete, DatePicker, FileUpload, DataGrid 등 production-critical 컴포넌트가 부재하다. 특히 Combobox는 검색 UI의 핵심 요소로, 부재 시 소비자가 외부 라이브러리를 혼합해야 한다.

**영향:** 외부 라이브러리 혼합 시 토큰 일관성이 깨지고, DX가 파편화된다.

**해결 방안:**

- Phase 1: Combobox (cmdk 또는 Radix Combobox 기반, `--menu-*` 토큰 재사용)
- Phase 2: DatePicker (react-day-picker + Radix Popover)
- Phase 3: FileUpload, DataGrid (시장 수요에 따라)

**노력:** XL (컴포넌트당 3-5일)

---

#### 5.8 애니메이션 시스템 — P2

**문제:** CSS `transition` + `tw-animate-css`만 사용. `src/index.css`에 수동 `@keyframes`(fade-in, scale-in, accordion-down 등) 정의. Spring/physics 기반 애니메이션, exit animation(`AnimatePresence` 패턴) 미지원.

**영향:** Sheet slide-in, Accordion expand, Toast entrance 등에서 자연스러운 spring 효과를 구현할 수 없다. `--sp-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`이 L1에 정의되어 있으나 활용도가 낮다.

**해결 방안:**

1. `motion` (framer-motion lightweight) 또는 CSS `@starting-style` + `allow-discrete` 조합
2. 기존 `--sp-ease-spring` 토큰의 실제 컴포넌트 적용 확대
3. `AnimatePresence` 패턴으로 exit animation 지원

**노력:** L (4-5일)

---

#### 5.9 i18n / RTL 지원 — P2

**문제:** `px-5`, `left-3`, `ml-2` 등 물리적 방향(physical direction) 속성이 광범위하게 사용된다. `InputGroup`의 prefix/suffix가 `absolute left-3` / `absolute right-3`로 고정되어 있다.

**영향:** 아랍어, 히브리어 등 RTL 언어 시장 접근 불가.

**해결 방안:**

1. Tailwind 4의 logical properties 전환: `px` → `ps`/`pe`, `left` → `start`, `ml` → `ms`
2. `StrataProvider`에 `dir: 'ltr' | 'rtl'` prop 추가
3. 전체 컴포넌트 audit으로 물리적 속성 → 논리적 속성 마이그레이션

**노력:** L (3-4일, 전체 컴포넌트 audit 필요)

---

#### 5.10 아이콘 시스템 분리 — P2

**문제:** 61개 아이콘이 `Icon.tsx` 단일 파일에 `createIcon` 팩토리로 정의되어 있다. `strokeWidth={2}` 고정, fill/weight 변형 없음.

**영향:** 아이콘 1개만 사용해도 61개 전체가 번들에 포함된다. 아이콘 스타일 커스터마이징(thin, bold, fill) 불가.

**해결 방안:**

1. 파일 분리: `icons/IconHome.tsx`, `icons/IconSearch.tsx` 등 개별 파일
2. `strokeWidth` prop 추가 (thin: 1.5, default: 2, bold: 2.5)
3. 또는 Lucide React 등 외부 아이콘 라이브러리와의 어댑터 제공

**노력:** M (2-3일)

---

#### 5.11 Compound 컴포넌트 문서화 — P2

**문제:** FMEA `composition-undocumented` — Dialog, Select, Accordion 등 compound 패턴의 slot 구조가 코드에만 존재한다. SimpleDialog 같은 convenience wrapper의 존재 여부, compound API와의 사용 기준이 문서화되지 않았다.

**해결 방안:** 각 compound 컴포넌트 `.md` 파일에 "Compound vs Convenience" 의사결정 가이드 추가. 사용 시나리오별 권장 API 명시.

**노력:** S (1-2일)

---

#### 5.12 데모 발견성 — P2

**문제:** 12개 레퍼런스 데모(Linear, Slack, Discord 등)가 `src/demos/`에 존재하지만, `llms.md`에서 "Reference implementation"이라는 동일한 설명만 반복된다. 데모에서 사용되는 컴포넌트 목록, 레이아웃 패턴, 학습 포인트가 색인되지 않았다.

**해결 방안:**

1. 각 데모의 사용 컴포넌트, layout 패턴, 핵심 학습 포인트를 `demo-registry`에 메타데이터로 추가
2. `pnpm generate:llms`에서 이 메타데이터를 llms.md에 반영

**노력:** S (1일)

---

### Tier 3: 장기 최적화

#### 5.13 폼 검증 통합 — P2

**문제:** `FormField`은 label/description/error 래핑만 제공한다. Zod/Yup 스키마 기반 자동 검증, React Hook Form/Conform 연동이 없다.

**해결 방안:** React Hook Form adapter 또는 `useFormField({ schema })` hook 제공. 최소한 통합 레시피를 문서로 제공.

**노력:** M (2-3일)

---

#### 5.14 성능 최적화 — P3

**문제:** `React.memo` 사용이 전체 코드베이스에서 0건이다. `StrataProvider.tsx`에서 `useMemo`/`useCallback`으로 context 값은 최적화했으나, leaf 컴포넌트(Text, Badge, Icon 등)에는 메모이제이션이 없다. Virtual scrolling도 미지원.

**영향:** 대규모 리스트/테이블에서 부모 리렌더링 시 불필요한 자식 리렌더링 발생 가능.

**해결 방안:**

1. 고빈도 렌더링 컴포넌트(Icon, Badge, Text)에 선택적 `React.memo` 적용
2. `ScrollArea` + `@tanstack/virtual` 통합으로 대규모 리스트 지원
3. `rollup-plugin-visualizer`로 번들 구성 시각화

**노력:** M-L (3-5일)

---

#### 5.15 Figma 토큰 동기화 — P3

**문제:** 토큰이 CSS custom properties에만 존재한다. `tokens.json`과 `scripts/export-tokens-dtcg.js`가 있으나, Style Dictionary / Tokens Studio와의 양방향 동기화는 미구현.

**영향:** 디자이너-개발자 간 토큰 drift 위험. 디자인 변경이 코드에 자동 반영되지 않는다.

**해결 방안:**

1. DTCG 형식 `tokens.json`을 단일 진실 소스(single source of truth)로 설정
2. Tokens Studio for Figma 플러그인과 양방향 동기화
3. CI에서 토큰 변경 감지 시 Figma 동기화 자동 트리거

**노력:** L (4-5일)

---

## 6. 업계 비교 분석

| 영역        | Strata  | Shadcn/ui | Radix Themes | Mantine |
| ----------- | ------- | --------- | ------------ | ------- |
| 토큰 설계   | **9**   | 6         | 8            | 7       |
| 접근성      | **8.5** | 7         | **9**        | 7       |
| 컴포넌트 수 | 6       | 7         | 5            | **9**   |
| SSR/RSC     | 2       | **8**     | 7            | **8**   |
| 테스트      | **8**   | 4         | 7            | **8**   |
| DX          | 8       | **9**     | 7            | 8       |
| AI 통합     | **9**   | 3         | 2            | 2       |
| 거버넌스    | **9**   | 5         | 7            | 7       |

**Strata 차별점:**

- **토큰 설계**: 3-layer OKLch 아키텍처는 Shadcn/ui(CSS var 단층)와 Mantine(JS theme object)보다 구조적으로 우수
- **AI 통합**: llms.md + Storybook MCP + 컴포넌트 .md 3-tier 전략은 업계 유일
- **거버넌스**: ADR/FMEA 기반 결정 추적은 Radix Themes(내부 문서)보다 투명

**Strata 약점:**

- **SSR/RSC**: 유일하게 `"use client"` 미지원. 프레임워크 호환성에서 Shadcn/ui, Mantine에 크게 뒤처짐
- **컴포넌트 수**: Mantine(100+), Chakra(80+) 대비 57개로 커버리지 부족

---

## 7. 결론

### Alpha → Beta 전환 최소 요구사항

| 항목          | 현재 상태                    | 필요 액션                  |
| ------------- | ---------------------------- | -------------------------- |
| SSR/RSC       | `"use client"` 0건           | 전 컴포넌트 directive 추가 |
| 트리쉐이킹    | component-level exports 없음 | exports 필드 확장          |
| Layout 테스트 | 미커버 컴포넌트 존재         | 6-fold 테스트 추가         |
| 온보딩 문서   | preset.css 미안내            | README 업데이트            |

### Beta → 1.0 전환 조건

| 항목          | 현재 상태                | 필요 액션                         |
| ------------- | ------------------------ | --------------------------------- |
| 커스텀 테마   | 3개 하드코딩             | `createTheme()` API               |
| 핵심 컴포넌트 | Combobox/DatePicker 부재 | Phase 1-2 개발                    |
| Changelog     | CHANGELOG.md 없음        | changesets 도입                   |
| 버전 정책     | 미정의                   | semver 정책 + 마이그레이션 가이드 |

### 최종 평가

Strata의 기반 아키텍처(토큰, Radix 통합, 테스트 전략, 거버넌스)는 업계 상위 10% 수준이다. 특히 AI 통합 전략은 선구적이며, ADR/FMEA 기반 거버넌스는 1인 프로젝트의 한계를 넘어선다. SSR/RSC 지원과 트리쉐이킹 최적화를 완료하면, 프로덕션 환경에서 Shadcn/ui의 강력한 대안이 될 잠재력을 가지고 있다.

---

## 8. 부록

### A. 토큰 인벤토리 요약

| 레이어       | 접두사                                                                                       | 토큰 수 (약) | 역할                                                     |
| ------------ | -------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------- |
| L1 Primitive | `--sp-*`                                                                                     | ~100         | OKLch 색상, spacing, typography, motion, radius, z-index |
| L2 Semantic  | `--color-*`, `--fg-*`, `--surface-*`, `--border-*`, `--density-*`, `--motion-*`, `--focus-*` | ~62          | 의미 기반 매핑, 테마/모드/밀도 오버라이드                |
| L3 Component | `--btn-*`, `--input-*`, `--dialog-*`, `--menu-*` 등 19개 그룹                                | ~90          | 컴포넌트별 커스터마이징 포인트                           |

### B. 컴포넌트 파일 구조 패턴

| Tier | 파일 구성                                                               | 예시                         |
| ---- | ----------------------------------------------------------------------- | ---------------------------- |
| 0    | `Component.tsx`                                                         | Text, Badge, Divider         |
| 1    | `.tsx` + `.variant.ts` + `.md` + `.stories.tsx` + `.test.tsx`           | Button, Heading, StatusDot   |
| 2    | `.tsx` + `.type.ts` + `index.ts` + `.md` + `.stories.tsx` + `.test.tsx` | Dialog, Select, Card, Tabs   |
| 3    | Tier 2 + `.hook.ts` / `.policy.ts`                                      | FormField (validation logic) |
