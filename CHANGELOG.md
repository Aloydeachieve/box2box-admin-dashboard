# Changelog

All notable changes to the **Box2Box Admin Dashboard** frontend project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added - 2026-09-30
- **Box Registration & Smart Locker Units Management Suite (`BoxRegistrationView.tsx`)**:
  - **Overview Telemetry & Capacity Stat Cards**:
    - `Total Registered Boxes`: 7,935 units (+12% today, 320 cities nationwide).
    - `Active & Online`: 7,412 (93.4% operational uptime with live IoT pinging).
    - `Maintenance & Offline`: Real-time tracking of units undergoing repair or connection loss.
    - `Critical Battery (<20%)`: 18 units with instant technician swap dispatch indicators.
  - **Dual Display Modes (Enterprise Table vs. Visual Locker Grid)**:
    - **Enterprise Table**: Filterable, sortable dataset with Box ID, Serial Number, Owner & Host info, Capacity, Location, Battery percentage, IoT heartbeat, and usage progress bar.
    - **Visual Locker Grid**: Card views featuring official Box2Box wooden cabinet units (`/image/box1.png`) and live door indicators (`A1`, `A2`, `B1`, `B2`).
  - **Comprehensive Unit Inspection Drawer (`BoxDetailModal.tsx`)**:
    - Real-time battery voltage (`12.6V`), solar circuit active charge states, 4G LTE signal telemetry, and internal microclimate sensors (`22.4°C`, `48% humidity`).
    - Interactive cabinet compartment matrix displaying parcel manifests, customer contacts, tracking tokens, and solenoid lock states.
    - **Remote Solenoid Release**: Immediate single-door or master emergency unlock commands dispatched directly to the locker unit.
    - Live audit feed and controller reboot controls.
  - **New Box Unit Provisioning Modal (`RegisterBoxModal.tsx`)**:
    - Hardware registration form for configuring serial numbers, cabinet variants (2/4/6/8 doors), host assignment, GPS coordinates, and 6-digit emergency master bypass PINs.
  - **Keyword-Protected Security Safeguards (`BoxConfirmModal.tsx`)**:
    - Action confirmation modal requiring explicit typing of `disable`, `activate`, `maintenance`, or `unlock all` before critical state alterations take effect.
  - **Cross-Module Dashboard Navigation**:
    - Connected Quick Actions ("Box management" -> `box_regt`) and "Recent Box update" -> `box_regt` for fluid navigation across the admin suite.

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
