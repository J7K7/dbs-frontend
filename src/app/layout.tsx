import "../styles/globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}
) {
  return (
    <StoreProvider>
    <html lang="en">
      <body>
        <div className="flex h-screen">
            <Sidebar  />

          <div className="sm:pl-60 flex flex-col flex-grow">
            <Navbar />
            <div className="pt-16 overflow-y-auto flex-grow">
            {children}
            </div>

          </div>
        </div>
      </body>
    </html>
    </StoreProvider>
  );
}
