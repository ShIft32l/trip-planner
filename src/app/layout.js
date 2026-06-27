import { Inter } from "next/font/google";
import "./globals.css";
import { TripProvider } from "../context/TripContext";
import BottomNavigation from "../components/BottomNavigation";
import ThemeProvider from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "SG Trip Tracker",
  description: "Your Singapore adventure, beautifully tracked.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SG Trip",
  },
};

export const viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <TripProvider>
            {children}
            <BottomNavigation />
          </TripProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
