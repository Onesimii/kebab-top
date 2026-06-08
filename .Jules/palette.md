## 2026-06-03 - Checkout Form UX & Accessibility
**Learning:** Replacing browser `alert()` with inline validation and 'clear-on-input' logic significantly improves the perceived quality and flow of the checkout process. Additionally, linking labels to inputs and adding `aria-label` to icon-only buttons are foundational accessibility wins that are often overlooked but easy to implement.
**Action:** Always check for `alert()` calls in forms and replace them with state-driven inline validation. Ensure all interactive icons have descriptive ARIA labels.

## 2026-06-06 - Dynamic Feedback for State Changes
**Learning:** For actions like "Copy to Clipboard", visual-only feedback (changing an icon) is insufficient for screen reader users. Combining `aria-live` with a dynamic `aria-label` ensures that the state change is announced immediately and clearly.
**Action:** When implementing temporary visual feedback for icon-only buttons, always synchronize the `aria-label` and use `aria-live` to announce the change.

## 2026-06-08 - Form Validation & Loading UX
**Learning:** Replacing disruptive browser `alert()` calls with inline, state-driven validation and a simulated loading state (e.g., 800ms) creates a significantly more polished and "professional" feel for simple interactions. Coupling this with ARIA attributes (`aria-invalid`, `aria-live`) ensures the improvement is inclusive.
**Action:** Default to inline validation and loading spinners for all form submissions, even simple ones like newsletter signups.
