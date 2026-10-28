(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const workspace = document.querySelector('[data-workspace]');
  if (workspace) {
    const preview = workspace.querySelector('.mini-browser');
    const buttons = workspace.querySelectorAll('[data-preview]');
    buttons.forEach(button => button.addEventListener('click', () => {
      preview.dataset.device = button.dataset.preview;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    }));
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      workspace.style.setProperty('--rx', '0deg');
      workspace.style.setProperty('--ry', '0deg');
    };
    workspace.addEventListener('pointermove', event => {
      if (reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
      const box = workspace.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        workspace.style.setProperty('--rx', `${-y * 6}deg`);
        workspace.style.setProperty('--ry', `${x * 8}deg`);
      });
    });
    workspace.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
    finePointer.addEventListener('change', reset);
  }
  document.querySelectorAll('#services .grid > div').forEach(card => card.classList.add('service-interactive'));
  // Content stays visible without JavaScript or IntersectionObserver support.
  if ('IntersectionObserver' in window && !reduced.matches) {
    const targets = document.querySelectorAll('#about > div, .resume-section > div, #services .grid > div');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08 });
    targets.forEach(target => {
      target.classList.add('reveal-pending', 'reveal-ready');
      observer.observe(target);
    });
    reduced.addEventListener('change', () => {
      if (reduced.matches) {
        targets.forEach(target => target.classList.add('is-visible'));
        observer.disconnect();
      }
    });
  }
})();
