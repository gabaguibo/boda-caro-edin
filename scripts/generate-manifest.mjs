import fs from 'fs'
import path from 'path'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const mediaDir = path.join(publicDir, 'media')
const outFile = path.join(root, 'app', 'data', 'media.js')

const sections = [
  {
    key: 'ayuntamiento',
    label: 'Ceremonia en el Ayuntamiento',
    folder: path.join(mediaDir, 'ayuntamiento'),
    publicPath: '/media/ayuntamiento',
  },
  {
    key: 'banquete',
    label: 'Banquete',
    folder: path.join(mediaDir, 'banquete'),
    publicPath: '/media/banquete',
  },
  {
    key: 'videos',
    label: 'Vídeos',
    folder: path.join(mediaDir, 'videos'),
    publicPath: '/media/videos',
  },
]

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp'])
const videoExtensions = new Set(['.mp4', '.mov', '.m4v', '.webm'])

function listFiles(section) {
  if (!fs.existsSync(section.folder)) return []

  return fs
    .readdirSync(section.folder)
    .filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.has(ext) || videoExtensions.has(ext)
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file, index) => {
      const ext = path.extname(file).toLowerCase()
      const type = videoExtensions.has(ext) ? 'video' : 'photo'

      return {
        id: `${section.key}-${String(index + 1).padStart(3, '0')}`,
        type,
        section: section.key,
        src: `${section.publicPath}/${file}`,
        alt: `${section.label} ${index + 1}`,
      }
    })
}

const media = sections.flatMap(listFiles)

const output = `// Archivo generado automáticamente. No editar a mano.
// Vuelve a ejecutar: npm run manifest

export const media = ${JSON.stringify(media, null, 2)}
`

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, output, 'utf8')

console.log(`Manifest generado: ${media.length} archivos`)
console.log(outFile)
