import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "AEXSOFT | Professional Web Development Agency",
  description:
    "Full-stack development agency specializing in high-performance web apps, scalable SaaS products, and intelligent AI automation.",
  keywords: "web development, SaaS, AI automation, e-commerce, Next.js agency, software agency",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
