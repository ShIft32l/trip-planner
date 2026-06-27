import { Outfit } from "next/font/google";
import "./globals.css";
import { TripProvider } from "../context/TripContext";
import BottomNavigation from "../components/BottomNavigation";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "SG Trip Planner",
  description: "Real-time trip planner for Singapore",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SG Trip",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <TripProvider>
          <div style={{ paddingBottom: '80px' }}>
            {children}
          </div>
          <BottomNavigation />
        </TripProvider>
      </body>
    </html>
  );
}
