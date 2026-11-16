const canvas = document.querySelector('#scene');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
const stars = Array.from({ length: 300 }, () => [
  Math.random() * W, Math.random() * H * 0.7, Math.random() * 1.6 + 0.4,
]);

let t = 0;
function frame() {
  t += 1 / 60;
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#02030a');
  sky.addColorStop(1, '#0b1a2e');
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  for (const [x, y, r] of stars) {
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + x);
    ctx.fillRect(x, y, r, r);
  }
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 3; k++) {
    for (let x = 0; x < W; x += 3) {
      const y = H * 0.38 + Math.sin(x * 0.004 + t * 0.4 + k * 2) * 120
        + Math.sin(x * 0.013 - t * 0.7) * 30;
      const len = 260 + Math.sin(x * 0.02 + t + k) * 120;
      const g = ctx.createLinearGradient(0, y - len, 0, y);
      g.addColorStop(0, 'hsla(280, 90%, 60%, 0)');
      g.addColorStop(0.7, `hsla(${140 + k * 25}, 95%, 62%, 0.2)`);
      g.addColorStop(1, 'hsla(150, 100%, 75%, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(x, y - len, 3, len);
    }
  }
  ctx.globalCompositeOperation = 'source-over';
  // mountains
  ctx.fillStyle = '#03050c';
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 20) {
    ctx.lineTo(x, H * 0.62 + Math.sin(x * 0.006) * 60 + Math.sin(x * 0.023) * 25);
  }
  ctx.lineTo(W, H);
  ctx.fill();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
