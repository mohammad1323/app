import "./globals.css";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "Snake Game - Mohammads Game",
  description: "Ein spannendes Snake-Spiel mit verschiedenen Modi und Skins",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Snake Game",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="h-full">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black text-white antialiased h-full overflow-hidden">
        <div className="flex flex-col h-full w-full">
          <TopNav />
          <main className="flex-1 overflow-hidden w-full h-full">
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
