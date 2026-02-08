import "./globals.css";
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "Snake Game - Mohammads Game",
  description: "Ein spannendes Snake-Spiel mit verschiedenen Modi und Skins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="h-full">
      <body className="bg-zinc-900 text-white antialiased h-full overflow-hidden">
        <div className="flex flex-col h-full">
          <TopNav />
          <main className="flex-1 overflow-y-auto pb-20">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
