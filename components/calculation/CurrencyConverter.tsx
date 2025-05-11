'use client';

import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import {
    Input,
} from '@/components/ui/input';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Repeat, Undo2 } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

interface ChartPoint {
    month: string;
    value: number;
}

const currencies = ['USD', 'GBP', 'THB', 'JPY'];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState<number | ''>(''); // Amount to convert
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('THB');
    const [converted, setConverted] = useState<number>(0);
    const [rate, setRate] = useState<number | null>(null);
    const [chartData, setChartData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(false);

    // Function to load exchange rates and historical data
    const loadExchangeData = async () => {
        setLoading(true);

        try {
            // First, check if we have the cached data in localStorage
            const cachedRates = localStorage.getItem(`rates-${fromCurrency}-${toCurrency}`);
            const cachedChartData = localStorage.getItem(`chart-${fromCurrency}-${toCurrency}`);
            const cachedTimestamp = localStorage.getItem(`cacheTimestamp`);

            const now = Date.now();
            const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

            // Use cached data if it's within the time limit (1 hour)
            if (cachedRates && cachedChartData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < oneHour) {
                setRate(JSON.parse(cachedRates));
                setChartData(JSON.parse(cachedChartData));
                setConverted(Number(amount) * JSON.parse(cachedRates));
                setLoading(false);
                return;
            }

            // Fetch new data from the API
            const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await res.json();
            const newRate = data.rates[toCurrency];
            if (newRate) {
                setRate(newRate);
                setConverted(Number(amount) * newRate);

                // Cache the exchange rate in localStorage
                localStorage.setItem(`rates-${fromCurrency}-${toCurrency}`, JSON.stringify(newRate));
            }

            // Fetch historical data for the chart
            const endDate = new Date().toISOString().split('T')[0];
            const start = new Date();
            start.setFullYear(start.getFullYear() - 1);
            const startDate = start.toISOString().split('T')[0];

            const historyRes = await fetch(
                `https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`
            );
            const historyData = await historyRes.json();

            const chartFormatted = (Object.entries(historyData.rates) as [string, Record<string, number>][]).map(([date, value]) => ({
                month: date,
                value: value[toCurrency],
            }));

            setChartData(chartFormatted);

            // Cache the chart data in localStorage
            localStorage.setItem(`chart-${fromCurrency}-${toCurrency}`, JSON.stringify(chartFormatted));

            // Cache the current timestamp for 1 hour expiry
            localStorage.setItem('cacheTimestamp', now.toString());

        } catch (e) {
            console.error('Conversion error:', e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (amount === '' || isNaN(Number(amount))) return;
        loadExchangeData();
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="relative flex justify-center items-center min-h-[80vh] overflow-hidden pt-28">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
            </div>
            <div className="relative w-[90vw] max-w-3xl mx-auto space-y-8 p-8 border-white/20 shadow-md backdrop-blur-lg rounded-xl
                      bg-white/50 dark:bg-white/10 z-10">
                {/* Header */}
                <div className="flex justify-between items-center space-x-4 mx-auto">
                    <h1 className="text-3xl font-bold">Currency Converter</h1>
                    <Button asChild className="bg-white dark:bg-black/30">
                        <Link href="/calculation">
                            <Undo2 className="text-black dark:text-white" />
                        </Link>
                    </Button>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => {
                            const val = e.target.value;
                            setAmount(val === '' ? '' : Number(val));
                        }}
                        className="bg-white rounded-lg"
                    />

                    <div className="flex space-x-2 items-center">
                        <Select value={fromCurrency} onValueChange={setFromCurrency}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="From" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((cur) => (
                                    <SelectItem key={cur} value={cur}>
                                        {cur}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <button
                            type="button"
                            onClick={() => {
                                const temp = fromCurrency;
                                setFromCurrency(toCurrency);
                                setToCurrency(temp);
                            }}
                            className="p-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
                            aria-label="Swap currencies"
                        >
                            <Repeat className="h-5 w-5 text-gray-600" />
                        </button>

                        <Select value={toCurrency} onValueChange={setToCurrency}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="To" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((cur) => (
                                    <SelectItem key={cur} value={cur}>
                                        {cur}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Result */}
                <Card className="mt-4">
                    <CardContent className="py-6 text-center">
                        <p className="text-lg font-medium">Converted Amount</p>
                        {amount === '' ? (
                            <p className="text-red-500">Please enter the amount</p>
                        ) : loading ? (
                            <p className="text-gray-500">Loading...</p>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-indigo-600">
                                    {converted.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}{' '}
                                    {toCurrency}
                                </h2>
                                {rate && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        1 {fromCurrency} ≈ {rate.toFixed(4)} {toCurrency}
                                    </p>
                                )}
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Chart */}
                <Card>
                    <CardContent className="pt-6">
                        <h2 className="text-lg font-semibold mb-4 text-center">Exchange Rate Trend (1 year)</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(229, 231, 235, 0.5)" />
                                <XAxis dataKey="month" stroke="#6b7280" />
                                <YAxis stroke="#6b7280" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#f3f4f6', borderColor: '#4f46e5' }}
                                    labelStyle={{ color: '#111827' }}
                                    itemStyle={{ color: '#111827' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
