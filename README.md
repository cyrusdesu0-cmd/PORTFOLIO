# Aman — Full Stack 3D Web Developer Portfolio

A stunning, immersive portfolio website built with pure HTML, CSS, and JavaScript + Three.js. Features real-time 3D WebGL animations, particle systems, smooth scroll effects, and a fully responsive dark design.

## ✨ Features

- **Live 3D Hero** — Rotating particle field + wireframe sphere using Three.js
- **Animated About Section** — Interactive torus knot with PBR materials and lighting
- **3D Project Cards** — Each card has its own mini WebGL scene with unique geometry
- **Particle Wave** — Animated grid wave in the contact section
- **Custom Cursor** — Magnetic cursor with follower effect
- **Scroll Reveal** — Elements animate in as you scroll
- **Skill Bars** — Animated on scroll into view
- **Infinite Marquee** — Tech stack ticker
- **Responsive** — Fully mobile-friendly
- **Noise Texture** — Subtle film grain overlay

## 🚀 Getting Started

No build tools needed! Just open `index.html` in your browser or deploy directly.

### Local Development
```bash
# Clone the repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Open in browser (or use any static server)
npx serve .
# OR
python3 -m http.server 3000
```

### Deploy to GitHub Pages
1. Push to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/portfolio`

## 📁 Project Structure

```
aman-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles + animations
├── js/
│   └── main.js         # Three.js scenes + interactions
├── assets/             # Put your images/resume here
│   └── resume.pdf      # Add your CV here
└── README.md
```

## 🎨 Customization

### Update Your Info
Open `index.html` and edit:
- Name, bio, and location in the **About** section
- Project titles, descriptions, and links in the **Work** section
- Your email in the **Contact** section
- Social links (GitHub, LinkedIn, Twitter)
- Resume link (add `resume.pdf` to the `assets/` folder)

### Add a Real Profile Photo
Replace the Three.js `aboutCanvas` with an `<img>` tag:
```html
<img src="assets/your-photo.jpg" alt="Aman" class="about-photo" />
```

### Change the Accent Color
In `css/style.css`, update the `--accent` variable:
```css
:root {
  --accent: #ff6b35; /* Change to any color */
}
```

### Add More Projects
Copy a `<article class="project-card">` block in `index.html` and update the content.

## 🛠 Tech Stack

- **Three.js r128** — 3D rendering / WebGL
- **HTML5 / CSS3** — Layout, animations, custom properties
- **Vanilla JS** — All interactions, scroll effects, cursor
- **Google Fonts** — Syne, DM Mono, Instrument Serif

## 📄 License

MIT — Free to use, customize, and share.

---

Built with 🔥 by Aman
