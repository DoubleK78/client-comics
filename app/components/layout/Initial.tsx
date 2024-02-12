"use client"
import { getTokenFromSessionServer } from "@/lib/services/client/auth";
import { Session } from "next-auth";
import { useEffect } from "react";

export default function Initial({ props }: { props: Session | null }) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (props && props.user && !token) {
            getTokenFromSessionServer();
        }
    }, [props]);

    return (
        <></>
    );
}