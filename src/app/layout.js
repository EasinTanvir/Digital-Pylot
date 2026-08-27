import { Nunito_Sans, Plus_Jakarta_Sans, Rubik } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Drivo | Premium car rental",
  description: "Find the perfect car for every journey.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${nunitoSans.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
