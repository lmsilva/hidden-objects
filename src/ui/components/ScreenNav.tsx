import { Link } from 'react-router-dom';

export type ScreenNavLink = {
  to: string;
  label: string;
  primary?: boolean;
};

type ScreenNavProps = {
  ariaLabel: string;
  links: ScreenNavLink[];
  className?: string;
};

/** Left-column navigation used on map, station, settings, credits, and story screens. */
export function ScreenNav({ ariaLabel, links, className }: ScreenNavProps) {
  const navClass = ['map-nav-actions', className].filter(Boolean).join(' ');

  return (
    <nav className={navClass} aria-label={ariaLabel}>
      {links.map((link) => (
        <Link
          key={`${link.to}:${link.label}`}
          className={`map-nav-btn ${link.primary ? 'map-nav-btn-primary' : ''}`}
          to={link.to}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
