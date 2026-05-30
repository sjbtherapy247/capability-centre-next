'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClasses =
  'mt-2 w-full rounded-md border border-divider bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25 transition-colors'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')
    const data = new FormData(e.currentTarget)
    const payload = Object.fromEntries(data.entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Something went wrong.')
      }
      setStatus('success')
      e.currentTarget.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input id="name" name="name" required autoComplete="name" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <input id="subject" name="subject" className={inputClasses} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea id="message" name="message" rows={6} required className={inputClasses} />
      </div>
      {/* honeypot */}
      <input
        type="text"
        name="company_hp"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-7 py-3 transition-colors"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'success' && (
        <p className="text-sm text-teal-dark">
          Thanks — message received. We&apos;ll be in touch shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errorMessage || 'Sorry, something went wrong. Please email us directly.'}
        </p>
      )}
    </form>
  )
}
