"use client"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

type Props = {
    session: Session | null;
    Component: JSX.Element;
}

export default function SessionProviderWrapper({ session, Component }: Props) {
    return (
        <SessionProvider session={session}>
            {Component}
        </SessionProvider>
    )
}