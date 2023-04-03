import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { prisma } from 'lib/prisma'

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      authorization: {
        params: { scope: 'read:user,user:email' }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (!session) return session

      const userId = String(token.sub)

      const user = await prisma.user.findUnique({ where: { authId: userId } })

      if (!user) {
        return {
          ...session,
          id: userId,
          vip: false,
          lastDonate: null
        }
      }

      return {
        ...session,
        id: userId,
        vip: true,
        lastDonate: user.lastDonate
      }
    },
    async signIn() {
      try {
        return true
      } catch (err) {
        console.log('DEU ERRO: ', err)
        return false
      }
    }
  }
})
