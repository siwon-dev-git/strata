# Strata Design System — 종합 개선 리포트

> **평가일**: 2026-03-01
> **대상**: Strata Design System v0.1.0-alpha.0
> **평가자**: System Architecture Reviewer
> **관점**: 프로게이머 출신 개발자 — 본질에 집중, 승리공식 도출
> **범위**: 아키텍처 · 토큰 시스템 · 컴포넌트 패턴 · 테스트 · CI/CD · 소비자 DX · 확장성

---

## 1. Executive Summary

**종합: 8.5 / 10 — "설계는 프로급, 실행에 구멍"**

솔로 개발자가 만든 프로젝트 치고 아키텍처 완성도가 비정상적으로 높다.
3-layer 토큰, Radix headless 기반, 6-fold 테스트 규율, ADR/FMEA heritage 시스템까지
— 대기업 디자인 시스템 팀의 설계 원칙에 뒤지지 않는다.

**하지만 alpha에서 beta로 가는 데 가장 큰 리스크는 "자기 규칙 위반"이다.**
ADR에서 선언한 `semantic-token-only`를 L3 토큰 파일 자체가 13곳에서 어기고 있다.
이건 코드 품질이 아니라 **시스템 신뢰도** 문제다.

### Scorecard

| 영역               | 점수  | 한줄 판정                                              |
| ------------------ | :---: | ------------------------------------------------------ |
| Token Architecture | ★★★★☆ | 설계 최상급, 실행에 레이어 위반 13건                   |
| Component Quality  | ★★★★★ | Radix + CVA + cn() 패턴 일관적, Button 77줄로 완결     |
| Test Coverage      | ★★★★☆ | 52/57 파일 커버, Layout 카테고리 구멍                  |
| CI/CD              | ★★★★☆ | 6-gate + 번들 예산 + 헬스체크, coverage ratchet 미이행 |
| Consumer DX        | ★★★☆☆ | React 19 + Node 22 강제 = 채택 장벽                    |
| AI Integration     | ★★★★★ | 3-tier 소비, 자동생성, MCP — 업계 선도                 |
| Scalability        | ★★★☆☆ | SSR 미검증, 트리셰이킹 미측정, VRT 없음                |

---

## 2. 장점 (Strengths)

### S1. 3-Layer Token Architecture — "기반 시설이 탄탄하다"

```
L1 Primitive (--sp-*)  →  L2 Semantic (--fg-*, --surface-*, --border-*)  →  L3 Component (--btn-*, --input-*)
    OKLch 원시값              의미 부여                                       컴포넌트 특화
```

- **OKLch 색공간**: 인간 지각 기준 균일한 색상 스케일. sRGB 대비 다크/라이트 전환 시 대비 유지
- **토큰 재사용 그룹**: `--menu-*` 하나로 DropdownMenu, ContextMenu, Menubar, NavigationMenu 4개 통제
- **테마 전환 = CSS 변수만 교체**: JS 번들 오버헤드 제로, 런타임 리렌더링 없음
- **GLOSSARY.md**: 접미사 규칙(-bg, -fg, -hover, -active 등)까지 문서화 — 신규 기여자 온보딩에 결정적

**프로게이머 비유**: "APM이 높아도 핫키 세팅이 엉망이면 의미 없다. 토큰 아키텍처가 이 프로젝트의 핫키 세팅이고, 잘 짜여져 있다."

### S2. Radix UI Headless Foundation — "바퀴 재발명 안 한다"

- 27개 Radix 프리미티브 → 키보드 내비게이션, 포커스 트랩, WAI-ARIA 패턴 무료
- Strata 레이어는 **스타일링 + 토큰 바인딩만** 담당 → 관심사 분리 교과서급
- `asChild` + `@radix-ui/react-slot`으로 다형성(polymorphism) 지원
- Button 컴포넌트 전체가 77줄 — Radix가 복잡성을 흡수한 결과

**핵심 포인트**: Radix는 접근성 전문가들이 유지보수한다. Strata가 직접 ARIA 스펙을 구현할 필요 없음.

### S3. 6-Fold Test Discipline — "연습은 실전처럼"

| 카테고리       | 검증 대상              | 예시                           |
| -------------- | ---------------------- | ------------------------------ |
| Rendering      | 컴포넌트 마운트        | `getByRole('button')`          |
| Props          | 모든 variant/size 조합 | `variant="danger"` 클래스 확인 |
| Happy Path     | 정상 사용 흐름         | `click → onClick 호출`         |
| Action Failure | 비활성/로딩 상태       | `disabled → onClick 미호출`    |
| Keyboard       | 키보드 접근성          | `Enter/Space → 동작`           |
| ARIA           | 시맨틱 HTML            | `aria-busy`, `aria-label`      |

- 52개 테스트 파일, 193+ 테스트 케이스
- `setup.ts`에서 jsdom 폴리필 중앙 관리 (ResizeObserver, scrollIntoView, pointerCapture)
- Storybook `play()` 함수로 시각적 + 인터랙션 검증 이중화

### S4. CI/CD & Heritage System — "같은 실수 두 번 안 한다"

```
G0 (local) → G1 (format+lint) → G2 (typecheck+test) → G3 (build+bundle budget)
→ G4 (PR size label) → G5 (publish + Sigstore OIDC)
```

- **ADR** (Architecture Decision Records): 30+ 의사결정 기록. 변경 근거 추적 가능
- **FMEA** (Failure Mode & Effect Analysis): 16개 활성 실패 패턴 카탈로그화
- **번들 예산**: 512KB 하드 게이트, 400KB 소프트 경고
- **헬스체크**: 주간 자동 실행, 의존성 업데이트 + 번들 크기 + 테스트 수 모니터링
- **Sigstore OIDC**: NPM publish 시 패키지 무결성 증명 — 공급망 보안

**Heritage 시스템은 이 프로젝트의 가장 독특한 자산이다.** 대부분의 오픈소스 프로젝트에 없는 실패 패턴 카탈로그를 운영한다는 것은 엔지니어링 성숙도가 높다는 증거.

### S5. AI Integration (3-Tier) — "미래를 준비하고 있다"

| Tier | 자산           | 용도                       | 토큰 크기 |
| ---- | -------------- | -------------------------- | --------- |
| 1    | `llms.md`      | 빠른 인덱스 검색           | ~5K       |
| 2    | Storybook MCP  | 실시간 컴포넌트 매니페스트 | 동적      |
| 3    | `llms-full.md` | 전체 API 문서              | ~76K      |

- `prebuild` 훅으로 자동 생성 → stale 위험 최소
- 각 컴포넌트 `.md`에 Role/Tier/Props/Constraints/Override 패턴 구조화
- Claude Code 스킬 시스템(`/sprint`, `/commit`, `/convention`)까지 내장

**이건 2026년 기준으로도 선도적이다.** AI가 코드를 이해하도록 인프라를 설계한 디자인 시스템은 드물다.

---

## 3. 약점 & 개선 요구사항 (Weaknesses & Improvements)

### W1. Token Layer Rule Violations — Critical

> ADR `semantic-token-only`: "No hardcoded CSS colors. Use `var(--xxx)` only"
> 토큰 규칙: "L1→L2→L3 — 레이어를 건너뛰지 않는다"

**위반 목록** (`src/tokens/layer3-component.css`):

| Line | Token                      | 참조                         | 위반 유형       |
| :--: | -------------------------- | ---------------------------- | --------------- |
|  70  | `--tooltip-bg`             | `var(--sp-gray-800)`         | L3→L1 직접 참조 |
|  71  | `--tooltip-fg`             | `var(--sp-gray-50)`          | L3→L1 직접 참조 |
|  90  | `--switch-bg`              | `var(--sp-gray-600)`         | L3→L1 직접 참조 |
|  92  | `--switch-thumb`           | `var(--sp-gray-50)`          | L3→L1 직접 참조 |
|  95  | `--slider-track`           | `var(--sp-gray-700)`         | L3→L1 직접 참조 |
|  97  | `--slider-thumb`           | `var(--sp-gray-50)`          | L3→L1 직접 참조 |
| 100  | `--progress-track`         | `var(--sp-gray-700)`         | L3→L1 직접 참조 |
| 115  | `--checkbox-fg`            | `var(--sp-gray-50)`          | L3→L1 직접 참조 |
| 138  | `--skeleton-bg`            | `var(--sp-gray-700)`         | L3→L1 직접 참조 |
| 139  | `--skeleton-shine`         | `var(--sp-gray-600)`         | L3→L1 직접 참조 |
| 145  | `--scrollarea-thumb`       | `var(--sp-gray-500)`         | L3→L1 직접 참조 |
| 146  | `--scrollarea-thumb-hover` | `var(--sp-gray-400)`         | L3→L1 직접 참조 |
|  67  | `--overlay-bg`             | `oklch(0 0 0 / 50%)`         | **하드코딩**    |
|  38  | `--input-ring`             | `oklch(0.62 0.21 260 / 25%)` | **하드코딩**    |

**영향**: `data-theme="blue"` 같은 테마로 전환해도 Tooltip, Switch, Slider, Skeleton 등은 색상이 안 바뀐다. 시스템의 핵심 약속("토큰만 바꾸면 전체 테마가 바뀐다")이 깨진다.

**수정 방안**:

1. L2에 시맨틱 토큰 추가: `--fg-on-emphasis`, `--surface-track`, `--surface-emphasis` 등
2. L3에서 새 L2 토큰 참조로 교체
3. 하드코딩 oklch 값 → L1에 프리미티브 추가 후 L2→L3 cascade

**수정 비용**: Low (CSS 변수 리매핑만 필요)
**ROI**: ★★★★★ — 시스템 신뢰도 복구

---

### W2. Layout Category Test Gap — High

**현황**: Layout 5개 컴포넌트 중 **1개만** 테스트 보유

| 컴포넌트  | Test | Stories | .md |
| --------- | :--: | :-----: | :-: |
| AppShell  |  -   |    -    |  O  |
| Container |  -   |    O    |  O  |
| Sidebar   |  -   |    O    |  O  |
| Stack     |  O   |    O    |  O  |
| TopBar    |  -   |    O    |  O  |

**영향**: Layout은 앱 전체의 골격이다. 리그레션이 발생하면 모든 페이지가 깨진다.
Sidebar의 collapse/expand, TopBar의 반응형 동작 같은 핵심 인터랙션이 검증되지 않고 있다.

**수정 방안**:

- 최소 rendering + slot composition + responsive breakpoint 테스트
- Sidebar: collapse 토글, 너비 전환, 키보드 접근성
- AppShell: slot 조합 (Sidebar + TopBar + Content)
- Container: max-width 적용 확인

**수정 비용**: Medium
**ROI**: ★★★★

---

### W3. Adoption Barrier — High

| 요구사항 | 현재      | 업계 표준        | 영향                         |
| -------- | --------- | ---------------- | ---------------------------- |
| React    | `^19.0.0` | `>=17` or `>=18` | React 18 사용자 전원 배제    |
| Node.js  | `>=22`    | `>=18` or `>=20` | Node 20 LTS 사용자 빌드 불가 |
| Module   | ESM-only  | ESM + CJS        | 레거시 번들러 호환 불가      |

**디자인 시스템의 가치는 채택률에 비례한다.** 아무도 안 쓰는 완벽한 시스템보다, 많이 쓰이는 좋은 시스템이 낫다.

React 19 의존성이 정말 필요한지 감사 필요:

- `ref`를 prop으로 직접 받는 패턴 (React 19) → `forwardRef`로 대체 가능
- 그 외 React 19 전용 API 사용 여부 확인 필요

**수정 방안**:

1. React 18/19 호환성 감사 (React 19 전용 API 검출)
2. Node 요구사항 `>=20`으로 완화 가능성 확인
3. CJS 빌드 추가는 유지보수 비용이 높으므로 채택 수요 확인 후 결정

**수정 비용**: High (호환성 감사 + 잠재적 리팩토링)
**ROI**: ★★★★ — 채택률 직결

---

### W4. CVA Variant Inconsistency — Medium

57개 컴포넌트 중 **5개만** `.variant.ts` 분리:

```
Button.variant.ts    ✓
Badge.variant.ts     ✓
StatusDot.variant.ts ✓
ToggleGroup.variant.ts ✓
Heading.variant.ts   ✓
... 나머지 52개: 스타일 인라인
```

**문제**: 소비자가 `buttonVariants()`처럼 variant 함수를 재사용할 수 있는 건 5개뿐. 나머지 컴포넌트의 스타일은 외부에서 접근 불가.

**모든 컴포넌트에 필요하진 않다.** Separator, VisuallyHidden 같은 단순 컴포넌트는 variant가 불필요.
하지만 Card, Input, Select, Alert 같이 **소비자가 자주 커스터마이징하는** 컴포넌트는 variant 추출이 DX를 크게 개선한다.

**수정 방안**: 커스터마이징 빈도 높은 컴포넌트 우선 추출
**수정 비용**: Medium
**ROI**: ★★★

---

### W5. No Visual Regression Testing — Medium

`.storybook/screenshots/` 디렉토리가 존재하지만 **자동 비교 파이프라인이 없다.**

토큰 기반 시스템에서 VRT(Visual Regression Testing)가 특히 중요한 이유:

- L2 시맨틱 토큰 하나를 변경하면 **수십 개 컴포넌트**의 시각적 출력이 바뀜
- 의도한 변화와 의도치 않은 변화를 구분하는 유일한 방법이 VRT

**수정 방안**:

- Option A: Chromatic (Storybook 네이티브, 유료)
- Option B: Playwright screenshot comparison (무료, CI 직접 관리)
- Option C: Storybook test-runner + screenshot comparison addon

**수정 비용**: Medium
**ROI**: ★★★

---

### W6. Coverage Ratchet Not Enforced — Medium

ADR에서 `coverage-ratchet`을 선언했다:

> "Threshold auto-rises to current - 1%. Blocks regression only"

하지만 CI의 `pnpm test:ci`는 `vitest run`이다. **coverage 플래그가 없다.**
선언한 규칙이 시행되지 않으면 규칙이 아니라 소원이다.

**수정 방안**:

1. `vitest run --coverage` 추가
2. `vitest.config`에 coverage threshold 설정
3. PR 코멘트로 커버리지 변화 리포트

**수정 비용**: Low
**ROI**: ★★★★

---

### W7. Tree-Shaking Unverified — Low-Medium

`vite.lib.config.ts`에서 `preserveModules: true`로 tree-shaking을 의도했지만, **실제 소비자 측에서 검증한 적 없다.**

Radix 프리미티브 27개가 dependencies에 있다. 소비자가 Button만 `import`해도 사용하지 않는 Radix 패키지가 번들에 포함될 수 있다.

**수정 방안**:

- `size-limit` 패키지로 소비자 관점 번들 크기 측정
- CI에서 "Button만 import 시 번들 크기" 같은 시나리오 게이트

**수정 비용**: Low
**ROI**: ★★★

---

### W8. SSR/RSC 미문서화 — Low

Next.js App Router가 주류가 된 시점에서 SSR 호환성은 채택 결정 요인이다.

- Radix 컴포넌트는 `"use client"` 디렉티브 필요
- StrataProvider는 `useState` 사용 → 서버 컴포넌트 불가
- 현재 어떤 문서에도 SSR 전략이 없음

**수정 방안**: SSR 가이드 문서 + `"use client"` 디렉티브 전략 수립
**수정 비용**: Medium
**ROI**: ★★

---

### W9. Story Coverage Gap — Low

54개 스토리 파일 / 57개 컴포넌트. 누락:

| 컴포넌트    | Stories | 비고                     |
| ----------- | :-----: | ------------------------ |
| AspectRatio |    -    | Radix 래퍼, 간단         |
| Icon        |    -    | 61개 SVG 아이콘 컴포넌트 |
| AppShell    |    -    | Layout 핵심              |

**수정 비용**: Low
**ROI**: ★★

---

### W10. Demo Coverage CI 미통합 — Low

13개 데모 앱 (Discord, Figma, GitHub, Linear, Notion 등)이 있고 `scripts/demo-coverage.js`도 있지만, **CI 파이프라인에 통합되지 않았다.**

데모 앱은 실질적인 통합 테스트 역할을 한다. 어떤 컴포넌트가 어떤 데모에서 검증되는지 매핑이 자동화되면, 테스트 커버리지의 "실사용 검증" 차원을 추가할 수 있다.

**수정 방안**: `demo-coverage.js`를 health-check 워크플로우에 통합
**수정 비용**: Low
**ROI**: ★★

---

## 4. Priority Matrix

| ID  | 영역    |  심각도  | 수정 비용 |  ROI  | 우선순위 |
| --- | ------- | :------: | :-------: | :---: | :------: |
| W1  | Token   | Critical |    Low    | ★★★★★ |  **P0**  |
| W6  | CI      |  Medium  |    Low    | ★★★★  |  **P0**  |
| W2  | Test    |   High   |  Medium   | ★★★★  |  **P1**  |
| W3  | DX      |   High   |   High    | ★★★★  |  **P1**  |
| W4  | Pattern |  Medium  |  Medium   |  ★★★  |    P2    |
| W5  | CI      |  Medium  |  Medium   |  ★★★  |    P2    |
| W7  | Build   | Low-Med  |    Low    |  ★★★  |    P2    |
| W8  | Compat  |   Low    |  Medium   |  ★★   |    P3    |
| W9  | Docs    |   Low    |    Low    |  ★★   |    P3    |
| W10 | Infra   |   Low    |    Low    |  ★★   |    P3    |

---

## 5. 추천 실행 순서

### Phase 1 — 본진 방어

> "기본기가 무너지면 어떤 빌드 오더도 통하지 않는다."

1. **W1**: L3 토큰 레이어 위반 수정
   - L2에 시맨틱 토큰 추가 (`--fg-on-emphasis`, `--surface-track` 등)
   - L3에서 L2만 참조하도록 리매핑
   - 하드코딩 oklch → L1 프리미티브 추가
2. **W6**: CI에 coverage 추가
   - `vitest run --coverage` + threshold 설정
3. **W9**: 누락 스토리 추가 (AspectRatio, Icon, AppShell)

### Phase 2 — 라인 강화

> "방어선 확장. 약한 고리를 보강한다."

4. **W2**: Layout 컴포넌트 테스트 추가 (AppShell, Container, Sidebar, TopBar)
5. **W4**: 핵심 컴포넌트 variant 분리 (Card, Input, Select, Alert)
6. **W10**: 데모 커버리지 CI 통합

### Phase 3 — 확장 준비

> "내정이 안정되면 외정을 돌본다."

7. **W3**: React 18 호환성 감사 + Node 요구사항 완화
8. **W5**: 시각적 리그레션 테스트 셋업
9. **W7**: Tree-shaking 검증 + size-limit CI 게이트
10. **W8**: SSR 호환성 문서화

---

## 6. 총평

Strata는 **"설계 원칙은 대기업급, 실행 속도는 스타트업급"** 프로젝트다.

솔로 개발자가 이 수준의 아키텍처를 구현한 건 인상적이지만, 빠른 실행 속도의 부작용으로 자기 규칙 위반(W1)과 커버리지 갭(W2, W6)이 누적되고 있다.

프로게이머 관점에서 비유하면:

- **APM(기술력)**: 높다. 컴포넌트 하나하나의 품질이 좋고 패턴이 일관적
- **매크로(전략)**: 우수하다. 3-layer 토큰, heritage 시스템, AI 통합은 장기 관점의 투자
- **멘탈(규율)**: 여기가 흔들린다. 선언한 규칙을 실행에서 놓치고 있다

**alpha → beta 가는 길의 핵심**: W1(토큰 위반)만 고쳐도 시스템 신뢰도가 급상승한다. 비용 대비 효과가 가장 큰 한 수.

---

_Generated by System Architecture Review — 2026-03-01_
