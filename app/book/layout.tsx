import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
    <div className="wrapper">
        <main className="mainWindow">
            {children}
        </main>

    </div>
    </>
  );
}