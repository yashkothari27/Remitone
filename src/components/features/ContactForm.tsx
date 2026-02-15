'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Send } from 'lucide-react'

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // TODO: Replace with actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitStatus('success')
                reset()
            } else {
                setSubmitStatus('error')
            }
        } catch (error) {
            console.error('Form submission error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <Input
                    label="Name"
                    {...register('name')}
                    placeholder="John Doe"
                    error={errors.name?.message}
                />
            </div>

            <div>
                <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    error={errors.email?.message}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                </label>
                <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="How can we help you?"
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
            </div>

            {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-green-800 dark:text-green-200">
                        Thank you for your message! We&apos;ll get back to you soon.
                    </p>
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-800 dark:text-red-200">
                        Sorry, there was an error sending your message. Please try again.
                    </p>
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                rightIcon={<Send className="w-5 h-5" />}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                This site is protected by reCAPTCHA (integration pending)
            </p>
        </form>
    )
}

export default ContactForm
