# Add Work Experience

Adds a new work experience entry to the About page.

## Steps

1. **Update experience.json**
   - Path: `src/data/experience.json`
   - Add new entry to beginning of array (most recent first)

2. **Experience Schema**

```json
{
  "role": "Job Title",
  "company": "Company Name",
  "location": "City, Country",
  "yoe": 1,
  "description": ["Achievement or responsibility 1", "Achievement or responsibility 2"],
  "tags": ["Technology1", "Technology2"],
  "startDate": "2024",
  "endDate": "Present"
}
```

## Required Fields

- `role`: Job title
- `company`: Company name (lowercase for styling)
- `location`: City, Country
- `yoe`: Years of experience (number)
- `description`: Array of bullet points
- `tags`: Technologies/tools used
- `startDate`: Year started
- `endDate`: Year ended or "Present"

## Writing Tips

- Start descriptions with action verbs (Built, Implemented, Developed)
- Include measurable outcomes where possible
- Keep bullet points to 4-6 per role
- List tags in order of usage frequency
