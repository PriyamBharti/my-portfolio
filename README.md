# Priyam Bharti — Portfolio

A personal portfolio website showcasing my experience, projects, skills and education as a Computer Science and Engineering student at SRM Institute of Science and Technology, Chennai.

**Live site:** https://priyambharti.github.io/my-portfolio/

## Technologies

- **HTML5**: semantic, single-page markup
- **CSS3**: custom properties for theming, Grid and Flexbox layouts, and fluid sizing with `clamp()`
- **Vanilla JavaScript**: no frameworks or build tools
- **Self-hosted fonts**: Inter and Fraunces (variable `.woff2` files)
- **GitHub Pages**: static hosting

## Features

- **Light and dark themes** with a toggle. The choice is remembered, and the site follows the device's setting until a theme is chosen.
- **Responsive layout** for phones, tablets and desktops, with a collapsible mobile menu.
- **Full-width cover photo** followed by an introduction with profile photo and quick highlights.
- **Sections** for About and Leadership, Experience, Projects, Skills, Education and Certifications, and Contact.
- **Resume download** directly from the page.
- **Contact links** to email, GitHub and LinkedIn, plus a "Copy email" button.
- **Subtle scroll animations** that are switched off for visitors who prefer reduced motion.
- **Active navigation highlighting** that shows which section is in view.
- **Accessibility details**: a skip-to-content link, visible keyboard focus, labelled icon buttons and descriptive image text.

## Repository structure

```
my-portfolio/
├── index.html                 # Page content and structure
├── css/
│   └── styles.css             # All styles, themes and responsive rules
├── js/
│   └── main.js                # Theme toggle, menu, scroll effects, copy email
├── assets/
│   ├── Priyam_Bharti_Resume.pdf
│   ├── fonts/                 # Inter and Fraunces (.woff2)
│   └── img/                   # Cover and profile photos
└── .nojekyll                  # Serve files as-is on GitHub Pages
```

## Running locally

The site is plain HTML, CSS and JavaScript, so there is nothing to install or build.

1. Clone the repository:
   ```bash
   git clone https://github.com/PriyamBharti/my-portfolio.git
   cd my-portfolio
   ```
2. Start a simple local server (requires Python 3):
   ```bash
   python -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser.

You can also open `index.html` directly, but a local server is recommended so that every feature (such as "Copy email") works as it does online.

## Author

**Priyam Bharti**

- GitHub: [@PriyamBharti](https://github.com/PriyamBharti)
- LinkedIn: [priyam-bharti-229449290](https://www.linkedin.com/in/priyam-bharti-229449290)
