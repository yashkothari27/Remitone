'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItemProps {
    question: string
    answer: string
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 px-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
                <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                    {question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>
            {isOpen && (
                <div className="px-6 pb-5">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    )
}

export default FAQItem
