import { media } from './data/media'
import { featuredSlides } from './data/featuredSlides'
import Gallery from './components/Gallery'
import Topbar from './components/Topbar'

export default function Home() {
  return (
    <main id="top">
      <Topbar />
      <Gallery media={media} featuredSlides={featuredSlides} />
    </main>
  )
}
