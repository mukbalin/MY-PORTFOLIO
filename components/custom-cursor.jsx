"use client";
import { useEffect, useRef } from "react";
export default function CustomCursor() {
  const root = useRef(null),
    dot = useRef(null),
    ring = useRef(null);
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)"),
      reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      visible = false;
    const target = { x: 0, y: 0 },
      position = { x: 0, y: 0 };
    function hide() {
      visible = false;
      cancelAnimationFrame(frame);
      frame = 0;
      document.documentElement.classList.remove("has-custom-cursor");
      root.current?.removeAttribute("data-visible");
    }
    function draw() {
      if (!visible) return;
      const lag = reduced.matches ? 1 : 0.24;
      position.x += (target.x - position.x) * lag;
      position.y += (target.y - position.y) * lag;
      ring.current.style.transform = `translate3d(${position.x}px,${position.y}px,0)`;
      if (
        Math.abs(target.x - position.x) + Math.abs(target.y - position.y) >
        0.15
      )
        frame = requestAnimationFrame(draw);
      else frame = 0;
    }
    function move(event) {
      if (!fine.matches || event.pointerType === "touch") {
        hide();
        return;
      }
      const native =
        event.target instanceof Element &&
        event.target.closest(
          'input,textarea,select,[contenteditable="true"],dialog',
        );
      if (native) {
        hide();
        return;
      }
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible) {
        position.x = target.x;
        position.y = target.y;
        visible = true;
        root.current.setAttribute("data-visible", "");
        document.documentElement.classList.add("has-custom-cursor");
      }
      dot.current.style.transform = `translate3d(${target.x}px,${target.y}px,0)`;
      root.current.toggleAttribute(
        "data-hover",
        Boolean(
          event.target instanceof Element &&
          event.target.closest('a,button,summary,[role="button"],[role="tab"]'),
        ),
      );
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function press() {
      root.current?.setAttribute("data-pressed", "");
    }
    function release() {
      root.current?.removeAttribute("data-pressed");
    }
    function key(event) {
      if (event.key === "Tab") hide();
    }
    function visibility() {
      if (document.hidden) hide();
    }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
    };
  }, []);
  return (
    <div ref={root} className="custom-cursor" aria-hidden="true">
      <div ref={dot} className="cursor-dot-position">
        <span />
      </div>
      <div ref={ring} className="cursor-ring-position">
        <span />
      </div>
    </div>
  );
}
