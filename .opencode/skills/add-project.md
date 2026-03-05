# Add a New Project

Adds a new project to the portfolio showcase.

## Steps

1. **Update projects.json**
   - Path: `src/data/projects.json`
   - Add new project object to array

2. **Project Schema**

```json
{
  "project_name": "Project Name",
  "links": ["https://project-url.com"],
  "tech_stacks": ["Vue", "TypeScript", "CSS"],
  "description": "Brief description of the project and your contribution",
  "image_urls": ["https://image-url.png"]
}
```

## Required Fields

- `project_name`: Display name
- `links`: Array of URLs (live demo, repo, etc.)
- `tech_stacks`: Array of technologies used
- `description`: What the project does and your role
- `image_urls`: Array of screenshot URLs

## Tips

- Use GitHub raw URLs for images: `https://github.com/user/repo/blob/main/image.png?raw=true`
- Keep descriptions concise (1-2 sentences)
- Order tech stacks by importance
