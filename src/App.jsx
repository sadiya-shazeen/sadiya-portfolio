import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, Linkedin, ArrowUp, ArrowDown, Menu, X, Send, ChevronDown, Code2, Layout, Server, Database, Wrench } from 'lucide-react'
import { site, skills, projects, experience, education } from './config.js'
gsap.registerPlugin(ScrollTrigger)

const NAV = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact']
const icons = [Code2, Layout, Server, Database, Wrench]
const ease = [0.22, 1, 0.36, 1]

function Reveal({ children, delay = 0, y = 32, as = 'div', ...p }) {
  const M = motion[as]
  return <M initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease }} {...p}>{children}</M>
}
function Words({ text, className }) {
  return <span className={className} aria-label={text}>{text.split(' ').map((w, i) => (
    <span key={i} className="wmask" aria-hidden><motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5 + i * 0.07, ease }}>{w}&nbsp;</motion.span></span>))}</span>
}
function Magnetic({ children, className = '', ...p }) {
  const ref = useRef(null); const reduce = useReducedMotion()
  const move = e => { if (reduce) return; const r = ref.current.getBoundingClientRect()
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.3 }) }
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' })
  return <a ref={ref} onMouseMove={move} onMouseLeave={leave} className={`btn ${className}`} {...p}>{children}</a>
}
const go = id => e => { e.preventDefault(); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }) }

function Nav({ active }) {
  const [solid, setSolid] = useState(false); const [open, setOpen] = useState(false)
  useEffect(() => { const f = () => setSolid(scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return <header className={`nav ${solid ? 'solid' : ''}`}><nav aria-label="Primary">
    <a href="#home" className="logo" onClick={go('home')}>Sadiya<span>.</span></a>
    <ul className={open ? 'open' : ''}>{NAV.map(n => <li key={n}><a href={`#${n.toLowerCase()}`} aria-current={active === n.toLowerCase() ? 'true' : undefined}
      onClick={e => { go(n)(e); setOpen(false) }}>{n}{active === n.toLowerCase() && <motion.i layoutId="pill" className="pill" />}</a></li>)}</ul>
    <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></nav></header>
}
function Social({ className = '' }) {
  return <div className={`social ${className}`}>
    <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
    <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a></div>
}
function Hero() {
  return <section id="home" className="hero" data-parallax-root>
    <div className="orb o1" data-speed="-60" /><div className="orb o2" data-speed="80" /><div className="orb o3" data-speed="-30" />
    <div className="wrap hero-grid"><div>
      <Reveal delay={0.3} className="eyebrow">Hello, I'm {site.name}</Reveal>
      <h1><Words text="Turning Ideas Into Intelligent Digital Experiences." /></h1>
      <Reveal delay={1.2} as="p" className="lead">I'm a Computer Science student passionate about building meaningful software solutions through full-stack development and artificial intelligence.</Reveal>
      <Reveal delay={1.4} className="cta"><Magnetic href="#projects" className="primary" onClick={go('projects')}>Explore My Work</Magnetic><Magnetic href="#contact" onClick={go('contact')}>Let's Connect</Magnetic></Reveal>
      <Reveal delay={1.6}><Social /></Reveal></div>
      <motion.div className="art" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.6, ease }} aria-hidden>
        <div className="card c1"><b>{'</>'}</b><small>Java · Spring Boot</small></div>
        <div className="card c2"><b>AI</b><small>Gemini · RAG</small></div>
        <div className="card c3"><b>{'{ }'}</b><small>React.js</small></div><div className="ring" /></motion.div></div>
    <a href="#about" className="scroll" onClick={go('about')} aria-label="Scroll down"><ArrowDown size={18} /></a></section>
}
function About() {
  return <section id="about" className="sec"><div className="wrap about">
    <Reveal><p className="eyebrow">About</p><h2>Code with intent. Design with care.</h2></Reveal>
    <div className="cols"><Reveal delay={0.1}><p>I'm a Computer Science and Engineering student at the Institute of Aeronautical Engineering, expected to graduate in 2028. I began with a diploma at KN Polytechnic for Women, then moved into B.Tech to go deeper into software engineering.</p>
      <p>My focus is Java full-stack development with Spring Boot and React.js, and applying AI to practical problems like placement preparation, recruitment and secure enterprise assistants.</p></Reveal>
      <Reveal delay={0.25} className="facts"><div><b>8.15</b><span>B.Tech CGPA</span></div><div><b>9.87</b><span>Diploma CGPA</span></div><div><b>2028</b><span>Expected graduation</span></div></Reveal></div></div></section>
}
function Skills() {
  return <section id="skills" className="sec tint"><div className="wrap"><Reveal><p className="eyebrow">Skills</p><h2>The toolkit</h2></Reveal>
    <div className="grid">{Object.entries(skills).map(([k, v], i) => { const I = icons[i]; return <Reveal key={k} delay={i * 0.08} className="skill"><I size={22} /><h3>{k}</h3>
      <div className="chips">{v.map(s => <span key={s}>{s}</span>)}</div></Reveal> })}</div></div></section>
}
function Project({ p, i }) {
  const [open, setOpen] = useState(false)
  return <Reveal className={`proj ${p.featured ? 'feat' : ''} ${i % 2 ? 'flip' : ''}`}>
    <div className="thumb" aria-hidden><span>{p.name.split(' ').map(w => w[0]).join('').slice(0, 3)}</span><div className="orb o2" /></div>
    <div className="info">{p.featured && <span className="badge">Featured</span>}<h3>{p.name}</h3><p>{p.desc}</p>
      <AnimatePresence initial={false}>{open && <motion.p key="m" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>{p.more}</motion.p>}</AnimatePresence>
      <div className="chips">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
      <div className="cta"><button className="btn primary" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide' : 'View'} Project <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none' }} /></button>
        {p.repo && <a className="btn" href={p.repo} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>}</div></div></Reveal>
}
const Projects = () => <section id="projects" className="sec"><div className="wrap"><Reveal><p className="eyebrow">Projects</p><h2>Featured work</h2></Reveal>{projects.map((p, i) => <Project key={p.name} p={p} i={i} />)}</div></section>
function Experience() {
  return <section id="experience" className="sec tint"><div className="wrap"><Reveal><p className="eyebrow">Experience & Education</p><h2>Where I've been</h2></Reveal>
    <div className="tl">{experience.map(e => <Reveal key={e.org} className="tli"><h3>{e.role} · {e.org}</h3><ul>{e.items.map(t => <li key={t}>{t}</li>)}</ul></Reveal>)}
      {education.map(e => <Reveal key={e.title} className="tli"><h3>{e.title}</h3><p>{e.org}</p><small>{e.meta}</small></Reveal>)}</div></div></section>
}
function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' }); const [err, setErr] = useState({}); const [st, setSt] = useState(null)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  async function submit(e) {
    e.preventDefault(); const x = {}
    if (f.name.trim().length < 2) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email.'
    if (f.subject.trim().length < 3) x.subject = 'Add a subject.'
    if (f.message.trim().length < 10) x.message = 'Message needs at least 10 characters.'
    setErr(x); setSt(null); if (Object.keys(x).length) return
    try {
      if (site.formEndpoint) {
        const r = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })
        if (!r.ok) throw new Error(); setSt({ ok: true, m: 'Message sent. Thank you!' }); setF({ name: '', email: '', subject: '', message: '' })
      } else if (site.email) {
        location.href = `mailto:${site.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(`${f.message}\n\n${f.name} (${f.email})`)}`
        setSt({ ok: true, m: 'Opening your email app to send this message.' })
      } else setSt({ ok: false, m: 'Form not connected yet. Set formEndpoint or email in src/config.js.' })
    } catch { setSt({ ok: false, m: 'Could not send. Please try again or use LinkedIn.' }) }
  }
  return <section id="contact" className="sec"><div className="wrap contact">
    <Reveal><p className="eyebrow">Contact</p><h2>Have an idea? Let's build something meaningful.</h2><Social /></Reveal>
    <Reveal delay={0.15}><form onSubmit={submit} noValidate>{[['name', 'Name', 'text'], ['email', 'Email', 'email'], ['subject', 'Subject', 'text']].map(([k, l, t]) =>
      <label key={k}>{l}<input type={t} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} />{err[k] && <em role="alert">{err[k]}</em>}</label>)}
      <label>Message<textarea rows="5" value={f.message} onChange={set('message')} aria-invalid={!!err.message} />{err.message && <em role="alert">{err.message}</em>}</label>
      <button className="btn primary" type="submit"><Send size={16} /> Send message</button>
      {st && <p className={`note ${st.ok ? 'ok' : 'bad'}`} role="status">{st.m}</p>}</form></Reveal></div></section>
}
export default function App() {
  const [active, setActive] = useState('home'); const reduce = useReducedMotion(); const [top, setTop] = useState(false)
  const { scrollYProgress } = useScroll(); const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  useEffect(() => {
    let lenis, raf
    if (!reduce) { lenis = new Lenis({ lerp: 0.1 }); lenis.on('scroll', ScrollTrigger.update); const loop = t => { lenis.raf(t); raf = requestAnimationFrame(loop) }; raf = requestAnimationFrame(loop)
      gsap.utils.toArray('[data-speed]').forEach(el => gsap.to(el, { y: +el.dataset.speed, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })) }
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(n => { const el = document.getElementById(n.toLowerCase()); el && io.observe(el) })
    const f = () => setTop(scrollY > 600); addEventListener('scroll', f, { passive: true })
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); ScrollTrigger.getAll().forEach(t => t.kill()); io.disconnect(); removeEventListener('scroll', f) }
  }, [reduce])
  return <><motion.div className="progress" style={{ scaleX: sx }} /><Nav active={active} />
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}><Hero /><About /><Skills /><Projects /><Experience /><Contact /></motion.main>
    <footer><div className="wrap foot"><span>© {new Date().getFullYear()} {site.name}</span><Social /></div></footer>
    <AnimatePresence>{top && <motion.button className="totop" aria-label="Back to top" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileHover={{ y: -4 }} onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}><ArrowUp size={18} /></motion.button>}</AnimatePresence></>
}
