## Project Configuration

- **Language**: TypeScript
- **Package Manager**: pnpm
- **Add-ons**: prettier, eslint, vitest, sveltekit-adapter, drizzle, better-auth, mcp

---

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

## Naming Conventions

- camelCase: variables, functions, classes, custom elements, id
- PascalCase: components, interfaces, types

## CSS & Styling

- ❌ Never use Tailwind CSS
- ✅ Use CSS custom properties for theming (--primaryColor, --contrastColor, etc.)
- ✅ Use OKLCH color space when possible
- ✅ Prefer CSS Grid over Flexbox for layouts
- ✅ Use clamp() for responsive typography
- ✅ Use @keyframes for simple animations, GSAP for complex/scroll-triggered
- ✅ Implement dark/light theme support with CSS custom properties

## Component Structure

- Keep components small and focused (< 100 lines)
- Co-locate styles with <style> blocks
- Use semantic HTML and proper accessibility attributes
- Follow existing patterns (see Card.svelte, EventCard.svelte)

## File Organization

- Group related files in directories (images/, components/, etc.)
- Use index.js for barrel exports
- Use descriptive file names

## Project-Specific Requirements

## Brand Guidelines

- Typography:
  - Headers: `Libre Baskerville`
  - Paragraph/body text: `Libre Franklin`
  - Emphasis/script text: `above-the-beyond-script`
- Approved color palette only:
  - `#e9a787`, `#85141c`, `#d3a041`, `#c48143`
  - `#6d7c60`, `#f1eee6`, `#cad5d7`, `#ffffff`, `#000000`
- Do not introduce any new color values outside this palette (including hardcoded hex/rgb/oklch values).
