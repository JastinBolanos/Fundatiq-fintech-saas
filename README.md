# Fundatiq Enterprise Treasury & Liquidity OS (v2.4.0-ENT)

![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=flat-square&logo=github-actions)
![Deployment](https://img.shields.io/badge/Deployment-Edge_Active-blue?style=flat-square&logo=cloudflare)
![Architecture](https://img.shields.io/badge/Architecture-Clean_Architecture_%2F_Hexagonal-indigo?style=flat-square)
![Compliance](https://img.shields.io/badge/Compliance-SOX_404_%7C_Basel_III-slate?style=flat-square)
![Security](https://img.shields.io/badge/Security-AES--256_GCM_%7C_mTLS-amber?style=flat-square)

> **Fundatiq** is an institutional corporate treasury orchestration, multi-bank liquidity management, and high-precision predictive cash flow modeling platform. Designed for Chief Financial Officers (CFOs) and global treasurers, it centralizes real-time balance visibility, executes automated zero-balance account (ZBA) sweeps, and projects financial survival runways using stochastic financial stress simulations.
>
> 🟢 **[View Live Platform (Production)](https://fundatiq-treasury.institutional.network)**

![Fundatiq Dashboard Preview](https://github.com/user-attachments/assets/4cafb032-13eb-4caf-9202-2d31f695083f)

> ℹ️ *Architecture Note:* Core bank settlement microservices (SWIFT / ISO 20022) and underlying relational databases reside in private repositories within segregated corporate networks in compliance with information security policies and regulatory frameworks. This repository contains the enterprise-grade client architecture, edge orchestration layer, domain use cases, and analytical telemetry interfaces.

---

## 🎥 Platform Demonstration

**🎬 Fundatiq Operational Walkthrough**  
Explore the real-time interface: from global balance consolidation and automated sweep execution (ZBA), to predictive liquidity simulation and regulatory compliance workflows.

https://github.com/user-attachments/assets/d0253e79-fe3d-4154-ae07-1f21277cb293

---

## 🏛️ System Architecture & Technology Stack

The system implements a decoupled architecture based on **Clean Architecture**, featuring runtime dependency injection, strict end-to-end typing, and rendering optimization.

```
┌─────────────────────────────────────────────────────────────┐
│             Presentation Layer (React 19 + Vite)            │
├─────────────────────────────────────────────────────────────┤
│         Application Layer (Use Cases & Domain Services)     │
├─────────────────────────────────────────────────────────────┤
│           Domain Layer (Entities & Repository Contracts)    │
├─────────────────────────────────────────────────────────────┤
│      Infrastructure Layer (DI Container & API Proxies)      │
└─────────────────────────────────────────────────────────────┘
```

### Exact Technical Stack (`package.json`)

#### Core & Runtime
- **React 19** (`react: ^19.0.1`, `react-dom: ^19.0.1`) — Modern reactive engine with concurrent component support.
- **TypeScript 5.8** (`typescript: ~5.8.2`) — Strict typing and financial interface verification.
- **Vite 6** (`vite: ^6.2.3`, `@vitejs/plugin-react: ^5.0.4`) — High-speed build and bundling environment.
- **Node.js** (v20+ LTS recommended) — Server execution environment and build tooling.

#### UI, Motion & Visualization
- **Tailwind CSS v4** (`tailwindcss: ^4.1.14`, `@tailwindcss/vite: ^4.1.14`, `autoprefixer: ^10.4.21`) — Tokenized design system for low-latency environments.
- **Motion** (`motion: ^12.23.24`) — Smooth orchestration of state transitions and modal interfaces.
- **Recharts** (`recharts: ^3.10.1`) — Visualization of cash flow curves, comparative bars, and liquidity distributions.
- **Lucide React** (`lucide-react: ^0.546.0`) — Corporate-grade technical vector iconography.
- **Tailwind Merge & Clsx** (`tailwind-merge: ^3.6.0`, `clsx: ^2.1.1`) — Conditional merging and resolution of CSS utilities.

#### Inference & Intelligence Engine
- **Google GenAI SDK** (`@google/genai: ^2.4.0`) — Generation and synthesis of executive treasury intelligence briefings (*Executive Intelligence Briefings*).

#### Backend & Secure Proxy
- **Express 4** (`express: ^4.21.2`, `@types/express: ^4.17.21`) — Edge server for secure request mediation and middleware.
- **Dotenv** (`dotenv: ^17.2.3`) — Environment configuration loading and isolation.
- **TSX & Esbuild** (`tsx: ^4.21.0`, `esbuild: ^0.25.0`) — Direct transpilation and execution of TypeScript modules in Node.js.

---

## 📦 Operational Modules (Deployed)

1. **Global Treasury Cockpit & Cash Concentration**
   - Real-time global balance consolidation across multiple entities (*Fundatiq Americas LLC, Europe B.V., APAC Pte Ltd*).
   - Live telemetry for total balance, burn rate, projected net liquidity, and risk concentration.

2. **Multi-Bank Liquidity Orchestration & Automated Sweeps**
   - Connectivity and integration with tier-1 banking institutions (JPMorgan Chase, Citibank, HSBC, Barclays, SVB).
   - Scheduled Zero Balance Account (ZBA) sweeps automation to maximize overnight interest yield.

3. **Cash Flow Analytics & Ledger Reconciliation**
   - Chronological breakdown of operating payables and receivables, global payroll, and cloud infrastructure services.
   - Transaction auditing with unique institutional reference IDs (`REF-FDQ-XXXX`) and automated reconciliation.

4. **Predictive Runway Engine (Monte Carlo Simulations)**
   - Probabilistic modeling with 10,000 iterations for financial runway calculation.
   - Resilience assessment through dynamic financial stress scenarios: *Base Case*, *Moderate Shock*, and *Severe Crisis*.

5. **Multi-Sig Governance & Compliance SOX 404**
   - Dual-signature cryptographic authorization workflow for high-value transfers exceeding corporate thresholds.
   - Regulatory compliance matrix (SOX 404, Basel III, IFRS 9) and automated screening against international sanctions lists (OFAC, EU, UN).

---

## 🛠️ Deployment & Audit Guide

### Prerequisites
- **Node.js**: Version 20.0.0 LTS or higher.
- **Package Manager**: `npm` (v10+), `bun`, or `yarn`.

### 1. Repository Cloning
```bash
git clone https://github.com/tu-organizacion/fundatiq-treasury-platform.git
cd fundatiq-treasury-platform
```

### 2. Environment Variables Setup
Create the local configuration file from the environment template:
```bash
cp .env.example .env
```

| Variable | Purpose | Required |
|---|---|:---:|
| `GEMINI_API_KEY` | Credential for the treasury intelligence synthesis engine | Optional |
| `APP_URL` | Base host URL of the application | Yes |

### 3. Dependency Installation
```bash
npm install
```

### 4. Running in Development Mode
Start the local server on the standard port:
```bash
npm run dev
```
Access the institutional console at: `http://localhost:3000`

---

## ⚙️ Continuous Integration & Deployment Tools (CI/CD)

| Command | Operational Purpose | Environment / Validation |
|---|---|---|
| `npm run dev` | Starts the development server at `0.0.0.0:3000` with hot reload. | Local Environment / Development |
| `npm run build` | Compiles production artifacts into the `/dist` directory. | CI/CD Pipeline / Release |
| `npm run preview` | Runs a local HTTP server serving built files. | Pre-Deployment Validation |
| `npm run lint` | Runs static TypeScript type checking (`tsc --noEmit`). | Code Quality Assurance |
| `npm run clean` | Removes generated artifacts and temporary build directories. | Workspace Maintenance |

---

## 📐 Domain Architecture (Tree)

```
src/
├── domain/                      # LAYER 1: Pure business rules and invariants
│   ├── entities/                # Data interfaces (treasury, cashflow, compliance, analytics)
│   └── repositories/            # Data access contracts (ITreasuryRepository, etc.)
│
├── application/                 # LAYER 2: Use cases and operations orchestration
│   ├── use-cases/               # Atomic use cases (TransferFunds, CalculateRunway, etc.)
│   └── services/                # Currency formatting and financial computation services
│
├── infrastructure/              # LAYER 3: Data adapters, DI, and integrations
│   ├── repositories/            # Concrete repository implementations
│   ├── mock/                    # Simulated institutional telemetry and data sets
│   └── di/                      # Dependency Injection Container (IoC / Container)
│
└── presentation/                # LAYER 4: Visual components and user experience
    ├── components/              # Audit tables, Recharts visualizations, and signature modals
    ├── context/                 # State contexts (Theme, Language, DI Container)
    ├── hooks/                   # Reactive custom hooks decoupled from the UI
    ├── layouts/                 # Topbar, Sidebar, and canvas layouts
    ├── tokens/                  # High-contrast corporate color palette
    └── views/                   # Main views (Cockpit, Runway, Accounts, Compliance)
```

---

Software Architecture Property - Jastin Bolaños © 2026. Enterprise Technical Demonstration Project.
