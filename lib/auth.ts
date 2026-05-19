import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            // Check if user already exists
            const { data: existing } = await supabaseAdmin
                .from("users")
                .select("id")
                .eq("email", user.email)
                .single();

            if (!existing) {
                // Insert new user with Google data
                await supabaseAdmin.from("users").insert({
                    email: user.email,
                    name: user.name ?? "",
                    image: user.image ?? "",
                });
            }

            return true;
        },

        async session({ session }) {
            if (!session.user?.email) return session;

            // Attach Supabase user data (including bio, phone) to session
            const { data: dbUser } = await supabaseAdmin
                .from("users")
                .select("id, name, image, bio, phone")
                .eq("email", session.user.email)
                .single();

            if (dbUser) {
                session.user = {
                    ...session.user,
                    id: dbUser.id,
                    name: dbUser.name,
                    image: dbUser.image,
                    // @ts-ignore — extend session type
                    bio: dbUser.bio,
                    phone: dbUser.phone,
                };
            }

            return session;
        },
    },

    pages: {
        signIn: "/login",
    },
});
