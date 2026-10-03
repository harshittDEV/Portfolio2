import { useReveal } from '../../hooks/useAnimations';
import { ExternalLinkIcon } from '../common/Icons';

const dsaTags = ['Java', 'Data Structures', 'Algorithms', 'LeetCode'];

export default function DSA() {
  const [ref, isVisible] = useReveal();

  return (
    <section className="section" aria-label="Problem Solving">
      <div className="container container--narrow" ref={ref}>
        <p className={`section__label reveal ${isVisible ? 'visible' : ''}`}>
          Practice
        </p>
        <h2 className={`section__title reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          I Like Solving Problems
        </h2>

        <div className={`dsa__content reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          <div className="dsa__text">
            <p className="dsa__description">
              Beyond building products, I enjoy solving algorithmic problems.
              It sharpens my thinking about efficiency, edge cases, and clean logic.
            </p>

            <div className="dsa__tags">
              {dsaTags.map((tag) => (
                <span className="dsa__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="https://leetcode.com/u/aHu59DzfYF/"
              target="_blank"
              rel="noopener noreferrer"
              className="dsa__link"
              id="leetcode-link"
            >
              LeetCode Profile
              <ExternalLinkIcon size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
