import { getServerSession } from "next-auth";
import LoginButton from "../components/login/LoginButton";
import { authOptions } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function Login() {
    const session = await getServerSession(authOptions);
    if (!!session) {
        return redirect('/');
    }

    return (
        <>
            {/*=====================================*/}
            {/*=        login Area Start          =*/}
            {/*=====================================*/}
            <section className="login text-center">
                <div className="container">
                    <div className="login-block">
                        <div className="login-content">
                            <img src="assets/media/icon/user.png" alt="" className="user-icon" />
                            <h3>Log in</h3>
                            <LoginButton />
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="check"
                                />
                                <label className="custom-control-label" htmlFor="check">
                                By continuing, you agree to ANIMELOOP Terms of Use and Privacy
                                Policy.
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}