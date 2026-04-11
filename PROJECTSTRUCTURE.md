

# Project Structure Guide
Please add any new file structure u introduce to the project here

---

## Components

```

components/
│── dashboard/
│   └── common-dashboard/
│   └── admin-dashboard/
│   └── store-manager-dashboard/
│   └── wareHouse-operator-dashboard/
│── login/
│── register/
│
└── storeManager/
    └── apply-store-manager/
└── wareHouseOperatore/
    └── apply-wareHouse-operator/
└── admin/
    └── some-admin-related-feature/
```

### Rules

- Each feature gets its own folder
- Each role has a dashboard
- Each feature for that role goes under the same named folder

### Guidelines

- `dashboard/` → All dashboard-related UI
- `login/`, `register/` → Auth UI only
- `storeManager/` → Role-specific features

### Do NOT

- Mix unrelated features in the same folder
- Put business logic inside components

---

## Models

```

models/
│── api-response.ts
│── role-dto.ts

```

### Rules

- Only TypeScript interfaces / types /enums 
- No logic, no API calls

### Naming Convention

- `*-dto.ts` → Data transfer objects
- `api-response.ts` → Standard API response structure

---

## Services

```

services/
│── auth/
│   │── login.service.ts
│   │── register.service.ts
│
└── dashboard/
    │── common-dashboard.service.ts

```

### Rules

- One service per responsibility
- Group services by feature/domain

### Guidelines

- `auth/` → Authentication-related logic
- `dashboard/` → Dashboard data handling

### Do NOT

- Call APIs directly from components
- Mix multiple domains in one service

---

## File Naming Conventions

| Type        | Format                         |
|------------|--------------------------------|
| Component   | `feature-name.component.ts`     |
| Service     | `feature-name.service.ts`       |
| Model       | `feature-name.ts` or `*-dto.ts` |

---

## Adding New Features

### Step-by-step

1. Create a folder inside `components/`
2. Generate component:
```

ng generate component components/<feature-name>

```
3. Create corresponding service:
```

ng generate service services/<feature-name>/<feature-name>

```
4. Add models if required in `models/`




---



