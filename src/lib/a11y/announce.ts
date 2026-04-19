let announcer: HTMLElement | null = null;

function getAnnouncer(): HTMLElement {
  if (announcer) return announcer;
  announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.setAttribute('role', 'status');
  Object.assign(announcer.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  });
  document.body.appendChild(announcer);
  return announcer;
}

export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
) {
  const el = getAnnouncer();
  el.setAttribute('aria-live', priority);
  el.textContent = '';
  requestAnimationFrame(() => {
    el.textContent = message;
  });
}
