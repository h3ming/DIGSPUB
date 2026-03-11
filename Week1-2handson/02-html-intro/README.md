# Module 02: HTML Introduction

This module explores HTML elements, attributes, and the hierarchical structure 
of web documents (the DOM - Document Object Model).

## Learning Objectives

- Understand HTML element syntax (start tag, content, end tag)
- Learn about element attributes and their values
- Master proper tag nesting and hierarchy
- Understand the Document Object Model (DOM)
- Know the functional categories of HTML elements

## HTML Element Syntax

```
<element attribute="value">content</element>
     │        │        │         │         │
     │        │        │         │         └── End tag
     │        │        │         └── Text content (the text node)
     │        │        └── Attribute value
     │        └── Attribute name
     └── Start tag / Element name
```

### Examples:
```html
<h1 id="mainTitle">Hello World!</h1>
<a class="nav-link" href="page.html">Link Text</a>
<img src="photo.jpg" alt="Description">  <!-- void element, no end tag -->
```

## Functional Categories of HTML Elements

| Category | Purpose | Examples |
|----------|---------|----------|
| Root | Document root | `<html>` |
| Metadata | Document info | `<head>`, `<title>`, `<link>`, `<meta>` |
| Scripting | Code | `<script>` |
| Sections | Page structure | `<body>`, `<nav>`, `<h1-h6>`, `<header>`, `<footer>` |
| Grouping | Content organization | `<p>`, `<div>`, `<ul>`, `<ol>`, `<li>` |
| Text-level | Inline formatting | `<a>`, `<em>`, `<strong>`, `<span>`, `<code>` |
| Embedded | Media content | `<img>`, `<video>`, `<audio>`, `<iframe>` |
| Forms | User input | `<form>`, `<input>`, `<button>` |

## Proper Tag Nesting

Tags must be properly nested - inner tags must close before outer tags.

```html
<!-- CORRECT -->
<div id="outer">
    <div id="inner">
        <p>Content</p>
    </div>
</div>

<!-- INCORRECT - improper nesting -->
<div id="outer">
    <div id="inner">
        <p>Content</div>
    </p>
</div>
```

## The Document Object Model (DOM)

The DOM is a tree representation of your HTML document:

```
document
└── html
    ├── head
    │   ├── meta
    │   ├── title
    │   └── link
    └── body
        ├── div (container)
        │   ├── h1
        │   └── p
        └── footer
```

## Files in This Example

- `index.html` - Demonstrates various HTML elements and proper nesting
- `style.css` - Basic styling with container margins

## Exercises

### Exercise 1: Add More Sections
Add a `<nav>` element before the main `<div>` with some navigation links.

### Exercise 2: Create a List
Add an ordered list (`<ol>`) or unordered list (`<ul>`) with at least 3 items.

### Exercise 3: Inspect the DOM
1. Open the page in your browser
2. Right-click and select "Inspect" or press F12
3. Explore the Elements tab to see the DOM tree

## Key Concepts

### Void Elements (Self-Closing)
Some elements don't have content and don't need a closing tag:
- `<img>` - Images
- `<br>` - Line breaks
- `<hr>` - Horizontal rules
- `<input>` - Form inputs
- `<meta>` - Metadata

### Block vs Inline Elements
- **Block elements** (`<div>`, `<p>`, `<h1>`) start on a new line
- **Inline elements** (`<span>`, `<a>`, `<strong>`) flow within text
