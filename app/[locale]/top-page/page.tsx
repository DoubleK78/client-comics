import { getLocale } from "next-intl/server";
import dynamic from "next/dynamic";

const DynamicTopPage = dynamic(() => import('@/app/components/top-page/TopPage'), {
    ssr: false
});

export default async function Page() {
    const locale = await getLocale();
    return (
        <DynamicTopPage locale={locale} />
    );
}