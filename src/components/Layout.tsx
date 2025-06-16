
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="py-6 text-center border-t">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Excusely.com - Your partner in plausible deniability.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
