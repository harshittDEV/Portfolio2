import { useState, useCallback } from 'react';
import { navLinks } from '../../data/social';
import { useActiveSection, useScrollTo, useIsMobile } from '../../hooks/useAnimations';

const sectionIds = navLinks.map((l) => l.id);

export default function Navigation() {
  const activeSection = useActiveSection(sectionIds);
  const scrollTo = useScrollTo();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = useCallback(
    (id) => {
      scrollTo(id);
      setMenuOpen(false);
    },
    [scrollTo]
  );

  if (isMobile) {
    return (
      <>
        <button
          className={`nav__toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          id="nav-toggle"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`nav__mobile ${menuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              className={`nav__mobile-link ${
                activeSection === link.id ? 'active' : ''
              }`}
              onClick={() => handleClick(link.id)}
              aria-current={activeSection === link.id ? 'true' : undefined}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </>
    );
  }

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      {navLinks.map((link) => (
        <button
          key={link.id}
          className={`nav__link ${activeSection === link.id ? 'active' : ''}`}
          onClick={() => handleClick(link.id)}
          aria-current={activeSection === link.id ? 'true' : undefined}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
}
