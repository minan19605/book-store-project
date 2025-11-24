import type { ReactNode } from "react";
import SideBar from "@/components/SideBar";
import { FontProvider } from "@/components/FontContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <div className="wrapper">
      <FontProvider>
        < SideBar />
        <main className="mainWindow">
            {children}
        </main>
      </FontProvider>
    </div>
    </>
  );
}