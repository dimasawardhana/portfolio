# Create a Vue Component

Creates a new Vue 3 component following project conventions.

## Steps

1. **Determine location**
   - Reusable components: `src/components/ComponentName.vue`
   - Page views: `src/views/PageNameView.vue`
   - Icons: `src/components/icons/IconName.vue`

2. **Create the file**
   - Use `<script setup lang="ts">`
   - Type props with `defineProps<T>()`
   - Use `scoped` styles

3. **Create test file (optional)**
   - Path: `src/components/__tests__/ComponentName.spec.ts`

## Component Template

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  title: string
  count?: number
}>()

const localState = ref(0)
const computedValue = computed(() => localState.value * 2)
</script>

<template>
  <div class="component-name">
    <h2>{{ title }}</h2>
    <p>{{ computedValue }}</p>
  </div>
</template>

<style lang="css" scoped>
.component-name {
  /* styles here */
}
</style>
```

## Naming Conventions

| Type      | Pattern           | Example            |
| --------- | ----------------- | ------------------ |
| Component | PascalCase        | `UserCard.vue`     |
| View      | PascalCase + View | `SettingsView.vue` |
| Icon      | Icon + PascalCase | `IconReact.vue`    |
| Test      | .spec.ts suffix   | `UserCard.spec.ts` |

## Best Practices

- Single root element in template
- Use `@/` for imports from src
- Keep components focused (single responsibility)
- Co-locate tests next to components
