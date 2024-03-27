import { ERoleType } from "@/app/models/enums/ERoleType";
import { getEnumValueFromString } from "@/app/utils/HelperFunctions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Script from "next/script";

export default async function GoogleAdsense({ ca_id }: { ca_id: string }) {
    const session = await getServerSession(authOptions);
    const roleUser = getEnumValueFromString(session?.user?.token?.roles);

    if (roleUser === ERoleType.UserSuperPremium) {
        return <></>;
    }

    return (
        <>
            <Script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ca_id}`}
                strategy="lazyOnload"
                crossOrigin="anonymous"
            />
        </>
    );
}