"use client";
import { useEffect, useRef, useState } from "react";
export default function Starfield() {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current,
      ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      width = 0,
      height = 0,
      stars = [],
      last = 0,
      elapsed = 0,
      ripples = [];
    const pointer = { x: 0, y: 0, active: false },
      smooth = { x: 0, y: 0 };
    function resize() {
      width = innerWidth;
      height = innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      let seed = 37;
      function random() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      }
      stars = Array.from(
        {
          length: Math.min(
            360,
            Math.max(75, Math.round((width * height) / 4000)),
          ),
        },
        () => ({
          x: random() * width,
          y: random() * height,
          r: random() * 1.5 + 0.45,
          z: random() * 0.8 + 0.2,
          a: random() * 0.45 + 0.45,
          phase: random() * Math.PI * 2,
        }),
      );
      draw();
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      const moving = !paused && !media.matches;
      const near = [];
      if (pointer.active && moving) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          190,
        );
        glow.addColorStop(0, "rgba(50,170,225,.09)");
        glow.addColorStop(1, "rgba(50,170,225,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(pointer.x - 190, pointer.y - 190, 380, 380);
      }
      for (const star of stars) {
        let x = (((star.x + smooth.x * star.z) % width) + width) % width,
          y =
            (((star.y + elapsed * 5 * star.z + smooth.y * star.z) % height) +
              height) %
            height;
        let proximity = 0;
        if (pointer.active && moving) {
          const dx = x - pointer.x,
            dy = y - pointer.y,
            distance = Math.hypot(dx, dy);
          if (distance < 180) {
            proximity = 1 - distance / 180;
            const force = proximity * proximity * 22;
            x += (dx / (distance || 1)) * force;
            y += (dy / (distance || 1)) * force;
            near.push({ x, y, distance });
          }
        }
        const alpha = Math.min(
            1,
            star.a +
              (moving ? Math.sin(elapsed * 0.65 + star.phase) * 0.1 : 0) +
              proximity * 0.25,
          ),
          radius = star.r + proximity * 0.9;
        if (star.r > 1.4 || proximity > 0.35) {
          const halo = ctx.createRadialGradient(x, y, 0, x, y, radius * 5);
          halo.addColorStop(0, `rgba(94,205,255,${0.23 + proximity * 0.15})`);
          halo.addColorStop(1, "rgba(94,205,255,0)");
          ctx.fillStyle = halo;
          ctx.fillRect(
            x - radius * 5,
            y - radius * 5,
            radius * 10,
            radius * 10,
          );
        }
        ctx.fillStyle = `rgba(${star.z > 0.65 ? "210,240,255" : "116,185,219"},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      near.sort((a, b) => a.distance - b.distance);
      const cluster = near.slice(0, 7);
      ctx.lineWidth = 0.65;
      for (let i = 0; i < cluster.length; i++) {
        const s = cluster[i];
        ctx.strokeStyle = `rgba(88,201,240,${(1 - s.distance / 180) * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(pointer.x, pointer.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        if (
          i > 0 &&
          Math.hypot(s.x - cluster[i - 1].x, s.y - cluster[i - 1].y) < 110
        ) {
          ctx.strokeStyle = "rgba(88,201,240,.12)";
          ctx.beginPath();
          ctx.moveTo(cluster[i - 1].x, cluster[i - 1].y);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }
      }
      for (const ripple of ripples) {
        const age = elapsed - ripple.start;
        ctx.strokeStyle = `rgba(88,201,240,${(1 - age) * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, 12 + age * 120, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    function tick(time) {
      const delta = last ? Math.min(time - last, 40) : 16;
      last = time;
      elapsed += delta / 1000;
      const factor = 1 - Math.exp(-delta / 180);
      const targetX = pointer.active ? (pointer.x / width - 0.5) * 70 : 0,
        targetY = pointer.active ? (pointer.y / height - 0.5) * 50 : 0;
      smooth.x += (targetX - smooth.x) * factor;
      smooth.y += (targetY - smooth.y) * factor;
      ripples = ripples.filter((r) => elapsed - r.start < 1);
      draw();
      frame = requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      if (!paused && !media.matches && !document.hidden)
        frame = requestAnimationFrame(tick);
      else {
        smooth.x = 0;
        smooth.y = 0;
        ripples = [];
        draw();
      }
    }
    function move(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }
    function leave() {
      pointer.active = false;
    }
    function release(event) {
      if (event.pointerType === "touch") leave();
    }
    function click(event) {
      if (paused || media.matches) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      ripples.push({ x: event.clientX, y: event.clientY, start: elapsed });
      if (ripples.length > 5) ripples.shift();
    }
    resize();
    sync();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    document.addEventListener("visibilitychange", sync);
    media.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", click);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.removeEventListener("visibilitychange", sync);
      media.removeEventListener("change", sync);
    };
  }, [paused]);
  return (
    <>
      <canvas className="starfield" ref={canvasRef} aria-hidden="true" />
      <button
        className="motion-control"
        type="button"
        aria-label={
          paused ? "Resume background animation" : "Pause background animation"
        }
        aria-pressed={paused}
        onClick={() => setPaused((v) => !v)}
      >
        <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
        <span className="motion-label">
          {paused ? "MOTION OFF" : "MOTION ON"}
        </span>
      </button>
    </>
  );
}
