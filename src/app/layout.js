import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

const meta = {
  title: "Classic Event Planners - Flawless Wedding Planning Services",
  description:
    "Classic Event Planners offering full-service wedding planning to make your big day flawless and memorable. Personalized, creative, and stress-free wedding planning.",
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
        <div className="w-full min-h-screen overflow-x-hidden">
          <Navbar /> {/* ✅ Correct – now inside <body> */}
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
