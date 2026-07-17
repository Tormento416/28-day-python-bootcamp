import "./globals.css";
export const metadata = { title: "Python Quest", description: "Gamified 28-day Python bootcamp" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
