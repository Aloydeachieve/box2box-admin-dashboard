# Changelog

All notable changes to the **Box2Box Admin Dashboard** frontend project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added - 2026-10-10
- **Box Parts Inventory Management Suite (Images 1–5)**:
  - **Main Box Parts Overview & Multi-Tab Table ([`InventoryPartsView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/parts/InventoryPartsView.tsx) & [`/inventory/parts/page.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/(admin)/inventory/parts/page.tsx), Images 1–4)**:
    - **Header Action Bar**: Yellow `New part` button (navigates to `/inventory/parts/new`), white pill `New category` button (opens New Category modal), yellow outline `New supplier` button (opens New Supplier modal), and rolling time range dropdown (`Today`, `This week`, `This month`, `Last 30 days`).
    - **5 Stat Cards**: `Total Parts` (5, +0% today), `Total Linked Accessories` (12,000,000, +12% today), `Total Linked Boxes` (7,935, +12% today), `Available Units` (30,908, +2% today), and `Faulty Parts` (2,050, +4% today).
    - **Tab 1: Parts (Image 1)**:
      - Columns: `Part` (thumbnail & name), `SKU`, `Category`, `Status` (green `Active` pill badge), `No. Available`, `No. Installed`, `No. Faulty`, and `Action`.
      - 3-Dot Row Action Menu: `View`, `Edit`, and `Discontinue` (interactive on/off toggle switch).
      - Filter Modal ([`PartsFilterModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/parts/PartsFilterModal.tsx)): 2 tabs (`Category` and `Status`) with live search, selection radio indicators, and `Discard` / `Save` buttons.
    - **Tab 2: Stock (Image 2)**:
      - Columns: `Part`, `SKU`, `Category`, `Status` (`Available` in green, `Out of stock` in red, `Low stock` in orange), `No. Available`, `No. Installed`, `No. Faulty`, `Location`, and `Action`.
      - 3-Dot Row Action Menu: `View` and `Update stock` (opens modal to update available quantity with instant state reactivity and toast).
      - Filter Modal ([`PartsStockFilterModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/parts/PartsStockFilterModal.tsx)): 3 tabs (`Category`, `Status`, and `Location`) with live search and select indicators.
    - **Tab 3: Category (Image 3)**:
      - Columns: `Category`, `Description`, `Created`, `Last updated`, `Parts`, and `Action`.
      - 3-Dot Row Action Menu: `View` and `Edit` (opens Edit Category modal with prefilled name and description).
      - Clean header with search input, without filter button.
    - **Tab 4: Supplier (Image 4)**:
      - Columns: `Supplier` (name and email), `Location`, `Created`, `Last updated`, `Quantity supplied`, and `Action`.
      - 3-Dot Row Action Menu: `View` and `Edit` (opens Edit Supplier modal with prefilled details).
      - Clean header with search input, without filter button.
    - **Pagination**: `1 - 100 of 5,000,045` with `<` and `>` controls across all tabs.
  - **New Part Full-Page Form ([`NewPartView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/parts/NewPartView.tsx) & [`/inventory/parts/new/page.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/(admin)/inventory/parts/new/page.tsx), Image 5)**:
    - Accessible directly via the yellow `New part` button.
    - Header: `< New part` with back navigation returning to `/inventory/parts`.
    - `About part` card: `SKU (Auto-generated)` input with yellow border (`1234567`), `Part name` input, `Category` dropdown selector (`Main Module`, `Extension`, `Locks`, `Camera`), and square `+` media upload button supporting image preview and `(X)` removal.
    - Bottom yellow `New part` submit button with instant validation and toast feedback.
  - **Dashboard Shell Routing & Layout Alignment ([`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx))**:
    - Automatically derives header title `'Parts'` for the main view and `'New part'` for the creation page.
    - Correctly coordinates back navigation and suppresses redundant header action buttons.

### Added - 2026-10-09
- **Accessory Stock & Unit Management Suite Overhaul (Images 1–5)**:
  - **Category Detail View Activity History Cleanup ([`CategoryDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/CategoryDetailView.tsx), Image 1)**:
    - Removed horizontal separating lines between activity messages in the right sidebar.
    - Stripped background pill badges from the `Auto` and `Admin` role text, displaying them as clean colored text (`#10B981` green for Auto, `#F5C842` gold for Admin).
  - **Dropdown Modals for Location and Parts ([`SelectPartModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/SelectPartModal.tsx), [`SelectLocationModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/SelectLocationModal.tsx), Image 2)**:
    - Implemented dark floating selection modals matching Figma Image 2 with circular `(X)` close buttons, live search inputs, and circular radio select indicators.
    - Wired to Location and Part dropdown slots in [`UpdateAccessoryStockView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/UpdateAccessoryStockView.tsx), [`UpdateUnitView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/UpdateUnitView.tsx), and [`EditAccessoryStockView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/EditAccessoryStockView.tsx).
  - **Unit Stock Update Full-Page Form ([`UpdateUnitView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/UpdateUnitView.tsx), Image 3)**:
    - Replaced placeholder toast on Units table `Edit` action with navigation to `< Update unit`.
    - Features `About box` card (`Box ID`, `Model`, `Location`, `Battery`), `Cabinet A1 parts` card (`Door`, `Lock`, `Hinge`), `Cabinet A2 parts` card (`Door`, `Lock`, `Hinge`), and yellow `Update stock` submit button.
  - **Accessory Unit Detail View ([`AccessoryUnitDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/AccessoryUnitDetailView.tsx), Image 4)**:
    - Replaced placeholder toast on Units table `View` action with navigation to `Accessory unit ID` detail page (`?view=unit-detail`).
    - Top card with metadata, purple pill badge `Installed`, timestamps, `Order Id`, `Added by`, `Sold by`, `Linked box`, and `Specifications`.
    - Header `Actions ▾` dropdown with 4 options: `Edit` (routes to Edit Accessory Stock), `Assign to order`, `Mark as faulty` (toggle switch), and `Return to stock`.
    - `Parts` table displaying components with status pill badges (`Good` / `Faulty`).
    - 3-Dot table action dropdown with `Replace parts` (reusing [`ReplacePartDrawer.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/ReplacePartDrawer.tsx)) and `Mark as faulty` (interactive on/off toggle switch).
    - Continuous right-column Activity History sidebar matching Figma Image 4.
  - **Edit Accessory Stock Full-Page Form ([`EditAccessoryStockView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/EditAccessoryStockView.tsx), Image 5)**:
    - Wired Header `Actions ▾ -> Edit` on Image 4 to open `< Edit accessory stock`.
    - Features `About accessory` card (`Item ID`, `Accessory`, `Location`), `Parts` card (3 part selects with Image 2 popovers), and yellow `Update stock` submit button.
  - **Dashboard Shell Routing & Header Alignment ([`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx))**:
    - Configured dynamic headers for `< Update unit` (Image 3) and `< Edit accessory stock` (Image 5), clean header with actions button for `AccessoryUnitDetailView` (Image 4), and unified back navigation.

- **Inventory Accessories Management Suite & Details Overhaul (Images 1–5)**:
  - **Figma Image 1: "New category" Modal Restyle**:
    - Replaced the generic category modal with the exact dark Figma layout (`#1C1C1E`, `20px` radius).
    - Features circular `(X)` close button, dark rounded input for `Category name`, dark rounded textarea for `Category description`.
    - Side-by-side action buttons: Light silver/gray `Discard` (`#E5E7EB`, bold dark text) and yellow `Save` (`#F5C842`, bold dark text).
  - **Rolling Time Range Dropdown (`Today`, `This week`, `This month`, `Last 30 days`)**:
    - Converted the static `This week ▾` button on `/inventory/accessories` into a functioning rolling dropdown menu with active item highlight and auto-close.
  - **Figma Image 2: "New accessory" Full-Page Form (`/inventory/accessories/new`)**:
    - Eliminated inline modal from `/inventory/accessories` and routed the yellow `New accessory` button to a dedicated full page.
    - Implemented `About accessory` card with yellow-bordered auto-generated SKU input, accessory name, category selector, amount with ₦ prefix, specifications, and square `+` media upload button.
    - Implemented `Other` card with parts selector, linked box model selector, and bottom yellow `New accessory` submit button.
  - **Figma Image 3: Interactive Select Popovers**:
    - `Select category`: Floating modal with radio indicators for `Main module` and `Extensions`.
    - `Select parts`: Floating modal featuring live search bar, yellow checkmark multi-select boxes (`Battery`, `Motherboard`, `Wheels`, `Doors`, `Locks`, `Hinge`), and bottom `Discard` / `Save` buttons.
    - `Select model`: Floating modal with radio indicators for `MyBox-Standard` and `MyBox-Zero`.
  - **Figma Image 4: Accessory Model Detail Overview (`/inventory/accessories/[accessoryId]`)**:
    - Dual-mode architecture controlled by URL parameter `?view=units`.
    - Top card displaying accessory image, 3 carousel indicator dots, green `Active` badge, metadata (`SKU`, `Category`, `Amount`, `Last updated`, `Specifications`, `More data about box`).
    - 6 stat cards (`Total locations`, `Available Quantity`, `Installed Quantity`, `Sold Quantity`, `Assigned Quantity`, `Faulty Quantity`).
    - All Stock breakdown table with single yellow `View` button per row, seamlessly routing into the Location Units view.
    - Top header yellow `Actions ▾` dropdown featuring `Edit` and `Discontinue` (interactive on/off toggle switch).
    - Right-column Activity History sidebar with administrative and system timestamps.
  - **Figma Image 5: Accessory Location Units View (`/inventory/accessories/[accessoryId]?view=units&loc=...`)**:
    - Accessible directly via the `View` button on Tab 2 ("Stock") of `/inventory/accessories` or from the overview table.
    - Top card displaying accessory details for the specific location (`Location Ikeja`, `Linked model MyBox-Standard`).
    - 5 stat cards (`Available Quantity`, `Installed Quantity`, `Sold Quantity`, `Assigned Quantity`, `Faulty Quantity`).
    - 2-Tab Filter Modal ([`AccessoryUnitFilterModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/AccessoryUnitFilterModal.tsx)) with `Status` (`All`, `Available`, `Assigned`, `Faulty`) and `Duration` (`Today`, `Last 7 days`, `Last 30 days`, `Last 60 days`).
    - Units table displaying `Item ID`, pill status badge, `Added by` author/timestamp, `Sold by`, `Order ID`, and `Linked unit`.
    - 3-Dot row action dropdown with `View`, `Edit`, `Assign to order` (reusing [`AssignOrderModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/AssignOrderModal.tsx)), `Mark as faulty` toggle switch, and `Return to stock` (reusing [`ReturnToStockModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/ReturnToStockModal.tsx)).
    - Top header `Actions ▾` dropdown with `Update stock` (routing to dedicated full-page form) and `Stock threshold` (reusing [`StockThresholdModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/StockThresholdModal.tsx)).
  - **Category Actions & Detail View Suite (Images 1 & 2)**:
    - **Tab 3 Row Action "Edit" -> Edit Category Modal (Image 1)**: Integrated the exact dark modal (`#1C1C1E`, `20px` radius) with `Category name` and `Category description` fields, and side-by-side `Discard` and `Save` buttons with instant state reactivity and toasts.
    - **Tab 3 Row Action "View" -> Category Detail Page (`/inventory/accessories/categories/[categoryId]`, Image 2)**:
      - Top metadata card with category title, description, and author/timestamp info.
      - Double-border container architecture with `Accessories` tab, live search filter, and `Filter ▾` button.
      - 2-Tab Filter Modal ([`CategoryAccessoriesFilterModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/CategoryAccessoriesFilterModal.tsx)) with `Linked boxes` (`All`, `MyBox-standard`, `MyBox-premium`) and `Status` (`All`, `Active`, `Discontinue`).
      - Full accessories table with 3-dot row action menu: `View` (routes to Accessory Detail View), `Edit` (routes to Edit Accessory Page), and `Discontinue` (interactive on/off toggle switch).
      - Right-side Activity History sidebar displaying administrative history entries matching Figma specifications.
  - **Edit Accessory Full-Page View (`/inventory/accessories/[accessoryId]/edit`, Image 3)**:
    - Dedicated edit route displaying `< Edit accessory` header, prefilled `About accessory` card with yellow-bordered auto-generated SKU, category trigger with select popover, amount in ₦, specifications, and media preview with removal badge.
    - `Other` card featuring yellow-bordered `Parts` and `Linked box model` triggers opening Image 3 select popovers.
    - Bottom `Update accessory` submit button with instant validation and feedback.
    - Wired `Edit` redirection on the header of the Accessory Detail View (Image 4) to navigate straight to this edit page.
  - **Update Accessory Stock Full-Page View (`/inventory/accessories/[accessoryId]?view=update-stock`, Image 5)**:
    - Replaced the placeholder modal with a dedicated form view matching the design specification.
    - Header displaying `< Update accessory stock` with automatic back navigation to the units table.
    - `About accessory` card with yellow-bordered `Item ID (Auto-generated)`, `Accessory` name, `Location` selector, and yellow `Scan to add` button.
    - `Parts` card with a 3-part selector dropdown grid.
    - Bottom actions: yellow `Save & Exit` and dark `Save & Continue` buttons with state persistence.
  - **Shell & Navigation Synchronization**:
    - Updated [`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx) to provide `< New accessory` back navigation and dynamic header actions for accessory detail views.

### Added - 2026-10-08
- **Inventory Box Details Spacing & Double-Border Container Architecture**:
  - **Figma Design Alignment for Detail Pages**: Updated [`InventoryUnitDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryUnitDetailView.tsx) and [`InventoryBoxModelDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxModelDetailView.tsx) to match Figma Image 2.
  - **Stacked `View live box` Link**: Relocated the `View live box` link so it is stacked directly underneath `More data about box` in the `Specifications` block, removing the right-aligned push that stretched across the screen.
  - **Double-Border Container Structure**: Implemented the two-tier border layout where the entire lower section (tabs, search bar, filters, and table) is enclosed inside an outer main container (`1px solid rgba(255, 255, 255, 0.08)`, `borderRadius: 16px`, `padding: 24px`), and the table itself is enclosed in an inner table container (`1px solid rgba(255, 255, 255, 0.08)`, `borderRadius: 12px`), properly separating sections.
  - **Breathing Space for Activity History**: Added `28px` right padding to the Left Main Content column across detail pages, creating a clean gap before the vertical border of the Activity History column.

- **Inventory Accessories Management Suite (`/inventory/accessories`, Images 3, 4, 5)**:
  - **Full-Fidelity Accessories Overview (`InventoryAccessoriesView.tsx`, `/inventory/accessories`)**:
    - **Header & 5 Stat Cards**: Implemented top header with `Box accessories` title, subtext, yellow `New accessory` button, white `New category` button, `This week ▾` dropdown, and 5 stat cards (`Total Accessories: 5, +0%`, `Total Accessories Units: 12,000,000, +12%`, `Available Units: 7,935, +12%`, `Installed Units: 30,908, +2%`, `Faulty Units: 2,050, +4%`).
    - **3-Tab Table Navigation**: Seamless switching between `Accessories`, `Stock`, and `Category` views within the double-border container layout.
    - **Tab 1: Accessories Overview (Image 3)**:
      - Complete table featuring image thumbnail, Name, SKU, Category, Linked box, Amount, Status badge, and metrics (No. Available, No. Assigned, No. Installed, No. Faulty).
      - 3-Dot Action menu featuring `View`, `Edit`, and interactive `Discontinue` on/off toggle switch with real-time status toggling, upward flip positioning, and feedback toasts.
      - 3-Tab Filter Modal ([`AccessoriesFilterModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/AccessoriesFilterModal.tsx)) with `Category` (`All`, `Main Module`, `Extension`, `Locks`, `Camera`), `Linked boxes` (`All`, `MyBox-standard`, `MyBox-premium`), and `Status` (`All`, `Active`, `Discontinue`).
    - **Tab 2: Stock by Location (Image 4)**:
      - Granular table featuring image thumbnail, Name, SKU, Category, Linked box, Status badge (`Available`, `Low stock`, `Out of stock`), telemetry counts, and City Location (`Ibariogwa Expressway, Ikeja, Lagos`).
      - 3-Dot Action menu featuring `View` and `Update stock` with interactive modal to modify available quantity in real time.
      - 4-Tab Filter Modal ([`StockFilterModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/accessories/StockFilterModal.tsx)) with `Category` (`All`, `1`, `2`, `4`), `Linked box` (`All`, `Metal`, `Wood`), `Status` (`All`, `Available`, `Low stock`, `Out of stock`), and `Location` (`All`, `Ikeja`, `Awka`, `Onitsha`).
    - **Tab 3: Category Architecture (Image 5)**:
      - Table displaying Category name, Description/SKU, Created author & timestamp (`Aku Cynthia | Jun 24, 2026 | 11:15 AM`), Last updated author & timestamp, and Accessories count.
      - Filter button intentionally omitted matching design specifications.
      - 3-Dot Action menu with `View` and `Edit`.
    - **Interactive Creation Modals**: Added `New accessory` modal and `New category` modal with form controls, automated SKU generation, and immediate dataset reactivity.
    - **Shell & Navigation Synchronization**: Updated [`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx) to provide `'Accessories'` header title and maintain top-level subtab navigation.

- **Inventory Stock by Location Table Navigation to `UpdateModelStockView`**:
  - Connected the 3-dot row action dropdown `Update stock` in [`InventoryBoxesView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxesView.tsx) to directly navigate to `UpdateModelStockView` (`/inventory/boxes/[modelSlug]?view=update-stock&loc=...`) instead of displaying a placeholder toast notification.

- **Global Upward Table Action Dropdown Positioning (Prevention of Clipping & Internal Scrollbars)**:
  - Eliminated dropdown clipping and internal table scrollbars across all tables in [`InventoryBoxesView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxesView.tsx), [`InventoryBoxModelDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxModelDetailView.tsx), [`InventoryUnitDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryUnitDetailView.tsx), [`BoxManagementView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/BoxManagementView.tsx), and [`box-management/page.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/(admin)/box-management/page.tsx).
  - Dynamically detects rows near table bottom (`index >= length - 2`) and flips dropdown position upward (`bottom: 100%`, `marginBottom: 4px`, `zIndex: 50`) so dropdowns open cleanly into visible table space above the trigger.

- **Elimination of Nested Dark Container Wrappers & Background Uniformity**:
  - Unified the root shell background in [`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx) to `#0B0B0C` (matching Figma dark mode), darker than the `#111113`/`#121214` sidebar.
  - Stripped out artificial `#0B0B0C` inner wrapper divs and redundant nested paddings from [`InventoryBoxesView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxesView.tsx), [`InventoryBoxModelDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxModelDetailView.tsx), [`InventoryBoxModelFormView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxModelFormView.tsx), [`UpdateModelStockView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/UpdateModelStockView.tsx), and [`InventoryUnitDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryUnitDetailView.tsx). Content now flows seamlessly directly inside `<main>` without "container-in-container" seams.

- **Figma Fidelity Overhaul for `UpdateModelStockView.tsx` (Images 3 & 4)**:
  - **Header Title & Clean Actions**: Updated [`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx) to recognize `?view=update-stock` queries, presenting `< Update model stock` without the yellow `Actions ▾` button.
  - **Figma Floating Labels**: Implemented inside-box floating labels (`10px` tiny label at top-left, `13px` selected value/input underneath) across `Box ID`, `Model`, `Location`, `Battery`, `Door`, `Lock`, and `Hinge`.
  - **Yellow Bordered Scan Button**: Replaced plain scan text with a yellow bordered button (`1px solid #F5C842`, `borderRadius: 6px`, scan icon, hover tint) matching Figma Image 3.
  - **Figma Buttons & Generous Breathing Space**: Restyled `Save & Exit` (yellow) and `Save & Continue` (clean white button matching Figma), with `80px` bottom padding preventing screen edge crowding.

- **Location Units Table "Edit" Action Re-Route**:
  - In [`InventoryBoxModelDetailView.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/InventoryBoxModelDetailView.tsx), re-routed the row 3-dot dropdown `Edit` option from model edit (`/boxes/[modelId]/edit`) to `UpdateModelStockView` (`/boxes/[modelId]?view=update-stock&unitId=...&loc=...`).

- **Unit Detail Header Actions Wiring (`InventoryUnitDetailView.tsx`)**:
  - Re-routed header `Edit` action to open `UpdateModelStockView` (`/inventory/boxes/[modelId]?view=update-stock&unitId=[unitId]`) instead of firing a toast.
  - Connected header `Return to stock` action to open [`ReturnToStockModal.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/ReturnToStockModal.tsx) with reason textarea validation, and shows success toast upon confirmation.

- **Route 404 Resolution & Robust Dynamic Route Hierarchy (`/inventory/boxes/[modelId]/unit/[unitId]`)**:
  - Resolved 404 "Page could not be found" on `/inventory/boxes/mybox-standard/unit/MyBox-123456` by configuring [`page.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/(admin)/inventory/boxes/[modelId]/unit/[unitId]/page.tsx) as an async Server Component with dynamic parameter unwrapping and a React `<Suspense>` boundary.
  - Added fallback route guards for [`/inventory/boxes/[modelId]/unit`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/(admin)/inventory/boxes/[modelId]/unit/page.tsx) and [`/inventory/boxes`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/(admin)/inventory/boxes/page.tsx) to prevent unexpected 404 errors when navigating through breadcrumbs or truncated URLs.
  - Updated [`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx) back navigation to ensure clicking the back arrow on a unit detail page returns precisely to the Location Units table (`?view=units`).

- **Inventory Unit Detail View & Universal Parts Suite (`InventoryUnitDetailView.tsx`, Image 2)**:
  - **Live Box IoT Telemetry Redirection**:
    - Connected the `View live box` header link directly to the Box Management details page (`/box-management/${unitId}`), landing directly on the active **Cabinet** tab matching system requirements.
  - **Universal Parts Distribution Sub-Tab (Image 2)**:
    - Implemented dedicated table view for the `Universal` sub-tab displaying components (`Battery`, `Motherboard`) without the redundant `Usage` column present in the `All` view.
    - Integrated row action dropdown featuring:
      - `Replace parts`: opens [`ReplacePartDrawer.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/inventory/boxes/ReplacePartDrawer.tsx) configured for the clicked hardware component with real-time replacement state updates and toast notification.
      - `Mark as faulty`: interactive on/off toggle switch with real-time status toggling between `Good` and `Faulty` and colored feedback toast notifications.
  - **3-Tab Filter Modal Integration (`InventoryPartsFilterModal.tsx`)**:
    - Connected the parts filter modal to apply filtering across:
      - `Components`: `All`, `Battery`, `Lock`, `Hinge`.
      - `Supplier`: `All`, `Aeon Tech`, `XYZ Ltd`.
      - `Status`: `All`, `Good`, `Faulty`.
  - **Placeholder Preparation for Cabinet Tabs (`A1`, `A2`, `A3`)**:
    - Created empty-state containers prepared with table structures and informational cards for upcoming locker compartment configurations.

- **Update Model Stock Suite (`UpdateModelStockView.tsx`, Images 3 & 4)**:
  - Accessible via the `Actions ▾` header dropdown (`Update stock`) in the Location Units Detail View, with direct route support at `/inventory/boxes/[modelId]/update-stock` and persistent back button navigation.
  - Full-fidelity form matching Figma Image 3:
    - **About Box Section**:
      - `Box ID (Auto-generated)` input with active yellow focus/selection border (`#F5C842`).
      - `Model` dropdown trigger displaying selected model (`MyBox-Standard`).
      - `Location` dropdown trigger displaying selected city location (`Ikeja`).
      - `Battery` dropdown trigger displaying selected battery pack (`B-123456`).
      - `Scan to add` yellow button with barcode/scan icon.
    - **Cabinet A1 Parts Section**:
      - `Door` dropdown (`D-123456`).
      - `Lock` dropdown (`L-123456`).
      - `Hinge` dropdown (`H-123456`).
    - **Cabinet A2 Parts Section**:
      - `Door` dropdown (`D-123456`).
      - `Lock` dropdown (`L-123456`).
      - `Hinge` dropdown (`H-123456`).
    - **Action Buttons**:
      - `Save & Exit` (Yellow): saves unit to stock dataset, triggers success confirmation, and redirects back to Location Units view.
      - `Save & Continue` (Secondary dark): saves unit to stock dataset, auto-increments to the next Box ID (`MyBox-123457`), and resets parts for rapid consecutive box provisioning.
  - **Figma Dropdown Picker Popovers (`DropdownPickerModal.tsx`, Image 4)**:
    - Reusable picker popup with dark card styling, search input, and custom radio indicators matching Figma Image 4 for:
      - `Select location` (`Awka`, `Ikeja`).
      - `Select battery` (`B-123456`, `B-123457`).
      - `Select door` (`D-123456`, `D-123457`).
      - `Select lock` (`L-123456`, `L-123457`).
      - `Select hinge` (`H-123456`, `H-123457`).

- **Location Units Table Action Menus & Stock Modals (`InventoryBoxModelDetailView.tsx`, Image 5)**:
  - **3-Dot Action Dropdown Hierarchy (Image 5 Box 2)**:
    - `View`: navigates to `/inventory/boxes/[modelId]/unit/[boxId]`.
    - `Edit`: navigates to `/inventory/boxes/[modelId]/edit`.
    - `Assign to order`: active for available unassigned boxes; incognito/disabled for already assigned/sold/deployed units.
    - `Mark as faulty`: toggle switch with live state update and feedback toast.
    - `Return to stock`: active for deployed/sold/assigned units; incognito/disabled for units already in available stock.
  - **Assign Order Modal (`AssignOrderModal.tsx`, Image 5 Box 1)**:
    - Interactive dialog with `Select order` header, search filter, and radio selection for `O-123456` and `O-123457`, immediately updating unit order assignment.
  - **Return Item to Stock Modal (`ReturnToStockModal.tsx`, Image 5 Boxes 3 & 4)**:
    - Modal dialog featuring `Enter reason for return` textarea, live character counter (`0/150`), and helper text `By returning item to stock, this box would be available for re-sale`.
    - Dynamic incognito/disabled button state when empty; transforms to active bright yellow button (`#F5C842`) once reason text is entered.
  - **Stock Updated Confirmation (`StockUpdatedModal.tsx`, Image 5 Box 5)**:
    - High-fidelity confirmation modal featuring header, custom large teal circle checkmark (`#008080`), and `Item returned to stock successfully` notice with auto-dismiss timer.

### Added - 2026-10-07
- **New & Edit Box Model Provisioning Suite (`InventoryBoxModelFormView.tsx`, `/inventory/boxes/new`, `/inventory/boxes/[modelId]/edit`)**:
  - Implemented full-fidelity Box Model Form supporting both Create (`mode="create"`, Images 1–3) and Edit (`mode="edit"`, Image 4) states matching Figma specifications:
    - **About Box Section**:
      - `SKU (Auto-generated)`: active yellow focus/selection border with persistent code.
      - `Model name`: text input with label and styling tokens.
      - `Material`: dropdown trigger opening popup with `Select material` header, horizontal separator line, and custom radio buttons for `Wood` and `Metal`.
      - `Number of cabinets`: input for locker count.
      - `Amount`: input with right-aligned Nigerian Naira (`₦`) currency symbol.
      - `Specifications`: multiline textarea for technical box details.
      - Media uploader with square `+` action button, image previews, and circular `✕` delete badge matching Image 4.
    - **Parts Section**:
      - `Universal parts`: dropdown popup with search bar and yellow checkmark toggles for Battery, Motherboard, Wheels, Doors, Locks, and Hinge (Image 2).
      - `Cabinet parts`: dropdown popup with search bar and yellow checkmark toggles (Image 3).
    - **Action Triggers**:
      - `Add new model` (create mode) and `Update model` (edit mode) yellow buttons with toast confirmation and router redirection.
- **Dual Detail Views Architecture for Inventory Boxes (`InventoryBoxModelDetailView.tsx`)**:
  - **Model Stock Overview View (Image 5)**:
    - Accessible via "View" action or model row in the "Box models" tab of `InventoryBoxesView`.
    - Top card with box image, carousel dots, `MyBox-Standard` title, `Active` status badge, SKU `MBX-789012`, Material `Wood`, Cabinets `3`, Amount `₦150,000`, and Last updated timestamp.
    - Top header yellow `Actions ▾` button with:
      - `Edit`: direct navigation to `/inventory/boxes/[modelId]/edit`.
      - `Discontinue`: interactive toggle switch on/off with real-time status change and toast notification.
    - 6-Metric Stat Card Grid: `Total locations (7)`, `Available Quantity (7,935)`, `Deployed Quantity (94)`, `Sold Quantity (90)`, `Assigned Quantity (20)`, and `Faulty Quantity (20)`.
    - Locations breakdown table (`Ibariogwa Expressway Ikeja`, `Awka Anambra`, `Onitsha Anambra`) with Status badges (`Available`, `Low stock`, `Out of stock`), telemetry counts, and yellow `View` links.
    - 2-Tab Filter Modal (`InventoryModelStockFilterModal.tsx`) with `Status` (`All`, `Available`, `Low stock`, `Out of stock`) and `Location` (`All`, `Ikeja`, `Awka`, `Onitsha`).
    - Right sidebar with Activity History: `Model name changed`, `Amount updated`, and `Model created`.
  - **Location Units Detail View**:
    - Accessible directly from "Stock by location" tab or by clicking `View` on any location row in the Model Stock Overview.
    - Displays unit-specific telemetry (`Location: Ikeja`, `B-123456`), 5 stat cards, and granular box unit records table with clickable links to `/inventory/boxes/[modelId]/unit/[unitId]`.
    - Seamless switching between Model Overview and Location Units with header back arrow synchronization via `customBack` in `AdminContext`.
- **Integrated Navigation Routing (`InventoryBoxesView.tsx`, `DashboardShell.tsx`, `AdminContext.tsx`)**:
  - Connected `New box model` button to `/inventory/boxes/new`.
  - Connected `Edit` action on box models to `/inventory/boxes/[id]/edit`.
  - Connected `Stock by location` "View" actions directly to `/inventory/boxes/mybox-standard?view=units`.
  - Configured dynamic header titles (`New box model`, `Edit box model`, clean header with Actions for details) and persistent back button routing.

- **Next.js App Router Page Architecture & URL Synchronization**:
  - Implemented dynamic, persistent routing matching standard web application structures:
    - `/dashboard`: Main Overview.
    - `/dashboard/box-management`: Box Management view.
    - `/dashboard/box-management/[id]`: Dedicated Box Details page (e.g. `/dashboard/box-management/MyBox-123456`).
    - `/dashboard/box-registration`: Box Registration & telemetry suite.
    - `/dashboard/users`: User Directory & bulk actions.
    - `/dashboard/users/[id]`: User Profile detail view.
    - `/dashboard/users/[id]/activity`: User Activity history timeline.
    - `/dashboard/users/[id]/activity/[bookingId]`: Individual booking event details.
  - Created [`DashboardShell.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/DashboardShell.tsx) and [`layout.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/app/dashboard/layout.tsx) providing persistent sidebar, dynamic header titles, back arrows, and contextual right sidebar without full-page re-renders.
  - Page reloads now persist exactly on the active page instead of resetting to the dashboard overview.
- **Modular Component Architecture for Box Details View (`src/components/dashboard/box/details/`)**:
  - Deconstructed monolithic 1000+ line `BoxDetailsPageView.tsx` into clean, maintainable, single-responsibility components:
    - [`CabinetsTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/CabinetsTab.tsx): Interactive 2x2 grid and full detail states.
    - [`BookingsTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/BookingsTab.tsx): Bookings metrics and history table.
    - [`BatteryTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/BatteryTab.tsx): Telemetry, coordinate-grounded charts, and activity grid.
    - [`ReviewsTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/ReviewsTab.tsx): Review stream and rating summary breakdown.
    - [`CodeUsageTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/CodeUsageTab.tsx): Code audit trail and clickable user links.
    - [`ReportsTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/ReportsTab.tsx): Incident reports table and 3-dot dropdown popover.
    - [`BoxActivityTab.tsx`](file:///c:/Users/sylve/projects/box2box-admin-dashboard/src/components/dashboard/box/details/BoxActivityTab.tsx): Activity security audit table with colored flags.
- **Interactive Cabinet Info Panel Matching Figma States**:
  - Implemented real-time dynamic panel updates upon clicking any locker door:
    - **Available State (`A4`)**: Green badge, "This cabinet is available for booking", last booking timestamp, usage history metrics, and parts manifest.
    - **Booked State (`A3`)**: Red badge, Booking ID (`#92739`), Customer name (`Aku Cynthia`), Date, Destination mode, Status (`Awaiting drop off`), Rider (`Ahmed Musa`), ETA (`3 mins`), usage history, and parts manifest.
    - **Occupied State (`A5`)**: Amber badge, "This cabinet has been made unavailable by the owner", last available timestamp, usage history, and parts manifest.
    - **Unavailable State (`A6`)**: Gray badge, maintenance alert, last active timestamp, usage history, and parts manifest.
- **Battery Tab Refinements**:
  - **Activity Grid Layout**: Strictly locked to **2 columns and 3 rows** (`repeat(2, minmax(0, 1fr))`) ensuring proper card alignment regardless of viewport width.
  - **Grounded Coordinate Performance Charts**: Added clear, visible Y-axis scales (`0 - 24` hours and `0% - 100%`), dashed horizontal gridlines, tick markers, and grounded baselines across all 3 charts (`Battery activity`, `Battery level trend`, `Drain by compartment`).
- **Global Bottom Spacing Resolution**:
  - Added generous 48px–56px bottom padding to the main scroll container across the dashboard shell, user profile, and box details views, preventing card elements from touching the bottom screen edge.
- **Box Details Sub-Tabs Suite & Filter Systems (`BoxDetailsPageView.tsx`, `BoxTabFilterModal.tsx`)**:
  - **Battery Telemetry & Usage Analytics Tab**:
    - 4 Telemetry stat cards: `Health Status (85%)`, `Charge Cycles (12)`, `Avg. Daily Drain (3.1%)`, and `87%` with `42 days remaining` plus green battery cell status graphic.
    - `Battery performance` grid featuring:
      - `Battery activity`: Stacked 7-day bar chart (Mon-Sun) contrasting `In use` vs `Idle time` with hover tooltip metrics (`In use: 3.5 hrs`, `Idle time: 8.5 hrs`).
      - `Battery level trend`: Smooth spline wave with golden glow gradient and multi-tier grid guidelines.
      - `Drain by compartment`: Bar chart tracking compartments `A1` to `A7` with overhead percentage indicators.
    - `Battery usage by activity`: 6-card breakdown grid (`Lock/Unlock Operations 35%`, `Network Connectivity 25%`, `Display & UI 15%`, `Sensor Monitoring 12%`, `Code Verification 8%`, `Other 5%`) with color-coded progress bars.
    - Dedicated `Duration` Filter Modal (`Today`, `Last 7 days`, `Last 30 days`, `Last 60 days`, `Custom`).
  - **Locker Reviews & Ratings Breakdown Tab**:
    - 4 Stat cards: `7 Days rating (4.5)`, `7 Days cleanliness rating (5.0)`, `7 Days rating count (200)`, `Avg. Daily Drain (3.1%)`.
    - Split-screen layout:
      - Left: User review stream (e.g., Aku Cynthia, Leo Martinez, Nina Patel, Jamal Thompson) with dual Service & Cleanliness star badges and comment logs.
      - Right: `Rating summary` card with huge 4.8/5 score, 5-star distribution bars (5★ to 1★), and 3 telemetry chips (`4.8 Avg Rating`, `99% Uptime`, `108 Uptime/Active`).
    - 3-Tab Filter Modal: `Cleanliness rating` (`All`, `5.0`–`1.0`), `General rating` (`All`, `5.0`–`1.0`), and `Duration`.
  - **Code Usage Audit Tab**:
    - 4 Stat cards: `Total Access (7,935)`, `Successful Access (7,860)`, `Failed Access Attempts (75)`, `Successful Access Rate (93%)`.
    - Access audit table with `Code`, `Cabinet`, `Usage` (pickup/dropoff), clickable underlined `Used by`, and timestamps.
    - 3-Tab Filter Modal: `Cabinet` (`All`, `A3`, `A4`, `A5`), `Usage` (`All`, `Rider pickup`, `Customer pickup`, `Rider dropoff`, `Customer dropoff`), and `Duration`.
  - **Hardware & Security Reports Tab**:
    - 4 Stat cards: `Total Reports (7,935)`, `High Severity (85%)`, `Pending (12)`, `Avg. Time to resolve (16hrs)`.
    - Reports table with Report ID, Title/Description, Category, Booking ID, Date, Severity badges (`High`, `Low`, `Medium`), Status, and Action menu.
    - Interactive 3-dot dropdown popover triggering `View`, `Escalate`, and `Resolve` with instant feedback toast notifications.
    - 3-Tab Filter Modal: `Severity` (`All`, `High`, `Medium`, `Low`), `Status` (`All`, `Pending`, `In progress`, `Escalated`, `Resolved`), and `Duration`.
  - **Box Activity & Audit Trail Tab**:
    - 4 Stat cards: `Total access events (7,935)`, `Successful access attempts (94%)`, `Failed access attempts (90)`, `Security incidents (20)`.
    - Chronological access log table displaying `Cabinet`, `Actor` (with role subtext), `Method` (with timestamp), `Outcome`, `Flag` (colored tags for `Forced access`, `Multiple failures`, `Suspicious`), and `Status`.
    - 6-Tab Filter Modal: `Cabinet`, `Method` (checkboxes for `Code access`, `Owner app`, `Admin override`, `Forced entry`), `Actor`, `Outcome`, `Flag`, and `Duration`.
  - **Clean Header Navigation**:
    - Clean "Filter ▾" button across all active sub-tabs without cluttering secondary descriptors.

### Removed - 2026-10-02
- Cleaned up 11 legacy/unused root components from `src/components/` (`ActivityFeed.tsx`, `FleetTracker.tsx`, `Navbar.tsx`, `NewDispatchModal.tsx`, `OrderDetailModal.tsx`, `OrdersTable.tsx`, `RevenueChart.tsx`, `Sidebar.tsx`, `StatCards.tsx`, `VaultMatrix.tsx`, `WarehouseOverviewBanner.tsx`).

### Verified - 2026-10-02
- Audited and verified `UserProfileDetailView.tsx` modular tables architecture for all sub-tabs (`bookings`, `boxes`, `wallet`, `rewards`, `referrals`, `reports`), confirming independent rendering, complete table headers, and scrollability.
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
