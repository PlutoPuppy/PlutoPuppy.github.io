/* An original, perspective-projected layered computational grid. No third-party renderer. */
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
  const side = 9, layers = 3;
  for (let layer = 0; layer < layers; layer++) {
    for (let row = 0; row < side; row++) {
      for (let col = 0; col < side; col++) {
        points.push([(col - 4) * .22, (row - 4) * .22, (layer - 1) * .48]);
      }
    }
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const scale = Math.min(width / 4.2, height / 4.2);
    const ay = 0.45 + Math.sin(angle) * .12 + pointerX, ax = 0.65 + pointerY;
    const projected = points.map(([x,y,z]) => {
      const xx = x * Math.cos(ay) + z * Math.sin(ay);
      const zz = -x * Math.sin(ay) + z * Math.cos(ay);
      const yy = y * Math.cos(ax) - zz * Math.sin(ax);
      const depth = y * Math.sin(ax) + zz * Math.cos(ax);
      const perspective = 4.7 / (4.7 - depth);
      return {x:width/2 + (xx * .92 - yy * .32) * scale * perspective,y:height/2 + (xx * .32 + yy * .92) * scale * perspective,z:depth,p:perspective};
    });
    // Three connected planes suggest hardware arrays rather than a literal device.
    ctx.strokeStyle = 'rgba(125,74,43,.22)';
    ctx.lineWidth = .7;
    for (let layer = 0; layer < layers; layer++) {
      for (let row = 0; row < side; row++) {
        for (let col = 0; col < side; col++) {
          const index = layer * side * side + row * side + col;
          const neighbors = [];
          if (col < side - 1) neighbors.push(index + 1);
          if (row < side - 1) neighbors.push(index + side);
          if (layer < layers - 1 && row % 4 === 0 && col % 4 === 0) neighbors.push(index + side * side);
          for (const neighbor of neighbors) {
            ctx.beginPath();ctx.moveTo(projected[index].x, projected[index].y);
            ctx.lineTo(projected[neighbor].x, projected[neighbor].y);ctx.stroke();
          }
        }
      }
    }
    projected.sort((a,b) => a.z-b.z).forEach(p => {
      ctx.fillStyle = `rgba(143,66,33,${.25+(p.z+1.5)/3*.65})`;
      ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.8,p.p*1.8),0,Math.PI*2);ctx.fill();
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
