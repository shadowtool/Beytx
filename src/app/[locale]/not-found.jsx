import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFound() {
  const t = useTranslations("404");

  return (
    <div className="min-h-screen flex items-start justify-center p-8">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="/images/logo-transparent.png"
            alt="Beyt Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          {t("pageNotFound")}
        </h2>
        <p className="text-gray-500 mb-8">{t("pageNotFoundDescription")}</p>
        <Link
          href="/"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
