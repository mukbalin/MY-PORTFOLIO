import localFont from "next/font/local";
import Header from "../components/header";
import Footer from "../components/footer";
import Starfield from "../components/starfield";
import CustomCursor from "../components/custom-cursor";
import "./globals.css";
const outfit = localFont({
  src: "./fonts/outfit.woff2",
  variable: "--font-body",
  weight: "400 800",
  display: "swap",
});
const display = localFont({
  src: "./fonts/bebas.woff2",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});
export const metadata = {
  title: {
    default: "Mukhtar Bello | Web Developer",
    template: "%s | Mukhtar Bello",
  },
  description:
    "Enter Mukhtar Bello’s universe. Responsive websites, thoughtful interfaces, and creative web experiences by Mukhtar Bello.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${display.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Starfield />
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
