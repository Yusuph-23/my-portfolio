import { Outlet } from 'react-router-dom'
import Navbar from '../molecules/Navbar'
import Footer from '../organisms/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-dvh flex flex-col bg-navy">
      <Navbar />
      <main className="flex-1 pt-14">{/* offset for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
