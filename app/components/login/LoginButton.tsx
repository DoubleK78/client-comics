'use client';
import { signIn } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import GoogleLogo from '@/public/assets/media/login/google.png'
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";

export default function LoginButton() {
    const [isFromMessenger, setIsFromMessenger] = useState(false);
    const [fingerprint, setFingerprint] = useState<string | null>(null);
    const [debugFingerprint, setDebugFingerprint] = useState<number>(0);

    useEffect(() => {
        const isMessenger = navigator.userAgent.includes("FBAN") || navigator.userAgent.includes("FBAV");
        if (isMessenger)
            setIsFromMessenger(true);

        getCurrentBrowserFingerPrint().then((fingerprint) => {
            alert(fingerprint);
            setFingerprint(fingerprint);
        })
    }, []);

    useEffect(() => {
        if (debugFingerprint > 0 && fingerprint && debugFingerprint % 5 == 0) {
            const bannedAccount = localStorage.getItem('verified');
            alert(`Error code: ${fingerprint} - ${!!bannedAccount || bannedAccount === ''}`);
        }
    }, [fingerprint, debugFingerprint]);

    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('logins');

    const onSignIn = () => {
        sessionStorage.setItem("isCheckRoleChanges", JSON.stringify(false));
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');

        // Banned Account can not login and use other accounts
        const bannedAccount = localStorage.getItem('verified');
        if (bannedAccount || bannedAccount === '') return;

        setIsLoading(true);
        signIn('google');
    };

    const onDebugFingerprint = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setDebugFingerprint(debugFingerprint + 1);
        }
    }

    return (
        <>
            {isLoading && <div id="overlay-loading"></div>}
            {!isFromMessenger ? (
                <>
                    <button className="hide-link" onClick={onSignIn}>
                        <Image src={GoogleLogo} alt="google" priority width={52} height={33} />{t('continue_with_google')}
                    </button>
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="check"
                            onChange={onDebugFingerprint}
                        />
                        <label className="custom-control-label" htmlFor="check">
                            {t('policy')}
                        </label>
                    </div>
                </>
            ) : (
                <p>{t('is_messenger')}</p>
            )}

        </>
    );
}