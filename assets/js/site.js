/* Native SVG links remain usable without JavaScript; only decoration is animated. */
(() => {
  const host = document.querySelector('.chip-visual');
  if (!host) return;
  const button = document.getElementById('motion-toggle');
  const paths = [...host.querySelectorAll('.circuit-trace')];
  const electrons = [...host.querySelectorAll('.electron')];
  const lengths = paths.map(path => path.getTotalLength());
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, frame = 0, last = 0, elapsed = 0;

  function draw() {
    paths.forEach((path, i) => {
      const distance = (elapsed * .045 + i * 29) % lengths[i];
      const point = path.getPointAtLength(distance);
      electrons[i].setAttribute('transform', `translate(${point.x} ${point.y})`);
    });
  }
  function animate(now) {
    frame = 0;
    if (paused || !visible || document.hidden) { last = 0; return; }
    if (last) elapsed += Math.min(now - last, 50);
    last = now;
    draw();
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame); last = 0;
    const running = !paused && visible && !document.hidden;
    host.dataset.running = String(running);
    button.textContent = paused ? 'Play motion' : 'Pause motion';
    button.setAttribute('aria-pressed', String(paused));
    if (running) frame = requestAnimationFrame(animate);
  }
  draw();
  host.classList.add('chip-enhanced');
  button.hidden = false;
  button.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', sync);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; sync();
  }, { threshold: .05 }).observe(host);
  sync();
})();
