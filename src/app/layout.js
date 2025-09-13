import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
const meta = {
  title: "Classic Event Planners - Flawless Wedding Planning Services",
  description:
    "Classic Event Planners offering full-service wedding planning to make your big day flawless and memorable. Personalized, creative, and stress-free wedding planning.",
  url: "https://your-domain.com",
  image: "https://your-domain.com/og-image.jpg",
  twitterImage: "https://your-domain.com/twitter-image.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </head>
      <body>
        <Script
          src="https://cdn.tailwindcss.com"
          strategy="beforeInteractive"
        />
        <div className="w-full min-h-screen overflow-x-hidden">
          <Navbar /> {/* ✅ Correct – now inside <body> */}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
