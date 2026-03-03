# Add a New Skill Icon

Creates a new skill icon component and adds it to the SkillSet.

## Steps

1. **Create the icon component**
   - Path: `src/components/icons/Icon{Name}.vue`
   - Use inline SVG format
   - Export as default component

2. **Update SkillSet.vue**
   - Import the new icon
   - Add to the `.set` div

## Icon Component Template

```vue
<script setup lang="ts">
// Icon component for {SkillName}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <!-- SVG paths here -->
  </svg>
</template>
```

## Example

```bash
# After creating IconVue.vue:
# 1. Import in SkillSet.vue
import IconVue from '../icons/IconVue.vue'

# 2. Add to template
<i><IconVue /></i>
```

## Tips

- Keep viewBox consistent (usually "0 0 24 24")
- Use `currentColor` for fill to inherit text color
- Find SVG icons from official brand guidelines or simpleicons.org
