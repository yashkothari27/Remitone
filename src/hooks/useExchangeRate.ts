'use client'

import useSWR from 'swr'

interface ExchangeRateParams {
    from: string
    to: string
    amount: number
}

export function useExchangeRate({ from, to, amount }: ExchangeRateParams) {
    const { data, error, mutate } = useSWR(
        `/api/exchange-rates?from=${from}&to=${to}&amount=${amount}`,
        async (url) => {
            const res = await fetch(url)
            if (!res.ok) throw new Error('Failed to fetch exchange rate')
            return res.json()
        },
        {
            refreshInterval: 30000, // Refresh every 30 seconds
            revalidateOnFocus: false,
        }
    )

    return {
        rate: data?.rate || 0,
        convertedAmount: data?.convertedAmount || 0,
        isLoading: !error && !data,
        isError: error,
        refetch: mutate,
    }
}
