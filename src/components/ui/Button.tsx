import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'gold' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    children: ReactNode
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

const Button = ({
    variant = 'primary',
    size = 'md',
    children,
    leftIcon,
    rightIcon,
    className,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold transition-all rounded-xl active:scale-[0.98]'

    const variants = {
        primary:
            'bg-brand-red text-white hover:bg-brand-red-light shadow-lg shadow-brand-red/25 hover:scale-105',
        secondary:
            'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300',
        gold:
            'bg-gold text-brand-red-deep hover:bg-white hover:shadow-lg hover:shadow-gold/20',
        outline:
            'border border-white/20 text-white hover:bg-white/5 hover:border-white/40',
    }

    const sizes = {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-base',
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {leftIcon}
            <span>{children}</span>
            {rightIcon}
        </button>
    )
}

export default Button
