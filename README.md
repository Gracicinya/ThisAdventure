# The Shattered Crown

**Course:** IMD1005 - Web Development  
**Assignment:** 04 - Team Project: Build a Website  
**Project Type:** Multi-page fantasy game website  
**Deployment:** GitHub Pages

---

## Team Members

- **Person 1:** [Add Name] - [Add Student Number]  
  Project setup, GitHub Pages setup, home page structure, hero section, mailing list section, shared smooth scroll and fade-in support

- **Person 2:** Peace Jolayemi - 101378520  
  Story / world page development, lore content, timeline section, shared CSS system, colour palette, typography, spacing, and overall visual consistency

- **Person 3:** [Add Name] - [Add Student Number]  
  Characters page, character cards, character filtering, popup modals, and play preview / branching interactive page

- **Person 4:** [Add Name] - [Add Student Number]  
  Contact / join page, countdown section, FAQ accordion, form validation, hamburger menu, and design document maintenance

---

## Project Overview

**The Shattered Crown** is a fantasy-themed website created for a fictional narrative adventure game. The site introduces visitors to the game world, its major characters, its story, and an interactive preview of the kind of choices players would make in the full game.

The website is designed for:

- people who enjoy fantasy and story-driven games
- visitors who want to explore the world and lore before playing
- potential followers who want updates through the join page

The site focuses on making the game world feel immersive, readable, and interactive instead of presenting everything as plain text.

---

## Problem Statement

This website solves the problem of how to introduce a new fantasy game world to first-time visitors in a way that is clear, engaging, and easy to navigate.

Instead of relying on a single static page, the project gives users:

- a landing page that quickly explains the world
- a story page for lore and worldbuilding
- a character page with interactive details
- an interactive preview page that demonstrates player choice
- a join page that encourages users to stay connected

---

## Project Pages

### 1. Home Page

- hero section with game title and tagline
- world introduction
- launch countdown
- featured character slider
- mailing list call-to-action

### 2. Story / World Page

- story overview
- timeline of major events
- expandable lore sections
- preview link to the interactive story

### 3. Characters Page

- featured character slider
- character grid
- role labels
- filter buttons
- modal popups with full character details

### 4. Play Preview Page

- interactive branching scene
- dialogue and narration
- player choice buttons
- different paths and ending variations

### 5. Join / Contact Page

- release countdown
- newsletter signup
- contact form
- FAQ accordion

---

## How to Navigate the Site

1. Start on `index.html` to get an overview of the game world.
2. Visit `story.html` to read the background story, timeline, and lore.
3. Open `characters.html` to explore the main cast and their roles.
4. Try `playpreview.html` to experience the branching interactive preview.
5. Go to `contact.html` to join the mailing list, view the countdown, and use the contact form.

---

## Main Features

### Responsive Design

- works across desktop and mobile layouts
- includes a hamburger menu for smaller screens
- shared spacing, colours, and typography system across pages

### JavaScript Interactivity

- smooth scrolling
- fade-in reveal effects
- hamburger menu toggle
- countdown timer
- character slider and modals
- character filtering
- FAQ accordion
- expandable story / lore sections
- form validation

### Working With Data

This project demonstrates data-driven design in JavaScript rather than hardcoding everything directly in HTML.

Examples include:

- character data rendered from JavaScript objects
- story scenes and branching choices rendered from structured data
- countdown values generated dynamically with JavaScript

### Vue.js Usage

This project includes meaningful Vue.js usage:

- the interactive play preview uses Vue for reactive story progression
- the contact form uses Vue for validation and submission states

This was done to support the bonus requirement in a way that is actually useful to the project.

---

## Design Direction

The visual direction for this project is based on a fantasy mood board with:

- twilight and celestial imagery
- parchment and lore-inspired textures
- warm gold accents against deep green and dark tones
- dramatic fantasy typography and atmospheric spacing

The goal was to make the site feel like part of the game world, not just a basic information page.

---

## How This Project Meets the Assignment Requirements

### Multi-Page Website

- the project includes at least 5 main pages
- each page has a clear purpose and supports the overall theme

### Design Foundations

- shared colour palette and typography system
- consistent visual identity across all pages
- layout hierarchy that guides the user through the content

### Responsive Design

- mobile navigation adapts with a hamburger menu
- sections stack and resize across different screen sizes
- interactive sections remain usable on smaller screens

### Interactivity with JavaScript

- character slider and popups
- FAQ and lore accordions
- branching story preview
- countdown timer
- newsletter and contact form interactions

### Working with Data

- characters and story content are rendered from JavaScript data structures
- the site does not rely only on hardcoded HTML blocks for dynamic sections

### Semantic and Accessible HTML

- meaningful headings and section structure
- buttons used for interactive controls
- labels attached to form fields
- alt text on images
- ARIA attributes used in navigation, accordions, and form feedback areas

### Code Quality

- CSS and JavaScript are stored in external files
- shared styles and scripts are separated from page-specific files
- naming is kept readable and consistent
- reusable helpers are used for repeated behaviors

---

## Team Contribution Breakdown

### Person 1: Project Setup & Home Page

- created the GitHub repository and basic project structure
- added collaborators
- enabled GitHub Pages
- built the landing page
- created the hero section, world intro, and mailing list area
- contributed shared smooth scroll and fade-in behavior

### Person 2: Story / World Page & Shared CSS

- built the story / world page
- wrote the story overview, lore, and timeline content
- created and maintained the shared CSS system
- defined colour variables, fonts, spacing, and theme consistency
- supported styling decisions across the project

### Person 3: Characters Page & Play Preview

- built the characters page
- created the character cards and role labels
- implemented filtering and popup modals
- built the interactive preview page
- created branching story logic and dynamic dialogue flow

### Person 4: Contact Page & Utility JavaScript

- built the join / contact page
- created the newsletter and contact form layout
- implemented form validation and FAQ behavior
- handled shared utility interactions such as the hamburger menu
- maintained the design document for planning meetings

---

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Vue 3
- GitHub
- GitHub Pages

Other learning resources used during development:

- YouTube
- Google
- Reddit

---

## File Structure

```text
├── index.html
├── story.html
├── characters.html
├── playpreview.html
├── contact.html
├── world.html
├── shared.css
├── shared.js
├── characters.css
├── characters.js
├── playpreview.css
├── playpreview.js
├── contact.css
├── story.css
├── index.css
├── assets/
└── README.md
```

---

## AI Usage Documentation

### AI Tools Used

- ChatGPT
- Codex
- Claude 

### What AI Helped With

- helping merge some complex code sections when team changes needed to be combined
- explaining JavaScript concepts and debugging logic
- helping clean up or simplify some repeated code
- helping write and revise this README
- helping phrase some AI-assisted code comments in the project where needed

### What Was Written by the Team

- overall project idea and content direction
- page layout structure
- worldbuilding content, lore, and character information
- styling decisions, colours, spacing, and responsive design choices
- most of the HTML, CSS, and JavaScript implementation
- page integration and final editing

### Other Learning Resources

- YouTube for tutorials and concept explanations
- Google for documentation and troubleshooting
- Reddit for problem-solving discussions and examples

### AI Policy Statement

AI was used as a support tool, not as a replacement for team work. The majority of the website was written, styled, and organized by the team. AI-assisted parts are documented in this README, and selected code sections are marked with AI comments where applicable.

---

## Deployment Links

- **GitHub Repository:** [Add repository link here]
- **Live GitHub Pages Site:** [Add live site link here]
- **Design Document:** Submitted with the project deliverables / [Add link here if needed]

---

