import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('search'),
    description: t('search_description'),
    icons: {
      icon: '/assets/media/icon/head.ico',
    }
  };
}

export default function Comics() {
  redirect('/search');
}