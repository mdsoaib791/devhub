"use client"

import { cn } from "@/lib/utils"

interface LoaderProps {
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "dots" | "pulse" | "bars"
  className?: string
}

export default function Loader({ size = "md", variant = "spinner", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const renderSpinner = () => (
    <div className={cn("animate-spin rounded-full border-4 border-gray-200 border-t-blue-600", sizeClasses[size])} />
  )

  const renderDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-blue-600 animate-bounce",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4",
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => <div className={cn("rounded-full bg-blue-600 animate-pulse", sizeClasses[size])} />

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-blue-600 animate-pulse",
            size === "sm" ? "w-1" : size === "md" ? "w-1.5" : "w-2",
            size === "sm" ? "h-4" : size === "md" ? "h-6" : "h-8",
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return renderDots()
      case "pulse":
        return renderPulse()
      case "bars":
        return renderBars()
      default:
        return renderSpinner()
    }
  }

  return (
    <div className={cn("fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50", className)}>
      <div className="flex flex-col items-center space-y-4">
        {renderLoader()}
        <p className="text-sm text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
