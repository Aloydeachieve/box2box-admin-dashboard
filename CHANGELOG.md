# Changelog

All notable changes to the **Box2Box Admin Dashboard** frontend project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added - 2026-09-29
- **User Actions Confirmation Modals & Profile Details Suite**:
  - **Keyword-Protected Confirmation Modals (`UserConfirmModal.tsx`)**:
    - Built confirmation dialogs for `suspend`, `delete`, and `reactivate` actions (both single user and bulk).
    - Requires typing the exact keyword (`suspend`, `delete`, `reactivate`, or `suspend all`, `delete all`, `reactivate all`) to enable the action button, preventing accidental account modifications.
    - Matching Figma iconography: Yellow avatar with X for suspension, Red circle with X for deletion, Green circle with checkmark for reactivation.
    - Floating post-action feedback toast notifications ("User suspended", "User deleted", "User reactivated").
  - **Dynamic Multi-Select Bulk Actions Bar**:
    - Floating bar appears above table upon checking 1 or more user checkboxes (`4 of 100 Selected`).
    - Quick bulk triggers: `Delete` (trash icon), `Suspend` (ban icon), `Activate` (check icon).
  - **Full User Profile Details Page (`UserProfileDetailView.tsx`)**:
    - Accessible via "View profile" or clicking any user row.
    - **Header & Profile Card**: Back button (`← Back to Users`), yellow `Action ▾` dropdown button, user avatar with active online green indicator, ID `#1234567879`, active badge, email, phone, location, join date, clickable default locker link (`A5 4567 MyBox locker 232TE6`), delivery mode, and referrer.
    - **Summary Section**: 5 mini stat cards with `Daily ▾` filter (`Total bookings 7,935`, `Success rate 94%`, `Total Spend ₦1.67M`, `Reward Points 270`, `Wallet balance 79.8M`).
    - **Analytics Charts**: Activity chart smooth spline wave, Spending trend spline wave, Booking types 75% Delivery vs 25% Storage semi-circular arc gauge.
    - **Interactive Sub-Tabs**: `Bookings`, `Boxes`, `Wallet`, `Rewards`, `Referrals`, `Reports` with dynamic stat cards and table columns.
    - **Filter Drawer Modal**: Filter by duration (`Today`, `Last 7 days`, `Last 30 days`, `Last 90 days`, `Custom`) with Discard and Save buttons.
    - **Activity History Right Panel**: Chronological event timeline grouped by date (`June 03, 2025`, `June 02, 2025`) with status badges (Resolved, In progress, Pending, Successful).

---

## [0.1.0] - 2026-09-28
### Added
- Initialized Next.js 16.3.6 App Router project with TypeScript and React 19.
- Created Figma authentication pages:
  - `Desktop - Login` (`/login` & `/`)
  - `Desktop - Login - 2fa` (`/login/2fa`)
  - `Desktop - Forgot password` (`/forgot-password`)
  - Container card with surrounding thin white line and center vertical dividing line.
