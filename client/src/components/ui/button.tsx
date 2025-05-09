import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom button variants for babixGO
        cyan: "bg-[#00CFFF] text-white hover:bg-[#00CFFF]/90 focus:ring-2 focus:ring-[#00CFFF]/50",
        orange: "bg-[#FF4C00] text-white hover:bg-[#cc3b00] focus:ring-2 focus:ring-[#FF4C00]/50",
        darkblue: "bg-[#0A3A68] text-white hover:bg-[#0A3A68]/90 focus:ring-2 focus:ring-[#0A3A68]/50",
        whatsapp: "bg-transparent text-[#25D366] border-2 border-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300",
        facebook: "bg-transparent text-[#1877F2] border-2 border-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors duration-300",
        email: "bg-transparent text-[#FF4C00] border-2 border-[#FF4C00] hover:bg-[#FF4C00] hover:text-white transition-colors duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
