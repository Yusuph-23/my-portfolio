export default function Footer() {
  return (
    <footer className="border-t border-white/10 text-offwhite/60">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm">
        © {new Date().getFullYear()} • Multimedia Portfolio
      </div>
    </footer>
  )
}
