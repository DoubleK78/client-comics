'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import FacebookImage from '@/public/assets/media/footer/facebook.png';
import { useState } from "react";
import { sendEmail } from "@/lib/services/client/email/EmailService";
import { createActivityLog } from "@/lib/services/client/activity-log/activityLogService";
import ActivityLogRequestModel from "@/app/models/activity/ActivityLogRequestModel";
import { EActivityType } from "@/app/models/enums/EActivityType";
import { trackingIpV4 } from "@/app/utils/HelperFunctions";

export default function Payment({ userEmail }: { userEmail: any }) {
    const t = useTranslations('upgrade');
    const [code, setCode] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<any>();
    const typePage = typeof window !== 'undefined' ? new URLSearchParams(window.location.search)?.get('package') || "" : "";

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSubmit(true);

        if (code.length >= 11)
        {
            const emailMessage: SendEmailMessage = {
                subject: "[Payment Upgrade Account]",
                body: `${code} - ${typePage} - ${userEmail}`,
                toEmails: ["ngodangdongkhoi@gmail.com"],
                ccEmails: ["tonotdievietnam@gmail.com"],
                attachments: null,
            };

            try
            {
                await sendEmail(emailMessage);

                const myActivityLog: ActivityLogRequestModel = {
                    ActivityType: EActivityType.Payment,
                    LimitTimes: 100,
                    IpV4Address: await trackingIpV4(),
                    Description: userEmail
                };
                
                await createActivityLog(myActivityLog);
                setMessage(<p className="success-submit">{t('success')}</p>);
            } catch(error){
                console.error('Error fetching types:', error);
                setMessage(<p className="failure-submit">{t('failure')}</p>);
            }
            setCode('');
        }
        else
            setMessage(<p className="failure-submit">{t('invalid_code')}</p>);
        
        setIsLoading(false);      
    };

    const handleInputChange = (e: any) => {
        setCode(e.target.value);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <section className="blog style-1 sec-mar">
            <div className="container">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12" />
                    <div className="col-lg-4 col-md-4 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <a className="inner-box">
                            <div className="image-box">
                                <img src={typePage ? `/assets/media/qrCode/${typePage}.png` : `/assets/media/qrCode/premium_1.png`} alt="" className="attachment-full size-full" />
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12" />
                    <div className="col-lg-6 col-md-6 col-sm-8 offset-lg-0 offset-md-0 offset-sm-2 col-12">
                        <h1 style={{ color: 'white' }}>{t('transaction_code')}</h1>
                        {isLoading && (
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {!isSubmit ? (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group form-group header-search-box">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="query"
                                            required={true}
                                            placeholder={t('enter_transaction_code')}
                                            value={code}
                                            onChange={handleInputChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                        <button
                                            className="input-group-text anime-btn"
                                            type="submit"
                                            id="searchButton"
                                        >
                                            <i className="fas fa-paper-plane"></i>
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                {message}
                            </>
                        )}
                        <h5 style={{ color: 'white' }}>{t('note')}</h5>
                        <p>{t('note_1')}</p>
                        <p>{t('note_2')}</p>
                        <p>{t('note_3')}</p>
                        <p>{t('note_4')}</p>
                        <ul className="social-icons">
                            <a href="https://www.facebook.com/tonotdievietnam">
                                <Image src={FacebookImage} alt="facebook" />
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}