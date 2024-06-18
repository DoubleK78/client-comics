"use client"
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { parseJsonFromString } from "@/lib/json";
import { checkRoleUpdate, getTokenFromSessionServer } from "@/lib/services/client/auth";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import dayjs from '@/lib/dayjs/dayjs-custom';

export default function Initial({ props }: { props: Session | null }) {
    const { update } = useSession();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (props?.user && (!token || token !== props.user.token?.apiToken)) {
            getTokenFromSessionServer();
            localStorage.setItem('token', props.user.token?.apiToken ?? '');
        }

        const isCheckRoleChanges = parseJsonFromString<boolean | null>(sessionStorage.getItem("isCheckRoleChanges"));
        const checkRoleChangesOnUtc = parseJsonFromString<Date | null>(sessionStorage.getItem("checkRoleChangesOnUtc"));
        const waitingForUnlockingOnUtc = parseJsonFromString<Date | null>(localStorage.getItem("waitingForUnlockingOnUtc"));
        if ((!isCheckRoleChanges || (checkRoleChangesOnUtc && dayjs.utc(checkRoleChangesOnUtc) < dayjs.utc()) || (waitingForUnlockingOnUtc && dayjs.utc() < dayjs.utc(waitingForUnlockingOnUtc))) && token) {
            checkRoleUpdate().then((model) => {
                // Banned Account will be log out
                if (model?.isBanned) {
                    signOut({
                        redirect: true
                    }).then(() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userSession');
                    });
                    return;
                }

                // Update Account when subscription changes
                const currentRoleType = getEnumValueFromString(props?.user?.token?.roles);
                if (currentRoleType != model?.roleType) {
                    // Remove Flag when user get new subscription
                    localStorage.removeItem("waitingForUnlockingOnUtc");
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