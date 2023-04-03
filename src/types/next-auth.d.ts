import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: null | string
    vip: boolean
    lastDonate: any
    user: DefaultUser
  }
}
