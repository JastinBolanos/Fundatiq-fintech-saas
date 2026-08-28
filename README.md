# Fundatiq Enterprise Treasury & Liquidity OS (v2.4.0-ENT)

![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=flat-square&logo=github-actions)
![Deployment](https://img.shields.io/badge/Deployment-Edge_Active-blue?style=flat-square&logo=cloudflare)
![Architecture](https://img.shields.io/badge/Architecture-Clean_Architecture_%2F_Hexagonal-indigo?style=flat-square)
![Compliance](https://img.shields.io/badge/Compliance-SOX_404_%7C_Basel_III-slate?style=flat-square)
![Security](https://img.shields.io/badge/Security-AES--256_GCM_%7C_mTLS-amber?style=flat-square)

> **Fundatiq** es una plataforma institucional de orquestación de tesorería corporativa, gestión de liquidez multibancaria y modelado predictivo de flujo de caja de alta precisión. Diseñada para directores financieros (CFOs) y tesoreros globales, centraliza la visibilidad de saldos en tiempo real, ejecuta barridos automatizados de cuentas (ZBA) y proyecta pistas financieras de supervivencia mediante simulaciones estocásticas de estrés financiero.
>
> 🟢 **[Ver Plataforma en Vivo (Producción)](https://fundatiq-treasury.institutional.network)**

> ℹ️ *Nota de Arquitectura:* Los microservicios de liquidación bancaria central (SWIFT / ISO 20022) y bases de datos relacionales subyacentes residen en repositorios privados bajo redes corporativas segregadas por políticas de seguridad de la información y cumplimiento normativo. Este repositorio contiene la arquitectura cliente de grado empresarial, capa de orquestación perimetral, casos de uso de dominio e interfaces de telemetría analítica.

---

## 🏛️ Arquitectura de Sistema y Stack Tecnológico

El sistema implementa una arquitectura desacoplada basada en **Clean Architecture**, con inyección de dependencias en tiempo de ejecución, tipado estricto de extremo a extremo y optimización de renderizado.

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

### Stack Técnico Exacto (`package.json`)

#### Core & Runtime
- **React 19** (`react: ^19.0.1`, `react-dom: ^19.0.1`) — Motor reactivo moderno con soporte de componentes concurrentes.
- **TypeScript 5.8** (`typescript: ~5.8.2`) — Verificación estricta de tipos e interfaces financieras.
- **Vite 6** (`vite: ^6.2.3`, `@vitejs/plugin-react: ^5.0.4`) — Entorno de compilación y empaquetado de alta velocidad.
- **Node.js** (v20+ LTS recomendado) — Entorno de ejecución en servidor y herramientas de compilación.

#### UI, Motion & Visualización
- **Tailwind CSS v4** (`tailwindcss: ^4.1.14`, `@tailwindcss/vite: ^4.1.14`, `autoprefixer: ^10.4.21`) — Sistema de diseño tokenizado para entornos de baja latencia.
- **Motion** (`motion: ^12.23.24`) — Orquestación de transiciones fluidas de estado e interfaces de modales.
- **Recharts** (`recharts: ^3.10.1`) — Visualización de curvas de flujo de caja, barras comparativas y distribuciones de liquidez.
- **Lucide React** (`lucide-react: ^0.546.0`) — Iconografía técnica vectorial de grado corporativo.
- **Tailwind Merge & Clsx** (`tailwind-merge: ^3.6.0`, `clsx: ^2.1.1`) — Combinación y resolución condicional de utilidades CSS.

#### Motor de Inferencia e Inteligencia
- **Google GenAI SDK** (`@google/genai: ^2.4.0`) — Generación y síntesis de reportes ejecutivos de inteligencia de tesorería (*Executive Intelligence Briefings*).

#### Backend & Proxy Seguro
- **Express 4** (`express: ^4.21.2`, `@types/express: ^4.17.21`) — Servidor perimetral para intermediación de solicitudes seguras y middlewares.
- **Dotenv** (`dotenv: ^17.2.3`) — Carga y aislamiento de configuración de entorno.
- **TSX & Esbuild** (`tsx: ^4.21.0`, `esbuild: ^0.25.0`) — Transpilación y ejecución directa de módulos TypeScript en Node.js.

---

## 📦 Módulos Operativos (Desplegados)

1. **Global Treasury Cockpit & Cash Concentration**
   - Consolidación de saldos globales en tiempo real entre múltiples entidades (*Fundatiq Americas LLC, Europe B.V., APAC Pte Ltd*).
   - Telemetría en vivo de balance total, tasa de consumo (*Burn Rate*), liquidez neta proyectada y concentración de riesgos.

2. **Multi-Bank Liquidity Orchestration & Automated Sweeps**
   - Conexión e integración con entidades bancarias de primer nivel (JPMorgan Chase, Citibank, HSBC, Barclays, SVB).
   - Automatización de barridos de saldo cero (*Zero Balance Accounts / ZBA*) programados para maximización de rendimiento por intereses nocturnos.

3. **Cash Flow Analytics & Ledger Reconciliation**
   - Desglose cronológico de cobros y pagos operativos, nóminas globales y servicios en la nube.
   - Auditoría de transacciones con identificadores de referencia institucional únicos (`REF-FDQ-XXXX`) y conciliación automatizada.

4. **Predictive Runway Engine (Simulaciones Monte Carlo)**
   - Modelado probabilístico con 10,000 iteraciones para cálculo de pista financiera (*Runway*).
   - Evaluación de resiliencia mediante escenarios dinámicos de estrés financiero: *Base Case*, *Moderate Shock* y *Severe Crisis*.

5. **Multi-Sig Governance & Compliance SOX 404**
   - Flujo de autorización criptográfica de doble firma para transferencias de alto valor que superen los umbrales corporativos.
   - Matriz de cumplimiento normativo (SOX 404, Basilea III, IFRS 9) y verificación automatizada contra registros de sanciones internacionales (OFAC, UE, ONU).

---

## 🛠️ Guía de Despliegue y Auditoría

### Prerrequisitos
- **Node.js**: Versión 20.0.0 LTS o superior.
- **Gestor de paquetes**: `npm` (v10+), `bun` o `yarn`.

### 1. Clonación del Repositorio
```bash
git clone https://github.com/tu-organizacion/fundatiq-treasury-platform.git
cd fundatiq-treasury-platform
```

### 2. Configuración de Variables de Entorno
Cree el archivo de configuración local a partir de la plantilla de entorno:
```bash
cp .env.example .env
```

| Variable | Propósito | Obligatoria |
|---|---|:---:|
| `GEMINI_API_KEY` | Credencial para el motor de síntesis de inteligencia de tesorería | Opcional |
| `APP_URL` | URL base del host de la aplicación | Sí |

### 3. Instalación de Dependencias
```bash
npm install
```

### 4. Ejecución en Modo Desarrollo
Inicie el servidor local en el puerto estándar:
```bash
npm run dev
```
Acceda a la consola institucional en: `http://localhost:3000`

---

## ⚙️ Herramientas de Integración y Despliegue (CI/CD)

| Comando | Propósito Operativo | Entorno / Validación |
|---|---|---|
| `npm run dev` | Inicia el servidor de desarrollo en `0.0.0.0:3000` con recarga rápida. | Entorno Local / Desarrollo |
| `npm run build` | Compila los artefactos de producción en el directorio `/dist`. | Pipeline CI/CD / Release |
| `npm run preview` | Ejecuta un servidor HTTP local sirviendo los archivos del build. | Validación Pre-Despliegue |
| `npm run lint` | Ejecuta validación estática de tipos TypeScript (`tsc --noEmit`). | Control de Calidad de Código |
| `npm run clean` | Remueve artefactos generados y directorios de compilación temporal. | Mantenimiento de Workspace |

---

## 📐 Arquitectura de Dominio (Tree)

```
src/
├── domain/                      # CAPA 1: Reglas de negocio puras e invariantes
│   ├── entities/                # Interfaces de datos (treasury, cashflow, compliance, analytics)
│   └── repositories/            # Contratos de acceso a datos (ITreasuryRepository, etc.)
│
├── application/                 # CAPA 2: Casos de uso y orquestación de operaciones
│   ├── use-cases/               # Casos de uso atómicos (TransferFunds, CalculateRunway, etc.)
│   └── services/                # Servicios de formateo monetario y cálculos financieros
│
├── infrastructure/              # CAPA 3: Adaptadores de datos, DI e integraciones
│   ├── repositories/            # Implementación concreta de repositorios
│   ├── mock/                    # Sets de telemetría y datos institucionales simulados
│   └── di/                      # Contenedor de Inyección de Dependencias (IoC / Container)
│
└── presentation/                # CAPA 4: Componentes visuales y experiencia de usuario
    ├── components/              # Tablas de auditoría, gráficos Recharts y modales de firma
    ├── context/                 # Contextos de estado (Tema, Idioma, Contenedor DI)
    ├── hooks/                   # Custom Hooks reactivos desacoplados de la UI
    ├── layouts/                 # Barra superior (Topbar), lateral (Sidebar) y canvas
    ├── tokens/                  # Paleta de color corporativo de alto contraste
    └── views/                   # Vistas principales (Cockpit, Runway, Cuentas, Compliance)
```

---

Propiedad de Arquitectura de Software - Jastin Bolaños © 2026. Proyecto de Demostración Técnica Empresarial.
