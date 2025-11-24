import type { ReactNode } from "react";
import SideBar from "@/components/SideBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <div className="wrapper">
        < SideBar />
        <main className="mainWindow">
            {children}
        </main>

    </div>
    </>
  );
}