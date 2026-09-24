import "./globals.css";
import { MuseoModerno } from "next/font/google";

const museo = MuseoModerno({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Avatar Anu",
  description: "Watch your favorite episodes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${museo.className} min-h-full antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}