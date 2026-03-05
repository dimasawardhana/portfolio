# AGENTS.md - Development Guide

This document provides guidelines for agents working on this codebase.

## Project Overview

Personal portfolio website showcasing projects, blog posts, and professional experience. Deployed on Vercel with GTM analytics integration.

## Tech Stack

- **Framework:** Vue 3 with Composition API (`<script setup lang="ts">`)
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Linting:** ESLint
- **Formatting:** Prettier
- **Markdown:** marked + marked-highlight with highlight.js
- **Styling:** CSS Scoped + github-markdown-css for blog content

---

## Commands

### Development

```bash
npm run dev          # Start development server
npm run build        # Type-check + production build
npm run preview      # Preview production build
```

### Testing

```bash
npm run test:unit                              # Run all unit tests
npm run test:unit -- src/components/__tests__/HelloWorld.spec.ts  # Run single test
npm run test:e2e                              # Run all e2e tests
npx playwright test e2e/vue.spec.ts          # Run single e2e test
```

### Code Quality

```bash
npm run lint          # ESLint with auto-fix
npm run format        # Prettier formatting
npm run type-check   # TypeScript type checking
```

---

## Code Style Guidelines

### General Formatting

| Rule                | Value               |
| ------------------- | ------------------- |
| Indentation         | 2 spaces            |
| Quotes              | Single quotes (`'`) |
| Semicolons          | None                |
| Line width          | Max 100 characters  |
| End of line         | LF                  |
| Final newline       | Yes                 |
| Trailing whitespace | Trimmed             |

### TypeScript

- Use **interfaces** for type definitions (e.g., `IBlog`, `IProject`)
- Use strict typing - avoid `any`
- Use `@/` path aliases for imports (configured in tsconfig)

```typescript
// Good
import type { IBlog } from '@/interfaces/blog.interface'
import HomeView from '@/views/HomeView.vue'

// Interface naming: prefix with I
export interface IProject {
  id: string
  title: string
  tags: string[]
}
```

### Vue Components

- Use Composition API with `<script setup lang="ts">`
- Use `defineProps` and `defineEmits` with type syntax
- Co-locate tests next to components: `ComponentName.spec.ts`

```vue
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div>{{ msg }}</div>
</template>
```

### File Naming

| Type       | Convention                 | Example                             |
| ---------- | -------------------------- | ----------------------------------- |
| Components | PascalCase                 | `HelloWorld.vue`, `NavbarLinks.vue` |
| Interfaces | PascalCase with `I` prefix | `IBlog.ts`, `IProject.ts`           |
| Tests      | `.spec.ts` suffix          | `HelloWorld.spec.ts`                |
| E2E Tests  | `.spec.ts` suffix          | `vue.spec.ts`                       |

### Imports Order (recommended)

1. Vue/Vue Router built-ins
2. External libraries
3. Path aliases (`@/`)
4. Relative imports
5. Type imports

---

## Project Structure

```
src/
├── assets/          # Static assets (CSS, images, fonts)
├── components/      # Reusable Vue components
│   └── __tests__/  # Unit tests
├── data/            # JSON data files
├── interfaces/      # TypeScript interfaces
├── router/          # Vue Router configuration
├── views/           # Page-level components
└── App.vue          # Root component
```

---

## Project Structure

```
src/
├── assets/
│   └── posts/          # Blog markdown files (local posts)
├── components/
│   ├── About/          # About page components
│   │   ├── AboutMe.vue
│   │   ├── ExperienceIndicator.vue
│   │   ├── MyExperience.vue
│   │   ├── SkillSet.vue
│   │   └── SocialLinks.vue
│   ├── icons/          # SVG icon components (Icon[Name].vue)
│   ├── __tests__/      # Unit tests
│   ├── ContentContainer.vue
│   ├── Dashboard.vue
│   ├── Greeting.vue
│   ├── NavbarLinks.vue
│   └── NotFound.vue
├── data/
│   ├── blog.json       # Blog metadata (external posts)
│   ├── experience.json # Work experience data
│   └── projects.json   # Project showcase data
├── interfaces/         # TypeScript interfaces
├── router/             # Vue Router config
├── stores/             # Pinia stores
└── views/              # Page-level components
    ├── AboutView.vue
    ├── BlogView.vue
    ├── HomeView.vue
    ├── PostDetailView.vue
    └── ProjectView.vue
```

---

## Component Patterns

### Views vs Components

- **Views**: Page-level components mapped to routes (`src/views/`)
- **Components**: Reusable UI elements (`src/components/`)

### Component Naming

| Type       | Convention               | Example              |
| ---------- | ------------------------ | -------------------- |
| Views      | PascalCase + View suffix | `BlogView.vue`       |
| Components | PascalCase               | `NavbarLinks.vue`    |
| Icons      | Icon prefix              | `IconReact.vue`      |
| Tests      | .spec.ts suffix          | `HelloWorld.spec.ts` |

---

## Data Management

### Adding a New Blog Post (Local)

1. Create markdown file in `src/assets/posts/`
2. No frontmatter required - plain markdown

### Adding a New Blog Post (External)

1. Update `src/data/blog.json`:

```json
{
  "id": "url-slug",
  "title": "Post Title",
  "content": "Brief description",
  "tags": ["Tag1", "Tag2"],
  "published_date": "YYYY-MM-DD",
  "status": "published",
  "filepath": "https://...",
  "filepathID": "https://..."
}
```

### Adding a New Project

Update `src/data/projects.json`:

```json
{
  "project_name": "Project Name",
  "links": ["https://..."],
  "tech_stacks": ["React", "TypeScript"],
  "description": "Brief description",
  "image_urls": ["https://..."]
}
```

### Adding a New Experience

Update `src/data/experience.json` following existing schema.

---

## Routes

| Path        | Component      | Description                  |
| ----------- | -------------- | ---------------------------- |
| `/`         | HomeView       | Dashboard/Landing            |
| `/about`    | AboutView      | About me, skills, experience |
| `/project`  | ProjectView    | Project showcase             |
| `/blog`     | BlogView       | Blog list                    |
| `/blog/:id` | PostDetailView | Individual blog post         |

---

## Notes

- Blog posts are stored as Markdown files in `src/assets/posts/`
- Google Tag Manager is integrated for analytics
- The project uses lazy loading for route components
- External blog posts are fetched from GitHub API (see blog.json)

---

## Common Workflows

### Adding a New Skill Icon

1. Create `src/components/icons/Icon[Name].vue`
2. Import and add to `src/components/About/SkillSet.vue`

### Running Quality Checks

```bash
npm run lint        # Fix linting issues
npm run format      # Format code
npm run type-check  # TypeScript check
npm run test:unit   # Run unit tests
```

### Building for Production

```bash
npm run build       # Type-check + build
npm run preview     # Preview production build
```
