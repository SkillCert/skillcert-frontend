# UI Guidelines

This document defines the rules for writing consistent and maintainable UI components.

## 1. File & Folder Naming
- Use **PascalCase** for component files (e.g., `NavBar.tsx`, `UserCard.tsx`).
- Group components inside the `/components` directory.
- Avoid unnecessary abbreviations (`Btn` ❌ → `Button` ✅).

## 2. Component Naming
- Component names must match their file names.
- Always use **PascalCase** for React components (`ProfileCard`, `DashboardLayout`).
- Keep component names descriptive and meaningful.

## 3. Styling Rules
- Use **Tailwind CSS** for styling.
- Maintain consistent spacing and sizing (`p-4`, `m-2`, `text-lg`).
- Avoid mixing Tailwind with inline styles unless necessary.
- Reuse utility classes instead of writing custom CSS when possible.

## 4. Props
- Use clear, descriptive names (`isOpen`, `onSubmit`, `userData`).
- Boolean props should start with `is` or `has` (`isVisible`, `hasError`).
- Keep prop lists minimal and focused.

## 5. General Best Practices
- Keep components small and reusable.
- Separate logic from presentation where possible.
- Follow consistent formatting with Prettier/ESLint.
- Use meaningful commit messages when updating UI components.
