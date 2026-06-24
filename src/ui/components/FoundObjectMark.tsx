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
        <polyline points="5,13 10,18 19,7" />
      </svg>
    </div>
  );
}
