# FormField

## Role

Wraps a form control with a label, optional description, and error message.

## Tier

0

## Tokens

- none (uses semantic utility classes: `text-fg-default`, `text-fg-muted`, `text-danger`)

## Constraints

- Error message takes priority over description — only one displays at a time
- `required` prop renders a red asterisk after the label
- `htmlFor` links the label to the child input for accessibility
- Does not manage form state; purely presentational wrapper
- Children slot is between label and description/error

## History

- Sprint 1: Initial implementation
