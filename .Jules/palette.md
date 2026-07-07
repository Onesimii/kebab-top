## 2026-06-03 - Checkout Form UX & Accessibility
**Learning:** Replacing browser `alert()` with inline validation and 'clear-on-input' logic significantly improves the perceived quality and flow of the checkout process. Additionally, linking labels to inputs and adding `aria-label` to icon-only buttons are foundational accessibility wins that are often overlooked but easy to implement.
**Action:** Always check for `alert()` calls in forms and replace them with state-driven inline validation. Ensure all interactive icons have descriptive ARIA labels.

## 2026-06-06 - Dynamic Feedback for State Changes
**Learning:** For actions like "Copy to Clipboard", visual-only feedback (changing an icon) is insufficient for screen reader users. Combining `aria-live` with a dynamic `aria-label` ensures that the state change is announced immediately and clearly.
**Action:** When implementing temporary visual feedback for icon-only buttons, always synchronize the `aria-label` and use `aria-live` to announce the change.

## 2026-06-25 - Accessible Custom Selection UI
**Learning:** Custom 'card' or 'tile' selection interfaces (like payment methods or plan choices) are often implemented using labels or divs that are not natively accessible to keyboard or screen reader users. Transforming them into a `radiogroup` and `radio` pattern with `tabIndex={0}` and `onKeyDown` handlers for 'Enter'/'Space' provides a familiar and robust UX for all users.
**Action:** Identify any custom card-based selections and apply the ARIA radio pattern to ensure full keyboard and assistive technology compatibility.

## 2026-07-07 - Navigational Grid Accessibility
**Learning:** Category navigation grids using non-semantic elements (like divs) for cards are common accessibility barriers. Adding `role="button"`, `tabIndex={0}`, and `onKeyDown` handlers for 'Enter'/'Space' transforms them into accessible navigation controls while maintaining the intended visual design.
**Action:** Ensure all tile-based or card-based navigation components are keyboard-accessible with appropriate ARIA roles and focus-visible indicators.
