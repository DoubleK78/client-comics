import { pathnames } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = process.env.NEXT_BASE_URL!;

  const routeVi = pathnames["/search"]['vi'];
  const routeEn = '/en' + pathnames["/search"]['en'];

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === 'vi' ? routeVi : routeEn,
      languages: {
        'vi': routeVi,
        'en': routeEn,
      },
    },
    title: t('search'),
    description: t('search_description')
  };
}

export default function Comics() {
  redirect('/search');
}