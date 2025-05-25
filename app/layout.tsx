import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientLayout from "../app/ClientLayout";
import LoadingScreen from "../components/LoadingScreen";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Common",
  description: "Creative Common - Your Creative Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="loading-screen" className="fixed inset-0 z-[100] bg-white">
          <LoadingScreen />
        </div>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
