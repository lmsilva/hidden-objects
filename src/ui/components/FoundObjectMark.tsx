interface FoundObjectMarkProps {
  x: number;
  y: number;
  size: number;
}

export function FoundObjectMark({ x, y, size }: FoundObjectMarkProps) {
  return (
    <div
      className="found-object-mark"
      style={{ left: x, top: y, width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
      </svg>
    </div>
  );
}
