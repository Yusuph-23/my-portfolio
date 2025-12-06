import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '../atoms/ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/contact', label: 'Contact' }
  ]
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-magenta' : 'text-offwhite/80 hover:text-offwhite'}`

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-white/10 bg-navy/40">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-offwhite font-heading text-lg">
          <span className="bg-brand-gradient bg-clip-text text-transparent font-semibold">MM</span> Portfolio
        </Link>

        <div className="hidden sm:flex items-center gap-2 sm:gap-6">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end as any} className={linkClass}>
              {({ isActive }) => (
                <span className="inline-block">
                  {l.label}
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-magenta/80"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  />
                </span>
              )}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-offwhite hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span
              initial={false}
              animate={{ rotate: open ? 45 : 0, y: open ? 2 : 0 }}
              className="block h-0.5 w-5 bg-offwhite"
            />
            <motion.span
              initial={false}
              animate={{ opacity: open ? 0 : 1 }}
              className="block h-0.5 w-5 bg-offwhite my-1"
            />
            <motion.span
              initial={false}
              animate={{ rotate: open ? -45 : 0, y: open ? -2 : 0 }}
              className="block h-0.5 w-5 bg-offwhite"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="sm:hidden border-b border-white/10 bg-navy/70 backdrop-blur"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end as any}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-base ${isActive ? 'bg-white/10 text-magenta' : 'text-offwhite/90 hover:bg-white/5 hover:text-offwhite'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
