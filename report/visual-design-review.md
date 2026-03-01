# Strata Design System — 시각 디자인 전문가 리뷰

> **평가일**: 2026-03-01
> **대상 버전**: v0.1.0-alpha.0
> **평가자**: Visual Design Specialist
> **관점**: 색채 과학 · 타이포그래피 리듬 · 공간 일관성 · 인터랙션 물성 · 시각적 위계 · 브랜드 적응성
> **범위**: 본 리포트는 **디자인 품질**에 집중한다. 엔지니어링(CI/CD, 테스트, SSR 등)은 기존 리포트 참조.

---

## 1. Executive Summary

**종합: 8.0 / 10 — "아키텍처는 일류, 감각은 아직 여백이 있다"**

Strata의 3-layer OKLch 토큰 아키텍처는 디자인 시스템 업계에서도 상위 5%에 해당하는 구조적 완성도를 보여준다. 색공간 선택(OKLch), 토큰 재사용 그룹(`--menu-*` 4개 컴포넌트 공유), Density 시스템, Surface 위계는 교과서적이다.

그러나 **실제 화면 위에서의 체감 품질** — 타이포그래피의 숨결(line-height, tracking), 인터랙션의 물성(spring, shadow shift), dark mode의 깊이감, 컨테이너 간 패딩 리듬 — 에서 "설계는 완벽한데 느낌이 부족하다"는 인상을 준다. 이는 토큰 시스템이 **수치적으로는 완비되었으나 감각적 미세 조정(fine-tuning)이 아직 남아 있음**을 의미한다.

### Scorecard

| 영역                         |   점수   | 한줄 판정                                 |
| ---------------------------- | :------: | ----------------------------------------- |
| 색채 시스템 (Color)          |  ★★★★☆   | OKLch 선택 탁월, 보조 팔레트 불완전       |
| 타이포그래피 (Typography)    |  ★★★☆☆   | 스케일 건전, 행간/자간/웨이트 토큰 부재   |
| 공간 & 밀도 (Spacing)        |  ★★★★☆   | Density 시스템 우수, 컨테이너 패딩 불일치 |
| 인터랙션 & 모션 (Motion)     |  ★★★☆☆   | 토큰 잘 설계됨, 실제 적용률 낮음          |
| 시각적 위계 (Hierarchy)      |  ★★★★☆   | Surface 모델 명확, dark mode 대비 부족    |
| 컴포넌트 디자인 (Components) |  ★★★★☆   | 패턴 일관적, 세부 피드백 개선 여지        |
| 브랜드 적응성 (Theming)      |  ★★★☆☆   | 메커니즘 존재, 실용적 API 부재            |
| 시스템 완성도 (Coverage)     |  ★★★☆☆   | 기초 견고, 프로덕트 필수 6종 부재         |
| **종합**                     | **★★★★** | **8.0 / 10**                              |

---

## 2. 색채 시스템 (Color System)

### 2.1 장점

#### OKLch 색공간 — 업계 선도적 선택

`src/tokens/layer1-primitive.css`에서 모든 색상을 OKLch로 정의한 것은 2026년 기준으로도 앞서가는 결정이다.

```css
--sp-blue-500: oklch(0.62 0.21 260); /* Interactive 기본 */
--sp-red-500: oklch(0.63 0.24 25); /* Danger 기본 */
--sp-green-500: oklch(0.65 0.19 155); /* Success 기본 */
```

**핵심 이점:**

- **인지 균일성(Perceptual Uniformity)**: L(명도) 0.62~0.65로 맞춘 상태 색상들은 시각적 무게감이 동일하다. HSL에서는 같은 saturation/lightness라도 hue에 따라 밝기가 다르게 보이는 Helmholtz–Kohlrausch 효과가 발생하지만, OKLch에서는 이를 원천 방지한다.
- **WCAG 대비비 예측**: Lightness 값으로 직접 대비비를 추론할 수 있어, 접근성 검증이 직관적이다. 예: `--sp-gray-50`(L=0.97)과 `--sp-gray-900`(L=0.13) → 대비비 ≈ 12:1 이상.

#### Cool-tinted Gray — 의도적 감성 설계

Gray 팔레트의 hue 250°(blue-violet tint)는 단순한 neutral이 아닌 **의도적 감성 선택**이다.

```css
--sp-gray-50: oklch(0.97 0.004 250); /* 미세한 blue tint */
--sp-gray-950: oklch(0.08 0.004 250); /* dark base */
```

- **Chroma 0.004~0.013**: 극도로 낮은 채도로 색조를 느끼기 어렵지만, 순수 achromatic(chroma=0)보다 화면에서 더 생동감 있다
- **250° hue**: 차갑고 프로페셔널한 인상. 기술/SaaS 제품에 적합한 톤
- Linear, Notion, Figma 등 레퍼런스 데모의 맥락과 일치하는 선택

#### Status 색상 hue 배분

| 상태               | Hue  | 감성 의도                              |
| ------------------ | ---- | -------------------------------------- |
| Danger (Red)       | 25°  | 따뜻한 주홍 — 위험이되 공격적이지 않음 |
| Success (Green)    | 155° | 청록 계열 — teal 톤으로 모던           |
| Warning (Yellow)   | 85°  | 노랑-초록 사이 — 주의 유도             |
| Interactive (Blue) | 260° | 보라 기미 청색 — 신뢰 + 차별화         |

Hue 간격이 균등하지 않지만, 각 색상의 **감성적 역할**에 맞게 조정된 것으로 보인다. 특히 Danger의 25°는 순적(pure red, 0°)보다 부드러워 UI에서 과도한 긴장감을 주지 않는 좋은 선택이다.

### 2.2 단점 및 개선

#### D1. 보조 팔레트 스케일 불균형 — P1

**문제**: 색상별 단계 수가 극심하게 다르다.

| 팔레트     | 단계 수 | 범위    |
| ---------- | :-----: | ------- |
| Gray       |   12    | 0~950   |
| Blue       |   10    | 50~900  |
| Red        |    8    | 50~700  |
| Green      |    8    | 50~700  |
| **Yellow** |  **5**  | 50~600  |
| **Purple** |  **5**  | 50~600  |
| **Orange** |  **3**  | 400~600 |

`src/tokens/layer1-primitive.css:55-71`

**영향**: Warning 상태 UI에서 미세 그라데이션 표현이 불가능하다. 예를 들어 Warning Alert의 배경/전경/호버 3단계를 Yellow로 표현하면 사용 가능한 스텝이 3개뿐이다. Orange는 400~600 3단계로, chart 시각화에서 활용이 극히 제한된다.

**권고**: 최소 7단계(50~700)로 통일. Yellow 200/300, Orange 50~300/700, Purple 200/300/700 추가.

#### D2. Light Mode Status 전경색 미분화 — P1

**문제**: `src/tokens/layer2-semantic.css`에서 Light mode의 `--color-success-fg`와 `--color-warning-fg`가 **정의되지 않는다**. Dark mode에서만 정의된 값이 그대로 cascade된다.

```css
/* Dark mode (line 24-28) */
--color-success-fg: oklch(0.08 0.01 250); /* 거의 검정 */
--color-warning-fg: oklch(0.08 0.01 250); /* 거의 검정 */

/* Light mode — 미정의 → dark mode 값이 상속 */
```

**영향**: 텍스트 색이 상태와 무관하게 동일한 검정. Success/Warning 의미가 색상으로 전달되지 않는다.

**권고**: Light mode에서 `--color-success-fg: var(--sp-green-700)`, `--color-warning-fg: var(--sp-yellow-600)` 등 상태별 전경색을 명시적으로 분화.

#### D3. Gray Hue 고정 — 브랜드 적응성 제한 — P2

Cool-tinted Gray(250°)는 기술/SaaS에 적합하지만:

- **금융 브랜드**: warm gray(30~40°)가 안정감과 신뢰를 전달
- **패션/라이프스타일**: neutral gray(0° chroma=0)가 콘텐츠를 방해하지 않음
- **헬스케어**: warm green-tinted gray(130°)가 친밀감 전달

**권고**: `layer1-primitive-warm.css`(hue 30°), `layer1-primitive-neutral.css`(chroma 0) 등 Gray 변형 프리셋 제공.

---

## 3. 타이포그래피 (Typography)

### 3.1 장점

#### Inter — 최적의 UI 서체 선택

```css
/* src/index.css:49-50 */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

Inter는 2026년 기준 가장 널리 채택된 UI 서체로:

- **가변 폰트 지원**: 단일 파일로 모든 weight 커버 → 네트워크 비용 절감
- **Tabular Figures**: 숫자 정렬이 기본 — 테이블, 가격, 카운터에서 정렬 깨짐 없음
- **높은 x-height**: 작은 사이즈(12px, 14px)에서도 가독성 유지

#### 타이포그래피 스케일 — 이중 비율(Double-Stranded)

```css
/* src/tokens/layer1-primitive.css:89-96 */
--sp-text-xs: 0.75rem; /* 12px */
--sp-text-sm: 0.875rem; /* 14px */
--sp-text-base: 1rem; /* 16px */
--sp-text-lg: 1.125rem; /* 18px */
--sp-text-xl: 1.25rem; /* 20px */
--sp-text-2xl: 1.5rem; /* 24px */
--sp-text-3xl: 1.875rem; /* 30px */
--sp-text-4xl: 2.25rem; /* 36px */
```

스케일 비율 분석:

| 구간             |   비율    | 특성                             |
| ---------------- | :-------: | -------------------------------- |
| xs→sm→base→lg→xl | 1.11~1.17 | Minor Third — 본문용 촘촘한 단계 |
| xl→2xl→3xl→4xl   | 1.20~1.25 | Major Third — 헤딩용 뚜렷한 점프 |

하단은 미세 조절, 상단은 시각적 점프가 뚜렷한 **이중 비율** 스케일. UI 타이포그래피에 적합한 패턴이다.

#### Semantic Scale — 의미 기반 매핑

```css
/* src/tokens/layer2-semantic.css:73-78 */
--type-display: var(--sp-text-4xl); /* 36px → 히어로, 대시보드 KPI */
--type-title: var(--sp-text-2xl); /* 24px → 페이지 제목 */
--type-heading: var(--sp-text-xl); /* 20px → 섹션 헤딩 */
--type-body: var(--sp-text-base); /* 16px → 본문 */
--type-label: var(--sp-text-sm); /* 14px → 폼 라벨, 버튼 */
--type-caption: var(--sp-text-xs); /* 12px → 보조 텍스트 */
```

L2에서 의미 기반 매핑으로, 반응형 축소(`640px 이하 display→2xl, title→xl, heading→lg`)가 한 곳에서 제어된다.

### 3.2 단점 및 개선

#### D4. Line-height 토큰 부재 — P0

**이것은 본 리포트에서 가장 중요한 발견이다.**

모든 텍스트의 `line-height`가 Tailwind 기본값에 위임된다. 이것은 디자인 시스템에서 **타이포그래피의 절반이 빠진 것**과 같다.

- **헤딩**: tight(1.1~1.2) — 제목은 행 사이가 좁아야 덩어리감이 산다
- **본문**: normal(1.5~1.6) — WCAG SC 1.4.12 기준 최소 1.5배
- **캡션/라벨**: relaxed(1.4) — 작은 텍스트는 행간이 넉넉해야 가독성 확보

**영향**: 동일한 `text-sm`을 사용해도 컴포넌트마다 다른 line-height가 적용될 수 있고, 디자이너와 개발자 간 행간 기준이 없어 시각적 불일치가 누적된다.

**권고**: L1에 line-height 토큰 추가:

```css
--sp-leading-none: 1;
--sp-leading-tight: 1.2;
--sp-leading-snug: 1.375;
--sp-leading-normal: 1.5;
--sp-leading-relaxed: 1.625;
--sp-leading-loose: 2;
```

L2에서 semantic 매핑:

```css
--type-display-leading: var(--sp-leading-tight);
--type-heading-leading: var(--sp-leading-snug);
--type-body-leading: var(--sp-leading-normal);
--type-caption-leading: var(--sp-leading-relaxed);
```

#### D5. Letter-spacing 토큰 부재 — P1

- **대문자 라벨**(예: "STATUS", "PRIORITY"): tracking을 넓히면(0.05~0.1em) 가독성과 격식이 올라감
- **대형 디스플레이 텍스트**: 36px 이상에서는 tracking을 -0.02em 정도 좁히면 시각적 밀도가 올라감
- **12px 이하 작은 텍스트**: tracking을 0.02em 넓히면 글자가 서로 달라붙지 않음

**권고**: L1에 letter-spacing 토큰 추가:

```css
--sp-tracking-tighter: -0.025em;
--sp-tracking-tight: -0.015em;
--sp-tracking-normal: 0;
--sp-tracking-wide: 0.025em;
--sp-tracking-wider: 0.05em;
--sp-tracking-widest: 0.1em;
```

#### D6. Font-weight 토큰 부재 — P2

`font-medium`, `font-semibold`, `font-bold`가 모두 Tailwind 기본값에 의존. 디자이너가 Figma에서 "SemiBold"로 지정한 것이 코드에서 정확히 어떤 weight인지 모호해진다.

**권고**: L2 semantic weight 토큰:

```css
--type-weight-normal: 400;
--type-weight-medium: 500;
--type-weight-semibold: 600;
--type-weight-bold: 700;
```

---

## 4. 공간 & 레이아웃 리듬 (Spacing & Layout)

### 4.1 장점

#### Density 시스템 — 단일 속성으로 전체 밀도 전환

```css
/* src/tokens/layer2-semantic.css */
/* compact */
--density-item-height: 1.75rem; /* 28px */
/* comfortable */
--density-item-height: 2.25rem; /* 36px */
/* spacious */
--density-item-height: 2.75rem; /* 44px */
```

`data-density` 속성 하나로 Button, Input, Select의 높이와 여백이 동시에 변경된다. Gmail(compact), Notion(comfortable), Apple HIG(spacious)를 하나의 시스템으로 커버할 수 있다. **시스템적 사고의 좋은 예**.

#### Spacing Scale — 실용적 범위

```
0 → 0.5(2px) → 1(4px) → 1.5(6px) → 2(8px) → 3(12px) → 4(16px)
→ 5(20px) → 6(24px) → 8(32px) → 10(40px) → 12(48px) → 16(64px)
```

4px base unit에 fractional step(0.5, 1.5)으로 세밀한 조정이 가능하면서도 과도하지 않은 15단계.

### 4.2 단점 및 개선

#### D7. Button sm/lg 사이즈 Density 비적응 — P1

**문제**: `md`와 `icon`은 density 토큰을 참조하지만, `sm`과 `lg`는 하드코딩이다.

```typescript
/* src/components/primitives/Button/Button.variant.ts:26-29 */
sm: 'h-7 px-3 text-xs gap-1.5',           // 28px 고정
md: 'h-[--density-item-height] ...',       // density 반응 ✓
lg: 'h-11 px-5 text-base gap-2.5',        // 44px 고정
```

**영향**: compact density에서 `sm`(28px)과 `md`(28px)가 **동일한 높이**가 된다. spacious에서는 `md`(44px)와 `lg`(44px)가 충돌. 사이즈 위계 소멸.

**권고**: sm/lg에도 density-aware 토큰 도입:

```css
--density-item-height-sm: calc(var(--density-item-height) - 0.5rem);
--density-item-height-lg: calc(var(--density-item-height) + 0.5rem);
```

#### D8. 컨테이너 내부 패딩 불일치 — P0

**문제**: "내부 콘텐츠를 감싸는" 역할의 컴포넌트들이 서로 다른 패딩 기준을 사용한다.

| 컴포넌트        | 패딩                  | 파일            |
| --------------- | --------------------- | --------------- |
| Card (Body)     | `p-4` (16px)          | `Card.tsx:58`   |
| Dialog (Header) | `px-5 py-4` (20/16px) | `Dialog.tsx:66` |
| Dialog (Body)   | `px-5 py-4` (20/16px) | `Dialog.tsx:83` |
| Dialog (Footer) | `px-5 py-3` (20/12px) | `Dialog.tsx:99` |
| Alert           | `p-4` (16px)          | `Alert.tsx:37`  |

Card는 `p-4`(16px), Dialog는 `px-5`(20px). **같은 "내용을 담는 컨테이너" 역할인데 좌우 여백이 다르다.**

**영향**: Card 안에 Dialog를 여는 UI에서 시각적 점프가 발생한다. 새 컴포넌트 추가 시 "20px인가 16px인가" 기준이 없다.

**권고**: L3에 컨테이너 토큰 도입:

```css
--container-padding-x: var(--sp-space-5); /* 20px — 기본 수평 */
--container-padding-y: var(--sp-space-4); /* 16px — 기본 수직 */
--container-padding-compact: var(--sp-space-3); /* 12px — footer 등 */
```

#### D9. InputGroup prefix/suffix 위치 하드코딩 — P1

**문제**: `src/components/primitives/Input/Input.tsx:87,93`

```tsx
<span className="pointer-events-none absolute left-3 ...">{prefix}</span>
<span className="pointer-events-none absolute right-3 ...">{suffix}</span>
```

`left-3`(12px)은 Input의 모든 size에 고정. sm의 `px-2`(8px), lg의 `px-4`(16px)와 불일치.

**영향**: sm Input에 prefix를 넣으면 아이콘이 텍스트보다 바깥에 위치하는 시각적 오류. 또한 `pointer-events-none`이라 **클릭 가능한 suffix(clear 버튼, password toggle)**를 구현할 수 없다.

---

## 5. 인터랙션 & 모션 디자인 (Interaction & Motion)

### 5.1 장점

#### 의미 기반 모션 토큰

```css
/* src/tokens/layer2-semantic.css:86-94 */
--motion-duration-fast: 100ms; /* 즉각 피드백 */
--motion-duration-normal: 150ms; /* 기본 전환 */
--motion-duration-slow: 300ms; /* 강조 전환 */
--motion-duration-entrance: 200ms; /* 진입 — 느리게 */
--motion-duration-exit: 150ms; /* 퇴장 — 빠르게 */
```

진입(200ms) > 퇴장(150ms)의 비대칭은 **Material Design 모션 원칙**과 일치. 등장은 사용자의 주의를 끌어야 하므로 느리게, 퇴장은 방해하지 않도록 빠르게.

#### Reduced Motion 이중 안전망

토큰 레벨(`layer2-semantic.css:98-106`)에서 모든 duration을 0ms로 + 전역 CSS 레벨(`index.css:129-136`)에서 모든 animation/transition을 0.01ms로. **이중 보호**로 접근성에 대한 깊은 이해를 보여준다.

#### Spring Easing 정의

```css
--sp-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

1.56의 overshoot 파라미터는 약 10%의 튀어넘김(bounce). iOS의 기본 spring에 근접한 cubic-bezier 근사치로 **물리적 사실감**을 제공한다.

### 5.2 단점 및 개선

#### D10. Spring Easing 미활용 — P1

**문제**: `--sp-ease-spring`이 L1에 정의되고 `--motion-ease-spring`으로 L2에 매핑되지만, **실제 컴포넌트에서 사용하는 곳이 거의 없다.**

Button은 `transition-colors duration-[--motion-duration-normal]`만, Dialog는 Tailwind CSS `animate-in`에 의존.

**권고**: 물리적 공간 이동이 있는 4개 컴포넌트에 spring easing 도입:

- Switch thumb 슬라이드
- Tooltip 등장
- Dialog scale-in
- Accordion 높이 전환

#### D11. Hover → Active 물리적 피드백 부재 — P1

**문제**: Button을 포함한 모든 인터랙티브 컴포넌트에서 hover→active 전환이 **색상 변경만**으로 이루어진다.

```typescript
/* Button.variant.ts — solid variant */
'bg-[--btn-solid-bg] hover:bg-[--btn-solid-bg-hover] active:bg-[--btn-solid-bg-active]';
```

실제 물리 버튼을 누르면: (1) 눌림(scale down), (2) 그림자 감소, (3) 색상 진해짐이 동시에 발생한다. 현재 Strata는 (3)만 구현.

**권고**: active 상태에 미세한 물리적 변환:

```css
active:scale-[0.98] active:shadow-none
```

scale 0.98은 거의 인식되지 않지만 무의식적으로 "눌림"을 느끼게 한다. Apple HIG와 Material Design 공통 기법.

#### D12. Card Interactive Hover에 Shadow 전환 없음 — P2

**문제**: Card interactive variant에 `transition-colors`만 적용. shadow가 전환 대상이 아니다.

```typescript
/* Card.tsx */
'hover:bg-[--card-bg-hover] hover:border-[--card-border-hover]';
'cursor-pointer transition-colors duration-[--motion-duration-normal]';
```

**권고**: hover 시 카드가 "떠오르는" 물리적 은유:

```typescript
'hover:shadow-[--shadow-md] transition-[colors,box-shadow]';
```

---

## 6. 시각적 위계 & Surface 시스템 (Visual Hierarchy)

### 6.1 장점

#### 5단계 Surface 모델

```
base(L=0.08) → raised(L=0.13) → overlay(L=0.20) → inset(L=0.06) → disabled(L=0.20)
  바닥          카드/사이드바       모달/드롭다운       입력필드         비활성
```

Surface 위계가 **물리적 높이(elevation)**와 일치하도록 설계. "밝을수록 높다"는 Material Design 원칙을 OKLch lightness로 정확히 구현.

#### Shadow Dark/Light 적응

```css
/* Dark */
--shadow-lg: 0 10px 15px oklch(0 0 0 / 0.5);
/* Light */
--shadow-lg: 0 10px 15px oklch(0 0 0 / 0.15);
```

Dark mode에서 shadow opacity를 3~5배 강화. 어두운 배경에서도 깊이감이 유지되는 올바른 보정.

### 6.2 단점 및 개선

#### D13. Dark Mode Surface 간 명도 대비 부족 — P0

**문제**: base(0.08)와 raised(0.13) 사이의 lightness 차이가 **Δ0.05**. 이는 OKLch에서 육안으로 겨우 구분 가능한 최소 차이(JND)에 근접한다. 낮은 밝기에서는 Weber's Law에 의해 같은 Δ라도 더 구분하기 어렵다.

| Surface | OKLch L |   Δ(이전 대비)   |
| ------- | :-----: | :--------------: |
| inset   |  0.06   |        —         |
| base    |  0.08   |      +0.02       |
| raised  |  0.13   | **+0.05** ← 위험 |
| overlay |  0.20   |      +0.07       |

**실제 영향**: Card(`surface-raised`)가 AppShell 배경(`surface-base`) 위에서 거의 구분되지 않을 수 있다. 특히 모니터 밝기가 낮거나 주변이 밝은 환경에서.

**권고**: `--sp-gray-900`의 lightness를 0.13→0.15로 올려 Δ를 0.07 이상으로 확보. 또는 Card에 기본 `shadow-sm` 적용하여 시각적 분리 보강.

#### D14. Dialog vs Card 시각적 미분화 — P1

**문제**: Dialog `surface-overlay`(0.20) + `border-subtle` + `shadow-lg` vs Card `surface-raised`(0.13) + `border-subtle` + shadow 없음.

구조적으로는 분리되어 있으나, dark mode에서 shadow 효과가 감소하고 둘 다 `border-subtle`(동일 토큰)을 사용하여 **모달의 존재감이 약하다**.

**권고**:

- Dialog `--dialog-border`를 `--border-default`로 한 단계 강화
- dark mode Dialog에 미세한 inner glow(`box-shadow: inset 0 1px 0 var(--border-subtle)`) 추가

---

## 7. 컴포넌트 디자인 비평 (Component Design Critique)

### 7.1 Button — 4.5/5

**우수:**

- 4 variant(solid, ghost, outline, danger) × 4 size = 충분한 매트릭스
- `outline` hover에서 `border-interactive` 전환 — 세련된 컬러 시프트
- `data-loading` 시 Spinner + `aria-busy` — 시각적/시맨틱 이중 보장
- 44px 터치 타겟 pseudo-element — compact density에서도 WCAG 2.5.8 준수

**개선:**

- `ghost` variant hover 시 배경만 변경, 텍스트 색상 `--fg-default` 고정 → `--color-interactive`로 변경하면 피드백 강화
- `outline` variant hover에서 `bg-[--btn-outline-hover]`가 `--border-interactive` 토큰 참조 — **border 토큰을 배경에 사용**하는 의미론적 불일치

### 7.2 Input/Select — 3.5/5

**우수:**

- `--input-bg: var(--surface-inset)` — "입력 가능 영역" 시각 구분
- `onPressEnter` 편의 prop — 검색/채팅 99% 케이스를 한 줄로 해결

**개선:**

- `--input-ring: oklch(0.62 0.21 260 / 25%)` **하드코딩** → Purple/Green 테마에서도 focus ring이 blue 고정
- `disabled:opacity-40` 하드코딩 — Button에는 `--btn-disabled-opacity` 토큰이 있으나 Input은 Tailwind 리터럴. 일관성 결여
- InputGroup `pointer-events-none` suffix → clear 버튼, password toggle 같은 **인터랙티브 suffix 구현 불가**. 상당히 큰 UX 제약

### 7.3 Card — 3.5/5

**우수:**

- Compound API(Card + CardHeader + CardBody + CardFooter) — 유연한 구조
- `interactive` variant에 `cursor-pointer` + hover 색상 전환

**개선:**

- CardHeader `px-4 pt-4 pb-0` + CardBody `p-4` → 헤더↔본문 간격이 16px = 헤더 상단 패딩과 동일 → **위계 약화**. `CardHeader pb-2`(8px)가 더 자연스러움
- hover에 shadow 전환 없음 (D12 참조)
- variant 2개(default, interactive)뿐. `elevated`(기본 shadow), `ghost`(border 없음) 추가 시 레이아웃 유연성 증가

### 7.4 Dialog — 4/5

**우수:**

- Portal + Overlay + Content + `zoom-in-95` 진입 — 표준적이며 안정적
- SimpleDialog convenience wrapper — 80% 사용 케이스를 단일 props로 해결
- Header/Body/Footer border 분리로 영역 구분 명확

**개선:**

- `max-w-lg`(512px) 고정 → `size` prop(sm/md/lg/xl/full)이 없어 다양한 콘텐츠에 대응 불가
- 기본 닫기 버튼(X)이 Header에 포함되지 않음
- Exit animation이 `zoom-out-95`만 — 중력 기반 exit(`translateY(8px)`)가 더 물리적

### 7.5 Alert — 4/5

**우수:**

- `border-l-4` 좌측 악센트 — 스캔 시 즉각적 상태 인지. 검증된 패턴
- `role="alert"` 시맨틱 — 스크린리더 즉시 공지
- 4 variant(info, success, warning, danger) — 표준 커버리지

**개선:**

- **상태별 아이콘 없음** — 색각 이상 사용자가 색상만으로 상태 구분 어려움. WCAG 1.4.1(Use of Color) 관점에서 개선 필요. 각 variant에 기본 아이콘(ℹ, ✓, ⚠, ✕) 제공 권장
- 닫기 버튼 SVG 인라인 하드코딩(`Alert.tsx:52-63`) — Icon 시스템의 `IconX` 미활용
- 닫기 버튼에 `aria-label` 없음 — 접근성 결함

---

## 8. 테마 & 브랜드 적응성 (Theme & Brand Adaptability)

### 8.1 장점

#### 5-토큰 accent 전환

```css
/* src/tokens/layer2-semantic.css:151-157 */
[data-theme='blue'] {
  --color-interactive: var(--sp-purple-500);
  --color-interactive-hover: var(--sp-purple-400);
  --color-interactive-subtle: oklch(0.62 0.24 305 / 12%);
  --color-interactive-active: var(--sp-purple-600);
  --border-interactive: var(--sp-purple-500);
}
```

5개 토큰 오버라이드로 전체 UI의 interactive 색상이 일괄 전환. Button, Input focus, Checkbox checked, Tabs active, Sidebar active — 모두 이 5개 토큰 참조. 3-layer 아키텍처의 실제 위력.

#### 3축 독립 조합

```
[data-theme]   × .dark/:not(.dark) × [data-density]
accent color     light/dark mode      밀도
```

`[data-theme='green'].dark[data-density='compact']`처럼 자유 조합 가능. CSS-only라 런타임 오버헤드 없음.

### 8.2 단점 및 개선

#### D15. 커스텀 테마 진입 장벽 — P1

**문제**: 소비자가 커스텀 accent를 추가하려면 `layer2-semantic.css`의 `[data-theme='blue']` 블록을 직접 복제하여 5개 interactive + 1개 border 토큰을 수동 정의해야 한다. hover/active의 lightness 오프셋(±0.05~0.1)과 subtle의 opacity(10~12%)를 직접 계산해야 함.

**권고**: `createTheme()` 유틸리티 제공:

```typescript
import { createTheme } from '@siwon-dev-npm/strata';

const brandTheme = createTheme({
  accent: 'oklch(0.6 0.2 280)',
  // 자동 파생: hover(L+0.08), active(L-0.08), subtle(alpha 12%)
});
```

#### D16. Overlay 배경 하드코딩 — P2

`src/tokens/layer3-component.css:67`:

```css
--overlay-bg: oklch(0 0 0 / 50%);
```

Light mode에서 50% black overlay는 과도하게 어둡다. Light mode는 30~40%가 적절.

**권고**: L2에 모드별 overlay 토큰:

```css
/* dark */
--overlay-bg: oklch(0 0 0 / 50%);
/* light */
--overlay-bg: oklch(0 0 0 / 30%);
```

---

## 9. 디자인 시스템 완성도 (Completeness)

### 9.1 현재 커버리지 (57개)

| 카테고리                   | 수  | 실전 충분도 |
| -------------------------- | :-: | :---------: |
| Primitives (입력/표시)     | 34  |    ★★★★     |
| Disclosure (오버레이/탐색) | 13  |    ★★★★★    |
| Layout (구조)              |  5  |    ★★★★     |
| Feedback (피드백)          |  5  |    ★★★☆     |

### 9.2 프로덕트 필수 부재 컴포넌트

실제 SaaS 구축 시 **즉시 외부 라이브러리가 필요**한 6종:

| 부재 컴포넌트             |   빈도    | 비고                   |
| ------------------------- | :-------: | ---------------------- |
| **Combobox/Autocomplete** | 매우 높음 | 검색, 태그 입력, 멘션  |
| **DatePicker**            |   높음    | 폼, 필터, 대시보드     |
| **Tag/Chip**              |   높음    | 멀티셀렉트, 필터       |
| **DataTable**             |   높음    | 정렬/필터/페이지네이션 |
| **FileUpload**            |   중간    | 프로필, 문서 관리      |
| **Stepper/Wizard**        |   중간    | 온보딩, 멀티스텝 폼    |

외부 라이브러리 혼합 시 **토큰 일관성이 깨진다**. `react-day-picker` 도입 시 Strata의 interactive/surface/border 토큰을 수동 매핑해야 하고 density 시스템과는 연동 불가.

**권고**: Combobox(기존 `--menu-*` 재사용)와 Tag(기존 Badge 확장)를 우선 개발.

---

## 10. 종합 개선 권고

### P0 — 디자인 품질의 기초

| ID  | 영역       | 권고                                              | 비용 |
| --- | ---------- | ------------------------------------------------- | :--: |
| D4  | Typography | line-height 토큰 6단계 추가 (L1 + L2 매핑)        |  S   |
| D8  | Spacing    | 컨테이너 패딩 토큰 도입 (`--container-padding-*`) |  S   |
| D13 | Hierarchy  | Dark mode surface 명도 대비 Δ≥0.07 확보           |  XS  |

### P1 — 체감 품질 향상

| ID  | 영역       | 권고                                     | 비용 |
| --- | ---------- | ---------------------------------------- | :--: |
| D1  | Color      | Yellow/Orange/Purple 팔레트 7단계 통일   |  S   |
| D2  | Color      | Light mode status 전경색 분화            |  XS  |
| D5  | Typography | letter-spacing 토큰 6단계 추가           |  S   |
| D7  | Spacing    | Button sm/lg density-aware 토큰          |  S   |
| D9  | Spacing    | InputGroup prefix/suffix 사이즈 연동     |  S   |
| D10 | Motion     | Spring easing 4개 컴포넌트 적용          |  S   |
| D11 | Motion     | Button active `scale-[0.98]` 물리 피드백 |  XS  |
| D14 | Hierarchy  | Dialog border 강화                       |  XS  |
| D15 | Theming    | `createTheme()` 유틸리티                 |  M   |

### P2 — 생태계 경쟁력

| ID  | 영역       | 권고                             | 비용 |
| --- | ---------- | -------------------------------- | :--: |
| D3  | Color      | Gray hue variant (warm, neutral) |  M   |
| D6  | Typography | font-weight semantic 토큰        |  XS  |
| D12 | Motion     | Card hover shadow 전환           |  XS  |
| D16 | Theming    | Overlay Light/Dark 분리          |  XS  |
| —   | Coverage   | Combobox + Tag 우선 개발         |  L   |

---

## 11. 결론

### Strata는 "토큰 아키텍처의 교본"이다

3-layer OKLch 토큰, Density 시스템, Surface 위계, 모션 의미 토큰 — 이 **뼈대의 설계 수준은 Radix Themes, Mantine을 넘어 업계 최상위**에 위치한다. 특히 토큰 재사용 그룹(`--menu-*` 4개 공유, `--checkbox-*` RadioGroup 공유)은 "하나 바꾸면 전부 바뀌되, 각각도 커스텀 가능하다"는 디자인 시스템의 이상을 실현했다.

### 그러나 "설계도가 좋다"와 "건물이 아름답다"는 다르다

현재 Strata에서 가장 아쉬운 것은 **"감각적 미세 조정"**이다:

- line-height가 없어 텍스트가 "숨을 쉬지 못한다"
- Spring easing이 있으나 적용되지 않아 UI가 "딱딱하다"
- Dark mode surface 대비가 약해 "평면적으로 보인다"
- Hover→Active에 물리적 피드백이 없어 "반응이 없다"

이것들은 **비용이 낮은 개선(대부분 XS~S)**이지만 **체감 품질에 미치는 영향은 극적**이다.

### 최종 메시지

> **아키텍처는 A+급이다. 이제 그 아키텍처 위에 "감각"을 입힐 차례다.**
> P0 3개(line-height, 컨테이너 패딩, dark mode 대비)만 해결해도 디자인 품질이 눈에 띄게 도약한다.

---

## 부록: 근거 파일 색인

| 참조               | 파일 경로                                            |
| ------------------ | ---------------------------------------------------- |
| L1 Primitive 토큰  | `src/tokens/layer1-primitive.css`                    |
| L2 Semantic 토큰   | `src/tokens/layer2-semantic.css`                     |
| L3 Component 토큰  | `src/tokens/layer3-component.css`                    |
| Button variant     | `src/components/primitives/Button/Button.variant.ts` |
| Button 구현        | `src/components/primitives/Button/Button.tsx`        |
| Input 구현         | `src/components/primitives/Input/Input.tsx`          |
| Card 구현          | `src/components/primitives/Card/Card.tsx`            |
| Dialog 구현        | `src/components/disclosure/Dialog/Dialog.tsx`        |
| Alert 구현         | `src/components/feedback/Alert/Alert.tsx`            |
| Tailwind 테마 매핑 | `src/index.css`                                      |
| Token Glossary     | `src/tokens/GLOSSARY.md`                             |
| Linear 데모        | `src/demos/linear/LinearDemo.tsx`                    |

---

_본 리포트는 디자인 품질에 집중하며, 엔지니어링 이슈(CI/CD, 테스트, SSR 등)는 `report/open-source-audit.md`, `report/strata-review.md`, `report/review.md`를 참조._

_Generated by Visual Design Specialist — 2026-03-01_
