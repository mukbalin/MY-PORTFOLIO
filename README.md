# Mukbal Portfolio

This is a small static portfolio site. It includes:

- `index.html` — main landing page
- `projects.html` — projects listing
- `contact.html` — contact form (Formspree placeholder)
- `styles/styles.css` — shared styles

Local preview

Open `index.html` in a browser (no build step required):

```powershell
Start-Process index.html
```

Deploy notes

- This site is static and works on Vercel. Ensure the repository's root contains `index.html`.
- After making changes, commit and push to trigger Vercel:

```powershell
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Add projects/contact pages and styles"
"C:\Program Files\Git\bin\git.exe" push
```

Form handling

- Replace `{your_form_id}` in `contact.html` with your Formspree form ID, or integrate your own backend.
