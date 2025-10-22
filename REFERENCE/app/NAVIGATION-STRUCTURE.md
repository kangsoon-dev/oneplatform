# ShadcnStore Navigation Structure

## 🗂️ Main Navigation Hierarchy

```
ShadcnStore Dashboard
├── 🏠 Home (/) → Redirects to Dashboard
├── 
├── 📊 DASHBOARDS
│   ├── 📈 Dashboard 1 (/dashboard)
│   │   ├── Section Cards
│   │   ├── Interactive Area Chart
│   │   └── Data Tables
│   └── 📊 Dashboard 2 (/dashboard-2)
│       ├── Metrics Overview
│       ├── Sales Chart
│       ├── Revenue Breakdown
│       ├── Customer Insights
│       ├── Recent Transactions
│       ├── Top Products
│       └── Quick Actions
├── 
├── 🚀 APPS
│   ├── 📧 Mail (/mail)
│   │   ├── Account Switcher
│   │   ├── Mail List
│   │   ├── Mail Display
│   │   └── Navigation
│   ├── ✅ Tasks (/tasks)
│   │   ├── Kanban Board (Drag & Drop)
│   │   ├── Task Creation
│   │   ├── Task Filtering
│   │   └── Task Management
│   ├── 💬 Chat (/chat)
│   │   ├── Conversation List
│   │   ├── Message List
│   │   ├── Message Input
│   │   └── Chat Header
│   ├── 📅 Calendar (/calendar)
│   │   ├── Calendar Main View
│   │   ├── Calendar Sidebar
│   │   ├── Event Management
│   │   ├── Date Picker
│   │   └── Quick Actions
│   └── 👥 Users (/users)
│       ├── User List
│       ├── User Profile
│       └── User Management
├── 
└── 📄 PAGES
    ├── 🎯 Landing (/landing) [Opens in new tab]
    │   ├── Hero Section
    │   ├── Features Grid
    │   ├── Mega Menu
    │   └── Marketing Content
    ├── 
    ├── 🔐 Auth Pages
    │   ├── Sign In Variants
    │   │   ├── 🔑 Sign In 1 (/sign-in)
    │   │   ├── 🔑 Sign In 2 (/sign-in-2)
    │   │   └── 🔑 Sign In 3 (/sign-in-3)
    │   ├── Sign Up Variants
    │   │   ├── ✍️ Sign Up 1 (/sign-up)
    │   │   ├── ✍️ Sign Up 2 (/sign-up-2)
    │   │   └── ✍️ Sign Up 3 (/sign-up-3)
    │   └── Password Recovery
    │       ├── 🔄 Forgot Password 1 (/forgot-password)
    │       ├── 🔄 Forgot Password 2 (/forgot-password-2)
    │       └── 🔄 Forgot Password 3 (/forgot-password-3)
    ├── 
    ├── ⚠️ Error Pages
    │   ├── 🚫 401 Unauthorized (/errors/unauthorized)
    │   ├── 🔒 403 Forbidden (/errors/forbidden)
    │   ├── 🔍 404 Not Found (/errors/not-found)
    │   ├── ⚡ 500 Internal Server Error (/errors/internal-server-error)
    │   └── 🚧 Under Maintenance (/errors/under-maintenance)
    ├── 
    ├── ⚙️ Settings
    │   ├── 👤 User Settings (/settings/user)
    │   ├── 🏢 Account Settings (/settings/account)
    │   ├── 💳 Plans & Billing (/settings/billing)
    │   ├── 🎨 Appearance (/settings/appearance)
    │   ├── 🔔 Notifications (/settings/notifications)
    │   └── 🔗 Connections (/settings/connections)
    ├── 
    ├── ❓ FAQs (/faqs)
    │   ├── FAQ Categories
    │   ├── FAQ List
    │   └── Features Grid
    └── 💰 Pricing (/pricing)
        ├── Pricing Plans
        ├── Features Comparison
        └── FAQ Section
```

## 🎛️ Layout & Theme Controls

### Sidebar Configuration
```
📋 Layout Options:
├── Sidebar Variants: Inset | Floating | Sidebar
├── Collapsible: Icon | Offcanvas | None
├── Side Position: Left | Right
└── Responsive: Auto-collapse on mobile

🎨 Theme Customizer:
├── Theme Tab
│   ├── Preset Themes (Multiple options)
│   ├── Custom Color Palette
│   ├── Border Radius Control
│   └── Import/Export Themes
└── Layout Tab
    ├── Sidebar Configuration
    ├── Layout Variants
    └── Display Options
```

## 🧭 Navigation Features

### Header Navigation
- 🔍 **Command Search** (Global search functionality)
- 🌓 **Mode Toggle** (Light/Dark theme)
- 👤 **User Menu** (Profile, settings, logout)
- 🔔 **Notifications** (Sidebar notification system)

### Footer Navigation
- 📍 **Site Footer** (Links, copyright, etc.)

### Special Navigation Elements
- 🎛️ **Theme Customizer Trigger** (Floating button - positioned based on sidebar side)
- ⭐ **Upgrade to Pro Button** (Promotional element)
- 🔄 **Redirect Logic** (Home → Dashboard automatic redirect)

## 📱 Responsive Behavior

```
Desktop (≥768px):
├── Full Sidebar Navigation
├── Expandable/Collapsible Sidebar
└── Theme Customizer on Right/Left

Mobile (<768px):
├── Offcanvas Sidebar (overlay)
├── Hamburger Menu Toggle
└── Responsive Theme Customizer
```

## 🎯 Key Navigation Patterns

1. **Route Groups**: `(auth)` and `(dashboard)` for layout separation
2. **Nested Routing**: Settings and Auth pages have sub-routes
3. **Dynamic Layouts**: Different layouts for auth vs dashboard
4. **Conditional Navigation**: Sidebar position affects customizer placement
5. **Progressive Disclosure**: Collapsible sidebar sections