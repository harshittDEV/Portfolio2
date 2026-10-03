import { useReveal, useScrollTo } from '../../hooks/useAnimations';
import { socials } from '../../data/social';
import { GitHubIcon, LinkedInIcon, ArrowRightIcon } from '../common/Icons';

const stackItems = ['React Native', 'Java', 'Spring Boot', 'PostgreSQL'];

export default function Hero() {
  const scrollTo = useScrollTo();
  const [ref, isVisible] = useReveal({ threshold: 0.1 });

  return (
    <section className="hero section" id="home" aria-label="Introduction">
      <div className="container" ref={ref}>
        <div className="hero__content">
          <div className="hero__panel">
            <h1
              className={`hero__name reveal ${isVisible ? 'visible' : ''}`}
            >
              Harshit
              <br />
              <span>Singh</span>
            </h1>

            <div
              className={`hero__accent-line reveal reveal-delay-1 ${
                isVisible ? 'visible' : ''
              }`}
              aria-hidden="true"
            />

            <p
              className={`hero__title reveal reveal-delay-1 ${
                isVisible ? 'visible' : ''
              }`}
            >
              Full-Stack Mobile Developer
            </p>

            <p
              className={`hero__subtitle reveal reveal-delay-2 ${
                isVisible ? 'visible' : ''
              }`}
            >
              Building mobile experiences and backend systems.
            </p>

            <div
              className={`hero__stack reveal reveal-delay-2 ${
                isVisible ? 'visible' : ''
              }`}
            >
              {stackItems.map((item) => (
                <span className="hero__stack-item" key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div
              className={`hero__actions reveal reveal-delay-3 ${
                isVisible ? 'visible' : ''
              }`}
            >
              <button
                className="btn btn--primary"
                onClick={() => scrollTo('work')}
                id="explore-work-btn"
              >
                Explore Work
                <ArrowRightIcon size={16} />
              </button>

              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                id="hero-github-btn"
              >
                <GitHubIcon size={16} />
                GitHub
              </a>

              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                id="hero-linkedin-btn"
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
