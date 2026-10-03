import type { CSSProperties } from 'react'
import { links, projects, type FlowKind } from '../data'
import { Heading, SectionHead, delay, externalProps, spotlight } from './Rich'

const STEP_SECONDS = 0.7

const legend: { kind: FlowKind; label: string }[] = [
  { kind: 'io', label: 'input / output' },
  { kind: 'ai', label: 'AI model' },
  { kind: 'logic', label: 'logic' },
  { kind: 'data', label: 'data store' },
]

// Pipeline diagram: steps light up one after another, like data flowing through
function Flow({ steps }: { steps: { label: string; kind: FlowKind }[] }) {
  const cycle = `${steps.length * STEP_SECONDS + 1.4}s`
  return (
    <div className="flow" style={{ '--cycle': cycle } as CSSProperties}>
      <div className="flow-nodes">
        {steps.map((s, i) => (
          <div key={s.label} className="flow-step">
            <span
              className={`flow-node flow-node--${s.kind}`}
              style={{ animationDelay: `${i * STEP_SECONDS}s` }}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span className="flow-arrow" style={{ animationDelay: `${i * STEP_SECONDS + 0.35}s` }}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="flow-legend">
        {legend
          .filter((l) => steps.some((s) => s.kind === l.kind))
          .map((l) => (
            <span key={l.kind} className={`flow-legend--${l.kind}`}>
              {l.label}
            </span>
          ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const githubHandle = links.github.replace(/^https?:\/\/(www\.)?/, '')

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="reveal">
          <SectionHead num="03" label="Projects" />
        </div>
        <div className="split-head reveal" style={delay(1)}>
          <Heading lines={projects.heading} />
          <a href={links.github} target="_blank" rel="noreferrer" className="text-link">
            {githubHandle} →
          </a>
        </div>

        <div className="project-list">
          {projects.items.map((p) => (
            <article key={p.title} className="project reveal spotlight" {...spotlight(1.5)}>
              {p.accent && <div className="accent-bar" />}
              <div>
                <div className="project-meta">
                  <span className="tag tag--accent">{p.category}</span>
                  {p.year && <span>{p.year}</span>}
                </div>
                <h3>{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} {...externalProps(p.link)} className="muted-link">
                    → View on GitHub
                  </a>
                )}
              </div>
              <div>
                <div className="subhead">{p.image ? 'Preview' : 'How it works'}</div>
                {p.image ? (
                  <img className="project-image" src={p.image} alt={`${p.title} screenshot`} loading="lazy" />
                ) : (
                  <Flow steps={p.flow} />
                )}
                <div className="subhead">Key highlights</div>
                <ul className="bullets">
                  {p.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
