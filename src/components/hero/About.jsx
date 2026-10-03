import { useReveal } from '../../hooks/useAnimations';

export default function About() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="about section" aria-label="About">
      <div className="container container--narrow" ref={ref}>
        <p className={`section__label reveal ${isVisible ? 'visible' : ''}`}>
          About
        </p>

        <p className={`about__text reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          I&apos;m Harshit, a computer science student focused on building
          mobile products and reliable backend systems.
        </p>

        <p className={`about__detail reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          I enjoy taking an idea from <span>interface → API → database → working product.</span>
          {' '}Each project is an opportunity to understand how systems connect and how users interact with what I build.
        </p>
      </div>
    </section>
  );
}
