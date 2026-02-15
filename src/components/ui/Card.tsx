'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'gradient'
    hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
        const variants = {
            default:
                'bg-white dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/40 shadow-glass',
            glass:
                'glass dark:glass-dark shadow-glass',
            gradient:
                'bg-gradient-primary text-white shadow-glow',
        }

        return (
            <motion.div
                ref={ref}
                className={cn(
                    'rounded-2xl p-6',
                    variants[variant],
                    hover && 'card-hover',
                    className
                )}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

Card.displayName = 'Card'

export default Card
