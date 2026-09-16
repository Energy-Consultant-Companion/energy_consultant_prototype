import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ENSERA · Klick-Prototyp",
  description:
    "Klickbarer Prototyp: von der Erstanfrage über die Annahme bis in die Fallarbeit der Energieberatung.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={instrumentSans.variable}>
      <body>{children}</body>
    </html>
  );
}
