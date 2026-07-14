export default function MagBtn({ href, onClick, accent, children, target }) {
  const Tag = href ? 'a' : 'button';
  const props = href
    ? { href, target, rel: target === '_blank' ? 'noopener noreferrer' : undefined }
    : { onClick };

  return (
    <Tag
      {...props}
      className={`mag-btn${accent ? ' mag-btn--accent' : ''}`}
    >
      <span className="mag-btn__inner">
        <span className="mag-btn__text">{children}</span>
        <span className="mag-btn__text mag-btn__text--clone" aria-hidden="true">{children}</span>
      </span>
    </Tag>
  );
}
