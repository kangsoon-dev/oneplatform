# ONE Platform – Product Requirements Document (PRD)

**Company:** BW LPG
**Version:** 1.0
**Date:** October 2025
**Target Users:** 100 internal users

---

## 1. Executive Summary

BW LPG is developing ONE Platform, a unified digital ecosystem that consolidates access to Power BI dashboards, Unity Catalog data assets, AI applications, and custom internal tools under a single authenticated interface.
The platform serves as the single entry point for users to access insights, applications, and governed data across eight business domains: Master Data Management (MDM), Finance, Operations, Technical, Market, HR, ESG, and Commercial.
Key Capabilities:

Unified navigation across all internal applications and dashboards
Embedded Power BI dashboards organized by domain
Integration with Databricks Unity Catalog for data discovery
Composable AI workspace with Open WebUI chat interface
Custom internal applications (forms, workflows, CRUD tools)
Role-based content views for different user types

## 2. Objectives

1. **Unify Access:** Provide a single, authenticated interface to all internal digital tools and data
2. **Enable Data-Driven Culture:** Make trusted data and analytics easily discoverable and consumable
3. **Support Domain Organization:** Organize applications and data assets under eight domain boundaries
4. **Composable AI Integration:** Enable flexible AI-assisted workflows through embedded chat interface
5. **Scalability:** Support modular addition of applications, datasets, and tools over time
6. **Role-Based Experience:** Deliver appropriate content and views based on user roles

---

## 3. Platform Layout

### 3.1. User Interface Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Domain > Page          [Search 🔍]  [🔔] [👤]     │ ← Top Nav
├──────────┬──────────────────────────────────────────────────┤
│          │                                                   │
│  🧭 MDM  │                                                   │
│  💰 Finance│           Main Content Area                    │
│  ⚙️ Operations│      (Dashboard / App / Composite View)    │
│  🔧 Technical│                                              │
│  🌍 Market│                                                 │
│  👥 HR   │                                                   │
│  🌱 ESG  │                                                   │
│  💼 Commercial│                                             │
│          │                                                   │
│  Left    │                                                   │
│  Nav     │                                                   │
└──────────┴───────────────────────────────────────────────────┘
```

### 3.2. Component Specifications

| Component | Description | Behavior |
|-----------|-------------|----------|
| **Left Navigation Bar** | Persistent navigation listing 8 domains with nested apps | Always visible; expandable/collapsible per domain |
| **Top Navigation Bar** | Contains breadcrumbs, global search, notifications, and user menu | Fixed position; updates breadcrumbs based on current location |
| **Main Content Area** | Dynamic workspace for dashboards, apps, or composite views | Full-width or split-screen for AI-assisted workflows |
| **Search Bar** | Global search (positioned top-right) | Search across apps, dashboards, and data assets |
| **Notifications** | Alert icon with badge counter | Dropdown panel for system notifications |
| **User Menu** | Profile icon | Access to profile, settings, and sign-out |

---
## 4. Domain Structure

The platform organizes all content under **8 core domains**:

| Domain | Icon | Description | Example Assets |
|--------|------|-------------|----------------|
| **MDM** | 🧭 | Master data, entity references, standard lists | Vessel master, Voyage master |
| **Finance** | 💰 | Financial reporting | Running cost, G&A, Flux Analysis |
| **Operations** | ⚙️ | Daily operational insights and scheduling | Voyage Management, Chartering Scheduler |
| **Technical** | 🔧 | Maintenance tracking, performance benchmarking | Speed and Fuel Consumption |
| **Market** | 🌍 | Market analytics, freight rate monitoring | Market insights |
| **HR** | 👥 | Human resources, workforce analytics | Harvey HR Chatbot |
| **ESG** | 🌱 | Environmental, Social, Governance metrics | Health and Safety (HSEQ) Dashboard |
| **Commercial** | 💼 | Commercial operations and contract management | NA for now |

**Navigation Pattern:**
```
Domain (e.g., Finance) -- Opens Domain page listing all dashboards and apps
  ├── Dashboard 1 (Power BI)
  ├── Dashboard 2 (Power BI)
  ├── Application A (Custom)
  │   ├── Page 1
  │   ├── Page 2
  │   └── Page 3
  └── Application B (Custom)
```
- Left Navigation bar should be collapsed by default and represented by icons. It can be expanded to show the full domain hierarchy, and should collapse when mouse leaves the sidebar.
---

## 5. Application Modules

### 5.1. Power BI Integration

**Purpose:** View Power BI apps or dashboards directly within ONE Platform.

**Integration Method:**
- Power BI Apps and dashboards are **embedded via iframe** within ONE Platform
- There are two types of Power BI integrations:
    - Power BI Apps: Each Power BI App represents a domain and contains multiple dashboards related to that domain.
    - Power BI Dashboards: In a composable layout, Power BI Dashboards may be embedded alongside another user interface such as Open WebUI chat or user interface as part of a custom app.

**Features:**
- SSO authentication via Azure AD ensures seamless access
- Full-screen and normal view modes
- Responsive iframe sizing
- Dashboard filters preserved in embedded view
- On the ONE Platform landing page, there should be a quick access section for recently used dashboards

**Technical Requirements:**
- Power BI Embedded API integration
- Azure AD token management for secure embedding
- Report server URL configuration per dashboard

---

### 5.2. Data Catalog (Unity Catalog Integration)

**Purpose:** Provide discoverable access to all governed datasets in Databricks Unity Catalog.

**Integration Method:**
- **Redirect** users to Databricks workspace when accessing Data Catalog
- Link opens in new browser tab/window
- Context preserved (e.g., domain filter if applicable)

**Navigation:**
- Data Catalog link appears as a dedicated item in relevant domains
- Global search can surface catalog assets

**User Flow:**
1. User clicks "Data Catalog" in left navigation
2. ONE Platform initiates authenticated redirect
3. User lands in Databricks Unity Catalog interface
4. User can browse, search, and explore datasets

---

### 5.3. AI Chat interface (Open WebUI Integration)

**Purpose:** Enable flexible, composable AI-assisted workflows in relevant apps on the platform.

**Architecture:**
Open WebUI is deployed as a Container App and integrated into ONE Platform through **composable layouts**.

**Example of Composable Interface Pattern:**

```
┌──────────────────────────────────────────────────────┐
│  Domain > App > Page              [Search] [🔔] [👤] │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │                      │  │                      │  │
│  │   Interactive App    │  │   Open WebUI Chat   │  │
│  │   Interface          │  │   Interface          │  │
│  │   (Forms, Charts,    │  │   (iframe embedded)  │  │
│  │    Controls, etc.)   │  │                      │  │
│  │                      │  │                      │  │
│  └─────────────────────┘  └─────────────────────┘  │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Key Features:**
- **Flexible layout:** Chat iframe can be used as a standalone component or embedded as part of an app
- **Contextual chat:** Chat interface can be configured per app/use case
- **Optional display:** Not all apps require chat; can be hidden when not needed

**Use Cases:**
- AI Chatbot for HR assistance (employee handbook, leave query, etc.)
- Intelligent search against claims data

**Technical Implementation:**
- Open WebUI iframe with postMessage communication
- Context passing from parent app to chat interface
- Responsive layout with draggable divider

---

### 5.4. Custom Internal Applications

**Purpose:** Build domain-specific tools directly within ONE Platform.

**Application Types:**
- **Forms:** Data entry, survey, configuration
- **Workflows:** Multi-step processes with state management
- **CRUD Applications:** Create, Read, Update, Delete operations on domain data

**Development Standards:**
- All custom apps are sub-pages within a domain
- Apps share a **common design system** stored in Figma
- Design system accessed via **Model Context Protocol (MCP)** during development
- Consistent UI components, patterns, and interactions

**Example Structure:**
```
Operations Domain
  ├── Drydock Schedule App (Custom)
  │   ├── View drydock schedules (Table)
  │   ├── CRUD on drydock schedules (Form)
  │   └── Drydock timeline (Power BI dashboard)
  └── Chartering Scheduler App (Custom)
      ├── ...
```

**Navigation:**
- On the domain page, all assets including apps and dashboards are listed.
- On the left navigation bar, apps are viewed as Sub-pages when left nav bar is expanded.
- Breadcrumbs on top nav bar show full path: Domain > App > Page

---

## 6. User Experience Specifications

### 6.1. Navigation Patterns

**Left Navigation:**
- Persistent, always visible
- Minimal width by default (icon only), expanded when icon is selected
- Expandable/collapsible accordion for each domain
- Active state highlighting for current domain and app
- Smooth transitions and animations
- Icon + label for domains
- Nested app list with indentation

**Top Navigation:**
- **Breadcrumbs (left):** Domain > App > Page
  - Each segment is clickable for quick navigation
  - Automatically updates based on current location
- **Search Bar (right):** Global search with autocomplete
  - Search scope: Apps, Dashboards, Data Catalog items
  - Keyboard shortcut (Cmd/Ctrl + K)
- **Notifications (right):** Bell icon with badge
  - Dropdown panel showing recent notifications
  - Types: Data refreshes, system updates, access changes
- **User Menu (far right):** Profile icon
  - User name and role
  - Settings/Preferences
  - Sign out

### 6.2. Azure AD Group-based access control

**Requirement:** User access is managed by Azure AD Group memberships.

**Implementation:**
- Role information retrieved from Azure AD groups
- Generally available apps: all users are able to access
- Redirected apps: only users that are part of an indicated AD Group can access
- Power BI Apps and Dashboards access are managed from PowerBI service, so no need to worry about this

**Example Roles:**
- **Executive:** High-level dashboards, summary views, strategic insights
- **Analyst:** Detailed dashboards, data catalog access, analytical tools
- **Manager:** Team-specific dashboards, workflow approval tools
- **Operator:** Operational dashboards, data entry forms

**Technical Approach:**
- All apps have a unified access control checking mechanism that verifies the user's group membership before rendering the app
- Backend API validates permissions

### 6.3. Responsive Design

**Target Devices:**
- **Primary:** Desktop (1920x1080 and above)

**Responsive Behaviors:**
- Left navigation collapses to icon-only by default
- Embedded Power BI dashboards resize appropriately

### 6.4. Design System & Consistency

**Design System Location:** Figma project (accessed via MCP during development)

**Core Principles:**
- Consistent BW LPG branding (colors, typography, logo) - refer to Figma design system
- Tailwind CSS-based utility classes
- Reusable component library based on ShadCN UI Kit

**Key Components:**
- Navigation (left nav, top nav, breadcrumbs)
- Cards and containers
- Forms and inputs
- Buttons and actions
- Tables and data grids
- Modals and dialogs
- Notifications and alerts
- Loading states and skeletons

---

## 7. Integration Architecture

### 7.1. Authentication & Authorization

| Component | Technology | Implementation |
|-----------|-----------|----------------|
| **Identity Provider** | Azure AD | Single Sign-On (SSO) for all platform access |
| **Authentication Flow** | OAuth 2.0 / OpenID Connect | Token-based authentication |
| **Authorization** | Azure AD Groups + RBAC | Role-based access control |
| **Session Management** | JWT tokens | Secure token storage and refresh |

**User Flow:**
1. User navigates to ONE Platform URL
2. Redirected to Azure AD login (if not authenticated)
3. Azure AD returns tokens with user identity and roles
4. ONE Platform validates tokens and loads interface
5. Subsequent requests include token for authorization

### 7.2. Power BI Integration

**Embedding Architecture:**
- Power BI Embedded API
- Server-side token generation
- Iframe embedding with responsive container
- Report configuration (filters, bookmarks) preserved

**Technical Flow:**
1. User selects Power BI dashboard from left nav
2. Backend generates embed token with user context
3. Frontend renders iframe with embed URL and token
4. Power BI dashboard loads with SSO credentials
5. User interactions within iframe (filters, drill-downs)

**Configuration:**
- Report Server URL per dashboard
- Domain classification metadata
- Default filters and bookmarks
- Embed permissions and RLS (Row-Level Security)

### 7.3. Databricks Unity Catalog Integration

**Access Pattern:** Redirect to external workspace

**Technical Flow:**
1. User clicks "Data Catalog" link
2. Backend generates authenticated redirect URL
3. New browser tab opens with Databricks Unity Catalog
4. User authenticated via SSO
5. User explores catalog (ONE Platform session remains active)

**Configuration:**
- Databricks workspace URL
- SSO integration with Azure AD
- Deep linking support (if filtering by domain)

### 7.4. Open WebUI Integration

**Deployment:** Azure Container App

**Integration Method:** Iframe embedding with postMessage API

**Technical Architecture:**
```
┌─────────────────────────────────────────┐
│        ONE Platform (Parent)             │
│  ┌────────────┐      ┌─────────────┐   │
│  │    App     │      │  Open WebUI │   │
│  │  Interface │◄────►│  (iframe)   │   │
│  │            │ msg  │             │   │
│  └────────────┘      └─────────────┘   │
└─────────────────────────────────────────┘
              │
              ▼
     ┌──────────────────┐
     │ Open WebUI       │
     │ Container App    │
     └──────────────────┘
```

**Communication:**
- postMessage API for parent-child communication
- Context passing (current domain, app, user role)
- Event handling (chat responses, actions)

**Configuration:**
- Container App URL
- Iframe security policies (CSP)
- Message protocol definition
- Authentication token sharing

### 7.5. API Architecture

**Purpose:** Central API gateway for platform orchestration

**Responsibilities:**
- User authentication and session management
- Power BI embed token generation
- App registration and metadata
- Search indexing and queries
- Notification management
- Role and permission validation

**Technology Stack:**
- **Backend:** FastAPI (Python) or Node.js
- **API Gateway:** AWS API Gateway or Azure API Management
- **Database:** PostgreSQL for metadata and configurations
- **Cache:** Redis for session and token caching

**API Endpoints (Examples):**
```
GET  /api/auth/user              # Get current user info
GET  /api/domains                # List all domains
GET  /api/domains/{id}/apps      # List apps in domain
POST /api/powerbi/embed-token    # Generate Power BI embed token
GET  /api/search?q={query}       # Global search
GET  /api/notifications          # Get user notifications
POST /api/notifications/read     # Mark notification as read
```

---

## 8. Technical Requirements

### 8.1. Frontend Stack

| Technology | Purpose |
|------------|---------|
| **Framework** | React (Next.js) |
| **Styling** | Tailwind CSS |
| **State Management** | React Context + React Query |
| **Routing** | Next.js App Router |
| **UI Components** | Shadcn |
| **Icons** | Lucide React |

### 8.2. Backend Stack

| Technology | Purpose |
|------------|---------|
| **Framework** | FastAPI (Python) or Express.js (Node.js) |
| **Authentication** | Azure AD OAuth 2.0 integration |
| **Database** | Databricks PostgreSQL (for app metadata, user prefs, configs) |
| **Caching** | Redis (for tokens, sessions) |
| **API Documentation** | OpenAPI/Swagger |

### 8.3. Deployment & Infrastructure

| Component | Technology |
|-----------|-----------|
| **Frontend Hosting** | Databricks Apps |
| **Backend Hosting** | Azure Container Apps, Azure Function Apps |
| **Database** | Databricks PostgreSQL |
| **Cache** | Azure Cache for Redis |
| **CI/CD** | Azure Devops Pipelines |
| **Monitoring** | Databricks monitoring |
| **Logging** | Centralized logging (Databricks logging) |

### 8.4. Development Workflow

**Design System Access:**
- Figma project with all UI components and patterns
- Accessed via **Model Context Protocol (MCP)** during development
- Ensures design-development consistency

**Version Control:**
- Git repository (Azure Devops)
- Branch strategy: prd, uat, dev, feature branches
- Pull request reviews required

**CI/CD Pipeline:**
1. Code commit triggers pipeline
2. Automated tests (unit, integration)
3. Build frontend and backend
4. Deploy to staging environment
5. Automated smoke tests
6. Manual approval for production
7. Deploy to production
