import "./styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SophieCare Bob Accelerator",
  description: "IBM Bob-powered development accelerator for a healthcare AI surgical co-pilot prototype."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
