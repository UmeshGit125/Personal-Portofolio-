import { useState, type FormEvent } from 'react'
import { blog, contact, links, profile } from '../data'
import { Heading, SectionHead, delay, externalProps } from './Rich'

const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

const channels = [
  { label: 'GitHub', handle: strip(links.github), href: links.github },
  { label: 'LinkedIn', handle: strip(links.linkedin), href: links.linkedin },
  { label: 'Email', handle: links.email, href: `mailto:${links.email}` },
  { label: 'Phone', handle: links.phone, href: `tel:${links.phone.replace(/\s/g, '')}` },
].filter((c) => c.handle)

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm({ ...form, [key]: e.target.value })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    // No form backend configured: hand the message to the visitor's mail app
    if (!contact.formEndpoint) {
      const body = `${form.message}\n\n— ${form.name} (${form.email})`
      window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="reveal">
          <SectionHead num={blog.show ? '05' : '04'} label="Contact" />
        </div>
        <div className="two-col">
          <div className="reveal" style={delay(1)}>
            <Heading lines={contact.heading} />
            <p className="contact-intro">{contact.intro}</p>
            <div className="contact-links">
              {channels.map((c) => (
                <a key={c.label} href={c.href} {...externalProps(c.href)} className="contact-link">
                  <span className="label">{c.label}</span>
                  <span className="handle">{c.handle}</span>
                  <span className="arrow">↗</span>
                </a>
              ))}
            </div>
            {profile.openToWork && (
              <div className="availability">
                <div className="status">Open to opportunities</div>
                <p>{contact.availability}</p>
              </div>
            )}
          </div>

          <div className="reveal" style={delay(3)}>
            {status === 'sent' ? (
              <div className="form-success">
                <div className="check">✓</div>
                <h3>{contact.formEndpoint ? 'Message received' : 'Almost there'}</h3>
                <p>
                  {contact.formEndpoint
                    ? "Thanks for reaching out! I'll get back to you within 24 hours."
                    : 'Your email app should have opened with the message ready to send.'}
                </p>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="name">Name</label>
                    <input id="name" required value={form.name} onChange={update('name')} placeholder="Your name" />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    required
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="Internship, project, or just saying hello"
                  />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell me about the opportunity or project..."
                  />
                </div>
                {status === 'error' && (
                  <p className="form-error">Something went wrong. Please email me directly at {links.email}.</p>
                )}
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
