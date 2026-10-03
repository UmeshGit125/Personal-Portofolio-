import type { CSSProperties, MouseEvent } from 'react'

// Renders **white highlight** and __purple highlight__ markup from data.ts
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**')) return <span key={i} className="hl">{part.slice(2, -2)}</span>
        if (part.startsWith('__')) return <span key={i} className="hl-purple">{part.slice(2, -2)}</span>
        return part
      })}
    </>
  )
}

export function SectionHead({ num, label }: { num: string; label: string }) {
  return (
    <div className="section-head">
      <span className="section-label num">{num} //</span>
      <span className="section-label">{label}</span>
    </div>
  )
}

export function Heading({ lines, className = '' }: { lines: string[]; className?: string }) {
  const [first, second] = lines
  return (
    <h2 className={`display-heading h2 ${className}`}>
      {first}
      <br />
      <em>{second}</em>
    </h2>
  )
}

// Stagger for scroll-reveal: pass the item's index to offset its entrance
export function delay(i: number): CSSProperties {
  return { '--d': `${i * 0.08}s` } as CSSProperties
}

// Mouse handlers for `.spotlight` cards: a glow follows the pointer and the
// card tilts slightly toward it. Skipped on touch screens.
export function spotlight(maxTilt = 2) {
  return {
    onMouseMove(e: MouseEvent<HTMLElement>) {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      el.style.setProperty('--mx', `${x * 100}%`)
      el.style.setProperty('--my', `${y * 100}%`)
      if (maxTilt && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * maxTilt}deg) rotateY(${(x - 0.5) * maxTilt}deg)`
      }
    },
    onMouseLeave(e: MouseEvent<HTMLElement>) {
      e.currentTarget.style.transform = ''
    },
  }
}

export function externalProps(href: string) {
  return href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}
}
