# 📝 Sanity CMS Schemas

This directory contains the Sanity schema definitions for the VedeBar project.

## Structure

```
sanity/
├── schemas/
│   ├── menuItem.ts    # Menu item (drink) schema
│   └── index.ts       # Export all schemas
├── sanity.config.ts   # Sanity Studio configuration
└── sanity.cli.ts      # Sanity CLI configuration
```

---

## Schema: menuItem

Defines the structure for menu items (drinks) in the bar.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Name of the drink (max 100 chars) |
| `description` | text | ✅ | Ingredients separated by ` . ` (max 500 chars) |
| `imageNumber` | number | ✅ | Image number: 1, 2, 3, 6, 7, 8, 9, or 11 |
| `order` | number | ✅ | Display order: 1-8 |
| `active` | boolean | ✅ | Show/hide on website (default: true) |

### Validation Rules

**imageNumber:**
- Must be one of: `1, 2, 3, 6, 7, 8, 9, 11`
- Corresponds to existing images in `/public/bebidas/`
- Custom validation prevents invalid numbers

**order:**
- Integer between 1-8
- Controls the display sequence on the website
- Each drink should have a unique order

**name:**
- Maximum 100 characters
- Required

**description:**
- Maximum 500 characters
- Required
- Format: ingredients separated by ` . `

### Preview Configuration

The preview shows:
- **Title:** `{order}. {name} (Inativo)` if inactive
- **Subtitle:** First 80 characters of description

### Orderings

Two default orderings are provided:
1. **Ordem de Exibição** - Sort by order field (ascending)
2. **Nome** - Sort alphabetically by name

---

## Adding New Schemas

To add a new content type:

1. **Create schema file:**
   ```typescript
   // sanity/schemas/newType.ts
   import { defineField, defineType } from 'sanity'

   export default defineType({
     name: 'newType',
     title: 'New Type',
     type: 'document',
     fields: [
       defineField({
         name: 'fieldName',
         title: 'Field Title',
         type: 'string',
       }),
     ],
   })
   ```

2. **Export in index.ts:**
   ```typescript
   // sanity/schemas/index.ts
   import menuItem from './menuItem'
   import newType from './newType'

   export const schemaTypes = [menuItem, newType]
   ```

3. **Schema appears automatically in Sanity Studio**

---

## Configuration Files

### sanity.config.ts

Main configuration for Sanity Studio:
- Project ID and dataset
- Studio base path: `/studio`
- Plugins: Structure Tool, Vision (GROQ testing)
- Schema types

### sanity.cli.ts

Configuration for Sanity CLI commands:
- Project ID and dataset for CLI operations
- Studio host for deployments

---

## Usage

### Development
```bash
npm run sanity:dev
```
Opens Sanity Studio at `http://localhost:3333`

### Build
```bash
npm run sanity:build
```
Builds the Sanity Studio for deployment

### Deploy
```bash
npm run sanity:deploy
```
Deploys Sanity Studio to Sanity's hosting

---

## Important Notes

### Fixed Image Numbers

⚠️ **The imageNumber field only accepts these values:**
- 1, 2, 3, 6, 7, 8, 9, 11

These correspond to the existing images:
- `/public/bebidas/01.jpg`
- `/public/bebidas/02.jpg`
- `/public/bebidas/03.jpg`
- `/public/bebidas/06.jpg`
- `/public/bebidas/07.jpg`
- `/public/bebidas/08.jpg`
- `/public/bebidas/09.jpg`
- `/public/bebidas/11.jpg`

**Why?** Images are managed in the codebase, not uploaded to Sanity. This keeps the implementation simple and prevents storage costs.

### Fixed Menu Size

⚠️ **Exactly 8 drinks should be active at all times**

The website layout is designed for 8 drinks. You can create more drinks in Sanity, but only 8 should have `active: true` simultaneously.

---

## Schema Best Practices

1. **Always validate required fields**
   ```typescript
   validation: (Rule) => Rule.required()
   ```

2. **Add descriptions for editors**
   ```typescript
   description: 'Helpful text for content editors'
   ```

3. **Use custom validation for business rules**
   ```typescript
   validation: (Rule) => Rule.custom((value) => {
     // Custom validation logic
     return true // or error message
   })
   ```

4. **Configure useful previews**
   ```typescript
   preview: {
     select: { /* fields */ },
     prepare({ /* selected */ }) {
       return { title: '...', subtitle: '...' }
     }
   }
   ```

5. **Add orderings for better UX**
   ```typescript
   orderings: [
     {
       title: 'Display Name',
       name: 'fieldName',
       by: [{ field: 'field', direction: 'asc' }]
     }
   ]
   ```

---

## Testing Schemas

Use the **Vision** plugin in Sanity Studio:
1. Open Studio → Vision tab
2. Write GROQ queries
3. Test queries before using in code

Example query:
```groq
*[_type == "menuItem" && active == true] | order(order asc) {
  name,
  description,
  imageNumber,
  order
}
```

---

## TypeScript Types

TypeScript interfaces are defined in:
`src/lib/sanity.queries.ts`

```typescript
export interface MenuItem {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  description: string
  imageNumber: number
  order: number
  active: boolean
}
```

---

## Documentation

For more details, see:
- [SANITY_SETUP_GUIDE.md](../SANITY_SETUP_GUIDE.md)
- [Sanity Schema Docs](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)

---

**Questions?** Check the main [SANITY_SETUP_GUIDE.md](../SANITY_SETUP_GUIDE.md) or Sanity documentation.
