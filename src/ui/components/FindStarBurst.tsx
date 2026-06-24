import type { CSSProperties } from 'react';

const RAYS = 8;

export function FindStarBurst() {
  return (
    <div className="find-star-burst" aria-hidden>
      <div className="find-star-core" />
      {Array.from({ length: RAYS }, (_, i) => (
        <span key={i} className="find-star-ray" style={{ '--ray': i } as CSSProperties} />
      ))}
      {Array.from({ length: RAYS }, (_, i) => (
        <span
          key={`spark-${i}`}
          className="find-star-spark"
          style={{ '--ray': i } as CSSProperties}
        />
      ))}
    </div>
  );
}
