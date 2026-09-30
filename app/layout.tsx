import type { Metadata } from "next";
import { headers } from 'next/headers';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/noto-sans-arabic/400.css';
import '@fontsource/noto-sans-arabic/600.css';
import "./globals.css";
export const metadata: Metadata = {
  title: "RGM — Platform foundation",
  description:
    "Roza Graphic Machinery development foundation and design proposal.",
  robots: { index: false, follow: false },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ar=(await headers()).get('x-rgm-locale')==='ar';
  return (
    <html lang={ar?'ar':'en'} dir={ar?'rtl':'ltr'}>
      <body>{children}</body>
    </html>
  );
}
