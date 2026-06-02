## 2025-05-15 - Inline Validation & Form Accessibility
**Learning:** Browser `alert()` interrupts the user's flow and feels disconnected from the form. Inline validation messages coupled with disabled submit states provide immediate, contextually relevant feedback. Proper `htmlFor`/`id` linkage is essential for screen reader users to understand form input relationships.
**Action:** Always prefer inline error states and non-blocking feedback over native browser alerts in checkout flows. Ensure every interactive icon-only element has a descriptive `aria-label`.
