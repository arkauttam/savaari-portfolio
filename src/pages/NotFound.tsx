import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/NotFound.module.css'

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#░▒▓'

function useGlitch(text: string, active: boolean) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | null>(null)
  const iterRef = useRef(0)

  useEffect(() => {
    if (!active) { 
      setDisplay(text)
      return 
    }
    
    iterRef.current = 0
    const total = text.length * 3

    const animate = () => {
      iterRef.current++
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterRef.current / 3) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )
      if (iterRef.current < total) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }
    
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [active, text])

  return display
}

function GlitchText({ text, className, tag: Tag = 'span' }: { 
  text: string
  className?: string
  tag?: keyof JSX.IntrinsicElements
}) {
  const [hover, setHover] = useState(false)
  const display = useGlitch(text, hover)
  
  return (
    <Tag
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {display}
    </Tag>
  )
}

function TerminalLine({ children, delay = 0, prompt = true }: { 
  children: React.ReactNode
  delay?: number
  prompt?: boolean 
}) {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  
  return (
    <div className={`${styles.termLine} ${visible ? styles.termLineVisible : ''}`}>
      {prompt && <span className={styles.prompt}>{'>'}</span>}
      <span>{children}</span>
    </div>
  )
}

function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    resize()
    window.addEventListener('resize', resize)

    // Floating particles - using theme colors
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.3 + 0.05,
    }))

    const draw = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid lines - lighter for light mode
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)'
      ctx.lineWidth = 1
      const gridSize = 40
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => { 
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.bgCanvas} />
}

function StatusBar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  
  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(t)
  }, [])
  
  return (
    <div className={styles.statusBar}>
      <span className={styles.statusDot} />
      <span>OS TECH LABS v2.4</span>
      <span className={styles.statusSep}>|</span>
      <span>{time}</span>
      <span className={styles.statusSep}>|</span>
      <span>ERR_CODE: 0x404</span>
    </div>
  )
}

export default function NotFound() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoDashboard = () => {
    const authUser = localStorage.getItem('authUser')
    if (authUser) {
      const user = JSON.parse(authUser)
      if (user.role === 'admin') {
        navigate('/admin-portal')
      } else {
        navigate('/client-portal')
      }
    } else {
      navigate('/')
    }
  }

  return (
    <div className={`${styles.root} ${mounted ? styles.rootMounted : ''}`}>
      <GridCanvas />

      {/* Top status bar */}
      <StatusBar />

      {/* Logo */}
      <header className={styles.header}>
        <img src="/logo.png" alt="OS tech labs" className={styles.logoImg} />
        <span className={styles.logoDot} />
        <GlitchText text="OS TECH LABS" className={styles.logo} />
      </header>

      {/* Main content */}
      <main className={styles.main}>
        {/* Big 404 */}
        <div className={styles.errorBlock}>
          <div className={styles.fourOhFour} aria-label="404">
            <span className={styles.digit} style={{ '--d': 0 } as React.CSSProperties}>4</span>
            <span className={styles.digitZero} style={{ '--d': 1 } as React.CSSProperties}>
              <span className={styles.digitZeroInner}>0</span>
              <div className={styles.scanLine} />
            </span>
            <span className={styles.digit} style={{ '--d': 2 } as React.CSSProperties}>4</span>
          </div>
          <div className={styles.errorLabel}>PAGE_NOT_FOUND</div>
        </div>

        {/* Terminal block with logo */}
        <div className={styles.terminal}>
          <div className={styles.termHeader}>
            <span className={styles.termDot} style={{ background: '#ef4444' }} />
            <span className={styles.termDot} style={{ background: '#f59e0b' }} />
            <span className={styles.termDot} style={{ background: '#10b981' }} />
            <div className={styles.termLogo}>
              <img src="/logo.png" alt="OS tech labs" className={styles.termLogoImg} />
              <span className={styles.termTitle}>os-tech-labs — portal — 80×24</span>
            </div>
          </div>
          <div className={styles.termBody}>
            <TerminalLine delay={300}>$ locate requested_resource</TerminalLine>
            <TerminalLine delay={800} prompt={false}>
              <span className={styles.termError}>❌ ERROR: Resource not found in filesystem</span>
            </TerminalLine>
            <TerminalLine delay={1300}>$ run diagnostics --verbose</TerminalLine>
            <TerminalLine delay={1900} prompt={false}>
              <span className={styles.termWarn}>⚠️ Route unmapped · Possible causes:</span>
            </TerminalLine>
            <TerminalLine delay={2200} prompt={false}>
              {'  '}· URL was mistyped or modified
            </TerminalLine>
            <TerminalLine delay={2450} prompt={false}>
              {'  '}· Page has been relocated or removed
            </TerminalLine>
            <TerminalLine delay={2700} prompt={false}>
              {'  '}· Link is outdated or broken
            </TerminalLine>
            <TerminalLine delay={3200}>$ suggest --action</TerminalLine>
            <TerminalLine delay={3600} prompt={false}>
              <span className={styles.termSuccess}>✓ Return to dashboard</span>
            </TerminalLine>
            <TerminalLine delay={3900} prompt={false}>
              <span className={styles.termSuccess}>✓ Navigate back to safety</span>
            </TerminalLine>
            <TerminalLine delay={4200} prompt={false}>
              <span className={styles.termSuccess}>✓ Contact support if issue persists</span>
            </TerminalLine>
            <TerminalLine delay={4500} prompt={false}>
              <span className={styles.termCursor}>█</span>
            </TerminalLine>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={styles.actions}>
          <button onClick={handleGoHome} className={styles.btnPrimary}>
            <span className={styles.btnIcon}>⌂</span>
            <span>Return Home</span>
          </button>
          <button onClick={handleGoDashboard} className={styles.btnSecondary}>
            <span className={styles.btnIcon}>◆</span>
            <span>Go to Dashboard</span>
          </button>
          <button onClick={handleGoBack} className={styles.btnGhost}>
            <span className={styles.btnIcon}>←</span>
            <span>Go Back</span>
          </button>
        </div>
      </main>

      {/* Bottom decoration */}
      <footer className={styles.footer}>
        <span>© 2024 OS tech labs Infotech</span>
        <div className={styles.footerLine} />
        <span>All systems operational · except this page</span>
        <div className={styles.footerLine} />
        <span>Error Code: 0x404 | Page Not Found</span>
      </footer>
    </div>
  )
}