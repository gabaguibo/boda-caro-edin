# Web de boda — Caro & Edin

Web sencilla tipo galería editorial:
- Hero con foto principal.
- Botones: Ver slideshow / Descargar todo.
- Galería responsive en columnas.
- 2 secciones: Ceremonia en el Ayuntamiento y Banquete.
- 214 fotos + vídeos.
- Protección básica con usuario y contraseña mediante `proxy.js`.

## 1. Instalar

```bash
npm install
```

## 2. Preparar archivos

Coloca las fotos optimizadas para web aquí:

```txt
public/media/hero.jpg
public/media/ayuntamiento/001.jpg
public/media/ayuntamiento/002.jpg
...
public/media/banquete/001.jpg
public/media/banquete/002.jpg
...
```

Opcionalmente, coloca vídeos comprimidos aquí:

```txt
public/media/videos/video-01.mp4
public/media/videos/video-02.mp4
public/media/videos/video-03.mp4
```

Para máxima compatibilidad, usa:
- fotos JPG en sRGB, lado largo aprox. 1800–2400 px;
- vídeos MP4 H.264.

## 3. Configurar enlace de descarga completa

Edita:

```txt
app/config.js
```

y sustituye `PASTE_GOOGLE_DRIVE_ZIP_URL_HERE` por la URL del ZIP de Google Drive.

## 4. Generar manifiesto

Cada vez que añadas o cambies fotos/vídeos, ejecuta:

```bash
npm run manifest
```

Esto genera automáticamente:

```txt
app/data/media.js
```

## 5. Contraseña local

Copia `.env.local.example` como `.env.local`:

```bash
cp .env.local.example .env.local
```

Cambia usuario y contraseña.

## 6. Ejecutar

```bash
npm run dev
```

## 7. Deploy en Vercel

1. Sube el repo a GitHub.
2. Importa el repo en Vercel.
3. Añade estas Environment Variables en Vercel:

```txt
BASIC_AUTH_USER
BASIC_AUTH_PASSWORD
```

4. Deploy.

## Nota sobre privacidad

Es una protección básica, suficiente para compartir una boda con invitados si no se difunde la contraseña. No equivale a cuentas individuales ni a una plataforma privada profesional.
