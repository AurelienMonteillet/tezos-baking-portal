/**
 * Button Component
 * 
 * Primary interactive element with multiple variants and sizes
 * Based on Tezos Design System (Figma)
 * - Font: GT Eesti Display Regular (font-normal)
 * - Primary: white-700 background, black-900 text
 * - Secondary (outline): transparent with white border
 */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-heading font-normal transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-[#8aabff] focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        // Tezos Primary Button: white-700 (rgba(255,255,255,0.8)) → hover: white
        default:
          'bg-white-700 text-black-900 hover:bg-white-900',
        // Tezos Secondary/Outline Button: transparent with white border
        outline:
          'border border-white-600 bg-transparent text-white-900 hover:bg-white-900/10',
        // Destructive variant
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20',
        // Secondary variant
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        // Ghost variant
        ghost:
          'hover:bg-accent hover:text-accent-foreground',
        // Link variant
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        // Tezos sizes from Figma: xs=32px, sm=40px, base=48px, lg=56px
        xs: 'h-8 px-3 text-base leading-6',
        sm: 'h-10 px-3 text-base leading-6',
        default: 'h-12 px-5 text-lg leading-7',
        lg: 'h-14 px-7 text-xl leading-7',
        icon: 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
