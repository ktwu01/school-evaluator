import { getDictionary } from "@/i18n/request";
import { Locale } from "@/i18n/config";
import SchoolEvaluator from "@/components/SchoolEvaluator";

export default async function Home({
  params: { locale },
}: { 
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SchoolEvaluator dictionary={dictionary} />
    </main>
  );
}

