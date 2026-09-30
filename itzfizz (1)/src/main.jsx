import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '98%', label: 'of people remember a story when motion gives it a pulse.' },
  { value: '4.6×', label: 'more attention for ideas that know when to move.' },
  { value: '10s', label: 'of scroll-mapped cinema, controlled entirely by you.' },
]

const chapters = [
  { number: '01', title: 'Signal', text: 'Find the sharpest version of the idea, then give it room to breathe.' },
  { number: '02', title: 'Kinetic', text: 'Turn the message into a gesture people can feel before they can explain it.' },
  { number: '03', title: 'Impact', text: 'Leave a mark that stays bright after the screen goes quiet.' },
]

function App() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const fillRef = useRef(null)
  const percentRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    const video = videoRef.current
    const fill = fillRef.current
    const percent = percentRef.current
    const status = statusRef.current
    let targetProgress = 0
    let renderedProgress = 0
    let complete = false
    let rafId
    let lastTime = performance.now()
    const easeProgress = gsap.parseEase('power2.out')
    const handleResize = () => ScrollTrigger.refresh()

    const setVideoFrame = () => {
      if (video.readyState >= 1 && Number.isFinite(video.duration)) {
        const nextTime = video.duration * renderedProgress
        if (Math.abs(video.currentTime - nextTime) > 0.03) video.currentTime = nextTime
      }
    }

    const ctx = gsap.context(() => {
      gsap.set('[data-intro]', { autoAlpha: 0, y: 20 })
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .to('[data-intro="eyebrow"]', { autoAlpha: 1, y: 0, duration: 0.7 })
        .to('[data-intro="headline"]', { autoAlpha: 1, y: 0, duration: 0.95 }, '-=0.35')
        .to('[data-intro="copy"]', { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.55')
        .to('[data-stat]', { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.65 }, '-=0.4')
        .to('[data-intro="hint"]', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.25')

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetProgress = self.progress
        },
      })

      const render = (now) => {
        const delta = Math.min(now - lastTime, 64)
        lastTime = now
        const smoothing = 1 - Math.exp(-delta * 0.014)
        renderedProgress += (targetProgress - renderedProgress) * smoothing
        if (Math.abs(targetProgress - renderedProgress) < 0.00025) renderedProgress = targetProgress

        const eased = easeProgress(renderedProgress)
        const scale = 1.02 + eased * 0.06
        const lift = eased * -2.5
        stage.style.setProperty('--visual-scale', scale.toFixed(4))
        stage.style.setProperty('--visual-lift', `${lift.toFixed(3)}%`)
        stage.style.setProperty('--scrub-progress', renderedProgress.toFixed(4))
        fill.style.transform = `scaleX(${renderedProgress})`
        percent.textContent = `${Math.round(renderedProgress * 100).toString().padStart(2, '0')}%`
        setVideoFrame()

        if (!complete && renderedProgress >= 0.985) {
          complete = true
          root.dataset.complete = 'true'
          status.textContent = 'Sequence complete. The impact system is unlocked.'
          gsap.fromTo('.completion-badge', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' })
        }

        rafId = requestAnimationFrame(render)
      }

      video.addEventListener('loadedmetadata', setVideoFrame)
      window.addEventListener('resize', handleResize, { passive: true })
      rafId = requestAnimationFrame(render)

      return () => {
        cancelAnimationFrame(rafId)
        video.removeEventListener('loadedmetadata', setVideoFrame)
        window.removeEventListener('resize', handleResize)
        trigger.kill()
      }
    }, root)

    return () => ctx.revert()
  }, [])

  const finishSequence = () => {
    const end = trackRef.current.offsetTop + trackRef.current.offsetHeight - window.innerHeight
    window.scrollTo({ top: end, behavior: 'smooth' })
  }

  return (
    <div ref={rootRef} className="site-shell" data-complete="false">
      <header className="site-header" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="ITZ FIZZ home">
          <span className="wordmark-mark" aria-hidden="true">F</span>
          <span>ITZ FIZZ</span>
        </a>
        <div className="header-note">
          <span className="status-dot" aria-hidden="true" />
          <span>Ideas in motion</span>
        </div>
        <a className="header-link" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a>
      </header>

      <main id="top">
        <section ref={trackRef} className="hero-track" aria-labelledby="hero-title">
          <div ref={stageRef} className="hero-stage">
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-content-wrap">
              <div className="hero-copy">
                <p className="eyebrow" data-intro="eyebrow"><span>01 / 03</span> Scroll-controlled impact</p>
                <h1 id="hero-title" className="hero-title" data-intro="headline">
                  <span className="hero-line">W E L C O M E</span>
                  <span className="hero-line"><em>I T Z</em></span>
                  <span className="hero-line">F I Z Z</span>
                </h1>
                <div className="hero-metrics" data-intro="copy" aria-label="Impact metrics">
                  {metrics.map((metric) => (
                    <div className="hero-metric" data-stat="hero" key={metric.value}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
                <p className="hero-copy-text" data-intro="copy">
                  A little voltage for the ideas that refuse to sit still. Scroll through the signal, then stay for the afterglow.
                </p>
                <div className="hero-cta-row" data-intro="hint">
                  <button className="outline-button" type="button" onClick={finishSequence}>
                    Skip to the finish <span aria-hidden="true">↓</span>
                  </button>
                  <span className="micro-label">Use your scroll / <span>10 sec mapped</span></span>
                </div>
              </div>

              <div className="visual-column">
                <div className="visual-topline">
                  <span>FIZZ / MOTION STUDY 001</span>
                </div>
                <div className="video-frame">
                  <div className="video-frame-corner video-frame-corner--tl" aria-hidden="true" />
                  <div className="video-frame-corner video-frame-corner--br" aria-hidden="true" />
                  <video ref={videoRef} className="hero-video" muted playsInline preload="auto" aria-label="Scroll-controlled abstract motion study">
                    <source src="./assets/itz-fizz-scroll.mp4" type="video/mp4" />
                  </video>
                  <div className="video-overlay" aria-hidden="true"><span>MOVE<br />WITH IT</span><span>00—10</span></div>
                </div>
                <div className="visual-caption">
                  <span>Scroll-mapped cinema</span>
                  <span className="caption-line" aria-hidden="true" />
                  <span>Every frame answers back</span>
                </div>
              </div>
            </div>

            <div className="hero-footer">
              <div className="rail-label"><span className="rail-arrow" aria-hidden="true">↓</span><span>Scroll to fizz</span></div>
              <div className="progress-rail" role="progressbar" aria-label="Scroll sequence progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div ref={fillRef} className="progress-fill" />
              </div>
              <div className="progress-readout"><span ref={percentRef}>00%</span><span className="progress-total">100</span></div>
            </div>

            <div className="completion-badge" aria-live="polite">
              <span className="completion-icon" aria-hidden="true">✓</span>
              <span>Sequence unlocked</span>
            </div>
          </div>
        </section>

        <section className="chapter-section" aria-labelledby="chapters-title">
          <div className="section-inner">
            <div className="section-kicker"><span>02 / 02</span><span>From first spark to full signal</span></div>
            <div className="chapter-header">
              <h2 id="chapters-title">A process with<br /><em>momentum.</em></h2>
              <p>Less hand-off. More hand-built energy. We join the sharp thinking to the final frame so the idea never loses its charge.</p>
            </div>
            <div className="chapters-list">
              {chapters.map((chapter) => (
                <article className="chapter-row" key={chapter.number}>
                  <span className="chapter-number">{chapter.number}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.text}</p>
                  <span className="chapter-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="section-inner contact-inner">
            <p className="section-eyebrow">Ready when you are</p>
            <h2 id="contact-title">Bring the<br /><em>voltage.</em></h2>
            <a className="contact-button" href="mailto:hello@itzfizz.studio">hello@itzfizz.studio <span aria-hidden="true">↗</span></a>
            <div className="contact-footer"><span>ITZ FIZZ / 2026</span><span>Built for ideas in motion</span></div>
          </div>
        </section>
      </main>
      <p ref={statusRef} className="sr-only" aria-live="polite">Scroll sequence in progress.</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
