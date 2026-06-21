// ---------- Intro ----------
const intro = document.getElementById('intro');
const main = document.getElementById('main');

function enter() {
  if (intro.classList.contains('hide')) return;
  intro.classList.add('hide');
  main.classList.add('show');
  main.setAttribute('aria-hidden', 'false');
  startTypewriter();
}
intro.addEventListener('click', enter);
window.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') enter(); });

// ---------- Typewriter ----------
const phrases = [
  'because you deserve something nice.',
  'no occasion. just you.',
  'a name that means happiness.',
  'and you live up to it, every day.',
];
const tw = document.getElementById('typewriter');
let pi = 0, ci = 0, deleting = false;

function startTypewriter() {
  if (tw.dataset.started) return;
  tw.dataset.started = '1';
  tick();
}
function tick() {
  const word = phrases[pi];
  tw.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  let delay = deleting ? 35 : 60;
  if (!deleting && ci > word.length) { deleting = true; delay = 1700; }
  else if (deleting && ci < 0) { deleting = false; ci = 0; pi = (pi + 1) % phrases.length; delay = 350; }
  setTimeout(tick, delay);
}

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---------- Cursor glow ----------
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  glow.style.opacity = '1';
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
window.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

// ---------- Starfield ----------
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [], w, h, dpr;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = canvas.width = innerWidth * dpr;
  h = canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  const count = Math.floor((innerWidth * innerHeight) / 6000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: (Math.random() * 1.4 + 0.3) * dpr,
    a: Math.random(),
    tw: Math.random() * 0.02 + 0.004,
    dy: (Math.random() * 0.15 + 0.03) * dpr,
  }));
}
window.addEventListener('resize', resize);
resize();

const palette = ['255,217,160', '255,143,177', '182,155,255', '255,255,255'];
const starColor = stars.length ? null : null;

function draw() {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    s.a += s.tw;
    const alpha = 0.4 + Math.abs(Math.sin(s.a)) * 0.6;
    s.y += s.dy;
    if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.shadowBlur = 6 * dpr;
    ctx.shadowColor = 'rgba(182,155,255,0.7)';
    ctx.fill();
  }
  requestAnimationFrame(draw);
}
draw();

// ---------- Petals ----------
const petalChars = ['✦', '❀', '✿', '❁', '•', '✺'];
function rainPetals(n = 40) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => spawnPetal(), i * 70);
  }
}
function spawnPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
  const colors = ['#ff8fb1', '#ffd9a0', '#b69bff', '#f4f1ff'];
  p.style.color = colors[Math.floor(Math.random() * colors.length)];
  p.style.left = Math.random() * 100 + 'vw';
  const size = Math.random() * 1.2 + 0.8;
  p.style.fontSize = size + 'rem';
  const dur = Math.random() * 3 + 4;
  const drift = (Math.random() - 0.5) * 200;
  const rot = (Math.random() - 0.5) * 720;
  document.body.appendChild(p);
  p.animate([
    { transform: 'translate(0,0) rotate(0deg)', opacity: 0 },
    { opacity: 1, offset: 0.1 },
    { transform: `translate(${drift}px, ${innerHeight + 80}px) rotate(${rot}deg)`, opacity: 0 },
  ], { duration: dur * 1000, easing: 'cubic-bezier(.4,.1,.6,1)' }).onfinish = () => p.remove();
}
document.getElementById('petalBtn').addEventListener('click', () => rainPetals(50));

// gentle welcome petals once user enters
intro.addEventListener('click', () => setTimeout(() => rainPetals(18), 600), { once: true });
