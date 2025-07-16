import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import SchoolEvaluator from "@/components/SchoolEvaluator";

export default async function Home({
  params: { locale },
}: { 
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale, namespace: "schoolEvaluator" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SchoolEvaluator t={t} />
    </main>
  );
}

