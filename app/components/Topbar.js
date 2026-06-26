'use client'

import { useState } from 'react'
import { SITE } from '../config'

export default function Topbar() {
  const [open, setOpen] = useState(false)

  function closeMenu() {
    setOpen(false)
  }

  return (
    <nav className="topbar">
      <a className="brand" href="#fotografias" onClick={closeMenu}>
        <span>{SITE.couple}</span>
        <small>{SITE.date}</small>
      </a>

      <div className="navlinks">
        <a href="#fotografias">Fotografías</a>
        <a href="#miniaturas">Miniaturas</a>
        <a href="#videos">Vídeos</a>
        <a className="downloadPill" href={SITE.downloadAllUrl} target="_blank" rel="noreferrer">
          <img src="/media/drive-icon.svg" alt="" />
          <span>Descargar todo</span>
        </a>
      </div>

      <button
        className="burgerButton"
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <img src="/media/burger.svg" alt="" />
      </button>

      {open && (
        <div className="mobileMenu">
          <a href="#fotografias" onClick={closeMenu}>Fotografías</a>
          <a href="#miniaturas" onClick={closeMenu}>Miniaturas</a>
          <a href="#videos" onClick={closeMenu}>Vídeos</a>
          <a className="downloadPill mobileDownload" href={SITE.downloadAllUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
            <img src="/media/drive-icon.svg" alt="" />
            <span>Descargar todo</span>
          </a>
        </div>
      )}
    </nav>
  )
}
