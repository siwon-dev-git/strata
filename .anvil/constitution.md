# Constitution (Trust Anchor)

> READ-ONLY for agents. Only the human owner may modify.

## Axioms

1. Environment is intelligence
2. Design physics, not control
3. Success is becoming unnecessary

## Terminal Goal

Provide a production-grade, accessible React design system library with 3-layer design tokens (OKLch primitives → semantic → component), headless Radix UI primitives, and Tailwind CSS v4 styling.

## Hard Constraints

- CSS에서 semantic token만 사용 — `var(--xxx)`, 하드코딩된 색상값 금지
- 모든 public 컴포넌트는 테스트 필수 (Vitest + Testing Library)
- 소스코드에 시크릿 저장 금지
- Radix UI headless + Tailwind 스타일링 패턴 준수
- 3-layer 토큰 구조 변경 금지 (primitives → semantic → component)
- 패키지명 `@siwon-dev-npm/strata` 유지

## Soft Constraints

A. Broad benefit — pursue universal good
B. Golden rule — treat code as you would want to receive it
C. 함수는 30줄 이하 유지
D. composition over inheritance 선호
E. `cn()` 유틸리티로 클래스 머징

## Tamper-proof

- This file is NOT a target of /sprint or any automated process
- Agents may ONLY read, never modify without user confirmation
- Checksum tracked in .anvil/.constitution.sha256
