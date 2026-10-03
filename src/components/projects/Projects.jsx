import { useState, useCallback } from 'react';
import { useReveal } from '../../hooks/useAnimations';
import { projects } from '../../data/projects';
import { GitHubIcon, ExternalLinkIcon, CloseIcon } from '../common/Icons';

function ProjectCard({ project, index, onOpen }) {
  const [ref, isVisible] = useReveal({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`project-card reveal ${isVisible ? 'visible' : ''}`}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      aria-label={`View details for ${project.name}`}
      id={`project-${project.id}`}
    >
      <div className="project-card__info">
        <div className="project-card__index">
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__tagline">{project.tagline}</p>
        <div className="project-card__tech">
          {project.technologies.map((tech) => (
            <span className="project-card__tech-item" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="project-card__actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__btn"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.name} on GitHub`}
            >
              <GitHubIcon size={12} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__btn"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.name} demo`}
            >
              <ExternalLinkIcon size={12} /> Demo
            </a>
          )}
        </div>
      </div>

      <div className="project-card__visual">
        <div
          className="project-card__visual-inner"
          style={{
            background: `linear-gradient(135deg, ${project.color}12, ${project.color}25)`,
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="project-card__image"
              loading="lazy"
            />
          ) : (
            <span style={{ color: `${project.color}30`, fontSize: '4rem', fontWeight: 800 }}>
              {project.name.charAt(0)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className={`project-modal-overlay ${project ? 'open' : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
    >
      <div
        className="project-modal"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button
          className="project-modal__close"
          onClick={onClose}
          aria-label="Close modal"
          id="project-modal-close"
        >
          <CloseIcon size={16} />
        </button>

        {project.image && (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="project-modal__image"
          />
        )}

        <h2 className="project-modal__name">{project.name}</h2>
        <p className="project-modal__tagline">{project.tagline}</p>

        <div className="project-modal__section">
          <div className="project-modal__section-title">Problem</div>
          <p className="project-modal__section-text">{project.problem}</p>
        </div>

        <div className="project-modal__section">
          <div className="project-modal__section-title">Approach</div>
          <p className="project-modal__section-text">{project.approach}</p>
        </div>

        <div className="project-modal__section">
          <div className="project-modal__section-title">Result</div>
          <p className="project-modal__section-text">{project.result}</p>
        </div>

        <div className="project-modal__section">
          <div className="project-modal__section-title">Technology</div>
          <div className="project-modal__tech">
            {project.technologies.map((tech) => (
              <span className="project-modal__tech-item" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-modal__actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <GitHubIcon size={16} />
              View on GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              <ExternalLinkIcon size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, isVisible] = useReveal();

  const handleOpen = useCallback((project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section className="section" id="work" aria-label="Projects">
      <div className="container" ref={ref}>
        <p className={`section__label reveal ${isVisible ? 'visible' : ''}`}>
          Work
        </p>
        <h2 className={`section__title reveal reveal-delay-1 ${isVisible ? 'visible' : ''}`}>
          Projects
        </h2>
        <p className={`section__subtitle reveal reveal-delay-2 ${isVisible ? 'visible' : ''}`}>
          Each project represents a problem I wanted to solve and the engineering decisions made along the way.
        </p>

        <div className="projects__list" style={{ marginTop: 'var(--space-3xl)' }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={handleClose} />
    </section>
  );
}
