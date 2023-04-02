import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_CLIENT_ID),
      clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
      authorization: {
        params: { scope: 'read:user' }
      }
    })
  ],
  callbacks: {
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
