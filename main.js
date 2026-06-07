/* ============================================
   AMAN PORTFOLIO — JavaScript
   Three.js + Scroll Effects + Interactions
============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNav();
  initHeroCanvas();
  initAboutCanvas();
  initProjectCanvases();
  initContactCanvas();
  initScrollReveal();
  initSkillBars();
  initHamburger();
});

/* ============================================
   CUSTOM CURSOR
============================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let fx = 0, fy = 0, mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  const animate = () => {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animate);
  };
  animate();
}

/* ============================================
   NAVIGATION — scroll behavior
============================================ */
function initNav() {
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================
   HAMBURGER MENU
============================================ */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ============================================
   SCROLL REVEAL
============================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.about-heading, .about-bio, .about-details, .about-ctas, ' +
    '.project-card, .skill-category, .contact-heading, .contact-sub, .tools-row'
  );

  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================
   SKILL BARS ANIMATION
============================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

/* ============================================
   HERO CANVAS — Three.js Particle Field
============================================ */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // Particle system
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    sizes[i] = Math.random() * 2 + 0.5;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color: 0xff6b35,
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Wireframe sphere
  const sphereGeo = new THREE.IcosahedronGeometry(2, 1);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.08
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphere);

  // Grid lines
  const gridHelper = new THREE.GridHelper(30, 30, 0x1a1a1a, 0x111111);
  gridHelper.position.y = -5;
  scene.add(gridHelper);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  const clock = new THREE.Clock();
  const animate = () => {
    const t = clock.getElapsedTime();
    requestAnimationFrame(animate);

    particles.rotation.y = t * 0.05;
    particles.rotation.x = t * 0.03;
    sphere.rotation.y = t * 0.15;
    sphere.rotation.x = t * 0.1;

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ============================================
   ABOUT CANVAS — Rotating Geometry
============================================ */
function initAboutCanvas() {
  const canvas = document.getElementById('aboutCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const w = canvas.clientWidth, h = canvas.clientHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
  camera.position.z = 4;

  // Floating torus knot
  const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 200, 16);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xff6b35,
    metalness: 0.8,
    roughness: 0.2,
    wireframe: false,
  });
  const knot = new THREE.Mesh(geo, mat);
  scene.add(knot);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);
  const point1 = new THREE.PointLight(0xff6b35, 2, 10);
  point1.position.set(3, 3, 3);
  scene.add(point1);
  const point2 = new THREE.PointLight(0x7c3aed, 1.5, 10);
  point2.position.set(-3, -2, 2);
  scene.add(point2);

  const clock = new THREE.Clock();
  const animate = () => {
    const t = clock.getElapsedTime();
    requestAnimationFrame(animate);
    knot.rotation.y = t * 0.4;
    knot.rotation.x = t * 0.2;
    knot.position.y = Math.sin(t * 0.8) * 0.15;
    renderer.render(scene, camera);
  };
  animate();

  const resizeObs = new ResizeObserver(() => {
    const w2 = canvas.clientWidth, h2 = canvas.clientHeight;
    camera.aspect = w2 / h2;
    camera.updateProjectionMatrix();
    renderer.setSize(w2, h2);
  });
  resizeObs.observe(canvas);
}

/* ============================================
   PROJECT CANVASES — Mini 3D Scenes
============================================ */
function initProjectCanvases() {
  const canvases = document.querySelectorAll('.project-canvas');
  canvases.forEach((canvas, index) => {
    const color = canvas.dataset.color || '#ff6b35';
    createProjectScene(canvas, color, index);
  });
}

function createProjectScene(canvas, colorHex, index) {
  if (typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const setSize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 3;

  const color = new THREE.Color(colorHex);

  // Different geometry per card
  const geos = [
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(0.9, 0),
    new THREE.DodecahedronGeometry(0.8, 0),
  ];

  const geo = geos[index % geos.length];
  const wireMat = new THREE.MeshBasicMaterial({
    color: colorHex, wireframe: true, transparent: true, opacity: 0.5
  });
  const solidMat = new THREE.MeshStandardMaterial({
    color: colorHex, metalness: 0.6, roughness: 0.3, transparent: true, opacity: 0.15
  });

  const wireObj  = new THREE.Mesh(geo, wireMat);
  const solidObj = new THREE.Mesh(geo, solidMat);
  scene.add(wireObj, solidObj);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  const point   = new THREE.PointLight(color, 2, 10);
  point.position.set(2, 2, 2);
  scene.add(ambient, point);

  // Particles
  const pCount = 200;
  const pPos   = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 8;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: colorHex, size: 0.04, transparent: true, opacity: 0.4 });
  scene.add(new THREE.Points(pGeo, pMat));

  setSize();

  const clock = new THREE.Clock();
  const speed = 0.3 + index * 0.1;
  let hover = false;

  canvas.addEventListener('mouseenter', () => hover = true);
  canvas.addEventListener('mouseleave', () => hover = false);

  const animate = () => {
    const t = clock.getElapsedTime();
    requestAnimationFrame(animate);
    const s = hover ? speed * 2 : speed;
    wireObj.rotation.y  = t * s;
    wireObj.rotation.x  = t * (s * 0.6);
    solidObj.rotation.y = t * s;
    solidObj.rotation.x = t * (s * 0.6);
    renderer.render(scene, camera);
  };
  animate();

  new ResizeObserver(setSize).observe(canvas);
}

/* ============================================
   CONTACT CANVAS — Particle Wave
============================================ */
function initContactCanvas() {
  const canvas = document.getElementById('contactCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 5, 10);
  camera.lookAt(0, 0, 0);

  const count = 2500;
  const positions = new Float32Array(count * 3);
  const cols      = 50;
  const rows      = 50;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const idx = (i * cols + j) * 3;
      positions[idx]     = (j - cols / 2) * 0.4;
      positions[idx + 1] = 0;
      positions[idx + 2] = (i - rows / 2) * 0.4;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xff6b35, size: 0.06, transparent: true, opacity: 0.7
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  const pos = geo.attributes.position;
  const clock = new THREE.Clock();

  const animate = () => {
    const t = clock.getElapsedTime();
    requestAnimationFrame(animate);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const idx = (i * cols + j) * 3 + 1;
        const x   = pos.array[idx - 1];
        const z   = pos.array[idx + 1];
        pos.array[idx] = Math.sin(x * 0.8 + t * 1.2) * 0.4 + Math.cos(z * 0.6 + t * 0.8) * 0.3;
      }
    }
    pos.needsUpdate = true;

    points.rotation.y = t * 0.05;
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ============================================
   SMOOTH SCROLL — anchor links
============================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
