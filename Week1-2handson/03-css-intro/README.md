# Module 03: CSS Introduction

This module covers CSS fundamentals including selectors, properties, 
specificity, pseudo-classes, and units of measurement.

## Learning Objectives

- Master CSS selector types (element, class, id)
- Understand CSS specificity and the cascade
- Learn common CSS properties for styling
- Use pseudo-classes for interactive states
- Understand CSS units (px, rem, em, %)

## CSS Selector Types

### Element Selector
Targets all instances of an HTML element:
```css
h1 { color: maroon; }
p { font-size: 16px; }
```

### Class Selector (.)
Targets elements with a specific class attribute:
```css
.siteContent { color: gray; }
.paragraphContent { background-color: lightyellow; }
```

### ID Selector (#)
Targets a single element with a specific id:
```css
#welcome { font-weight: bold; }
#firstPara { border-left: 4px solid blue; }
```

## CSS Specificity

Specificity determines which CSS rule wins when multiple rules target the same element.

```
Specificity Score: (ID, Class, Element)

#id            = (1, 0, 0) - Highest priority
.class         = (0, 1, 0) - Medium priority
element        = (0, 0, 1) - Lowest priority

Examples:
p { }           → (0, 0, 1)
body p { }      → (0, 0, 2)
.firstPara { }  → (0, 1, 0)
p.firstPara { } → (0, 1, 1)
#welcome { }    → (1, 0, 0)
p#welcome { }   → (1, 0, 1)
```

**Higher specificity wins!**

## CSS Pseudo-Classes

Pseudo-classes style elements based on their state:

```css
/* Style links in different states */
a { color: blue; text-decoration: none; }
a:hover { color: red; font-weight: bold; }
a:visited { color: purple; }

/* Using the nesting selector & */
a {
    color: blue;
    &:hover { color: red; }
    &:visited { color: purple; }
}
```

## Common CSS Properties

| Property | Description | Example |
|----------|-------------|---------|
| `color` | Text color | `color: blue;` |
| `background-color` | Background | `background-color: #f5f5f5;` |
| `font-family` | Font face | `font-family: Arial, sans-serif;` |
| `font-size` | Text size | `font-size: 16px;` |
| `margin` | Outside spacing | `margin: 20px;` |
| `padding` | Inside spacing | `padding: 10px;` |
| `border` | Element border | `border: 1px solid black;` |
| `width`/`height` | Dimensions | `width: 50%;` |

## CSS Units

### Absolute Units
- `px` - Pixels (most common absolute unit)

### Relative Units
- `rem` - Relative to root element font size
- `em` - Relative to parent element font size
- `%` - Percentage of parent element

```css
html { font-size: 18px; }        /* Base size */
h1 { font-size: 2rem; }          /* 36px (2 × 18px) */
.small { font-size: 0.875rem; }  /* 15.75px */
.container { width: 80%; }       /* 80% of parent */
```

## CSS Architecture Approaches

1. **Frameworks** (Tailwind) - Pre-built utility classes
2. **External CSS** - Site-wide styling in separate files
3. **`<style>` in `<head>`** - Page-specific overrides
4. **Inline styles** - Element-specific (highest specificity)

## Files in This Example

- `index.html` - HTML with various elements to style
- `style.css` - CSS demonstrating selectors and specificity

## Exercises

### Exercise 1: Specificity Challenge
In `style.css`, try to make the third paragraph blue. You'll need to 
use a selector with higher specificity than existing rules.

### Exercise 2: Hover Effects
Add a `:hover` pseudo-class to the paragraphs to change their background 
color when the mouse hovers over them.

### Exercise 3: Font Sizes with rem
Change the font sizes to use `rem` units instead of `px`. Set a base 
font size on the `html` element first.
