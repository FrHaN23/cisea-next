import { baseUrl } from "@/const/const"
import dayjs from "dayjs"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials" 
import jsonToken from 'jsonwebtoken';

const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "username", type: "username", },
                password: {  label: "password", type: "password" }
            },
            async authorize(credentials, req){
                const res = await fetch(baseUrl +"/auth/login",{
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 
                        "Content-Type": "application/json"
                    }
                })
                const user = await res.json()
                if (res.ok && user) {
                    return user
                }
                return null
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    pages:
    {    
        signIn: '/auth/login',
    },
    callbacks:{
        async jwt({token, user, account, isNewUser}:any) {
            if(user){
                const payload: any = jsonToken.decode(user.token)
                token = {
                    data: payload,
                    accessToken: user.token,
                    expires: payload.exp,
                    issued_at: payload.iat,
                }
            }
            return token
        },
        async session({session, token}:any){
            session.accessToken = token.accessToken
            session.expires = token.data.exp
            session.user = token.data
            return session
        }
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

