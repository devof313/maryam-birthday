// Tiny confetti burst, shared by both pages.
window.confetti = (() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = document.getElementById('confetti');
  const cx = cv.getContext('2d');
  const cols = ['#4b1d6e', '#8e5bb8', '#b3261e', '#fff27a', '#e3c98f', '#ffffff'];
  let parts = [], raf = 0;
  function step() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.y < cv.height + 20);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vy += .03;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cx.restore();
    }
    raf = parts.length ? requestAnimationFrame(step) : 0;
  }
  return (n = 140) => {
    if (reduce) return;
    cv.width = innerWidth; cv.height = innerHeight;
    for (let i = 0; i < n; i++) parts.push({
      x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * .4,
      vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 3,
      r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
      w: 6 + Math.random() * 6, h: 3 + Math.random() * 4, c: cols[i % cols.length]
    });
    if (!raf) raf = requestAnimationFrame(step);
  };
})();
