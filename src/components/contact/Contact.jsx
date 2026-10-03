import { useReveal } from '../../hooks/useAnimations';
import { socials } from '../../data/social';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../common/Icons';

export default function Contact() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="contact section" id="contact" aria-label="Contact">
      <div className="container container--narrow" ref={ref}>
        <p className={`section__label reveal ${isVisible ? 'visible' : ''}`}>
          Connect
        </p>
        <h2 className={`section__title reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          Let&apos;s Build Something
        </h2>
        <p className={`section__subtitle reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          Interested in building something useful or working together?
        </p>

        <div className={`contact__actions reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__btn contact__btn--primary"
            id="contact-github-btn"
          >
            <GitHubIcon size={16} />
            GitHub
          </a>
          <a
            href={socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__btn contact__btn--secondary"
            id="contact-linkedin-btn"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
          <a
            href={socials.email.url}
            className="contact__btn contact__btn--secondary"
            id="contact-email-btn"
          >
            <MailIcon size={16} />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
