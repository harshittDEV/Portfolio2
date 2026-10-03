import { useReveal } from '../../hooks/useAnimations';
import { journeyStages } from '../../data/journey';

function JourneyStage({ stage }) {
  const [ref, isVisible] = useReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`journey__stage reveal ${isVisible ? 'visible' : ''}`}
    >
      <div className="journey__stage-number">Stage {stage.stage}</div>
      <h3 className="journey__stage-title">{stage.title}</h3>
      <p className="journey__stage-description">{stage.description}</p>

      {stage.projects && (
        <div className="journey__stage-tags">
          {stage.projects.map((p) => (
            <span className="journey__stage-tag" key={p}>
              {p}
            </span>
          ))}
        </div>
      )}

      {stage.technologies && (
        <div className="journey__stage-tags">
          {stage.technologies.map((t) => (
            <span className="journey__stage-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Journey() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="section" id="journey" aria-label="Journey">
      <div className="container container--narrow" ref={ref}>
        <p className={`section__label reveal ${isVisible ? 'visible' : ''}`}>
          Growth
        </p>
        <h2 className={`section__title reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          The Journey
        </h2>

        <div className="journey__stages" style={{ marginTop: 'var(--space-3xl)' }}>
          {journeyStages.map((stage) => (
            <JourneyStage key={stage.stage} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
