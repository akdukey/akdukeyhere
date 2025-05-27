import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/client-view/common-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Arjun Dubey",
  description: "Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="bg-[#000000] text-[#ffffff]">
        {<CommonLayout>
        
        {children}
      
        </CommonLayout>}
        </div>
        </body>
    </html>
  );
}
