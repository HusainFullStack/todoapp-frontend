import "./globals.css";

export const metadata = {
  title: "Todo Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
