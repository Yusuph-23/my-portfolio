import { useEffect, useRef } from 'react'
import Hero from '../components/organisms/Hero'

export default function Home() {
  const strandsRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)

  // Animated strands effect
  useEffect(() => {
    const container = strandsRef.current
    if (!container) return
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    Object.assign(canvas.style, {
      position: 'absolute',
      inset: '0px',
      width: '100%',
      height: '100%',
      opacity: '0.3',
      pointerEvents: 'none',
      mixBlendMode: 'screen'
    } as CSSStyleDeclaration)
    
    container.appendChild(canvas)

    const strands = [] as Array<{
      points: Array<{ x: number; y: number }>
      color: string
      width: number
      speed: number
      amplitude: number
      frequency: number
      phase: number
    }>

    const colors = [
      'rgba(100, 255, 218, 0.4)',  // Cyan
      'rgba(255, 99, 132, 0.3)',  // Pink
      'rgba(59, 130, 246, 0.3)',  // Blue
      'rgba(234, 179, 8, 0.25)',  // Yellow
      'rgba(139, 92, 246, 0.3)',  // Purple
      'rgba(255, 159, 64, 0.25)', // Orange
    ]

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = container.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      strands.length = 0
      const strandCount = 12
      
      for (let i = 0; i < strandCount; i++) {
        const startX = Math.random() * rect.width
        const startY = Math.random() * rect.height
        const points = []
        const segmentCount = 15 + Math.floor(Math.random() * 10)
        
        for (let j = 0; j < segmentCount; j++) {
          points.push({
            x: startX + (j * 80),
            y: startY
          })
        }
        
        strands.push({
          points,
          color: colors[Math.floor(Math.random() * colors.length)],
          width: 0.5 + Math.random() * 2,
          speed: 0.2 + Math.random() * 0.4,
          amplitude: 30 + Math.random() * 70,
          frequency: 0.02 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2
        })
      }
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    function animateStrands() {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      
      for (const strand of strands) {
        ctx.beginPath()
        ctx.strokeStyle = strand.color
        ctx.lineWidth = strand.width
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        // Update and draw strand points
        for (let i = 0; i < strand.points.length; i++) {
          const point = strand.points[i]
          
          // Animate with wave motion
          point.y += Math.sin(Date.now() * 0.001 * strand.frequency + strand.phase + i * 0.3) * 0.3
          point.x += strand.speed
          
          // Wrap around screen
          if (point.x > width + 100) {
            point.x = -100
            point.y = Math.random() * height
          }
          
          // Add wave offset
          const waveY = point.y + Math.sin(point.x * strand.frequency + Date.now() * 0.001 + strand.phase) * strand.amplitude
          
          if (i === 0) {
            ctx.moveTo(point.x, waveY)
          } else {
            ctx.lineTo(point.x, waveY)
          }
        }
        
        ctx.stroke()
        
        // Add glow effect
        ctx.strokeStyle = strand.color.replace('0.4', '0.1').replace('0.3', '0.1').replace('0.25', '0.08')
        ctx.lineWidth = strand.width * 8
        ctx.stroke()
      }
      
      requestAnimationFrame(animateStrands)
    }
    
    animateStrands()

    return () => {
      window.removeEventListener('resize', onResize)
      canvas.remove()
    }
  }, [])

  // Floating particles effect (enhanced)
  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    
    const particles = [] as Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number
      pulseSpeed: number
    }>
    
    const colors = [
      'rgba(100, 255, 218, 0.2)',
      'rgba(255, 99, 132, 0.15)',
      'rgba(59, 130, 246, 0.15)',
      'rgba(234, 179, 8, 0.12)',
      'rgba(139, 92, 246, 0.15)',
      'rgba(255, 159, 64, 0.12)',
    ]

    function createParticles() {
      const count = 25
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.08,
          speedY: (Math.random() - 0.5) * 0.08,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.3 + Math.random() * 0.7,
          pulseSpeed: 0.002 + Math.random() * 0.003
        })
      }
    }

    function animateParticles() {
      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Pulsing effect
        particle.opacity = 0.3 + Math.sin(Date.now() * particle.pulseSpeed) * 0.4
        
        // Wrap around screen
        if (particle.x < -5) particle.x = 105
        if (particle.x > 105) particle.x = -5
        if (particle.y < -5) particle.y = 105
        if (particle.y > 105) particle.y = -5
      })
      
      updateParticlesDisplay()
      requestAnimationFrame(animateParticles)
    }

    function updateParticlesDisplay() {
      container.innerHTML = ''
      particles.forEach(particle => {
        const element = document.createElement('div')
        Object.assign(element.style, {
          position: 'absolute',
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          borderRadius: '50%',
          backgroundColor: particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`),
          filter: 'blur(0.5px)',
          pointerEvents: 'none',
          transition: 'opacity 0.1s ease'
        } as CSSStyleDeclaration)
        container.appendChild(element)
      })
    }

    createParticles()
    animateParticles()

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <div
      className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#1a1f36]"
    >
      {/* Animated Colorful Strands */}
      <div ref={strandsRef} className="pointer-events-none absolute inset-0" />
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="pointer-events-none absolute inset-0" />
      
      {/* Geometric Network Patterns */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: [
            'radial-gradient(circle at 20% 30%, rgba(100,255,218,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(255,99,132,0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(59,130,246,0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 20%, rgba(234,179,8,0.06) 0%, transparent 50%)',
            'radial-gradient(circle at 90% 40%, rgba(139,92,246,0.08) 0%, transparent 50%)'
          ].join(', '),
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover'
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: 'center center'
        }}
      />

      <div className="relative z-10 h-full w-full">
        <Hero />
      </div>
    </div>
  )
}