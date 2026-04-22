import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const progress = document.getElementById('scroll-progress');
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };
    const loop = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    };
    const onOver = e => { if (e.target.closest('a,button,[data-hover]')) document.body.classList.add('cursor-hover'); };
    const onOut  = e => { if (e.target.closest('a,button,[data-hover]')) document.body.classList.remove('cursor-hover'); };
    const onScroll = () => {
      if (!progress) return;
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      progress.style.width = p + '%';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    window.addEventListener('scroll', onScroll);
    const rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <div id="scroll-progress" />
    </>
  );
}
