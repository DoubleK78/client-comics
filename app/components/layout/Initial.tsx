"use client"
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { parseJsonFromString } from "@/lib/json";
import { checkRoleUpdate, getTokenFromSessionServer } from "@/lib/services/client/auth";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import dayjs from '@/lib/dayjs/dayjs-custom';
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { registerFingerprint } from "@/lib/services/client/fingerprint";

export default function Initial({ props }: { props: Session | null }) {
    const { update } = useSession();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (props?.user && !token) {
            getTokenFromSessionServer();
            localStorage.setItem('token', props.user.token?.apiToken ?? '');

            // Register Finger Print when user login
            getCurrentBrowserFingerPrint().then((fingerprint) => {
                registerFingerprint(fingerprint, getBrowserVersion() + " - " + getScreenResolution());
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
                        // localStorage.setItem('verified', '1');
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

    function getBrowserVersion() {
        var ua = navigator.userAgent;
        var tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

    function getScreenResolution() {
        return `${window.screen.width}x${window.screen.height}`;
    }

    return (
        <></>
    );
}