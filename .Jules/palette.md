## 2026-06-03 - Checkout Form UX & Accessibility
**Learning:** Replacing browser `alert()` with inline validation and 'clear-on-input' logic significantly improves the perceived quality and flow of the checkout process. Additionally, linking labels to inputs and adding `aria-label` to icon-only buttons are foundational accessibility wins that are often overlooked but easy to implement.
**Action:** Always check for `alert()` calls in forms and replace them with state-driven inline validation. Ensure all interactive icons have descriptive ARIA labels.

## 2026-06-06 - Dynamic Feedback for State Changes
**Learning:** For actions like "Copy to Clipboard", visual-only feedback (changing an icon) is insufficient for screen reader users. Combining `aria-live` with a dynamic `aria-label` ensures that the state change is announced immediately and clearly.
**Action:** When implementing temporary visual feedback for icon-only buttons, always synchronize the `aria-label` and use `aria-live` to announce the change.

## 2026-06-25 - Accessible Custom Selection UI
**Learning:** Custom 'card' or 'tile' selection interfaces (like payment methods or plan choices) are often implemented using labels or divs that are not natively accessible to keyboard or screen reader users. Transforming them into a `radiogroup` and `radio` pattern with `tabIndex={0}` and `onKeyDown` handlers for 'Enter'/'Space' provides a familiar and robust UX for all users.
**Action:** Identify any custom card-based selections and apply the ARIA radio pattern to ensure full keyboard and assistive technology compatibility.

## 2025-05-15 - Robust Form UX & Accessibility
**Learning:** Combining state-driven inline validation with `noValidate` on forms prevents inconsistent browser behaviors. Adding a loading state (`isSubmitting`) with a spinner provides essential feedback for async-like actions, and using `aria-describedby` ensures that error messages are immediately discoverable by screen readers.
**Action:** Always use `noValidate` when implementing custom validation, and pair error states with descriptive ARIA attributes and loading indicators for a professional feel.
