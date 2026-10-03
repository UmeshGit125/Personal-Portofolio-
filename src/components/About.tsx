import { useEffect, useRef, useState } from 'react'
import { about, profile } from '../data'
import { Heading, Rich, SectionHead, delay } from './Rich'

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div className="skill">
      <div className="skill-head">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: animate ? `${level}%` : 0 }} />
      </div>
    </div>
  )
}

export default function About() {
  const barsRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    if (barsRef.current) observer.observe(barsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="reveal">
          <SectionHead num="01" label="About & Skills" />
        </div>
        <div className="two-col">
          <div>
            <div className="reveal" style={delay(1)}>
              <Heading lines={about.heading} />
            </div>
            <div className="prose reveal" style={{ marginTop: '1.5rem', ...delay(2) }}>
              {about.paragraphs.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>

            <div className="fact-grid">
              {about.facts.map((f, i) => (
                <div key={f.label} className="fact reveal" style={delay(i)}>
                  <div className="fact-label">{f.label}</div>
                  <div className="fact-value">{f.value}</div>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ marginBottom: '1.5rem' }}>
              <div className="subhead">Core Skills</div>
              <div className="tags">
                {about.coreSkills.map((s) => (
                  <span key={s} className="tag tag--accent">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal">
              <div className="subhead subhead--purple">{about.secondaryTitle}</div>
              <div className="tags">
                {about.secondarySkills.map((s) => (
                  <span key={s} className="tag tag--purple">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div ref={barsRef}>
            <figure className="photo reveal" style={delay(1)}>
              <div className="photo-brackets">
                <div className="photo-frame">
                  <img src={about.photo} alt={`Portrait of ${profile.fullName}`} />
                  <span className="photo-tint" />
                </div>
              </div>
              <figcaption>{about.photoCaption}</figcaption>
            </figure>
            {about.skillGroups.map((g, i) => (
              <div key={g.category} className="skill-group reveal" style={delay(i)}>
                <div className="subhead">{g.category}</div>
                {g.skills.map((s) => (
                  <SkillBar key={s.name} {...s} animate={visible} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
