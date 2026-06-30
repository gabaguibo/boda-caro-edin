import './globals.css'

export const metadata = {
  title: '💍 Caro & Edin — 12 de junio de 2026',
  description: 'Galería privada de la boda de Caro y Edin.',

  icons: {
    icon: '/logo.svg',
  },

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
