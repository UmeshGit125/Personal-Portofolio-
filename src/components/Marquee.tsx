import type { CSSProperties } from 'react'
import { stack } from '../data'

function Item({ name, icon }: { name: string; icon: string }) {
  return (
    <span className="marquee-item">
      {icon ? (
        <i
          className="marquee-icon"
          style={{ '--icon': `url(https://cdn.simpleicons.org/${icon})` } as CSSProperties}
        />
      ) : (
        <i className="marquee-dot" />
      )}
      {name}
    </span>
  )
}

// Infinite scrolling strip: the list is rendered twice and shifted by half its width
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Tech stack">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group" aria-hidden={copy === 1}>
            {stack.map((s) => (
              <Item key={s.name} {...s} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
