'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        variant = 'primary',
        size = 'md',
        isLoading,
        leftIcon,
        rightIcon,
        children,
        disabled,
        ...props
    }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

        const variants = {
            primary:
                'bg-gradient-primary text-white hover:shadow-glow focus-visible:ring-primary-500',
            secondary:
                'bg-white text-primary-600 border border-primary-200 hover:border-primary-300 hover:bg-primary-50 focus-visible:ring-primary-500',
            outline:
                'bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus-visible:ring-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800',
            ghost:
                'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
        }

        const sizes = {
            sm: 'px-3.5 py-2 text-sm gap-1.5',
            md: 'px-5 py-2.5 text-sm gap-2',
            lg: 'px-7 py-3 text-base gap-2.5',
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    leftIcon
                )}
                {children}
                {rightIcon}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
