import { useEffect, useRef, useState, type FormEvent } from 'react'
import { links, profile } from '../data'

type Message = { role: 'user' | 'assistant'; content: string }

const firstName = profile.nameLines[0]

const SUGGESTIONS = [
  `What has ${firstName} built?`,
  'What is the tech stack?',
  'Tell me about Souli',
  `Is ${firstName} open to roles?`,
]

const GREETING: Message = {
  role: 'assistant',
  content: `Hi! I'm ${firstName}'s AI assistant. Ask me about ${firstName}'s projects, skills, experience or availability.`,
}

// Minimal formatting for model replies: **bold** and "- " bullet lines
function bold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  )
}

function Formatted({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const bullet = line.match(/^\s*[-*•]\s+(.*)/)
        if (bullet) return <span key={i} className="chat-bullet">{bold(bullet[1])}</span>
        if (!line.trim()) return <span key={i} className="chat-gap" />
        return <span key={i} className="chat-line">{bold(line)}</span>
      })}
    </>
  )
}

// Other components can open the chat with: window.dispatchEvent(new Event('open-chat'))
export const openChat = () => window.dispatchEvent(new Event('open-chat'))

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener('open-chat', onOpen)
    return () => window.removeEventListener('open-chat', onOpen)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  async function ask(question: string) {
    const text = question.trim()
    if (!text || busy) return
    setInput('')
    setBusy(true)

    // History sent to the API excludes the canned greeting
    const history = [...messages.slice(1), { role: 'user' as const, content: text }]
    setMessages([...messages, { role: 'user', content: text }, { role: 'assistant', content: '' }])

    const setReply = (content: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (!res.ok || !res.body) {
        const { error } = await res.json().catch(() => ({ error: '' }))
        throw new Error(error || 'Something went wrong.')
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let reply = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        setReply(reply)
      }
      if (!reply) setReply("Sorry, I couldn't come up with an answer. Try rephrasing?")
    } catch (err) {
      setReply(`⚠ ${(err as Error).message} You can also reach ${firstName} at ${links.email}.`)
    } finally {
      setBusy(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  const showSuggestions = messages.length === 1

  return (
    <>
      <button
        className={`chat-launcher${open ? ' chat-launcher--hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={`Ask ${firstName}'s AI assistant`}
      >
        <span className="chat-launcher-dot" />
        Ask my AI
      </button>

      <div className={`chat-panel${open ? ' chat-panel--open' : ''}`} role="dialog" aria-label="Chat with AI assistant" aria-hidden={!open}>
        <div className="chat-panel-bar">
          <i style={{ background: '#ff5f57' }} />
          <i style={{ background: '#febc2e' }} />
          <i style={{ background: '#28c840' }} />
          <span>umesh-llm · ask me anything about {firstName}</span>
          <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
            ✕
          </button>
        </div>

        <div className="chat-messages" ref={listRef} aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg chat-msg--${m.role}`}>
              {m.role === 'assistant' && <span className="chat-model">● umesh-llm</span>}
              <p>
                {m.role === 'assistant' ? <Formatted text={m.content} /> : m.content}
                {busy && i === messages.length - 1 && m.role === 'assistant' && (
                  m.content ? <span className="cursor">▍</span> : (
                    <span className="chat-thinking chat-thinking--inline">
                      <i />
                      <i />
                      <i />
                    </span>
                  )
                )}
              </p>
            </div>
          ))}
          {showSuggestions && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="chat-input" onSubmit={onSubmit}>
          <span className="chat-prompt">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${firstName}…`}
            maxLength={500}
            disabled={busy}
            tabIndex={open ? 0 : -1}
          />
          <button type="submit" disabled={busy || !input.trim()} tabIndex={open ? 0 : -1}>
            Send
          </button>
        </form>
        <p className="chat-disclaimer">AI-generated answers — verify important details with {firstName}.</p>
      </div>
    </>
  )
}
