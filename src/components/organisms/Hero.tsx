import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

function FloatingTorus() {
  return (
    <mesh rotation={[0.5, 0.5, 0]} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#e11d8d" metalness={0.6} roughness={0.35} />
    </mesh>
  )
}

export default function Hero() {
  return (
    <section className="relative isolate pt-12 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={1.1} />
          <Suspense fallback={null}>
            <FloatingTorus />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl font-heading font-extrabold tracking-tight text-white"
        >
          Yusuph Digital Creator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="mt-4 max-w-3xl mx-auto text-white text-[28px]"
        >
          Video editing, Graphics Design, Motion Graphics Design, Content Creation, IT Consultancy
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.15 }}
          className="mt-6 max-w-none text-white/90 text-lg leading-relaxed text-justify"
        >
          I believe great design is more than aesthetics; it's about solving problems and forging connections. As a Graphics Designer, Motion Artist, and Content Creator, I craft visuals that resonate. And as an IT Consultant, I ensure those visuals are delivered on a robust and effective platform. Think of me as your creative partner in building a brand that people not only see but feel and remember.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="mt-8 flex items-center gap-4"
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(100, 255, 218, 0.25)' }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary transition-transform"
          >
            View Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 8px 24px rgba(225, 29, 141, 0.25)' }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary transition-transform"
          >
            Contact Me
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
