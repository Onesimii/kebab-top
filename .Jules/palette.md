## 2026-06-03 - Checkout Form UX & Accessibility
**Learning:** Replacing browser `alert()` with inline validation and 'clear-on-input' logic significantly improves the perceived quality and flow of the checkout process. Additionally, linking labels to inputs and adding `aria-label` to icon-only buttons are foundational accessibility wins that are often overlooked but easy to implement.
**Action:** Always check for `alert()` calls in forms and replace them with state-driven inline validation. Ensure all interactive icons have descriptive ARIA labels.

## 2026-06-06 - Dynamic Feedback for State Changes
**Learning:** For actions like "Copy to Clipboard", visual-only feedback (changing an icon) is insufficient for screen reader users. Combining `aria-live` with a dynamic `aria-label` ensures that the state change is announced immediately and clearly.
**Action:** When implementing temporary visual feedback for icon-only buttons, always synchronize the `aria-label` and use `aria-live` to announce the change.

## 2026-06-13 - State-Driven Inline Validation vs. Browser Alerts
**Learning:** Replacing browser-native `alert()` with state-driven inline validation not only provides a smoother, non-interruptive UX but also creates an opportunity to improve accessibility. By using `aria-invalid`, `aria-describedby`, and `role="alert"`, we ensure that error states are properly communicated to screen reader users in a way that native alerts often do not.
**Action:** When implementing custom validation, always use `noValidate` on the form to prevent browser interference, and pair visual error states with semantic ARIA attributes and 'clear-on-input' logic.
