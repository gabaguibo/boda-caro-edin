'use client'

import { useEffect, useMemo, useState } from 'react'
import { SITE } from '../config'

export default function Gallery({ media, featuredSlides }) {
  const photos = useMemo(() => media.filter((item) => item.type === 'photo'), [media])
  const slides = featuredSlides?.length ? featuredSlides : photos.slice(0, 3).map((item) => ({
    id: item.id,
    images: [item.src],
  }))

  const [slideIndex, setSlideIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const currentSlide = slides[slideIndex]
  const currentPhoto = lightboxIndex === null ? null : photos[lightboxIndex]

  function nextSlide() {
    setSlideIndex((value) => (value + 1) % slides.length)
  }

  function prevSlide() {
    setSlideIndex((value) => (value - 1 + slides.length) % slides.length)
  }

  function openLightbox(index) {
    setLightboxIndex(index)
    document.documentElement.classList.add('noScroll')
  }

  function closeLightbox() {
    setLightboxIndex(null)
    document.documentElement.classList.remove('noScroll')
  }

  function nextPhoto() {
    setLightboxIndex((value) => (value + 1) % photos.length)
  }

  function prevPhoto() {
    setLightboxIndex((value) => (value - 1 + photos.length) % photos.length)
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (lightboxIndex === null) return

      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') nextPhoto()
      if (event.key === 'ArrowLeft') prevPhoto()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex, photos.length])

  return (
    <>
      <section className="featuredSection" id="fotografias" aria-label="Fotografías destacadas">
        <div className="featuredShell">
          <button className="featuredArrow featuredPrev" onClick={prevSlide} aria-label="Slide anterior">‹</button>

          <div
            className="featuredGrid"
            data-count={currentSlide.images.length}
            style={{ gridTemplateColumns: `repeat(${Math.min(currentSlide.images.length, 3)}, minmax(0, 1fr))` }}
          >
            {currentSlide.images.slice(0, 3).map((src, index) => (
              <div className="featuredImageWrap" key={`${currentSlide.id}-${src}`}>
                <img src={src} alt={`Fotografía destacada ${slideIndex + 1}.${index + 1}`} />
              </div>
            ))}
          </div>

          <button className="featuredArrow featuredNext" onClick={nextSlide} aria-label="Slide siguiente">›</button>

          <div className="featuredCounter">
            {slideIndex + 1} / {slides.length}
          </div>
        </div>
      </section>

      <section className="thumbsSection" id="miniaturas" aria-label="Miniaturas">
        <div className="masonry">
          {photos.map((item, index) => (
            <figure className="card" key={item.id}>
              <button className="mediaButton" onClick={() => openLightbox(index)} aria-label={`Abrir ${item.alt}`}>
                <img src={item.src} alt={item.alt} loading="lazy" className="thumb" />
              </button>
              <figcaption>
                <button onClick={() => openLightbox(index)}>Ver</button>
                <a href={item.src} download>Descargar</a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="videosSection" id="videos" aria-label="Vídeos">
        <div className="videosList">
          {SITE.videos.map((video) => (
            <article className="videoCard" key={video.id}>
              <div className="videoPlaceholder">
                <span>{video.title}</span>
              </div>
              <p>{video.description}</p>
            </article>
          ))}
        </div>
      </section>

      {currentPhoto && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Fotografía ampliada">
          <button className="lightboxClose" onClick={closeLightbox} aria-label="Cerrar">×</button>
          <button className="lightboxArrow lightboxPrev" onClick={prevPhoto} aria-label="Anterior">‹</button>

          <div className="lightboxStage">
            <img src={currentPhoto.src} alt={currentPhoto.alt} className="lightboxMedia" />

            <div className="lightboxCaption">
              <span>{lightboxIndex + 1} / {photos.length}</span>
              <a href={currentPhoto.src} download>Descargar foto</a>
            </div>
          </div>

          <button className="lightboxArrow lightboxNext" onClick={nextPhoto} aria-label="Siguiente">›</button>
        </div>
      )}
    </>
  )
}
