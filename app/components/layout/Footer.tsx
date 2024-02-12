import Image from "next/image";
import { useTranslations } from 'next-intl';
import Logo from '@/public/assets/media/logo.png';
import FacebookImage from '@/public/assets/media/footer/facebook.png';

export default function Footer() {
    const t = useTranslations('footer');
    return (
        <footer className="footer">
            <div className="footer-main style-1">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-5 col-sm-12 col-12">
                            <div className="footer-widget">
                                <a href="#">
                                    <Image src={Logo} alt="logo" priority />
                                </a>
                                <p className="mt-2 mb-5">
                                    {t('info')}
                                </p>
                                <h6 className="mb-2">{t('join_us_on')}</h6>
                                <ul className="social-icons">
                                    <li>
                                        <a href="https://www.facebook.com/tonotdievietnam">
                                            <Image src={FacebookImage} alt="facebook" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-5 col-sm-12 col-12">
                            <div className="footer-widget align-middle">
                                <h6 className="m-0">{t('cooperate')}</h6>
                                <br></br>
                                <p className="text">
                                    tonotdievietnam@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="footer-copyright">
                                <span className="copyright-text">
                                    © 2024. {t('right')}{" "}
                                    <a href="#">Fast Scans</a>.
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="footer-bottom-link text-end">
                                <a href="#">{t('privacy_policy')}</a>
                                <a href="#" className="ps-2">
                                    {t('comment_policy')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        </footer>
    );
}