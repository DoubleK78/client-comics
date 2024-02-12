import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const DynamicUpgradePackagePage = dynamic(() => import('@/app/components/upgrade-package/UpgradePackagePage'), {
    ssr: false
});

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <DynamicUpgradePackagePage session={session}/>
    );
}