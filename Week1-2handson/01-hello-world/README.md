# Module 01: Hello World Site

This is your first web development project! You'll learn how HTML, CSS, and JavaScript 
work together to create a web page.

## Learning Objectives

- Understand the relationship between HTML, CSS, and JavaScript
- Create a basic HTML document structure
- Link an external CSS file to style your page
- Use VS Code and Live Server for local development

## The Three Core Technologies

```
┌─────────────────────────────────────────────────────────────────┐
│  Web Page                                                       │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │    HTML     │  │    CSS      │  │      JavaScript         │ │
│  │  (Structure)│  │  (Style)    │  │     (Behavior)          │ │
│  │             │  │             │  │                         │ │
│  │  Content    │  │  Colors     │  │  Interactivity          │ │
│  │  Elements   │  │  Fonts      │  │  Dynamic content        │ │
│  │  Hierarchy  │  │  Layout     │  │  User input handling    │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Files in This Example

- `index.html` - The main HTML document
- `style.css` - External stylesheet for styling

## How to Run

1. Open this folder in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open to `http://127.0.0.1:5500/index.html`

## Exercises

### Exercise 1: Change the Color
Edit `style.css` and change `color: maroon;` to another color like `blue` or `darkgreen`.

### Exercise 2: Add More Content
In `index.html`, add more elements inside the `<body>`:
- A `<p>` paragraph element
- An `<h2>` subheading

### Exercise 3: Style the New Elements
Add CSS rules in `style.css` for your new elements.

## Key Syntax

### HTML Basic Structure
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <!-- Your content goes here -->
  </body>
</html>
```

### CSS Basic Syntax
```css
selector {
  property: value;
}
```

## Next Steps

Once you're comfortable with this example, move on to **02-html-intro** to learn 
more about HTML elements and document structure.
