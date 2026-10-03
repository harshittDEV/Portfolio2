import { useReveal } from '../../hooks/useAnimations';
import { buildingWith, exploring } from '../../data/techStack';

export default function Stack() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="section" id="stack" aria-label="Tech Stack">
      <div className="container" ref={ref}>
        <p className={`section__label reveal ${isVisible ? 'visible' : ''}`}>
          Building With
        </p>
        <h2 className={`section__title reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          Tech Stack
        </h2>

        <div className={`stack__grid reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          {Object.entries(buildingWith).map(([key, category]) => (
            <div className="stack__category" key={key}>
              <div className="stack__category-label">{category.label}</div>
              <div className="stack__category-items">
                {category.items.map((item) => (
                  <div className="stack__item" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`stack__exploring reveal reveal-delay-3 ${isVisible ? 'visible' : ''}`}>
          <div className="stack__exploring-label">{exploring.label}</div>
          <div className="stack__exploring-items">
            {exploring.items.map((item) => (
              <span className="stack__exploring-item" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
