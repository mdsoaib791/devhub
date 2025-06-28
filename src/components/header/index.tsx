"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  // Toggle between light and dark only
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="container mx-auto">
      <div className="w-full flex items-center justify-between px-6 py-4 border-b bg-background">
        <div className="font-bold text-lg">DEVHUB</div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
