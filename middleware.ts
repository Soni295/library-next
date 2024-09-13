// import type { NextRequest } from 'next/server';
//
// export async function middleware(request: NextRequest) { }
//
// export const config = {
//   matcher: '/dashboard/:path*'
// };


export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", '/cart'] }