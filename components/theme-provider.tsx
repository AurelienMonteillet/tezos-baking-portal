/**
 * Theme Provider Component
 * 
 * Wraps the application with next-themes provider to enable theme switching
 * Currently configured to use dark mode by default
 */

'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

/**
 * Theme provider wrapper component
 * Enables dark/light theme switching throughout the app
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
