# Mukbal Portfolio

A Next.js App Router portfolio with React, compiled Tailwind CSS, and a space-inspired design: a dark canvas, cyan accents, locally hosted display typography, and an interactive starfield.

## Run locally

Requires Node.js 20.9 or newer.

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Edit `app/page.jsx` for the homepage, `app/about/page.jsx` for About, `app/projects/page.jsx` for projects, and `app/contact/page.jsx` for contact.

## Checks and production

```powershell
npm run lint
npm run build
npm start
```

## Structure

- `app/`: routes, metadata, root layout, and global styles.
- `components/`: shared header/footer, canvas starfield, filterable toolbox, project dialog, copy-email controls, scroll reveals, and email form.
- `public/`: portraits and downloadable CV/resume PDFs.
- `legacy/`: original static source retained as a reference; it is not served by Next.js.

Internal navigation uses Next.js routes. The former `/index.html`, `/home.html`, `/home-full.html`, `/projects.html`, and `/contact.html` URLs redirect to the corresponding pages.

The design uses a dark space theme. The bright, layered canvas starfield follows pointer movement, lights up nearby stars with constellation lines, and creates fading click ripples; it can be paused and automatically stops for reduced-motion preferences and hidden tabs. Service cards expand with mouse or keyboard. The project dialog traps focus, closes with Escape, and restores focus to its trigger. Email controls copy the address with visible feedback. The toolbox supports category filtering, text search, and the `/` keyboard shortcut to focus search.

The contact form validates the input and opens a prefilled email draft in the visitor's email client. It does not deliver email from the server and requires no credentials. The project section features this portfolio and an invitation to collaborate. Add new verified projects in `components/project-cards.jsx`.

Deploy as a Next.js project using `npm run build`; the previous single-HTML deployment setup no longer applies.

The visual direction was inspired by https://moncef37i.github.io/portfolio/. Biography, skills, and project content are adapted for Mukbal. Outfit and Bebas Neue are served locally from `app/fonts/`, with their SIL Open Font Licenses alongside them.

Run `npm test` after a production build for Chrome browser checks covering navigation, background controls, service accordions, toolbox filters, project dialog accessibility, clipboard copying, PDFs, responsive layouts from 320 to 1440 pixels, and the email draft flow. Chrome must be installed.

A cyan dot-and-ring cursor follows fine pointers, expands over controls, and responds to presses. Touch devices, form fields, and native dialogs retain the system cursor. Keyboard navigation restores it too. Reduced motion disables cursor lag and background motion.
