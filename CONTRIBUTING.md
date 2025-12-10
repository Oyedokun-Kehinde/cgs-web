# Contributing to Cooper Gaming Services Website

Thank you for your interest in contributing to the Cooper Gaming Services website project.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Setup](#development-setup)
3. [Code Standards](#code-standards)
4. [Git Workflow](#git-workflow)
5. [Testing](#testing)
6. [Submitting Changes](#submitting-changes)

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js v18 or higher
- npm or yarn package manager
- Git installed
- Access to the GitLab repository

### Repository Access

The project is hosted on Athena Networks GitLab:

```
https://gitlab.athenanetworks.com.au/athenanetworks/cgs-web.git
```

Contact the project maintainers for access if needed.

---

## Development Setup

### 1. Clone the Repository

```bash
git clone https://gitlab.athenanetworks.com.au/athenanetworks/cgs-web.git
cd cgs-web
```

### 2. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
ADMIN_EMAIL=admin@example.com
FRONTEND_URL=http://localhost:5173
```

### 4. Start Development Servers

```bash
# Terminal 1 - Frontend (from frontend/ directory)
npm run dev

# Terminal 2 - Backend (from backend/ directory)
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all frontend code
- Use ES6+ syntax
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### React Components

- Use functional components with hooks
- Keep components in separate files
- Use proper prop typing with TypeScript interfaces
- Follow the existing component structure

### SCSS/CSS

- Use SCSS for styling
- Follow BEM naming convention where applicable
- Use variables for colors and common values
- Keep styles scoped to components

### File Naming

- Components: `PascalCase.tsx` (e.g., `ContactForm.tsx`)
- Utilities: `camelCase.ts` (e.g., `validation.ts`)
- Styles: `kebab-case.scss` (e.g., `main.scss`)

---

## Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages

Use clear, descriptive commit messages:

```
type: brief description

- Detailed change 1
- Detailed change 2
```

Types:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, no code change
- `refactor` - Code restructuring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Example

```
feat: add new service card for Digital Signage

- Added Digital Signage to services array
- Created service image placeholder
- Updated service descriptions
```

---

## Testing

### Manual Testing Checklist

Before submitting changes, verify:

- [ ] All pages load correctly
- [ ] Navigation works on desktop and mobile
- [ ] Contact form submits successfully
- [ ] Form validation displays appropriate errors
- [ ] Images load properly
- [ ] Responsive design works on all screen sizes
- [ ] No console errors in browser

### Browser Testing

Test in the following browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Submitting Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

Follow the code standards above.

### 3. Commit Your Changes

```bash
git add .
git commit -m "feat: your descriptive message"
```

### 4. Push to GitLab

```bash
git push origin feature/your-feature-name
```

### 5. Create a Merge Request

1. Go to the GitLab repository
2. Click "Create merge request"
3. Fill in the description
4. Assign reviewers
5. Submit for review

### Merge Request Guidelines

- Provide a clear description of changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Request review from at least one team member

---

## Project Maintainers

- **Kenny** - Lead Developer - kenny@athenanetworks.com.au
- **Josh** - Hosting & Infrastructure - josh@athenanetworks.com.au

---

## Questions?

If you have questions about contributing, please contact the project maintainers.

---

*Last Updated: December 10, 2025*
