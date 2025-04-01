# Aganitha Nav Bar

A lightweight, customizable navigation bar component for Next.js applications, built with TypeScript and Tailwind CSS. It provides a modern, responsive design with dropdown support, while enforcing a consistent style and allowing color theming via CSS variables.


## Features

- Responsive navigation bar with mobile menu support
- Dropdown menu support for nested navigation items
- Fixed styling to ensure a consistent look across projects
- Color theming via CSS variables (background, foreground, primary, primary-foreground)
- TypeScript support for type-safe props
- Scroll-aware behavior (hides on scroll down, shows on scroll up)

## Installation

Install the package via npm:

```bash
npm install @aganithadev/nav-bar
```

Ensure you have the following dependencies installed in your Next.js project:
- next
- react
- lucide-react (for icons)

## Usage

### Basic Example

Import and use the NavBar component in your Next.js page. Provide the required navItems prop and optionally customize it with logoUrl, appName, and button props.

```tsx
"use client";

import { NavBar } from '@aganithadev/nav-bar';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Navigation configuration
const navItems = [
  { label: "Home", path: "#hero" },
  {
    label: "About",
    path: "#about",
    dropdown: [
      { label: "Our Team", path: "#team" },
      { label: "Our Mission", path: "#mission" },
    ],
  },
  { label: "Features", path: "#features" },
  { label: "Contact", path: "#contact" },
];

export default function Home() {
  const handleNavigate = (path: string) => {
    const section = document.querySelector(path);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <NavBar
      logoUrl="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png"
      appName="Aganitha"
      navItems={navItems}
      onNavigate={handleNavigate}
      button={{ label: "Login", href: "/login" }}
    />
  );
}
```

### Example with Dropdown

The NavBar supports dropdown menus for nested navigation. Define them in the navItems array:

```tsx
const navItems = [
  { label: "Home", path: "#hero" },
  {
    label: "About",
    path: "#about",
    dropdown: [
      { label: "Our Team", path: "#team" },
      { label: "Our Mission", path: "#mission" },
    ],
  },
  { label: "Features", path: "#features" },
];
```

Dropdowns appear below their parent item on desktop (with hover/click support) and are indented in the mobile menu.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| appName | string | Application name displayed next to the logo | undefined |
| logoUrl | string | URL of the logo image (supports external and local URLs) | undefined |
| navItems | NavItem[] | Array of navigation items (required; supports dropdowns) | [] |
| onNavigate | (path: string) => void | Callback triggered on navigation item click | undefined |
| button | { label: string; href: string } | Configuration for a button on the right side of the nav bar | undefined |

### NavItem Type

```tsx
interface NavItem {
  label: string;              // Display text for the nav item
  path?: string;              // URL or anchor link (optional if dropdown is used)
  dropdown?: DropdownItem[];  // Array of dropdown items (optional)
  type?: string;              // Reserved for special types; "auth-signin" and "auth-signout" types are ignored
  hidden?: boolean;           // Hide the item if true
}

interface DropdownItem {
  label: string;              // Display text for the dropdown item
  path: string;               // URL or anchor link
}
```

## Theming

The NavBar component uses CSS variables for theming. Define these variables in your globals.css file to customize the colors:

```css
/* globals.css */
:root {
  --background: oklch(0.97 0.01 314.78);
  --foreground: oklch(0.37 0.03 259.73);
  --primary: oklch(0.71 0.16 293.54);
  --primary-foreground: oklch(1.00 0 0);
}

.dark {
  --background: oklch(0.22 0.01 56.04);
  --foreground: oklch(0.93 0.03 272.79);
  --primary: oklch(0.79 0.12 295.75);
  --primary-foreground: oklch(0.22 0.01 56.04);
}
```

The component uses the following CSS variables by default:
- `--background`: Background color of the navigation bar
- `--foreground`: Text color for navigation items
- `--primary`: Color for active navigation items and the button background
- `--primary-foreground`: Text color for the button

## Notes

- Styling Restrictions: The component enforces a fixed design. You can only customize colors via CSS variables. Additional styling (e.g., backdrop-blur-md, transition) is not allowed.
- Responsive Design: The nav bar is fully responsive, with a mobile menu toggle for smaller screens.
- Dependencies: Ensure lucide-react is installed for icons like ChevronDown and ArrowRight.

