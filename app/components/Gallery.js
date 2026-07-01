'use client'

import { useEffect, useMemo, useState } from 'react'
import { SITE } from '../config'

function FeaturedCarousel({ slides, id, ariaLabel, counterPrefix }) {
  const [slideIndex, setSlideIndex] = useState(0)

  if (!slides?.length) return null

  const currentSlide = slides[slideIndex]

  function nextSlide() {
    setSlideIndex((value) => (value + 1) % slides.length)
  }

  function prevSlide() {
    setSlideIndex((value) => (value - 1 + slides.length) % slides.length)
  }

  return (
    <section className="featuredSection" id={id} aria-label={ariaLabel}>
      <div className="featuredShell">
        <button
          className="featuredArrow featuredPrev"
          onClick={prevSlide}
          aria-label="Slide anterior"
          type="button"
        >
          ‹
        </button>

        <div
          className={`featuredGrid ${currentSlide.layout ? `featuredGrid--${currentSlide.layout}` : ''}`}
          data-count={currentSlide.images.length}
        >
          {currentSlide.images.slice(0, 4).map((src, index) => (
            <div className="featuredImageWrap" key={`${currentSlide.id}-${src}-${index}`}>
              <img
                src={src}
                alt={`${ariaLabel} ${slideIndex + 1}.${index + 1}`}
              />
            </div>
          ))}
        </div>

        <button
          className="featuredArrow featuredNext"
          onClick={nextSlide}
          aria-label="Slide siguiente"
          type="button"
        >
          ›
        </button>

        <div className="featuredCounter">
          {counterPrefix ? `${counterPrefix} · ` : ''}
          {slideIndex + 1} / {slides.length}
        </div>
      </div>
    </section>
  )
}

export default function Gallery({ media, featuredSlides, bwFeaturedSlides }) {
  const photos = useMemo(
    () => media.filter((item) => item.type === 'photo'),
    [media]
  )

  const photosWithIndex = useMemo(
    () => photos.map((item, index) => ({ ...item, lightboxIndex: index })),
    [photos]
  )

  const ayuntamientoPhotos = useMemo(
    () => photosWithIndex.filter((item) => item.src.includes('/ayuntamiento/')),
    [photosWithIndex]
  )

  const banquetePhotos = useMemo(
    () => photosWithIndex.filter((item) => item.src.includes('/banquete/')),
    [photosWithIndex]
  )

  const mainSlides = useMemo(() => {
    if (featuredSlides?.length) return featuredSlides

    return photos.slice(0, 3).map((item) => ({
      id: item.id,
      images: [item.src],
    }))
  }, [featuredSlides, photos])

  const [lightboxIndex, setLightboxIndex] = useState(null)

  const currentPhoto = lightboxIndex === null ? null : photos[lightboxIndex]

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

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('noScroll')
    }
  }, [])

  return (
    <>
      <FeaturedCarousel
        slides={mainSlides}
        id="fotografias"
        ariaLabel="Fotografías destacadas"
      />

      {bwFeaturedSlides?.length > 0 && (
        <>
          <div className="bwTitle">Blanco y negro</div>

          <FeaturedCarousel
            slides={bwFeaturedSlides}
            id="blanco-negro"
            ariaLabel="Fotografías en blanco y negro"
            counterPrefix="B&N"
          />
        </>
      )}

      <section className="thumbsSection" id="miniaturas" aria-label="Miniaturas">
        <div className="thumbnailGroup">
          <h2>Ayuntamiento</h2>

          <div className="thumbnailGrid">
            {ayuntamientoPhotos.map((item) => (
              <figure className="thumbnailCard" key={item.id}>
                <button
                  className="mediaButton"
                  onClick={() => openLightbox(item.lightboxIndex)}
                  aria-label={`Abrir ${item.alt}`}
                  type="button"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="thumb"
                  />
                </button>

                <figcaption>
                  <button
                    onClick={() => openLightbox(item.lightboxIndex)}
                    type="button"
                  >
                    Ver
                  </button>
                  <a href={item.src} download>
                    Descargar
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="thumbnailGroup">
          <h2>Banquete</h2>

          <div className="thumbnailGrid">
            {banquetePhotos.map((item) => (
              <figure className="thumbnailCard" key={item.id}>
                <button
                  className="mediaButton"
                  onClick={() => openLightbox(item.lightboxIndex)}
                  aria-label={`Abrir ${item.alt}`}
                  type="button"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="thumb"
                  />
                </button>

                <figcaption>
                  <button
                    onClick={() => openLightbox(item.lightboxIndex)}
                    type="button"
                  >
                    Ver
                  </button>
                  <a href={item.src} download>
                    Descargar
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="videosSection" id="videos" aria-label="Vídeos">
        <div className="videosList">
          {SITE.videos.map((video) => (
            <article className="videoCard" key={video.id}>
              {video.youtubeId ? (
                <div className="videoEmbed">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.description}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="videoPlaceholder">
                  <span>{video.title}</span>
                </div>
              )}

              <p>{video.description}</p>
            </article>
          ))}
        </div>
      </section>

      {currentPhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Fotografía ampliada"
        >
          <button
            className="lightboxClose"
            onClick={closeLightbox}
            aria-label="Cerrar"
            type="button"
          >
            ×
          </button>

          <button
            className="lightboxArrow lightboxPrev"
            onClick={prevPhoto}
            aria-label="Anterior"
            type="button"
          >
            ‹
          </button>

          <div className="lightboxStage">
            <img
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              className="lightboxMedia"
            />

            <div className="lightboxCaption">
              <span>{lightboxIndex + 1} / {photos.length}</span>
              <a href={currentPhoto.src} download>
                Descargar foto
              </a>
            </div>
          </div>

          <button
            className="lightboxArrow lightboxNext"
            onClick={nextPhoto}
            aria-label="Siguiente"
            type="button"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}