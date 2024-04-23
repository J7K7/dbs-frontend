import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";

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
            <ToastContainer />
            {children}
          </body>
        </html>
    </StoreProvider>
  );
}
