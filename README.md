# Task Card — Stage 0

A semantic, accessible, and responsive Todo Card built with plain HTML, CSS, and JavaScript. Submitted as Stage 0 of the HNG 14 Frontend Wizards track.

## Live URL
[View on Vercel →](#) *(https://koli-task-card.vercel.app/)*

## Features
- Checkbox toggles task completion — strikes through the title and updates the status badge
- Time remaining calculates live from a fixed due date and refreshes every 60 seconds
- All required `data-testid` attributes present for automated testing
- Fully keyboard navigable: Tab → Checkbox → Edit → Delete
- Responsive from 320px to 1200px

## Running locally
No build step needed. Clone the repo and open `index.html` in your browser.

```bash
git clone https://github.com/your-username/todo-card-stage-0.git
cd todo-card-stage-0
```

## Accessibility notes
- Semantic HTML throughout — `<article>`, `<time>`, `<ul role="list">`, `<button>`
- Checkbox has a linked `<label>` and `aria-describedby` pointing to the task title
- Time remaining uses `aria-live="polite"` so screen readers announce updates
- All buttons have visible text and `aria-label` for icon context
- Focus styles visible on all interactive elements
- Color contrast meets WCAG AA

## Known limitations
- Edit and Delete are dummy actions
- Single hardcoded card — no persistence or list management