import { education } from '../data'
import { Heading, SectionHead, delay, spotlight } from './Rich'

export default function Education() {
  return (
    <section id="experience" className="section section--alt">
      <div className="container">
        <div className="reveal">
          <SectionHead num="02" label={education.sectionLabel} />
        </div>
        <div className="edu-grid">
          <div>
            <div className="reveal" style={delay(1)}>
              <Heading lines={education.heading} />
              <p className="edu-intro">{education.intro}</p>
            </div>
            {education.list.length > 0 && (
              <div className="reveal" style={delay(2)}>
                <div className="subhead">{education.listTitle}</div>
                <ul className="coursework">
                  {education.list.map((c, i) => (
                    <li key={c}>
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="timeline">
            {education.timeline.map((item, i) => (
              <div key={item.title} className="timeline-item reveal" style={delay(i)}>
                <div className="timeline-title">
                  <h3>{item.title}</h3>
                  <span>@ {item.org}</span>
                </div>
                <div className="timeline-meta">
                  <span>{item.period}</span>
                  {item.location && <span>{item.location}</span>}
                  {item.badge && <span className="tag tag--accent">{item.badge}</span>}
                </div>
                {item.details.length > 0 && (
                  <ul className="bullets">
                    {item.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {item.tags.length > 0 && (
                  <div className="tags">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {education.certifications.length > 0 && (
              <>
                <div className="subhead subhead--purple">Certifications</div>
                <div className="certs">
                  {education.certifications.map((c, i) => (
                    <div
                      key={c.title}
                      className={`cert reveal spotlight${c.accent ? ' cert--accent' : ''}`}
                      style={delay(i)}
                      {...spotlight(4)}
                    >
                      {c.accent && <div className="accent-bar" />}
                      <div className="cert-head">
                        <h4>{c.title}</h4>
                        {c.year && <span>{c.year}</span>}
                      </div>
                      <div className="cert-issuer">{c.issuer}</div>
                      {c.desc && <p>{c.desc}</p>}
                      <div className="tags">
                        {c.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
