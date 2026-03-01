# Strata Design System — 디자인 전문가 감사 리포트

> **감사일**: 2026-03-01
> **대상 버전**: 0.1.0-alpha.0
> **관점**: Visual Design & UX Quality
> **범위**: 색채 · 타이포그래피 · 공간 · 인터랙션 · 시각적 위계 · 컴포넌트 디자인 · 브랜드 적응성

---

## 1. Executive Summary

**종합: 7.5 / 10 — "토큰 인프라는 최상급, 디자인 디테일에 공백"**

Strata의 디자인 인프라(3-layer 토큰, OKLch 색공간, density 시스템)는 업계 상위 5% 수준이다. 그러나 **인프라를 활용하는 디자인 실행**에서 공백이 발견된다. Spring easing을 정의해놓고 사용하지 않고, surface 명도 차이가 dark mode에서 식별이 어려우며, 컨테이너 계열 컴포넌트의 내부 여백이 통일되지 않았다. 좋은 악기를 갖추었으나 아직 모든 음을 활용하지 못하는 상태다.

### Scorecard

| 영역            |   점수   | 판정                                             |
| --------------- | :------: | ------------------------------------------------ |
| 색채 시스템     | 8.5 / 10 | OKLch 선택 탁월, 보조색 스케일 불균형            |
| 타이포그래피    | 6.5 / 10 | 서체/스케일 적절, line-height·tracking 토큰 부재 |
| 공간 & 레이아웃 | 7.0 / 10 | Density 시스템 우수, 컨테이너 패딩 불일치        |
| 인터랙션 & 모션 | 6.0 / 10 | 토큰 설계 우수, 실제 적용 미흡                   |
| 시각적 위계     | 7.5 / 10 | Surface 모델 명확, dark mode 대비 부족           |
| 컴포넌트 디자인 | 7.5 / 10 | API 일관적, 물리적 피드백 부재                   |
| 브랜드 적응성   | 6.0 / 10 | 테마 메커니즘 존재, 커스텀 진입 장벽 높음        |
| 시스템 완성도   | 7.0 / 10 | 핵심 커버리지 양호, 프로덕트 필수 컴포넌트 결여  |

> **본 리포트는 디자인 품질에 집중한다.** 엔지니어링 이슈(토큰 레이어 위반, SSR/RSC, CI/CD 등)는 기존 리포트(`review.md`, `strata-review.md`, `open-source-audit.md`)를 참조.

---

## 2. 색채 시스템 (Color System)

### 2.1 장점

#### OKLch 색공간 — 지각적 균일성의 실질적 이점

`src/tokens/layer1-primitive.css`에서 모든 색상이 `oklch(lightness chroma hue)` 형식으로 정의된다. 이는 단순한 기술 선택이 아닌 디자인 품질에 직접적 영향을 미친다:

- **동일 lightness = 동일 밝기 인식**: `--sp-blue-500: oklch(0.62 ...)`, `--sp-red-500: oklch(0.63 ...)`, `--sp-green-500: oklch(0.65 ...)` — 세 색상이 나란히 놓여도 밝기가 균일하다. HSL에서는 `hsl(220, 80%, 50%)`과 `hsl(120, 80%, 50%)`의 밝기가 인지적으로 다르게 느껴져 배지나 상태 표시에서 시각적 불균형이 발생한다.
- **WCAG 대비비 예측 가능**: OKLch의 lightness는 인지 밝기에 정렬되므로, `0.97`과 `0.13` 사이의 텍스트 대비를 직관적으로 판단할 수 있다.
- **Chroma 독립 조정**: 채도를 바꿔도 밝기가 변하지 않아 hover/active 상태의 미세 색 변화를 예측 가능하게 설계할 수 있다.

#### Cool-tinted Gray — 의도적 톤 설정

Gray 팔레트가 hue 250°(blue-purple)로 일관 tint된다:

```css
--sp-gray-50: oklch(0.97 0.004 250); /* 거의 무채색 */
--sp-gray-500: oklch(0.5 0.013 250); /* 미묘한 cool tint */
--sp-gray-950: oklch(0.08 0.004 250); /* 깊은 어둠 */
```

chroma 값(0.004~0.013)이 극도로 낮아 중립에 가까우면서도, 미묘한 blue-tint가 **테크/프로페셔널** 톤을 형성한다. Linear, Vercel, GitHub의 UI 톤과 동일한 계열이다. 이 선택은 SaaS/개발 도구 맥락에서 적절하다.

#### Interactive Blue — 신뢰와 행동의 색

`--sp-blue-500: oklch(0.62 0.21 260)` — hue 260°(blue-indigo)는 디지털 인터페이스에서 가장 보편적인 CTA 색상이다. 높은 chroma(0.21)로 배경에서 확실히 돋보이면서, indigo 쪽으로 살짝 기울어 보라빛 온기를 더한다.

#### Status 색상 hue 분리

| Status         | Hue  | 심리적 의미                  |
| -------------- | :--: | ---------------------------- |
| Danger/Red     | 25°  | 주의/경고 (따뜻한 빨강-주황) |
| Success/Green  | 155° | 확인/완료 (청록-초록)        |
| Warning/Yellow | 85°  | 주의/경고 (옅은 노랑)        |

hue 간 최소 70° 간격으로, 색각 이상(color blindness)에서도 구별 가능한 설계다. Red(25°)가 pure red(0°)가 아닌 warm red인 점도 좋다 — pure red는 공격적으로 느껴지지만, 25°는 경고의 긴급함을 유지하면서 시각적 불쾌감을 줄인다.

### 2.2 단점 및 개선

#### D1. 보조색 스케일 불균형 — P1

| 팔레트     | 단계 수 | 범위                   |
| ---------- | :-----: | ---------------------- |
| Gray       |   12    | 0~950 (전체)           |
| Blue       |   10    | 50~900 (전체)          |
| Red        |    8    | 50~700                 |
| Green      |    8    | 50~700                 |
| **Yellow** |  **5**  | 50, 100, 400, 500, 600 |
| **Purple** |  **5**  | 50, 100, 400, 500, 600 |
| **Orange** |  **3**  | 400, 500, 600          |

Yellow/Purple/Orange에 200~300 단계가 없어 **미세 그라데이션** 표현이 불가하다.

**실제 영향**:

- Warning 배지의 배경색(`--color-warning-subtle`)이 `oklch(0.8 0.16 85 / 12%)` — 투명도로 밝기를 조절하고 있다. Yellow-100(`oklch(0.93)`)과 Yellow-400(`oklch(0.8)`) 사이에 아무것도 없으므로, 중간 톤이 필요할 때 투명도 핵에 의존해야 한다.
- Orange가 3단계뿐이라 secondary accent color로 활용 불가.

**권고**: Yellow 200, 300, 700과 Purple 200, 300, 700, Orange 50, 100, 200, 300, 700 추가. lightness를 Blue/Red/Green과 동일한 패턴으로 확장:

```css
/* 권고 추가 예시 */
--sp-yellow-200: oklch(0.87 0.08 85);
--sp-yellow-300: oklch(0.79 0.12 85);
--sp-yellow-700: oklch(0.45 0.14 85);
```

#### D2. Light mode warning text 가독성 위험 — P1

`src/tokens/layer2-semantic.css`에서:

```css
/* Dark mode (default) */
--color-warning-fg: oklch(0.08 0.01 250); /* 거의 검정 */

/* Light mode — 오버라이드 없음! */
```

Light mode에서 `--color-warning-fg`가 dark mode 값(거의 검정)을 그대로 상속받는다. 이것 자체는 light 배경 위 어두운 텍스트로 가독성이 문제없지만, dark mode에서 `warning-subtle` 배경(12% 투명도 적용된 노랑) 위에 거의 검정 텍스트가 놓이면 **대비비가 부족**할 수 있다. 실제 렌더링에서 확인이 필요하다.

#### D3. Cool Gray 고정 — 브랜드 적응성 제한 — P2

hue 250°로 고정된 Gray는 **warm brand**(e.g., 커피 브랜드, 럭셔리, 내추럴 계열)에 어울리지 않는다.

**권고**: L1에 neutral gray(hue 0, chroma 0)와 warm gray(hue 50°, chroma 0.006) 변형을 추가하고, L2에서 `[data-gray='warm']`, `[data-gray='neutral']` selector로 전환.

---

## 3. 타이포그래피 (Typography)

### 3.1 장점

#### Inter — 현대 UI 서체의 표준

`src/index.css`에서 `--font-sans: 'Inter', -apple-system, ...` 정의. Inter는:

- **x-height가 높아** 작은 사이즈(12px~14px)에서도 가독성 유지
- **Tabular figures** 기본 제공 — 숫자 정렬이 중요한 테이블/대시보드에 적합
- **Variable font** 지원 — 단일 파일로 모든 weight/width 커버 (번들 최적화)
- SaaS/개발 도구 시장에서 사실상 표준 (Vercel, Linear, Figma)

#### Semantic Typography Scale — 의미 기반 사용 장려

```css
--type-display: var(--sp-text-4xl); /* 2.25rem = 36px */
--type-title: var(--sp-text-2xl); /* 1.5rem  = 24px */
--type-heading: var(--sp-text-xl); /* 1.25rem = 20px */
--type-body: var(--sp-text-base); /* 1rem    = 16px */
--type-label: var(--sp-text-sm); /* 0.875rem= 14px */
--type-caption: var(--sp-text-xs); /* 0.75rem = 12px */
```

개발자가 `font-size: 14px` 대신 `var(--type-label)`을 사용하도록 유도. 반응형에서 `--type-display`만 `2xl`로 축소하면 전체 레이아웃이 모바일에 적응한다.

#### 스케일 비율 분석

실제 비율을 계산하면:

| 단계 |  rem  | 비율 (이전 대비) |
| ---- | :---: | :--------------: |
| xs   | 0.75  |        —         |
| sm   | 0.875 |      1.167       |
| base |  1.0  |      1.143       |
| lg   | 1.125 |      1.125       |
| xl   | 1.25  |      1.111       |
| 2xl  |  1.5  |      1.200       |
| 3xl  | 1.875 |      1.250       |
| 4xl  | 2.25  |      1.200       |

비율이 1.111~1.250 사이에서 변동한다. **Major Second(1.125)**에 가깝지만 완벽하게 일치하지는 않는다. 이것이 반드시 문제는 아니다 — 실용적 크기(h-7=28px, h-11=44px에 맞추기)를 위한 의도적 조정일 수 있다. 다만, **시각적 리듬의 일관성**은 완전한 수학적 스케일보다 약간 약하다.

### 3.2 단점 및 개선

#### D4. line-height 토큰 부재 — P0

**이것은 가장 큰 타이포그래피 갭이다.**

현재 모든 텍스트가 Tailwind 기본 line-height에 의존한다. heading(`text-xl`)과 body(`text-base`)의 행간이 동일한 비율(약 1.5)로 적용되는데, **타이포그래피 원칙상 큰 텍스트는 더 좁은 행간이 필요하다.**

```
display (36px) → line-height 1.1~1.2 (tight)
heading (20px) → line-height 1.2~1.3 (snug)
body    (16px) → line-height 1.5~1.6 (normal)
caption (12px) → line-height 1.4~1.5 (normal)
```

**권고**: L1에 line-height primitive 추가:

```css
--sp-leading-tight: 1.15;
--sp-leading-snug: 1.3;
--sp-leading-normal: 1.5;
--sp-leading-relaxed: 1.65;
```

L2에서 semantic 매핑:

```css
--type-display-leading: var(--sp-leading-tight);
--type-heading-leading: var(--sp-leading-snug);
--type-body-leading: var(--sp-leading-normal);
```

#### D5. letter-spacing 토큰 부재 — P1

대문자 라벨(예: Badge의 "NEW", 상태 텍스트)에서 tracking을 넓히면 가독성이 향상된다. 반대로 큰 display 텍스트는 tracking을 좁혀야 글자가 흩어지지 않는다.

**권고**:

```css
--sp-tracking-tighter: -0.02em; /* display */
--sp-tracking-tight: -0.01em; /* heading */
--sp-tracking-normal: 0; /* body */
--sp-tracking-wide: 0.025em; /* label/uppercase */
--sp-tracking-wider: 0.05em; /* caption/all-caps */
```

#### D6. font-weight 토큰 부재 — P2

`font-medium`, `font-semibold`가 Tailwind 유틸리티로만 사용된다. 디자인 시스템 관점에서 weight도 토큰화해야 **한 곳에서 전체 무게감(typographic color)을 조정**할 수 있다.

```css
--sp-weight-normal: 400;
--sp-weight-medium: 500;
--sp-weight-semibold: 600;
--sp-weight-bold: 700;
```

---

## 4. 공간 & 레이아웃 리듬 (Spacing & Layout)

### 4.1 장점

#### Density 시스템 — 단일 attribute로 전체 밀도 전환

```css
/* Compact */
[data-density='compact'] {
  --density-item-height: 1.75rem; /* 28px */
  --density-padding-x: var(--sp-space-2); /* 8px */
}

/* Comfortable (default) */
--density-item-height: 2.25rem; /* 36px */
--density-padding-x: var(--sp-space-4); /* 16px */

/* Spacious */
[data-density='spacious'] {
  --density-item-height: 2.75rem; /* 44px */
  --density-padding-x: var(--sp-space-6); /* 24px */
}
```

이것은 **뛰어난 설계**다. 대시보드(compact), 일반 앱(comfortable), 접근성 우선(spacious)을 `data-density` 하나로 전환한다. Button의 `md` size가 `h-[--density-item-height]`를 참조하여 density 변경에 자동 반응하는 구현이 일관적이다.

#### Spacing Scale — 실용적 범위

`0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16` (단위: space-N × 0.25rem)

0~4rem(64px) 범위로 UI 레이아웃의 99%를 커버한다. `0.5`와 `1.5` fractional 값은 Radix 컴포넌트의 미세 간격에 유용하다.

### 4.2 단점 및 개선

#### D7. Button sm/lg가 density 비적응 — P1

`src/components/primitives/Button/Button.variant.ts`:

```typescript
size: {
  sm: 'h-7 px-3 text-xs gap-1.5',           // 28px 고정
  md: 'h-[--density-item-height] px-[--density-padding-x] text-sm gap-[--density-gap]',  // density 반응
  lg: 'h-11 px-5 text-base gap-2.5',         // 44px 고정
  icon: 'h-[--density-item-height] w-[--density-item-height] p-0',  // density 반응
}
```

`md`와 `icon`은 density 토큰을 참조하지만, **`sm`과 `lg`는 하드코딩**이다. compact density에서 `sm` 버튼(28px)은 compact `md`(28px)와 동일한 높이가 된다 — **사이즈 구분이 소멸**한다.

**권고**: sm/lg도 density 기반으로 전환하되, 비례 관계를 토큰화:

```css
--density-item-height-sm: calc(var(--density-item-height) - 0.5rem);
--density-item-height-lg: calc(var(--density-item-height) + 0.5rem);
```

#### D8. 컨테이너 패딩 불일치 — P0

| 컴포넌트      | 내부 패딩                             | 파일            |
| ------------- | ------------------------------------- | --------------- |
| Card body     | `p-4` (16px)                          | `Card.tsx:57`   |
| Card header   | `px-4 pt-4 pb-0` (16px 좌우, 16px 상) | `Card.tsx:41`   |
| Dialog body   | `px-5 py-4` (20px 좌우, 16px 상하)    | `Dialog.tsx:83` |
| Dialog header | `px-5 py-4` (20px 좌우, 16px 상하)    | `Dialog.tsx:66` |
| Dialog footer | `px-5 py-3` (20px 좌우, 12px 상하)    | `Dialog.tsx:99` |
| Alert         | `p-4` (16px)                          | `Alert.tsx:37`  |
| Toast         | 토큰 의존                             | —               |

Card는 `p-4`(16px), Dialog는 `px-5`(20px). **같은 "내용을 담는 컨테이너" 역할인데 좌우 여백이 다르다.** 이 불일치는 Card 안에 Dialog를 여는 UI에서 시각적 점프를 만든다.

**권고**: 컨테이너 공통 padding 토큰 도입:

```css
--container-padding-x: var(--sp-space-5); /* 20px — 표준 컨테이너 좌우 */
--container-padding-y: var(--sp-space-4); /* 16px — 표준 컨테이너 상하 */
```

Card, Dialog, Alert, Toast가 이 토큰을 공유하면 시각적 일관성이 보장된다.

#### D9. InputGroup 위치 하드코딩 — P2

`src/components/primitives/Input/Input.tsx:87,93`:

```tsx
<span className="pointer-events-none absolute left-3 ...">  {/* 12px */}
<span className="pointer-events-none absolute right-3 ..."> {/* 12px */}
```

Input size가 sm/md/lg로 변하는데, prefix/suffix 위치는 `left-3`(12px)으로 고정이다. `sm` Input(높이 28px, px-2)에서 prefix 아이콘이 Input 텍스트와 겹칠 수 있다.

**권고**: size prop에 따라 offset을 조정하거나, density 토큰 기반으로 전환.

---

## 5. 인터랙션 & 모션 디자인 (Interaction & Motion)

### 5.1 장점

#### Semantic Motion Intent — 의도 기반 타이밍

```css
--motion-duration-fast: 100ms; /* 즉각 피드백 (active/press) */
--motion-duration-normal: 150ms; /* 표준 전환 (hover) */
--motion-duration-slow: 300ms; /* 복잡한 전환 (expand) */
--motion-duration-entrance: 200ms; /* 등장 */
--motion-duration-exit: 150ms; /* 퇴장 (항상 entrance보다 빠름) */
```

**entrance > exit** 비대칭은 모션 디자인의 핵심 원칙이다. 사용자 주의를 끌어야 하는 entrance는 느리게, 치우는 exit는 빠르게. 이 원칙이 토큰 레벨에서 강제된다.

#### Spring Easing 정의

```css
--sp-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

1.56의 overshoot 파라미터는 약 10%의 튀어넘김(bounce)을 만든다. iOS의 기본 spring에 근접한 cubic-bezier 근사치로, **물리적 사실감**을 제공한다.

#### Reduced Motion — 접근성 최우선

`src/tokens/layer2-semantic.css:97-107`에서 모든 duration을 0ms로, `src/index.css:129-137`에서 모든 animation/transition을 0.01ms로 무력화. **이중 보호**가 인상적이다.

### 5.2 단점 및 개선

#### D10. Spring Easing 미활용 — P1

`--sp-ease-spring`이 L1에 정의되고 `--motion-ease-spring`으로 L2에 매핑되지만, **실제 컴포넌트에서 사용하는 곳이 거의 없다.**

현재 Button은 `transition-colors duration-[--motion-duration-normal]`만 사용한다. Dialog는 `animate-in`/`animate-out`으로 Tailwind CSS 애니메이션 유틸리티에 의존한다.

spring easing이 효과적일 컨텍스트:

- Sidebar collapse/expand (width 전환)
- Accordion open/close (height 전환)
- Sheet slide-in (translateX 전환)
- Toast entrance (translateY 전환)

**권고**: 물리적 공간 이동이 있는 애니메이션에 `--motion-ease-spring` 적용. 색상 전환에는 기존 `ease-default` 유지.

#### D11. Hover→Active 물리적 피드백 부재 — P1

Button의 hover→active 전환:

```
hover: 배경색 변경만 (bg-hover)
active: 배경색 변경만 (bg-active)
```

**현실 세계의 버튼을 누르면 눌림(depression)이 발생한다.** 디지털에서 이를 표현하는 방법:

1. **Scale**: `active:scale-[0.98]` — 미묘한 축소로 누르는 느낌
2. **Shadow reduction**: `active:shadow-none` — 깊이가 사라지며 표면에 밀착
3. **TranslateY**: `active:translate-y-px` — 1px 아래로 밀림

현재 Strata의 Button은 **색상만으로 상태를 표현**하여, 촉각적 피드백(tactile feedback)이 부재하다.

**권고**: solid variant에 `active:scale-[0.98]` + `transition-transform` 추가. 이것만으로도 체감 품질이 크게 향상된다.

#### D12. Card hover에 elevation 변화 없음 — P2

`src/components/primitives/Card/Card.tsx`:

```typescript
interactive: [
  'hover:bg-[--card-bg-hover] hover:border-[--card-border-hover]',
  'cursor-pointer transition-colors',
];
```

배경과 보더 색만 변한다. **hover 시 shadow-md → shadow-lg 전환**이 있으면 카드가 "떠오르는" 물리적 은유(material metaphor)를 제공한다.

**권고**:

```typescript
'hover:bg-[--card-bg-hover] hover:border-[--card-border-hover] hover:shadow-[--shadow-md]',
'transition-[colors,box-shadow]',
```

#### D13. Skeleton shimmer 토큰 미활용 — P2

Skeleton 컴포넌트의 shimmer 효과가 `@keyframes` CSS 애니메이션에 하드코딩된 duration/easing을 사용할 가능성이 높다. 모션 토큰(`--motion-duration-slow`, `--motion-ease`)과 연결되지 않으면 전역 모션 튜닝에서 제외된다.

---

## 6. 시각적 위계 & Surface 시스템 (Visual Hierarchy)

### 6.1 장점

#### 5단계 Surface 모델 — 명확한 공간 구분

```
base(950) → raised(900) → overlay(800) → inset(0.06) → disabled(800)
```

이 계층은 **물리적 레이어 모델**을 따른다:

- `base`: 바닥 — 앱의 배경
- `raised`: 바닥 위 카드/패널
- `overlay`: 카드 위 떠있는 메뉴/다이얼로그
- `inset`: 바닥 아래 움푹 파인 영역(input 배경)

이 mental model이 일관되면 사용자가 "이 UI는 어디에 놓여있는가"를 무의식적으로 인식한다.

#### Shadow + Dark mode opacity 보정

```css
/* Dark mode */
--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.3);
--shadow-lg: 0 10px 15px oklch(0 0 0 / 0.5);

/* Light mode */
--shadow-sm: 0 1px 2px oklch(0 0 0 / 0.06);
--shadow-lg: 0 10px 15px oklch(0 0 0 / 0.15);
```

dark mode에서 shadow opacity를 5배 증가시킨 것은 정확한 판단이다. 어두운 배경에서 shadow가 보이려면 더 강한 대비가 필요하다.

### 6.2 단점 및 개선

#### D14. Dark mode surface 간 명도 대비 부족 — P0

OKLch lightness 값:

```
base:    0.08  (--sp-gray-950)
raised:  0.13  (--sp-gray-900)  Δ = 0.05
overlay: 0.20  (--sp-gray-800)  Δ = 0.07
```

base→raised 간 **Δ0.05**는 인지 임계값(JND, Just Noticeable Difference)에 가까운 수준이다. 특히 밝은 환경에서 모니터를 보거나, 보급형 모니터(낮은 대비비)에서는 **카드와 배경이 거의 구분되지 않는다.**

비교: Material Design 3의 dark surface는 `surface: #1C1B1F`, `surfaceContainer: #211F26`으로 약 Δ0.03 정도인데, 이는 elevation-based shadow로 보완한다. Strata는 shadow가 sm/md/lg 3단계뿐이고 기본 카드에 shadow가 없으므로, 순수 배경색 차이에 의존한다.

**권고**:

1. `--sp-gray-900`의 lightness를 0.13→0.15로 상향 (Δ0.07로 확대)
2. 또는 Card에 기본 `shadow-sm` 적용

#### D15. Card vs Dialog 시각적 구분 약화 — P1

|            | Card                        | Dialog                       |
| ---------- | --------------------------- | ---------------------------- |
| Background | `surface-raised` (gray-900) | `surface-overlay` (gray-800) |
| Border     | `border-subtle` (gray-800)  | `border-subtle` (gray-800)   |
| Shadow     | 없음                        | `shadow-lg`                  |
| Radius     | `radius-lg` (12px)          | `radius-xl` (16px)           |

유일한 차이가 shadow와 radius 4px 차이다. **모달이 열렸을 때, 뒤의 카드와 모달의 시각적 "무게감" 차이가 크지 않다.** Overlay 배경(50% 어둡게)이 주의 집중 역할을 대부분 맡고 있으나, Dialog 자체의 존재감이 약하다.

**권고**:

- Dialog에 더 밝은 surface 사용 (예: `gray-700` = lightness 0.28)
- 또는 Dialog border를 `border-default`(gray-700)로 강화

#### D16. Overlay 배경 하드코딩 — P1

`src/tokens/layer3-component.css:67`:

```css
--overlay-bg: oklch(0 0 0 / 50%);
```

이 값이 L1 primitive도 L2 semantic도 아닌 **raw oklch 하드코딩**이다. Light mode에서는 50% 검정이 너무 강하고, 밝은 테마에서는 30~40%가 적절할 수 있다. 테마 전환 시 조절 불가.

**권고**: L2에 `--overlay-opacity` semantic token 추가:

```css
/* Dark */
--overlay-bg: oklch(0 0 0 / 50%);
/* Light */
--overlay-bg: oklch(0 0 0 / 30%);
```

---

## 7. 컴포넌트 디자인 비평 (Component Design Critique)

### 7.1 Button — 8/10

**장점:**

- 4 variant(solid/ghost/outline/danger) × 4 size(sm/md/lg/icon) = 16 조합. 대부분의 UI 패턴 커버
- Outline hover에서 `border-interactive` 색 전환 — 미묘하지만 세련된 accent shift
- Touch target(2.75rem) pseudo-element — WCAG 2.5.8 준수하면서 시각적 크기에 영향 없음
- Loading spinner 교체 시 children 유지 — 레이아웃 시프트 방지

**개선 필요:**

- Ghost variant의 hover가 배경색만 변경 (`bg-interactive-subtle`). **텍스트 색상 변화가 없어 피드백이 약하다.** 텍스트를 `--color-interactive`로 변경하면 "이 버튼은 활성 상태다"라는 인식이 강화된다.
- Active 상태에 물리적 피드백 없음 (D11 참조)
- `outline` variant의 hover에서 배경이 `border-interactive` 색으로 전환되는데, `bg` 속성에 border 토큰을 사용하는 것은 의미론적으로 혼란. `bg-[--color-interactive-subtle]`이 더 명확.

### 7.2 Input/Select — 7/10

**장점:**

- `--input-bg: var(--surface-inset)` — inset surface로 "입력 가능한 영역"을 시각적으로 구분
- Error 상태 `border-danger` — 명확한 시각적 경고
- Focus ring이 `--focus-ring-color`로 통일 — 모든 form 요소가 동일한 포커스 스타일

**개선 필요:**

- `--input-ring: oklch(0.62 0.21 260 / 25%)` 하드코딩. 테마가 purple/green으로 바뀌어도 focus ring이 blue로 고정된다.
- InputGroup의 `pointer-events-none` prefix/suffix가 **클릭 가능한 suffix(검색 아이콘 클릭, clear 버튼)**를 원천 차단한다. `action` slot이 필요하다.
- Select trigger가 Input과 동일한 시각적 언어를 사용하는데, 펼침 가능(expandable)하다는 시각적 힌트가 **chevron 아이콘에만 의존**. hover 시 미묘한 배경 변화가 있으면 "이것은 인터랙티브하다"라는 인식 강화.

### 7.3 Card — 6.5/10

**장점:**

- 단순한 API (`variant: 'default' | 'interactive'`)
- CardHeader/CardBody/CardFooter 3-section 구조

**개선 필요:**

- Interactive hover에 shadow 없음 (D12 참조)
- **CardHeader `pb-0` 설계**: Header와 Body 사이 여백이 Body의 `pt-4`(16px)에만 의존. 이 의존성이 깨지면 (예: CardBody를 생략하고 커스텀 콘텐츠 삽입) header와 content가 밀착된다.
- `variant` 2개만 존재. **elevated variant**(shadow 기본 적용)가 없어, 카드를 부유(floating) 상태로 보이게 하려면 소비자가 직접 `className`에 shadow를 추가해야 한다.

**권고**: 3 variant 확장:

```typescript
variant: {
  default: 'bg-[--card-bg] border ...',        // 현재
  interactive: 'bg-[--card-bg] border ... hover:shadow-[--shadow-md]',  // hover shadow 추가
  elevated: 'bg-[--card-bg] shadow-[--shadow-sm] ...',  // 기본 shadow
}
```

### 7.4 Dialog — 7.5/10

**장점:**

- Portal + Overlay + Content 표준 패턴
- `animate-in fade-in-0 zoom-in-95` — 부드러운 entrance
- SimpleDialog convenience wrapper — 80%의 사용 케이스를 단일 props로 해결
- Header/Body/Footer 3-section으로 구조적 일관성

**개선 필요:**

- Dialog Content의 `max-w-lg`(512px) 고정. `size` prop(sm/md/lg/xl/full)이 없어 좁은 확인 대화상자와 넓은 폼 대화상자를 같은 너비로 처리.
- Exit animation이 `fade-out-0 zoom-out-95`만 — scale-based exit가 항상 자연스럽지는 않다. 아래로 살짝 떨어지는(`translateY(8px)`) 중력 기반 exit가 더 물리적이다.
- Close 버튼(X)이 DialogHeader에 포함되지 않음 — SimpleDialog에서도 기본 닫기 버튼을 제공하지 않아 소비자가 직접 추가해야 한다.

### 7.5 Alert — 7/10

**장점:**

- `border-l-4` 좌측 악센트 바 — 클래식하고 스캐닝에 효과적. 사용자가 alert의 종류를 좌측 색상만으로 즉시 판별 가능
- 4 variant(info/success/warning/danger) — 표준 status 커버리지
- `role="alert"` — screen reader 즉시 알림

**개선 필요:**

- Status별 **아이콘이 없다**. 색각 이상 사용자에게 좌측 보더 색만으로는 info/warning/danger 구분이 어렵다. 각 variant에 기본 아이콘(info-circle, check-circle, triangle-alert, x-circle)을 제공해야 한다.
- 닫기 버튼의 SVG가 인라인 하드코딩 — `Icon` 시스템의 `IconX`를 사용해야 일관성 유지.
- 닫기 버튼에 `aria-label`이 없다. 접근성 결함.

### 7.6 EmptyState — 미평가

컴포넌트 존재 확인 (`src/components/feedback/EmptyState/EmptyState.tsx`). 빈 상태 패턴은 UX 핵심이므로 존재 자체가 긍정적이나, 상세 구현은 확인 필요.

---

## 8. 테마 & 브랜드 적응성 (Theme & Brand Adaptability)

### 8.1 장점

#### 이중 테마 메커니즘

```
[data-theme='blue']  → accent color 교체 (interactive 5개 토큰)
.dark / :not(.dark)  → 전체 모드 전환 (surface, fg, border, shadow)
[data-density]       → 밀도 조절 (gap, padding, height)
```

3개의 독립적 축(accent × mode × density)이 **교차 적용** 가능하다. `[data-theme='green'].dark[data-density='compact']`처럼 조합이 자유롭다. 이 설계는 Radix Themes의 `<Theme accentColor="green" radius="medium">` 패턴과 유사하면서 CSS-only라 런타임 오버헤드가 없다.

#### Accent 테마 전환의 최소 비용

```css
[data-theme='blue'] {
  --color-interactive: var(--sp-purple-500);
  --color-interactive-hover: var(--sp-purple-400);
  --color-interactive-subtle: oklch(0.62 0.24 305 / 12%);
  --color-interactive-active: var(--sp-purple-600);
  --border-interactive: var(--sp-purple-500);
}
```

5개 토큰만 오버라이드하면 **전체 앱의 accent color가 바뀐다.** Button, Select, Tabs, Checkbox, Toggle이 모두 이 5개 토큰을 참조하기 때문이다. 이 cascade 효과는 토큰 아키텍처의 핵심 이점이다.

### 8.2 단점 및 개선

#### D17. 커스텀 테마 진입 장벽 — P1

소비자가 **brand orange**로 accent를 바꾸려면:

1. `[data-theme='orange']` CSS block 직접 작성
2. 5개 interactive 토큰 + 1개 border 토큰 오버라이드
3. Dark + Light 모드 각각 작성 (2 blocks)
4. subtle 변형의 oklch alpha 값 수동 계산

이 과정이 문서화되어 있지 않다. `createTheme({ hue: 55 })` 같은 유틸리티가 있으면 hue 하나로 전체 accent 팔레트를 자동 생성할 수 있다.

**권고**: CSS-only 접근과 JS 유틸리티 접근 병행:

```typescript
// JS utility (optional)
export function createAccentTheme(hue: number): Record<string, string> {
  return {
    '--color-interactive': `oklch(0.62 0.21 ${hue})`,
    '--color-interactive-hover': `oklch(0.70 0.16 ${hue})`,
    '--color-interactive-active': `oklch(0.54 0.20 ${hue})`,
    '--color-interactive-subtle': `oklch(0.62 0.21 ${hue} / 12%)`,
    '--border-interactive': `oklch(0.62 0.21 ${hue})`,
  };
}
```

#### D18. Gray hue 고정 — P2

hue 250° gray는 **tech-forward** 톤에 최적화되어 있다. 그러나:

- **Healthcare**: warm gray(hue 30°)가 더 친근하고 신뢰감 있음
- **Finance**: neutral gray(hue 0°)가 더 보수적이고 안정적
- **Fashion/Luxury**: warm gray(hue 40°)가 감성적

현재 소비자가 gray hue를 바꾸려면 L1의 12개 `--sp-gray-*` 값을 전부 수동으로 재정의해야 한다.

**권고**: `[data-gray='warm']`, `[data-gray='neutral']` selector 추가. 또는 `createGrayPalette(hue)` 유틸리티.

#### D19. 테마 프리뷰/실험 도구 부재 — P3

소비자가 토큰 조합을 실험할 수 있는 인터랙티브 도구가 없다. 로드맵의 "Theme Studio (SaaS)"가 이를 해결할 예정이지만, **최소한 Storybook 내에서 accent hue를 슬라이더로 조절하는 데코레이터**가 있으면 즉각적 실험이 가능하다.

---

## 9. 디자인 시스템 완성도 (Completeness)

### 9.1 보유 컴포넌트 맵

```
Primitives (34)    Layout (5)       Disclosure (13)    Feedback (5)
─────────────────  ──────────────  ──────────────────  ──────────────
Button             AppShell         Dialog              Alert
Badge              Container        Tabs                Callout
Avatar/Group       Sidebar          Tooltip             EmptyState
Input/InputGroup   Stack            DropdownMenu        Skeleton
Textarea           TopBar           Popover             Toast
Checkbox                            Accordion
RadioGroup                          ContextMenu
Select                              Collapsible
Switch                              HoverCard
Slider                              NavigationMenu
ProgressBar                         Menubar
Breadcrumb                          Sheet
Table                               AlertDialog
Pagination
Toolbar
Toggle/ToggleGroup
ScrollArea
Text/Heading/Code
Label/Divider/Separator
Spinner/StatusDot
Icon (61 variants)
VisuallyHidden/Kbd
Truncate/Callout
Card (Header/Body/Footer)
AspectRatio/DataList
FormField
```

**57개 컴포넌트**로 기본적인 SaaS 앱을 구축할 수 있다. 12개 레퍼런스 데모(Linear, Slack, Discord, Notion, Spotify 등)가 이를 증명한다.

### 9.2 부재 — 프로덕트 즉시 필요

| 컴포넌트                         | 필요 이유                                          | 우선순위 |
| -------------------------------- | -------------------------------------------------- | :------: |
| **Combobox / Autocomplete**      | 검색, 태그 입력, 필터 — 거의 모든 SaaS에 필수      |    P0    |
| **DatePicker**                   | 일정, 기한, 기간 입력 — 폼 UI 핵심                 |    P1    |
| **Tag / Chip**                   | 다중 선택 결과 표시, 필터 표현                     |    P1    |
| **DataTable**                    | 정렬/필터/페이지네이션 내장 테이블 — 대시보드 필수 |    P1    |
| **FileUpload / Dropzone**        | SaaS 파일 업로드 패턴                              |    P2    |
| **Stepper / Wizard**             | 다단계 폼, 온보딩 흐름                             |    P2    |
| **Command Palette**              | ⌘K 패턴 — 파워 유저 필수 UX                        |    P2    |
| **Number Input / Stepper Input** | 수량 입력 (e-commerce, 설정)                       |    P3    |

현재 12개 데모 중 **검색 기능을 구현한 데모가 없다** — Combobox 부재의 직접적 영향이다.

---

## 10. 종합 개선 권고

### Priority Matrix

| ID      | 영역   | 심각도 | 개선 내용                                         | 비용 |
| ------- | ------ | :----: | ------------------------------------------------- | :--: |
| **D8**  | 공간   |   P0   | 컨테이너 패딩 통일 토큰 도입                      | Low  |
| **D4**  | 타이포 |   P0   | line-height 토큰 추가 (tight/snug/normal/relaxed) | Low  |
| **D14** | 위계   |   P0   | Dark mode surface 명도 대비 확대 (Δ0.05→Δ0.07)    | Low  |
| **D1**  | 색채   |   P1   | Yellow/Purple/Orange 팔레트 스케일 확장           | Low  |
| **D5**  | 타이포 |   P1   | letter-spacing 토큰 추가                          | Low  |
| **D7**  | 공간   |   P1   | Button sm/lg density 반응화                       | Med  |
| **D10** | 모션   |   P1   | Spring easing 실제 컴포넌트 적용                  | Med  |
| **D11** | 모션   |   P1   | Button active에 scale(0.98) 물리적 피드백 추가    | Low  |
| **D15** | 위계   |   P1   | Dialog surface 차별화 (명도 또는 border 강화)     | Low  |
| **D16** | 위계   |   P1   | Overlay 배경 light/dark mode 분리                 | Low  |
| **D17** | 테마   |   P1   | createTheme() 유틸리티 또는 커스텀 테마 가이드    | Med  |
| **D2**  | 색채   |   P1   | Light mode warning-fg 가독성 검증                 | Low  |
| **D12** | 모션   |   P2   | Card interactive hover shadow 추가                | Low  |
| **D3**  | 색채   |   P2   | Neutral/Warm gray 변형 제공                       | Med  |
| **D6**  | 타이포 |   P2   | font-weight 토큰 추가                             | Low  |
| **D9**  | 공간   |   P2   | InputGroup prefix/suffix 위치 size 반응화         | Med  |
| **D18** | 테마   |   P2   | Gray hue selector (warm/neutral/cool)             | Med  |
| **D13** | 모션   |   P2   | Skeleton shimmer에 모션 토큰 적용                 | Low  |
| **D19** | 테마   |   P3   | Storybook accent hue 슬라이더 데코레이터          | Med  |

### 실행 로드맵

#### Phase 1 — 시각적 기반 보강 (P0)

> "토큰 인프라는 완벽하다. 이제 그 인프라를 **활용**할 차례다."

1. **D4**: line-height 토큰 L1/L2 추가 → Heading/Text 컴포넌트에 적용
2. **D8**: `--container-padding-x/y` 토큰 L3 추가 → Card, Dialog, Alert, Toast 통일
3. **D14**: `--sp-gray-900` lightness 0.13→0.15로 조정 (또는 Card에 `shadow-sm` 기본 적용)

이 3개만 완료하면 **타이포그래피 리듬, 공간 일관성, 시각적 깊이**가 한 단계 올라간다.

#### Phase 2 — 인터랙션 품격 (P1)

> "사용자의 손이 기억하는 품질."

4. **D11**: Button `active:scale-[0.98]` 추가
5. **D10**: Sidebar/Accordion/Sheet에 spring easing 적용
6. **D1**: Yellow/Purple/Orange 팔레트 확장
7. **D15/D16**: Dialog surface 차별화 + overlay 테마 분리
8. **D5**: letter-spacing 토큰 추가

#### Phase 3 — 브랜드 확장성 (P2+)

> "한 가지 톤에서 벗어나 어떤 브랜드에나 적응하는 시스템."

9. **D17**: `createTheme()` 유틸리티
10. **D3/D18**: Gray neutral/warm 변형
11. **D12**: Card elevated variant + hover shadow
12. **D19**: Theme playground (Storybook 데코레이터)

---

## 11. 결론

Strata의 디자인은 **인프라 설계 9점, 디테일 실행 6점**의 불균형 상태다.

토큰 아키텍처, OKLch 색공간, density 시스템, semantic motion intent는 업계 최고 수준이다. 이 수준의 인프라를 갖춘 오픈소스 디자인 시스템은 극히 드물다.

그러나 그 인프라 위에 올라가는 **실제 디자인 경험**에서:

- 타이포그래피 리듬이 깨져있고 (line-height 부재)
- 물리적 피드백이 부족하고 (active scale, hover shadow 없음)
- dark mode에서 surface 구분이 어렵고
- spring easing을 정의해놓고 사용하지 않는다

이 갭은 **코드 품질이 아니라 디자인 감각의 문제**다. 토큰을 추가하고 컴포넌트에 미세 전환을 넣는 것은 기술적으로 사소하지만, 사용자 체감 품질에는 결정적이다.

Phase 1의 3개 항목(line-height, container padding, surface 대비)만 완료해도 시스템 전체의 시각적 성숙도가 **alpha에서 beta 수준으로 도약**한다. 그 토대는 이미 완벽하게 갖추어져 있다.

---

_이 리포트는 `src/tokens/layer1-primitive.css`, `layer2-semantic.css`, `layer3-component.css`, `src/index.css`, 및 `Button`, `Input`, `Card`, `Dialog`, `Alert` 컴포넌트 구현 코드의 직접 분석에 기반한다._
