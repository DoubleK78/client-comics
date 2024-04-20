import { ERoleType } from "@/app/models/enums/ERoleType";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Script from "next/script";
import { isbot } from "isbot";
import { headers } from "next/headers";

export default async function GoogleAdsense({ ca_id }: { ca_id: string }) {
    const session = await getServerSession(authOptions);
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);
    const isBot = isbot(headers().get('user-agent'));

    if (isBot || roleUser === ERoleType.UserPremium || roleUser === ERoleType.UserSuperPremium ||
        (process.env.MAINTENANCE_MODE && process.env.MAINTENANCE_MODE?.toLowerCase() === 'true')) {
        return <></>;
    }

    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />
        </>
    );
}