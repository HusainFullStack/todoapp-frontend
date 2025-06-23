import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "Todo Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        suppressHydrationWarning={true}
        className={`antialiased`}
      >
        <Toaster className="cursor-grab active:cursor-grabbing" richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
