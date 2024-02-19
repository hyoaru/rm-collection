import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// App imports
import { NAVIGATION_OPERATIONS, NAVIGATION_TABLES } from '@constants/admin/base'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const AUTH_ROUTES = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']
  const ACCOUNT_PUBLIC_PROTECTED_ROUTES = ['/profile/account/update-password']

  const { data: { user: userStateAuth } } = await supabase.auth.getUser()
  const { data: authenticatedUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', userStateAuth?.id)
    .single()


  if (AUTH_ROUTES.includes(request.nextUrl.pathname) && userStateAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (request.nextUrl.pathname.includes('/orders') && !userStateAuth) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  if (request.nextUrl.pathname.includes('/profile')) {
    if (!userStateAuth && !ACCOUNT_PUBLIC_PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    if (!ACCOUNT_PUBLIC_PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
      return response
    }

    if (request.nextUrl.pathname === '/profile/account/update-password') {
      await supabase.auth.signOut()
      const code = request.nextUrl.searchParams.get('code')

      try {
        await supabase.auth.exchangeCodeForSession(code!)
      } catch (error) {
        return NextResponse.redirect(new URL('/profile', request.url))
      }

      return response
    }

  }

  if (request.nextUrl.pathname.includes('/admin')) {
    if (!userStateAuth) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (authenticatedUser?.role === 'user') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const adminNavigations = [...Array.from(Object.values(NAVIGATION_OPERATIONS)), ...Array.from(Object.values(NAVIGATION_TABLES))]
    const matchedAdminNavigation = adminNavigations.filter((adminNavigation) => adminNavigation.pathName === request.nextUrl.pathname)[0]
    const isPermitted = matchedAdminNavigation?.adminRolesPermitted.includes(authenticatedUser?.role)

    if (matchedAdminNavigation && !isPermitted) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  if (request.nextUrl.pathname.includes('/checkout') && !userStateAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}