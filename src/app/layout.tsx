import "../styles/globals.css";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
  }
) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
