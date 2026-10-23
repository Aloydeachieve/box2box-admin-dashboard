<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Box2Box Admin Dashboard Development Rules

## 1. Table Decoupling Rule (App-wide)
- On every screen or page across the entire dashboard that contains a table section, **NEVER** put the filter button, search option, or table title/status tabs inside the same container, card, or section as the table.
- The search input, filter dropdown, and table title/tabs must hang cleanly **above** the table container directly on the page background.
- The table card container itself must only enclose the table rows and table-internal batch action bars (such as "Select all", selection count, and batch update buttons).

## 2. Box2Box Pulsing Badge Rule
- Every yellow action button and every modal pop-up with a save/confirm option must be equipped with the official `<Box2BoxPulsingBadge size={14} inverted={false} />`.

## 3. Standardized Modal Patterns (4 Core Modal Types)
- **Type 1: Selection Dropdown Modal with Checkboxes & Action Buttons** (e.g. `SelectAppModal`, Figma Image 3):
  - **Header**: Title and circular close `(X)` button.
  - **Divider**: Subtle 1px horizontal hairline divider under header.
  - **Checkboxes**: Square checkboxes with 4px border-radius. When checked, filled with vibrant yellow (`#F5C842`) and checkmark icon. Includes `'All'` toggle option.
  - **Action buttons**: Full-width bottom row with neutral dark `Discard` button and vibrant yellow `Save` button with `<Box2BoxPulsingBadge size={14} inverted={false} />`.
- **Type 2: Instant-Select Radio Modal without Action Buttons** (e.g. `SelectEarningTypeModal`, `SelectRewardFrequencyModal`, `SelectMeasureModal`, `SelectTimePeriodModal`):
  - **Header**: Question/Title prompt (e.g., `How should points be earned?`, `Select what to measure`) and circular close `(X)` button.
  - **NO action buttons**: Explicitly omit `Discard` and `Save` buttons at the bottom.
  - **Radio list**: Circular radio indicators with yellow dot when active. Clicking any item immediately selects the value and dismisses the modal.
- **Type 3: Categorized Tabbed Modal with Search** (e.g. `SelectUnlockRequirementModal`, `SelectPartModal`):
  - **Category tabs**: Clean text tabs at the top. Active tab text turns vibrant yellow (`#F5C842`) with an indicator line (NEVER wrap in a pill card container).
  - **Search input**: Positioned directly underneath category tabs for real-time item filtering.
  - **Options**: Categorized radio list items with single selection.
- **Type 4: Tabbed Filter Modal** (e.g. `PointsFilterModal`, `ReferralsFilterModal`, `OrdersFilterModal`):
  - **Tabs**: Clean underline text tabs. Active tab changes text color to vibrant yellow (`#F5C842`) with a 2px bottom accent bar. Never wrap in a solid or transparent card pill background.
  - **Filter body**: Checkbox lists and radio options per tab with `'All'` selection toggles.
  - **Action buttons**: Full-width bottom row with `Discard` and yellow `Save` button with `<Box2BoxPulsingBadge size={14} inverted={false} />`.

## 4. Summary Column Standard for Creation Pages
- For creation views (`Create badge`, `Create point earning rule`), the right column is simply a text heading (`Badge summary` / `Rule summary`) with completely empty space below it, separated from the main column by a thin vertical border line (`borderLeft: 1px solid ${borderColor}`, `paddingLeft: 24px`, `alignSelf: stretch`). No cards, mockups, or previews are rendered.

## 5. Form Inactive Button State
- Form submit buttons (`Save & Exit`, `Save & Continue`) must render in a muted/inactive state (`#352F17` background, `#736B42` text, `cursor: not-allowed`, no pulsing badge) until required form fields are filled.
- Once valid, `Save & Exit` turns vibrant yellow `#F5C842` with black text `#000000` and `<Box2BoxPulsingBadge size={14} inverted={false} />`.

## 6. Zero Extra Contrast & Natural Background Rule
- Do NOT add lighter black, elevated dark gray, or extra contrast/texture backgrounds to cards, containers, sections, forms, inputs, search bars, or filter buttons.
- Preserve the original page dark background (clean deep black `#0D0D0E` or transparent). Sections, cards, and input fields are demarcated cleanly using subtle 1px border lines (`rgba(255, 255, 255, 0.08)`) instead of elevated background shades.
- The ONLY elements that carry non-black colors are text typography, action buttons, status pills/badges, and focused modal popups.

## 7. Edge-to-Edge Scrolling Standard
- For horizontal stat card lists and slider carousels (e.g. Dashboard overview, Transactions stat cards), employ edge-to-edge scrolling allowing cards to reach the edge of the screen during drag/scroll without being trapped behind container padding.
- Do NOT wrap the scrollable stat card track inside a general container card or bounding border; let the cards float directly on the page background.

## 8. Standard Modal Sizing & Right-Aligned Controls Rule
- **Fixed Container Height**: Tabbed modals must have a standard fixed container height (e.g. `height: 440px`, `boxSizing: border-box`) and an inner scrollable options area (`flex: 1`, `overflowY: auto`). Switching between tabs with differing numbers of items must NEVER cause the modal container to jump, resize, or shift dimensions.
- **Right-Aligned Indicators**: Option lists (checkboxes and radios) must align the label text to the left and the checkbox/radio indicator to the far right (`display: flex; align-items: center; justify-content: space-between; width: 100%`). Checkboxes and radios must never be positioned before or next to the label text on the left.



