
import "./globals.css";
import BottomNav from "./components/BottomNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-zinc-900 text-white">
        <main className="pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
