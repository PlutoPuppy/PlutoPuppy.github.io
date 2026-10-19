/* An original, perspective-projected toroidal lattice. No third-party renderer. */
(() => {
  const canvas = document.getElementById('lattice');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const host = canvas.parentElement;
  const button = document.getElementById('motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let visible = true;
  let frame = 0;
  let last = 0;
  let angle = 0.35;
  let width = 0, height = 0;
  let pointerX = 0, pointerY = 0;
  const points = [];
  const rings = 42, segments = 64;
  for (let i = 0; i < rings; i++) {
    const u = i / rings * Math.PI * 2;
    for (let j = 0; j < segments; j++) {
      const v = j / segments * Math.PI * 2;
      const tube = 0.35 + 0.07 * Math.cos(u * 3);
      points.push([(1 + tube * Math.cos(v)) * Math.cos(u), (1 + tube * Math.cos(v)) * Math.sin(u), tube * Math.sin(v)]);
    }
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const scale = Math.min(width / 3.6, height / 3.7);
    const ay = angle + pointerX, ax = 0.88 + pointerY;
    const projected = points.map(([x,y,z]) => {
      const xx = x * Math.cos(ay) + z * Math.sin(ay);
      const zz = -x * Math.sin(ay) + z * Math.cos(ay);
      const yy = y * Math.cos(ax) - zz * Math.sin(ax);
      const depth = y * Math.sin(ax) + zz * Math.cos(ax);
      const perspective = 4.7 / (4.7 - depth);
      return {x:width/2 + (xx * .92 - yy * .32) * scale * perspective,y:height/2 + (xx * .32 + yy * .92) * scale * perspective,z:depth,p:perspective};
    });
    for (let i = 0; i < rings; i++) {
      ctx.beginPath();
      for (let j = 0; j <= segments; j++) {
        const p = projected[i * segments + j % segments];
        if (!j) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
      }
      ctx.strokeStyle = 'rgba(125,74,43,.19)'; ctx.lineWidth = .6; ctx.stroke();
    }
    projected.sort((a,b) => a.z-b.z).forEach(p => {
      ctx.fillStyle = `rgba(143,66,33,${.25+(p.z+1.5)/3*.65})`;
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.45,p.p*1.2),0,Math.PI*2);ctx.fill();
    });
  }
  function animate(now) {
    frame = 0;
    if (paused || !visible || document.hidden) {last=0;return;}
    if (!last) last = now;
    angle += Math.min(now-last,50) * .00013; last=now;
    draw(); frame=requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);frame=0;last=0;
    button.textContent=paused?'Play motion':'Pause motion';
    button.setAttribute('aria-pressed',String(paused));
    draw();
    if (!paused && visible && !document.hidden) frame=requestAnimationFrame(animate);
  }
  function resize() {
    const rect=host.getBoundingClientRect();width=rect.width;height=rect.height;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);draw();
  }
  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.05}).observe(host);
  button.hidden=false;host.classList.add('ready');
  button.addEventListener('click',()=>{paused=!paused;sync();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;pointerX=pointerY=0;sync();});
  document.addEventListener('visibilitychange',sync);
  host.addEventListener('pointermove',e=>{
    if(paused || reduced.matches || e.pointerType==='touch')return;
    const r=host.getBoundingClientRect();pointerX=((e.clientX-r.left)/r.width-.5)*.35;pointerY=((e.clientY-r.top)/r.height-.5)*.25;
  });
  host.addEventListener('pointerleave',()=>{pointerX=pointerY=0;});
  resize();sync();
})();
