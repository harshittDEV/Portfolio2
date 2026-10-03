import { useReveal } from '../../hooks/useAnimations';

export default function Hackathon() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="hackathon section" aria-label="Hackathon Achievement">
      <div className="container container--narrow" ref={ref}>
        <div className={`hackathon__content reveal ${isVisible ? 'visible' : ''}`}>
          <div className="hackathon__icon" aria-hidden="true">
            🏆
          </div>
          <div className="hackathon__info">
            <h3 className="hackathon__title">Hackathon</h3>
            <div className="hackathon__place">3rd Place</div>
            <p className="hackathon__org">
              Dayananda Sagar College of Engineering
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
