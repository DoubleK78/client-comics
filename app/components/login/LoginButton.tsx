'use client';
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import GoogleLogo from '@/public/assets/media/login/google.png'

export default function LoginButton() {
    const [isFromMessenger, setIsFromMessenger] = useState(false);

    useEffect(() => {
        const isMessenger = navigator.userAgent.includes("FBAN") || navigator.userAgent.includes("FBAV");
        if (isMessenger)
            setIsFromMessenger(true);       
      }, []);
    
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('logins');
    const onSignIn = () => {
        setIsLoading(true);
        signIn('google');
    };

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