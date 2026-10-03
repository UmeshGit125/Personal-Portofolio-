import { useEffect, useState } from 'react'
import { links, profile } from '../data'
import { openChat } from './ChatWidget'
import { Rich } from './Rich'

const nodes = [
  { cx: 80, cy: 60, r: 5, accent: true },
  { cx: 220, cy: 40, r: 3, accent: false },
  { cx: 340, cy: 90, r: 4, accent: true },
  { cx: 160, cy: 150, r: 3, accent: false },
  { cx: 300, cy: 170, r: 5, accent: false },
  { cx: 60, cy: 200, r: 3, accent: false },
  { cx: 400, cy: 50, r: 3, accent: true },
  { cx: 450, cy: 150, r: 4, accent: false },
  { cx: 240, cy: 260, r: 3, accent: true },
  { cx: 130, cy: 280, r: 4, accent: false },
  { cx: 370, cy: 260, r: 3, accent: false },
  { cx: 490, cy: 230, r: 5, accent: true },
  { cx: 50, cy: 320, r: 3, accent: false },
  { cx: 200, cy: 340, r: 4, accent: false },
  { cx: 420, cy: 340, r: 3, accent: true },
]

const edges = [
  [0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [0, 5], [5, 9], [2, 6], [6, 7], [7, 11],
  [4, 7], [3, 8], [8, 9], [8, 10], [10, 11], [9, 12], [9, 13], [10, 14], [11, 14], [4, 10], [1, 6],
]

function NetworkGraph() {
  return (
    <svg viewBox="0 0 540 380" aria-hidden="true">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {edges.map(([a, b], i) => {
        const lit = nodes[a].accent || nodes[b].accent
        return (
          <line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            strokeWidth={lit ? 0.8 : 0.5}
            opacity={lit ? 0.5 : 0.3}
            strokeDasharray="1000"
            style={{
              stroke: lit ? 'var(--accent)' : 'var(--border)',
              animation: `draw-line ${1.5 + i * 0.15}s ease forwards`,
            }}
          />
        )
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          {n.accent && (
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r * 3}
              opacity={0.07}
              style={{ fill: 'var(--accent)', animation: `pulse-glow ${2 + i * 0.3}s ease-in-out infinite` }}
            />
          )}
          <circle
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            strokeWidth={0.5}
            filter={n.accent ? 'url(#glow)' : undefined}
            style={{
              fill: n.accent ? 'var(--accent)' : 'var(--node)',
              stroke: n.accent ? 'var(--accent)' : 'var(--node-stroke)',
              animation: `pulse-glow ${1.8 + i * 0.25}s ease-in-out infinite`,
            }}
          />
        </g>
      ))}
    </svg>
  )
}

type Phase = 'ask' | 'think' | 'answer' | 'hold'

// Types a question, shows a "thinking" pause, then streams the answer word by word
function ChatDemo({ chat }: { chat: { q: string; a: string }[] }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('ask')
  const [chars, setChars] = useState(0)
  const [words, setWords] = useState(0)

  const { q, a } = chat[index]
  const answerWords = a.split(' ')

  useEffect(() => {
    let t: number
    if (phase === 'ask') {
      t = chars < q.length
        ? window.setTimeout(() => setChars(chars + 1), 45)
        : window.setTimeout(() => setPhase('think'), 350)
    } else if (phase === 'think') {
      t = window.setTimeout(() => setPhase('answer'), 1100)
    } else if (phase === 'answer') {
      t = words < answerWords.length
        ? window.setTimeout(() => setWords(words + 1), 75)
        : window.setTimeout(() => setPhase('hold'), 0)
    } else {
      t = window.setTimeout(() => {
        setIndex((index + 1) % chat.length)
        setChars(0)
        setWords(0)
        setPhase('ask')
      }, 2800)
    }
    return () => clearTimeout(t)
  }, [phase, chars, words, index, q.length, answerWords.length, chat.length])

  return (
    <div className="chat" aria-live="off">
      <div className="chat-q">
        <span className="chat-prompt">❯</span> ask umesh <span className="chat-str">"{q.slice(0, chars)}{phase === 'ask' && <span className="cursor">▍</span>}"</span>
      </div>
      {phase === 'think' && (
        <div className="chat-thinking">
          <i />
          <i />
          <i />
          <span>thinking</span>
        </div>
      )}
      {(phase === 'answer' || phase === 'hold') && (
        <div className="chat-a">
          <span className="chat-model">● umesh-llm</span>
          <p>
            {answerWords.slice(0, words).join(' ')}
            <span className="cursor">▍</span>
          </p>
        </div>
      )}
    </div>
  )
}

// Counts the numeric part of a stat up from 0 ("100+" → 0…100 then "+").
// Non-numeric values like "IITM" are shown as-is.
function CountUp({ value, delayMs }: { value: string; delayMs: number }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? Number(match[1]) : 0
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target)
      return
    }
    let raf = 0
    const duration = 1400
    const timer = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1)
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delayMs)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [target, delayMs])

  if (!match) return <>{value}</>
  return (
    <>
      {n}
      {match[2]}
    </>
  )
}

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let t: number | undefined
    if (!deleting && text.length < word.length) {
      t = window.setTimeout(() => setText(word.slice(0, text.length + 1)), 80)
    } else if (!deleting) {
      t = window.setTimeout(() => setDeleting(true), 2200)
    } else if (text.length > 0) {
      t = window.setTimeout(() => setText(word.slice(0, text.length - 1)), 45)
    } else {
      setDeleting(false)
      setIndex((index + 1) % words.length)
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words])

  return text
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)
  const { terminal } = profile
  const lastLine = profile.nameLines.length - 1

  return (
    <section id="home" className="hero">
      <div className="glow glow--green" />
      <div className="glow glow--purple" />

      <div className="container">
        <div className="hero-top">
          <span className="section-label">Portfolio — {profile.year}</span>
          {profile.openToWork && <span className="status">Open to opportunities</span>}
        </div>

        <div className="hero-grid">
          <div className="hero-main">
            <h1 className="display-heading hero-name">
              {profile.nameLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i === lastLine && <em>.</em>}
                </span>
              ))}
            </h1>

            <div className="role-line">
              <span>~/role</span>
              <span>→</span>
              <span className="typed">
                {typed}
                <span className="cursor">_</span>
              </span>
            </div>

            {profile.heroIntro.map((p, i) => (
              <p key={i} className="hero-intro">
                <Rich text={p} />
              </p>
            ))}

            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary">
                View my projects →
              </a>
              <a href={links.resume} download className="btn btn-outline">
                Download resume ↓
              </a>
            </div>

            <div className="stats">
              {profile.stats.map((s, i) => (
                <div key={s.label} className="stat">
                  <div className="stat-value">
                    <CountUp value={s.value} delayMs={500 + i * 120} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-side">
            <div className="terminal">
              <div className="terminal-bar">
                <i style={{ background: '#ff5f57' }} />
                <i style={{ background: '#febc2e' }} />
                <i style={{ background: '#28c840' }} />
                <span>{terminal.prompt}</span>
              </div>
              <div className="terminal-graph">
                <NetworkGraph />
                <ChatDemo chat={terminal.chat} />
              </div>
              <dl className="terminal-facts">
                {terminal.facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}:</dt>
                    <dd>{f.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="tags terminal-tags">
                {terminal.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-socials">
              <button className="muted-link try-chat" onClick={openChat}>
                ● Try asking it yourself
              </button>
              <a href={links.github} target="_blank" rel="noreferrer" className="muted-link">
                GitHub ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="muted-link">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-hint">scroll</div>
    </section>
  )
}
