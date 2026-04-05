import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Coba dapatkan user untuk me-refresh token auth yang mungkin sudah expire
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Proteksi rute admin
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/'
    
    // DEBUG: Log status auth di terminal
    console.log(`[Proxy] Path: ${pathname} | User: ${user ? 'Authenticated' : 'Guest'}`)

    // 1. Jika belum login dan mencoba akses rute admin (selain login page)
    if (!user && !isLoginPage) {
      console.log(`[Proxy] Redirecting Guest from ${pathname} to /admin/login`)
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      const response = NextResponse.redirect(url)
      
      // Sinkronisasi cookie terbaru ke response redirect
      supabaseResponse.cookies.getAll().forEach((c) => {
        response.cookies.set(c.name, c.value, c)
      })
      return response
    }
    
    // 2. Jika sudah login dan iseng membuka halaman login admin
    if (user && isLoginPage) {
      console.log(`[Proxy] Redirecting Authenticated User from ${pathname} to /admin`)
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      const response = NextResponse.redirect(url)
      
      // Sinkronisasi cookie terbaru ke response redirect
      supabaseResponse.cookies.getAll().forEach((c) => {
        response.cookies.set(c.name, c.value, c)
      })
      return response
    }
  }

  return supabaseResponse
}
