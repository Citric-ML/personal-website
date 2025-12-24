document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     FLOATING TEXT BLOCKS
     =============================== */

  document.querySelectorAll(".float-block").forEach((block, index) => {
    let t = Math.random() * Math.PI * 2;

    const amplitude = 10 + Math.random() * 8;
    const frequency = 0.002 + Math.random() * 0.001;
    const phaseOffset = index * 0.9;

    function animateFloat() {
      t += frequency;

      const y = Math.sin(t + phaseOffset) * amplitude;
      const x = Math.cos(t * 0.7 + phaseOffset) * (amplitude * 0.4);

      block.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(animateFloat);
    }

    animateFloat();
  });
  /* ===============================
     MESSY OS EFFECT
     =============================== */

  document.querySelectorAll('.window').forEach(win => {
    const x = (Math.random() - 0.5) * 240;
    const y = (Math.random() - 0.5) * 200;
    const r = (Math.random() - 0.5) * 12;

    win.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)' },
        { transform: `translate(${x}px, ${y}px) rotate(${r}deg)` }
      ],
      {
        duration: 700,
        easing: 'cubic-bezier(.2,.8,.3,1)',
        fill: 'forwards'
      }
    );
  });

});
const canvas = document.getElementById("matrix-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "01|/\\█▓▒░";
const fontSize = 10;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 240, 90, 0.85)";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}
const hero = document.getElementById("hero");
const heroBg = document.querySelector(".hero-bg");
const matrixCanvas = document.getElementById("matrix-bg");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const fadeStart = 50;
  const fadeEnd = 400;

  let t = (scrollY - fadeStart) / (fadeEnd - fadeStart);
  t = Math.min(Math.max(t, 0), 1);

  matrixCanvas.style.opacity = t;     // fade IN matrix
  heroBg.style.opacity = 1 - t;       // fade OUT image
});

// Cursor
const windows = document.querySelectorAll(".window");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const win = entry.target;
    if (win.dataset.animated) return;
    win.dataset.animated = "true";

    win.classList.add("typing");

    const lines = Array.from(
      win.querySelectorAll("h1, h2, h3, h4, p, li")
    );

    //Remove any existing cursors in this window
    win.querySelectorAll(".typing-cursor").forEach(c => c.remove());

    let spans = [];

    lines.forEach((line, i) => {
      const text = line.textContent.trim();
      if (!text) return;

      const span = document.createElement("span");
      span.className = "type-line";
      span.textContent = text;

      line.textContent = "";
      line.appendChild(span);

      const duration = 350 + Math.random() * 500;
      const delay = i * (140 + Math.random() * 120);

      span.style.animationDuration = `${duration}ms`;
      span.style.animationDelay = `${delay}ms`;

      spans.push({ span, duration, delay });
    });

    //Cursor ONLY on final span
    const last = spans[spans.length - 1];
    if (last) {
      const cursor = document.createElement("span");
      cursor.className = "typing-cursor";
      cursor.textContent = "▌";

      setTimeout(() => {
        last.span.appendChild(cursor);
      }, last.delay + last.duration);
    }

    observer.unobserve(win);
  });
}, { threshold: 0.05 });

windows.forEach(win => observer.observe(win));


windows.forEach(win => observer.observe(win));


windows.forEach(win => observer.observe(win));

drawMatrix();
