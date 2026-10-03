import { socials } from '../../data/social';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__content">
          <div className="footer__name">Harshit Singh</div>
          <div className="footer__role">Full-Stack Mobile Developer</div>
          <div className="footer__stack">
            React Native · Java · Spring Boot · PostgreSQL
          </div>

          <div className="footer__links">
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
          </div>

          <div className="footer__copyright">
            © {new Date().getFullYear()} Harshit Singh
          </div>
        </div>
      </div>
    </footer>
  );
}
