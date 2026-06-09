## 2026-06-03 - Checkout Form UX & Accessibility
**Learning:** Replacing browser `alert()` with inline validation and 'clear-on-input' logic significantly improves the perceived quality and flow of the checkout process. Additionally, linking labels to inputs and adding `aria-label` to icon-only buttons are foundational accessibility wins that are often overlooked but easy to implement.
**Action:** Always check for `alert()` calls in forms and replace them with state-driven inline validation. Ensure all interactive icons have descriptive ARIA labels.

## 2026-06-06 - Dynamic Feedback for State Changes
**Learning:** For actions like "Copy to Clipboard", visual-only feedback (changing an icon) is insufficient for screen reader users. Combining `aria-live` with a dynamic `aria-label` ensures that the state change is announced immediately and clearly.
**Action:** When implementing temporary visual feedback for icon-only buttons, always synchronize the `aria-label` and use `aria-live` to announce the change.

## 2026-06-09 - Accessible Custom Selection UI
**Learning:** Custom selection patterns (e.g., payment method cards) implemented as `label` or `div` are invisible to screen readers and keyboard-inaccessible by default. Applying `role="radiogroup"` and `role="radio"` with `aria-checked` states, combined with `tabIndex={0}` and keyboard listeners for Enter/Space, creates a "delightfully accessible" interaction that feels native to the OS.
**Action:** Always wrap custom "cards" or "tiles" used for selection in a `radiogroup` and ensure they are focusable and keyboard-operable.
