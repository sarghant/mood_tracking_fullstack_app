# Mood Tracking App - Code Quality Rules

This file defines the coding standards and patterns used throughout this codebase. These rules are based on the actual patterns and structure observed in the project.

## Project Structure

### Directory Organization
- Use Next.js App Router structure with `src/app/` as the root
- Place reusable UI components in `src/ui/`
- Place feature-specific components in feature directories (e.g., `src/app/moods/components/`)
- Place shared components in `src/app/components/`
- Place server actions in `src/actions/`
- Place utility functions in `src/lib/`
- Place custom hooks in `src/hooks/`
- Place database client in `src/db/`
- Place constants in feature-specific `constants/` directories or at the feature root

### File Naming Conventions
- Use kebab-case for action files: `moods.actions.ts`
- Use kebab-case for utility files: `date-utils.ts`, `get-average-mood.ts`
- Use PascalCase for component files: `NavBar.tsx`, `DailyLog.tsx`
- Use camelCase for hook files: `useFloatingEmojis.ts`
- Use lowercase for config files: `auth.ts`, `middleware.ts`

## TypeScript Standards

### Type Safety
- Always enable strict mode in `tsconfig.json`
- Use explicit return types for functions, especially async functions
- Prefer `type` over `interface` for type definitions (unless extending React components)
- Use Prisma-generated types from `@prisma/client` for database models
- Use `Partial<T>` for optional user data when appropriate
- Define types inline for component props when simple, or as separate types when reused

### Type Definitions
```typescript
// Good: Explicit return type
export async function getCurrentUser(): Promise<Partial<User> | null> {
  // ...
}

// Good: Inline props type for simple cases
const Component = ({ prop1, prop2 }: { prop1: string; prop2: number }) => {
  // ...
}

// Good: Separate type for complex/reused types
type ActionResponse = {
  success: boolean;
  message: string;
};
```

### Path Aliases
- Always use `@/*` alias for imports from `src/`
- Example: `import { cn } from "@/lib/utils"`
- Never use relative paths like `../../../` when `@/` can be used

## Component Patterns

### Server vs Client Components
- Default to Server Components (no directive)
- Use `"use client"` directive only when necessary (hooks, event handlers, browser APIs)
- Keep Server Components as the default for better performance
- Pass data from Server Components to Client Components as props

### Component Structure
- Use default exports for components
- Use PascalCase for component names
- Define props types inline or as separate types
- Use `React.forwardRef` for components that need ref forwarding (e.g., Button)

### Component Example
```typescript
"use client"; // Only if needed

const ComponentName = ({
  prop1,
  prop2,
}: {
  prop1: string;
  prop2: number;
}) => {
  // Component logic
  return <div>...</div>;
};

export default ComponentName;
```

### Component Organization
- Keep components focused and single-purpose
- Extract complex logic into custom hooks
- Use composition over inheritance
- Place related components in the same directory

## Error Handling

### Error Handling Patterns
- Use try-catch blocks for all async operations
- Use the `logError` utility from `@/lib/utils` for error logging
- Only log errors in development mode (use `isDev` check)
- Return `null` or error objects instead of throwing when appropriate
- Provide user-friendly error messages in UI
- Use early returns for validation checks

### Error Handling Example
```typescript
export async function getData(): Promise<Data | null> {
  try {
    // Operation
    return data;
  } catch (error) {
    logError("Error message: ", {
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}
```

## Database Patterns

### Prisma Client
- Use singleton pattern for Prisma client
- Check for global instance in development to prevent multiple instances
- Use Prisma Accelerate extension: `.$extends(withAccelerate())`
- Configure logging only in development: `log: process.env.NODE_ENV === "development" ? ["error"] : []`

### Database Queries
- Always use type-safe Prisma queries
- Use `select` to limit returned fields when possible
- Use `orderBy` for consistent ordering
- Handle null cases explicitly
- Use transactions for multi-step operations

### Database Example
```typescript
const prisma = globalForPrisma.prisma || createPrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

## Server Actions

### Server Action Patterns
- Use `"use server"` directive at the top of server action files
- Use `useActionState` hook in client components for form handling
- Return consistent response types: `{ success: boolean; message: string }`
- Use `revalidatePath` after mutations to update cache
- Validate user authentication before operations
- Handle FormData extraction with proper type casting

### Server Action Example
```typescript
"use server";

export async function actionName(
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const user = await getCurrentUser();
    if (user == null) {
      return {
        success: false,
        message: "You're not authorized to perform this action.",
      };
    }
    // Action logic
    revalidatePath("/path");
    return { success: true, message: "Success message" };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please, try again.",
    };
  }
}
```

## Utility Functions

### Utility Patterns
- Place pure utility functions in `src/lib/`
- Use descriptive function names (verb + noun)
- Export functions individually, not as default
- Keep utilities focused and single-purpose
- Use TypeScript for type safety

### Utility Examples
- `cn()` - Class name utility using `clsx` and `tailwind-merge`
- `logError()` - Development-only error logging
- `isDev` - Environment check constant
- Date utilities: `dateFormatter()`, `forceMidnight()`, `checkTodaysMoodLog()`

## Styling Patterns

### Tailwind CSS
- Use utility classes for styling
- Use `cn()` utility for conditional classes
- Support dark mode with `dark:` prefix
- Use responsive breakpoints: `sm:`, `md:`, `lg:`
- Prefer Tailwind utilities over custom CSS when possible
- Use CSS modules only when necessary (e.g., animations)

### Class Organization
- Group related classes logically
- Use template literals for conditional classes
- Keep className props readable with proper spacing

### Styling Example
```typescript
className={`${baseClasses} ${
  condition ? "active-classes" : "inactive-classes"
} transition-all`}
```

## State Management

### React Hooks
- Use `useState` for local component state
- Use `useEffect` for side effects and cleanup
- Use `useActionState` for server action form handling
- Create custom hooks in `src/hooks/` for reusable logic
- Use `useRef` for DOM references and values that don't trigger re-renders

### Custom Hooks
- Prefix custom hooks with `use`
- Place custom hooks in `src/hooks/` directory
- Return objects or tuples for multiple values
- Document hook dependencies clearly

## Constants and Configuration

### Constants Organization
- Place feature-specific constants in feature directories (e.g., `src/app/moods/constants/`)
- Use `const` assertions for type safety when appropriate
- Export types alongside constants
- Use enums for fixed sets of values

### Constants Example
```typescript
export type MoodDisplayData = {
  // Type definition
};

export const moods: MoodDisplayData[] = [
  // Constants
];
```

## Authentication Patterns

### Auth Setup
- Use NextAuth v5 (beta) with Prisma adapter
- Configure providers in `auth.ts` at root
- Use database session strategy
- Export `auth`, `signIn`, `signOut` from auth config
- Use middleware for route protection

### Auth Usage
- Check authentication in server components with `await auth()`
- Use `getCurrentUser()` helper for user data
- Handle auth errors gracefully with try-catch
- Redirect unauthenticated users appropriately

## Code Quality

### Best Practices
- Use early returns to reduce nesting
- Validate inputs before processing
- Use descriptive variable and function names
- Keep functions small and focused
- Avoid deep nesting (max 3-4 levels)
- Use optional chaining and nullish coalescing when appropriate
- Prefer `const` over `let`, avoid `var`

### Code Organization
- Group imports: external libraries, then internal modules
- Use consistent spacing and formatting
- Keep lines under 100 characters when possible
- Use meaningful comments only when necessary
- Remove commented-out code before committing

### Import Organization
```typescript
// External libraries
import { useState, useEffect } from "react";
import { format } from "date-fns";

// Internal modules
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
```

## Environment Variables

### Environment Checks
- Use `process.env.NODE_ENV === "development"` for dev checks
- Export `isDev` constant from utils for reuse
- Only log/console in development mode
- Use environment variables for configuration

## Testing (Excluded from Analysis)

- Tests are in `__tests__/` directory
- Use Jest and React Testing Library
- Follow testing best practices (not analyzed in this rules file)

## Performance

### Optimization Patterns
- Use Next.js Image component for images
- Implement proper loading states
- Use server components by default
- Minimize client-side JavaScript
- Use `revalidatePath` strategically after mutations
- Consider using Prisma Accelerate for database queries

## Accessibility

### A11y Standards
- Use semantic HTML elements
- Include `aria-label` for icon-only buttons
- Use `aria-hidden` for decorative elements
- Ensure keyboard navigation works
- Use proper heading hierarchy
- Include `alt` text for images

## Documentation

### Code Comments
- Use comments sparingly - code should be self-documenting
- Document complex business logic
- Explain "why" not "what" in comments
- Remove TODO comments before committing

## Git and Version Control

### Commit Practices
- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Remove console.logs and debug code before committing
- Don't commit sensitive data or credentials
