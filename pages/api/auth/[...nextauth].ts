import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "@/app/libs/prismadb";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs'
import NextAuth from "next-auth";

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{label:'email',type:'text'},
                password:{label:'password',type:'text'}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials')
                }
                
                const user=await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })
                
                console.log(credentials?.email,credentials?.password)
                console.log(user)
                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword=await bcryptjs.compareSync(
                    credentials.password,
                    user.hashedPassword!,
                )
                console.log(`isCorrectPassword ${isCorrectPassword}`)

                if(!isCorrectPassword) throw new Error('Invalid credentials')

                return user;
            }
        })
    ],
    pages:{
        signIn:'/'
    },
    //only enable debug in development mode
    debug:process.env.NODE_ENV==='development',
    session:{
        strategy:'jwt'
    },
    secret:process.env.NEXT_AUTH_SECRET
}

export default NextAuth(authOptions)