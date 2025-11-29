import type { ReactNode } from "react";
import { FontProvider } from "@/components/FontContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <div className="wrapper">
      <FontProvider>
        <main className="mainWindow">
            {children}
        </main>
      </FontProvider>
    </div>
    </>
  );
}