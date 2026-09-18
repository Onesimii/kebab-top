## 2026-06-03 - Checkout Form UX & Accessibility
**Learning:** Replacing browser `alert()` with inline validation and 'clear-on-input' logic significantly improves the perceived quality and flow of the checkout process. Additionally, linking labels to inputs and adding `aria-label` to icon-only buttons are foundational accessibility wins that are often overlooked but easy to implement.
**Action:** Always check for `alert()` calls in forms and replace them with state-driven inline validation. Ensure all interactive icons have descriptive ARIA labels.

## 2026-06-06 - Dynamic Feedback for State Changes
**Learning:** For actions like "Copy to Clipboard", visual-only feedback (changing an icon) is insufficient for screen reader users. Combining `aria-live` with a dynamic `aria-label` ensures that the state change is announced immediately and clearly.
**Action:** When implementing temporary visual feedback for icon-only buttons, always synchronize the `aria-label` and use `aria-live` to announce the change.

## 2026-06-25 - Accessible Custom Selection UI
**Learning:** Custom 'card' or 'tile' selection interfaces (like payment methods or plan choices) are often implemented using labels or divs that are not natively accessible to keyboard or screen reader users. Transforming them into a `radiogroup` and `radio` pattern with `tabIndex={0}` and `onKeyDown` handlers for 'Enter'/'Space' provides a familiar and robust UX for all users.
**Action:** Identify any custom card-based selections and apply the ARIA radio pattern to ensure full keyboard and assistive technology compatibility.

## 2026-07-10 - Newsletter UX & Accessible Feedback
**Learning:** Newsletter forms often suffer from "silent failures" or disruptive alerts. Implementing a simulated loading state (e.g., 1s delay with a spinner) provides clear confirmation of the subscription intent, even when the underlying action is fast. Furthermore, increasing disclaimer text from 10px to 12px significantly improves legibility for older users and those with visual impairments.
**Action:** Use simulated loading states for form submissions to provide visual "breathing room" for confirmation. Maintain a 12px minimum for legal or secondary text to ensure accessibility.

## 2026-07-24 - Accessible Grid Bento Cards
**Learning:** Bento grid cards and promotional tiles often function as primary navigation triggers but are built with non-interactive `div` tags, making them invisible to keyboard users and screen readers. Assigning `role="button"`, `tabIndex={0}`, curried `onKeyDown` handlers (for Enter/Space), and visible `focus-visible` ring indicators turns visual marketing elements into fully accessible interactive controls without breaking layout structure.
**Action:** Always audit interactive card and bento tile elements to ensure they include keyboard listeners, focus rings, and proper ARIA button semantics.
