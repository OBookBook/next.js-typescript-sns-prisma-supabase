"use client";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
