'use client'

import { useEffect, useMemo, useState } from 'react'

const SECTION_LABELS = {
  ayuntamiento: 'Ceremonia en el Ayuntamiento',
  banquete: 'Banquete',
  videos: 'Vídeos',
}

export default function Gallery({ media, downloadAllUrl }) {
  const [currentIndex, setCurrentIndex] = useState(null)

  const slideshowItems = useMemo(() => media, [media])
  const currentItem = currentIndex === null ? null : slideshowItems[currentIndex]

  function openSlideshow(index) {
    setCurrentIndex(index)
    document.documentElement.classList.add('noScroll')
  }

  function closeSlideshow() {
    setCurrentIndex(null)
    document.documentElement.classList.remove('noScroll')
  }

  function goNext() {
    setCurrentIndex((value) => (value + 1) % slideshowItems.length)
  }

  function goPrev() {
    setCurrentIndex((value) => (value - 1 + slideshowItems.length) % slideshowItems.length)
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (currentIndex === null) return
      if (event.key === 'Escape') closeSlideshow()
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentIndex])

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash === '#slideshow' && slideshowItems.length > 0) {
        openSlideshow(0)
        history.replaceState(null, '', window.location.pathname)
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [slideshowItems.length])

  const ayuntamiento = media.filter((item) => item.section === 'ayuntamiento')
  const banquete = media.filter((item) => item.section === 'banquete')
  const videos = media.filter((item) => item.section === 'videos')

  return (
    <>
      <section className="intro">
        <p>
          Galería privada de la boda. Puedes ver las fotografías en pantalla,
          abrir el slideshow o descargar el archivo completo.
        </p>
        <a href={downloadAllUrl} className="button buttonDark" target="_blank" rel="noreferrer">
          Descargar todas las fotos y vídeos
        </a>
      </section>

      <MediaSection id="ayuntamiento" title={SECTION_LABELS.ayuntamiento} items={ayuntamiento} allItems={media} onOpen={openSlideshow} />
      <MediaSection id="banquete" title={SECTION_LABELS.banquete} items={banquete} allItems={media} onOpen={openSlideshow} />
      {videos.length > 0 && <MediaSection id="videos" title={SECTION_LABELS.videos} items={videos} allItems={media} onOpen={openSlideshow} />}

      {currentItem && (
        <div className="slideshow" role="dialog" aria-modal="true" aria-label="Slideshow">
          <button className="slideClose" onClick={closeSlideshow} aria-label="Cerrar">×</button>
          <button className="slideArrow slidePrev" onClick={goPrev} aria-label="Anterior">‹</button>

          <div className="slideStage">
            {currentItem.type === 'video' ? (
              <video src={currentItem.src} controls autoPlay className="slideMedia" />
            ) : (
              <img src={currentItem.src} alt={currentItem.alt} className="slideMedia" />
            )}

            <div className="slideCaption">
              <span>{currentIndex + 1} / {slideshowItems.length}</span>
              <span>{SECTION_LABELS[currentItem.section]}</span>
              <a href={currentItem.src} download className="slideDownload">Descargar</a>
            </div>
          </div>

          <button className="slideArrow slideNext" onClick={goNext} aria-label="Siguiente">›</button>
        </div>
      )}
    </>
  )
}

function MediaSection({ id, title, items, allItems, onOpen }) {
  if (items.length === 0) return null

  return (
    <section className="gallerySection" id={id}>
      <div className="sectionHeader">
        <h2>{title}</h2>
        <p>{items.length} archivos</p>
      </div>

      <div className="masonry">
        {items.map((item) => {
          const globalIndex = allItems.findIndex((entry) => entry.id === item.id)

          return (
            <figure className="card" key={item.id}>
              <button className="mediaButton" onClick={() => onOpen(globalIndex)} aria-label={`Abrir ${item.alt}`}>
                {item.type === 'video' ? (
                  <video src={item.src} muted playsInline preload="metadata" className="thumb" />
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" className="thumb" />
                )}
                {item.type === 'video' && <span className="playBadge">Play</span>}
              </button>
              <figcaption>
                <button onClick={() => onOpen(globalIndex)}>Ver</button>
                <a href={item.src} download>Descargar</a>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
