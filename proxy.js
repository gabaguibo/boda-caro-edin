import { NextResponse } from 'next/server'

export function proxy(request) {
  const user = process.env.BASIC_AUTH_USER
  const password = process.env.BASIC_AUTH_PASSWORD

  if (!user || !password) {
    return new Response('Autenticación no configurada.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const authHeader = request.headers.get('authorization')

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ')

    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded)
      const separatorIndex = decoded.indexOf(':')
      const inputUser = decoded.slice(0, separatorIndex)
      const inputPassword = decoded.slice(separatorIndex + 1)

      if (inputUser === user && inputPassword === password) {
        return NextResponse.next()
      }
    }
  }

  return new Response('Acceso privado. Introduce usuario y contraseña.', {
    status: 401,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-Authenticate': 'Basic realm="Boda Caro y Edin"',
    },
  })
}

export const config = {
  // Importante: no excluir imágenes/vídeos de /public/media,
  // porque también queremos proteger las fotos y los vídeos.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt).*)'],
}
