
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
const IS_PUBLIC = process.env.IS_PUBLIC as string === 'true'

export default withAuth(
    function middleware(req) {
      const url = req.nextUrl.pathname.split("/")

      if (req.nextUrl.pathname.startsWith("/auth/login") && req.nextUrl.pathname != "/auth/login"){
        if (req.nextauth.token?.accessToken){
          return NextResponse.redirect(new URL("/", req.url))
        }
      }

    },
    {
    pages:
    {    
        signIn: '/auth/login',
    },
    callbacks:{
        authorized({ req,token }) {
          const url = req.nextUrl.pathname
          
          if (url.startsWith("/")) {
            if (token?.expires as number < Math.floor(Date.now()/1000)){
              return false
            }
            return token?.data != null
          }
          return !!token
      },
    },
  }
)


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|images|favicon.ico).*)',
  ],
}