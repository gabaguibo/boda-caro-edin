import { SITE } from './config'
import { media } from './data/media'
import Gallery from './components/Gallery'

export default function Home() {
  return (
    <main>
      <section className="hero" style={{ backgroundImage: `url(${SITE.heroImage})` }}>
        <div className="heroShade" />
        <div className="heroFrame" />
        <div className="heroContent">
          <p className="eyebrow">Boda</p>
          <h1>{SITE.couple}</h1>
          <p className="date">{SITE.date}</p>
          <div className="heroActions">
            <a href="#slideshow" className="button buttonLight">Ver slideshow</a>
            <a href={SITE.downloadAllUrl} className="button buttonGhost" target="_blank" rel="noreferrer">
              Descargar todo
            </a>
          </div>
        </div>
      </section>

      <nav className="topbar">
        <a className="brand" href="#top" aria-label="Inicio">
          <span>{SITE.couple}</span>
          <small>{SITE.date}</small>
        </a>
        <div className="navlinks">
          <a href="#ayuntamiento">Ayuntamiento</a>
          <a href="#banquete">Banquete</a>
          <a href="#slideshow">Slideshow</a>
          <a href={SITE.downloadAllUrl} target="_blank" rel="noreferrer">Descargar todo</a>
        </div>
      </nav>

      <Gallery media={media} downloadAllUrl={SITE.downloadAllUrl} />
    </main>
  )
}
