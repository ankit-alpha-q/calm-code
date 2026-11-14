const canvas = document.querySelector('#scene');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const city = document.createElement('canvas');
city.width = W; city.height = H;
const c = city.getContext('2d');
c.fillStyle = '#1a2650';
c.fillRect(0, 0, W, H);
c.filter = 'blur(22px)';
for (let i = 0; i < 110; i++) {
  c.fillStyle = `hsla(${[28, 45, 195, 330][i % 4]}, 100%, 62%, 0.8)`;
  c.beginPath();
  c.arc(Math.random() * W, H * (0.2 + Math.random() * 0.6),
    20 + Math.random() * 60, 0, 7);
  c.fill();
}

const fog = document.createElement('canvas');
fog.width = W; fog.height = H;
const f = fog.getContext('2d');
f.fillStyle = 'rgba(110, 130, 175, 0.38)';
f.fillRect(0, 0, W, H);

const drops = Array.from({ length: 70 }, () => ({
  x: Math.random() * W, y: Math.random() * H,
  r: 6 + Math.random() * 12, v: 0,
}));

function frame() {
  ctx.drawImage(city, 0, 0);
  ctx.drawImage(fog, 0, 0);
  for (const d of drops) {
    d.r += Math.random() * 0.006;
    if (d.r > 16) d.v += 0.05;
    d.y += d.v;
    d.x += Math.sin(d.y * 0.05) * 0.3;
    if (d.v && Math.random() < 0.12 && drops.length < 500) {
      drops.push({ x: d.x, y: d.y - d.r, r: 2 + Math.random() * 3, v: 0 });
    }
    if (d.y > H + 20) Object.assign(d, { y: -20, v: 0, r: 8, x: Math.random() * W });
  }
  for (const d of drops) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, 7);
    ctx.clip();
    ctx.translate(d.x, d.y);
    ctx.scale(-0.6, -0.6);
    ctx.drawImage(city, -d.x, -d.y);
    ctx.restore();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0.3, 2.8);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(d.x - d.r * 0.35, d.y - d.r * 0.4, d.r * 0.18, 0, 7);
    ctx.fill();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
