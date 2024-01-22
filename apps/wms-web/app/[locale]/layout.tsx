import "@/styles/global.scss";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Providers } from "./providers";
import { notFound } from "next/navigation";

export const metadata = {
  title: "WMS",
  description: "WMS",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <AntdRegistry>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Providers>{children}</Providers>
          </NextIntlClientProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
