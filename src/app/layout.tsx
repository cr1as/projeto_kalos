import type { Metadata } from "next";
import "../styles/globals.css";
import { Fira_Sans_Extra_Condensed } from "next/font/google";


export const metadata: Metadata = {
  title: "Kalos",
  description: "",
};


const fira_medium = Fira_Sans_Extra_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
  style: "normal"
});

const fira_regular = Fira_Sans_Extra_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "normal"
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${fira_medium.className} ${fira_regular.className}   bg-[#F1FFFC]`}>
        {children}
      </body>
    </html> 
  );
}
