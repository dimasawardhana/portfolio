# Run Quality Checks

Runs linting, formatting, and type checking on the codebase.

## Commands

### Linting (ESLint)

```bash
npm run lint
```

Fixes linting issues automatically.

### Formatting (Prettier)

```bash
npm run format
```

Formats all files in `src/`.

### Type Checking (TypeScript)

```bash
npm run type-check
```

Runs `vue-tsc` for type validation.

### All Checks

```bash
npm run lint && npm run format && npm run type-check
```

## When to Run

- After making code changes
- Before committing (optional but recommended)
- When CI fails

## Fixing Issues

### Lint Errors

- Usually auto-fixed by `npm run lint`
- Check for unused imports/variables
- Fix manually if auto-fix doesn't work

### Type Errors

- Check for missing type definitions
- Avoid `any` - use proper types
- Import types with `import type { ... }`

### Format Issues

- Run `npm run format`
- Uses Prettier config from `.prettierrc.json`
