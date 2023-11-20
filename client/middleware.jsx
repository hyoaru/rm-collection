import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { NAVIGATION_OPERATIONS, NAVIGATION_TABLES } from '@constants/admin/base'

export async function middleware(req) {
  const AUTH_ROUTES = ['/auth/sign-in', '/auth/sign-up']
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { user: userStateAuth } } = await supabase.auth.getUser()
  let { data: userStateGeneral } = await supabase
    .from('users')
    .select("*")
    .eq('id', userStateAuth?.id)
    .single()

  if (AUTH_ROUTES.includes(req.nextUrl.pathname) && userStateAuth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (req.nextUrl.pathname.includes('/account')) {
    if (!userStateAuth) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url))
    }

    if (req.nextUrl.pathname === '/account/change-password') {
      if (req.nextUrl.searchParams.get('code')) {
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === "PASSWORD_RECOVERY") {
            return res
          }
        })
      } else {
        return NextResponse.redirect(new URL('/account', req.url))
      }
    }
  }

  if (req.nextUrl.pathname.includes('/admin')) {
    if (!userStateAuth) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (userStateGeneral?.role === 'user') {
      return NextResponse.redirect(new URL('/', req.url))
    }

    const adminNavigations = [...Array.from(Object.values(NAVIGATION_OPERATIONS)), ...Array.from(Object.values(NAVIGATION_TABLES))]
    const matchedAdminNavigation = adminNavigations.filter((adminNavigation) => adminNavigation.pathName === req.nextUrl.pathname)[0]
    const isPermitted = matchedAdminNavigation?.adminRolesPermitted.includes(userStateGeneral?.role)

    if (matchedAdminNavigation && !isPermitted) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return res
}

export const config = { matcher: "/((?!.*\\.).*)" };