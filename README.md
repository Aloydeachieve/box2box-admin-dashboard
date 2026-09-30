# Box2Box Admin Dashboard — Enterprise Operations Frontend

Production-ready Next.js frontend architecture for **Box2Box** smart door-to-door storage, high-density climate vault management, automated parcel locker networks, and courier EV fleet dispatch.

---

## Architecture Overview

```
box2box-admin-dashboard/
├── public/
│   ├── warehouse-hub.jpg          # Automated facility graphic asset
│   └── favicon.ico                # App icon
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Google Fonts (Outfit, Jakarta, JetBrains)
│   │   ├── page.tsx               # Master Operations Dashboard (Tabs, Modals, State)
│   │   └── globals.css            # Complete design system & custom properties
│   ├── components/
│   │   ├── Navbar.tsx             # Global header with hub switcher, telemetry, search, notifications
│   │   ├── Sidebar.tsx            # Navigation sidebar with badges and facility telemetry
│   │   ├── StatCards.tsx          # 5 executive KPI cards with SVG sparklines
│   │   ├── WarehouseOverviewBanner.tsx # Facility hero banner with climate controls and AGV status
│   │   ├── OrdersTable.tsx        # Searchable and filterable storage orders data table
│   │   ├── VaultMatrix.tsx        # Interactive 2D/3D warehouse rack & locker compartment matrix
│   │   ├── FleetTracker.tsx       # Courier EV telemetry, cargo load, and simulated GPS map
│   │   ├── RevenueChart.tsx       # SVG storage revenue and volume trends chart
│   │   ├── ActivityFeed.tsx       # Streaming operational audit event log
│   │   ├── OrderDetailModal.tsx   # Detailed modal with tracking progress and manifest
│   │   └── NewDispatchModal.tsx   # Interactive modal for creating and dispatching orders
│   ├── types/
│   │   └── index.ts               # Strict TypeScript domain interfaces
│   └── lib/
│       └── mockData.ts            # Realistic operations dataset for European hubs
├── .env.example                   # Environment configuration template
├── .env.local                     # Local development environment
├── next.config.ts                 # Next.js production configuration
├── tsconfig.json                  # TypeScript compiler settings
└── package.json                   # Dependencies and npm scripts
```

---

## Key Modules & Features

1. **Autonomous Warehouse Facility Management**
   - Live telemetry for Zone A (Climate Vault), Zone B (Standard Pallet Bay), and Zone C (Automated Smart Lockers).
   - Real-time temperature (°C) and humidity (%) tracking with ISO 27001 security standards.
   - Interactive rack bay inspector displaying current capacity ($m^3$) and stored customer manifests.

2. **Smart Door-to-Door & Locker Orders Pipeline**
   - Multi-status filter tabs (`Pending Pickup`, `In Transit`, `Stored in Vault`, `Out for Delivery`, `Completed`).
   - One-click copy for tracking numbers (`B2B-ES-8921`) and secure QR tokens.
   - Deep inspection drawer with timeline progress, customer communication shortcuts, and barcode printing.

3. **Fleet Telemetry & Dispatch**
   - Battery level monitoring for Electric Vans, Sprinters, and Cargo E-Bikes.
   - Dynamic cargo capacity utilization ($m^3$) against vehicle thresholds.
   - Vector-based route overview and courier tracking.

4. **Storage Space & Financial Analytics**
   - Custom SVG interactive area chart showing daily/weekly recurring revenue and storage volume.
   - Monthly Recurring Revenue (MRR) tracking with period filters.

5. **Operational Audit Feed**
   - Real-time event notifications for AGV robotic movements, locker reservations, and courier drops.

---

## Quickstart

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Linting
```bash
# Validate TypeScript and create optimized production bundle
npm run build

# Start production server
npm run start

# Run ESLint checks
npm run lint
```
