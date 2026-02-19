import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionWrapperProps {
    children: ReactNode
    className?: string
    dark?: boolean
    id?: string
}

const SectionWrapper = ({ children, className, dark = false, id }: SectionWrapperProps) => {
    return (
        <section
            id={id}
            className={cn(
                'py-20 lg:py-28 relative overflow-hidden',
                dark ? 'bg-deep-red text-white' : 'bg-white text-slate-900',
                className
            )}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {children}
            </div>
        </section>
    )
}

export default SectionWrapper
