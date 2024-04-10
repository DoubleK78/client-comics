"use client"
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { parseJsonFromString } from "@/lib/json";
import { checkRoleUpdate, getTokenFromSessionServer } from "@/lib/services/client/auth";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import dayjs from '@/lib/dayjs/dayjs-custom';
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";

export default function Initial({ props }: { props: Session | null }) {
    const { update } = useSession();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (props?.user && !token) {
            getTokenFromSessionServer();
            localStorage.setItem('token', props.user.token?.apiToken ?? '');

            // Register Finger Print when user login
            getCurrentBrowserFingerPrint().then((fingerprint) => {
                alert(fingerprint);
            })
        }

        const isCheckRoleChanges = parseJsonFromString<boolean | null>(sessionStorage.getItem("isCheckRoleChanges"));
        const checkRoleChangesOnUtc = parseJsonFromString<Date | null>(sessionStorage.getItem("checkRoleChangesOnUtc"));
        if ((!isCheckRoleChanges || dayjs.utc(checkRoleChangesOnUtc) < dayjs.utc()) && token) {
            checkRoleUpdate().then((model) => {
                // Banned Account will be log out
                if (model?.isBanned) {
                    signOut({
                        redirect: true
                    }).then(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userSession');

                        // Mark for user banned
                        localStorage.setItem('verified', '1');
                    });
                    return;
                }

                // Update Account when subscription changes
                const currentRoleType = getEnumValueFromString(props?.user?.token?.roles);
                if (currentRoleType != model?.roleType) {
                    update();
                }

                sessionStorage.setItem("isCheckRoleChanges", JSON.stringify(true));
                sessionStorage.setItem("checkRoleChangesOnUtc", JSON.stringify(dayjs.utc().add(5, 'minutes').toDate()));
            }).catch(() => { });
        }
    }, [props]);

    return (
        <></>
    );
}