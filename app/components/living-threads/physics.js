// ============================================================
// VERLET PHYSICS ENGINE — Living Threads (Infinite Harmonic Sway)
// Features: 60/120fps direct tracking, slingshot release,
// and gentle infinite pendulum swinging motion.
// ============================================================

export class Point {
  constructor(x, y, opts = {}) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.mass = opts.mass ?? 1;
    this.pinned = opts.pinned ?? false;
    this.radius = opts.radius ?? 0;
    this.id = opts.id ?? null;
    this.swayPhase = opts.swayPhase ?? Math.random() * Math.PI * 2;
    this.swaySpeed = opts.swaySpeed ?? 0.85;
    this.swayAmp = opts.swayAmp ?? 0.25;
  }
}

export class Stick {
  constructor(a, b, opts = {}) {
    this.a = a;
    this.b = b;
    this.length = opts.length ?? Math.hypot(b.x - a.x, b.y - a.y);
    this.stiffness = opts.stiffness ?? 0.88;
  }
}

export class PhysicsWorld {
  constructor({ width = 800, height = 600, gravity = 0.18, damping = 0.988, bounce = 0.6 } = {}) {
    this.points = [];
    this.sticks = [];
    this.gravity = gravity;
    this.damping = damping;
    this.bounce = bounce;
    this.width = width;
    this.height = height;
    this.dragPoint = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.zeroGravity = false;
  }

  addPoint(x, y, opts) {
    const p = new Point(x, y, opts);
    this.points.push(p);
    return p;
  }

  addStick(a, b, opts) {
    const s = new Stick(a, b, opts);
    this.sticks.push(s);
    return s;
  }

  update(time = 0) {
    const g = this.zeroGravity ? 0 : this.gravity;

    // --- 1. Verlet Integration + Gentle Ambient Harmonic Sway ---
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      if (p.pinned) continue;

      if (p === this.dragPoint) {
        p.oldX = p.x;
        p.oldY = p.y;
        p.x = this.mouseX;
        p.y = this.mouseY;
        continue;
      }

      const vx = (p.x - p.oldX) * this.damping;
      const vy = (p.y - p.oldY) * this.damping;
      p.oldX = p.x;
      p.oldY = p.y;
      p.x += vx;
      p.y += vy + g;

      // Infinite slow ambient pendulum sway
      if (!this.zeroGravity) {
        const sway = Math.sin(time * p.swaySpeed + p.swayPhase) * p.swayAmp;
        p.x += sway;
      } else {
        // Zero-gravity smooth drift
        p.x += (Math.random() - 0.5) * 0.35;
        p.y += (Math.random() - 0.5) * 0.35;
      }
    }

    // --- 2. Constraint Solving (Spring Distance Conservation) ---
    const iterations = this.zeroGravity ? 1 : 6;
    for (let iter = 0; iter < iterations; iter++) {
      for (let i = 0; i < this.sticks.length; i++) {
        const s = this.sticks[i];
        const dx = s.b.x - s.a.x;
        const dy = s.b.y - s.a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const diff = (s.length - dist) / dist * s.stiffness;
        const ox = dx * diff * 0.5;
        const oy = dy * diff * 0.5;

        if (s.a === this.dragPoint) {
          if (!s.b.pinned) {
            s.b.x += ox * 2;
            s.b.y += oy * 2;
          }
        } else if (s.b === this.dragPoint) {
          if (!s.a.pinned) {
            s.a.x -= ox * 2;
            s.a.y -= oy * 2;
          }
        } else {
          if (!s.a.pinned) {
            s.a.x -= ox;
            s.a.y -= oy;
          }
          if (!s.b.pinned) {
            s.b.x += ox;
            s.b.y += oy;
          }
        }
      }

      // --- 3. Boundary Collisions & Bounce ---
      for (let i = 0; i < this.points.length; i++) {
        const p = this.points[i];
        if (p.pinned || p === this.dragPoint) continue;
        const r = Math.max(30, p.radius);

        if (p.x < r) {
          p.x = r;
          p.oldX = p.x + (p.x - p.oldX) * this.bounce;
        } else if (p.x > this.width - r) {
          p.x = this.width - r;
          p.oldX = p.x + (p.x - p.oldX) * this.bounce;
        }

        if (p.y < r) {
          p.y = r;
          p.oldY = p.y + (p.y - p.oldY) * this.bounce;
        } else if (p.y > this.height - r) {
          p.y = this.height - r;
          p.oldY = p.y + (p.y - p.oldY) * this.bounce;
        }
      }
    }
  }

  resize(w, h) {
    if (!this.width || !this.height) return;
    const sx = w / this.width;
    const sy = h / this.height;
    this.width = w;
    this.height = h;
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      p.x *= sx;
      p.y *= sy;
      p.oldX *= sx;
      p.oldY *= sy;
    }
  }

  startDrag(point, x, y) {
    this.mouseX = x;
    this.mouseY = y;
    this.dragPoint = point;
  }

  moveDrag(x, y) {
    this.mouseX = x;
    this.mouseY = y;
  }

  endDrag() {
    if (this.dragPoint) {
      const vx = this.dragPoint.x - this.dragPoint.oldX;
      const vy = this.dragPoint.y - this.dragPoint.oldY;
      this.dragPoint.oldX = this.dragPoint.x - vx * 1.15;
      this.dragPoint.oldY = this.dragPoint.y - vy * 1.15;
      this.dragPoint = null;
    }
  }

  getThreadTension(threadSticks) {
    if (!threadSticks || threadSticks.length === 0) return 0;
    let totalStretch = 0;
    let totalRest = 0;
    for (let i = 0; i < threadSticks.length; i++) {
      const s = threadSticks[i];
      const dist = Math.hypot(s.b.x - s.a.x, s.b.y - s.a.y);
      totalStretch += Math.abs(dist - s.length);
      totalRest += s.length;
    }
    return Math.min(totalStretch / (totalRest * 0.45), 1);
  }
}

/**
 * Creates a Verlet thread chain with harmonic phase offsets
 */
export function createThread(world, anchorX, anchorY, nodeX, nodeY, segments = 7, nodeId = null, threadIdx = 0) {
  const anchor = world.addPoint(anchorX, anchorY, { pinned: true, mass: 0 });

  const basePhase = threadIdx * 0.65;
  const swaySpeed = 0.85 + (threadIdx % 3) * 0.15;

  const points = [anchor];
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const x = anchorX + (nodeX - anchorX) * t;
    const y = anchorY + (nodeY - anchorY) * t;
    const isNode = i === segments;
    const swayAmp = isNode ? 0.32 : 0.08 * t;

    const p = world.addPoint(x, y, {
      mass: isNode ? 4.0 : 0.35,
      radius: isNode ? 48 : 0,
      id: isNode ? nodeId : null,
      swayPhase: basePhase + i * 0.12,
      swaySpeed,
      swayAmp,
    });
    points.push(p);
  }

  const sticks = [];
  const segLen = Math.hypot(nodeX - anchorX, nodeY - anchorY) / segments;
  for (let i = 0; i < points.length - 1; i++) {
    sticks.push(world.addStick(points[i], points[i + 1], { length: segLen, stiffness: 0.85 }));
  }

  return { anchor, node: points[points.length - 1], points, sticks };
}
