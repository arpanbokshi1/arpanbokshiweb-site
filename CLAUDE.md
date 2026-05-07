# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Preview the site**: Open `portfolio/index.html` in a browser. On Windows you can run:
  ```powershell
  start "" "c:\Users\ARPAN\Downloads\ARPAN WEB – Framer_files\portfolio\index.html"
  ```
- **Live‑reload while editing**: If you have a local HTTP server (e.g., `npx serve` or VS Code's Live Server extension), start it in the repository root and navigate to `http://localhost:3000/portfolio/`.
- **Run a single script**: The only custom script is `portfolio/script.js`. To execute it in isolation you can use Node (for debugging only):
  ```powershell
  node "c:\Users\ARPAN\Downloads\ARPAN WEB – Framer_files\portfolio\script.js"
  ```
- **Lint / format**: This project does not include a linting configuration. If you wish to enforce style, you can install `prettier` globally and run:
  ```powershell
  npx prettier --write "c:\Users\ARPAN\Downloads\ARPAN WEB – Framer_files/**/*.html" "c:\Users\ARPAN\Downloads\ARPAN WEB – Framer_files/**/*.js" "c:\Users\ARPAN\Downloads\ARPAN WEB – Framer_files/**/*.css"
  ```
- **Test**: No automated tests are defined. Manual testing consists of opening the page in a browser and exercising UI interactions (menu toggle, mobile nav, 3D cube drag, contact form submission).

## High‑Level Architecture

- **Entry point**: `portfolio/index.html` – loads the stylesheet `style.css` and script `script.js`.
- **Styling**: All visual styles live in `portfolio/style.css`. The design relies heavily on CSS custom properties, glass‑morphism panels, and CSS‑based animations for the loader, scroll progress bar, and marquee.
- **Behavior**: `portfolio/script.js` wires up the following major UI features:
  1. **Page loader** – hides after DOM content is ready.
  2. **Custom cursor** – tracks mouse movement and displays a dot and ring.
  3. **Scroll progress bar** – updates width based on scroll position.
  4. **Particle canvas** – renders background particles.
  5. **Responsive navigation** – toggles mobile drawer via the menu button.
  6. **3‑D cube** – uses CSS 3‑D transforms; users can drag to rotate.
  7. **Animated counters** – increment numbers on the hero stats section.
  8. **Marquee ticker** – loops a list of skill tags.
  9. **Contact form** – opens a Gmail compose window when the *Send Message* button is clicked.
- **Assets**: Images under the root (e.g., `*.jpeg`, `*.png`) are used for background or decorative purposes. No dynamic asset pipeline is present.
- **Third‑party libraries**:
  - **Lucide Icons** – loaded via CDN (`https://unpkg.com/lucide@latest`).
  - **Vanilla‑Tilt** – provides tilt‑effect on cards (`https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js`).
- **No build system**: The site is pure static HTML/CSS/JS. Deployment typically consists of copying the `portfolio` folder to a static‑hosting service.

## Notable Project Files

- `portfolio/index.html` – main markup and component layout.
- `portfolio/style.css` – global styles, responsive layout, animations.
- `portfolio/script.js` – UI interactions and DOM manipulation.
- `canvas-sandbox.*` – additional sandbox assets for the particle canvas (mostly CSS/JS). 

## Project‑Specific Guidance

- **Keep the DOM structure synchronized**: When modifying HTML, ensure corresponding selectors in `script.js` exist (e.g., `#loader`, `#cursorDot`). Missing elements will cause runtime errors.
- **3‑D cube rotation**: The cube is manipulated via CSS transforms on `#cube`. Any changes to the cube’s markup should update the related transform logic.
- **Contact form integration**: The button simply opens a Gmail compose tab. If you replace this with a real backend, update the click handler in `script.js`.
- **Responsive breakpoints**: The mobile navigation drawer is toggled by the `#menuBtn` element. Verify media‑query thresholds in `style.css` if you adjust layout.

## Cursor / Copilot Rules

No `.cursor` or `.github/copilot-instructions.md` files were found, so there are no special linting or AI‑assistant directives for this repository.

## README Summary

A README file was not present. The `index.html` meta description already provides a concise summary of the portfolio: "Portfolio of Arpan — a creative designer specializing in branding, video editing, graphic design, and web development."
