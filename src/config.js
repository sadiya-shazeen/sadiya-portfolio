// EDIT THIS FILE to update the whole site. Leave a value empty/null to hide it.
export const site = {
  name: 'Sadiya Shazeen',
  role: 'Software Developer | Java Full Stack Developer | AI Enthusiast',
  linkedin: 'https://linkedin.com/in/sadiya-shazeen',
  github: 'https://github.com/sadiya-shazeen',
  email: '',          // <- your email: enables the mailto fallback in the contact form
  formEndpoint: '',   // <- optional Formspree URL, e.g. https://formspree.io/f/xxxxxxx
}
export const skills = {
  'Programming Languages': ['Java', 'C', 'Python'],
  'Frontend Development': ['HTML', 'CSS', 'JavaScript', 'React.js'],
  'Backend Development': ['Spring Boot', 'REST APIs'],
  Databases: ['MySQL', 'DBMS'],
  'Tools & Technologies': ['Git', 'GitHub'],
}
// repo: add a verified GitHub URL to show a GitHub button.
export const projects = [
  { name: 'AI-Powered Placement Companion', featured: true, repo: null,
    desc: 'Full-stack placement preparation platform.',
    more: 'Coding practice, aptitude preparation, resume analysis, AI mock interviews, performance tracking and placement readiness analytics.',
    stack: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'Gemini API'] },
  { name: 'SENTINEL', repo: null,
    desc: 'Secure Agentic AI for Confidential Industrial Work: an Engineering Design Project.',
    more: 'Built with open-weight LLMs served through Ollama, retrieval-augmented generation (RAG) and Tesseract OCR, on a FastAPI backend with a React + Vite frontend.',
    stack: ['React.js', 'Vite', 'Python', 'FastAPI', 'Ollama', 'RAG', 'Tesseract OCR', 'SQLite', 'Docker'] },
]
export const experience = [
  { org: 'BlackRoth', role: 'Intern', // TODO: add exact role title and dates once verified
    items: ['HireSense AI: AI-powered resume screening and recruitment analytics platform.',
      'Stack: React.js, Spring Boot (Web, Data JPA, Security), JWT + BCrypt auth, MySQL, Google Gemini API, Recharts for analytics.'] },
]
export const education = [
  { title: 'B.Tech, Computer Science and Engineering', org: 'Institute of Aeronautical Engineering', meta: 'Expected 2028 · CGPA 8.15' },
  { title: 'Diploma', org: 'KN Polytechnic for Women', meta: 'CGPA 9.87' },
]
