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

const currencies = ['USD', 'GBP', 'THB', 'JPY'];

export default function CurrencyConverter() {
    const [amount, setAmount] = useState<number | ''>('');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('THB');
    const [converted, setConverted] = useState<number>(0);
    const [rate, setRate] = useState<number | null>(null);
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (amount === '' || isNaN(Number(amount))) return;
        convert();
    }, [amount, fromCurrency, toCurrency]);

    async function convert() {
        setLoading(true);
        try {
            const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await res.json();
            const newRate = data.rates[toCurrency];
            if (newRate) {
                setRate(newRate);
                setConverted(Number(amount) * newRate);
            }

            const endDate = new Date().toISOString().split('T')[0];
            const start = new Date();
            start.setFullYear(start.getFullYear() - 1);
            const startDate = start.toISOString().split('T')[0];

            const historyRes = await fetch(
                `https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`
            );
            const historyData = await historyRes.json();

            const chartFormatted = Object.entries(historyData.rates).map(([date, value]: any) => ({
                month: date,
                value: value[toCurrency],
            }));

            setChartData(chartFormatted);
        } catch (e) {
            console.error('Conversion error:', e);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen px-4 pt-20">
            <div className="max-w-3xl md:w-3xl mx-auto space-y-8 p-4 m-4 bg-white/30 dark:bg-white/10 rounded-xl border
                      border-white/30 dark:border-white/10
                      shadow-[0_10px_25px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)]
                      backdrop-blur-lg">
                {/* Header */}
                <div className="flex justify-between items-center space-x-4 mx-auto">
                    <h1 className="text-3xl font-bold">Currency Converter</h1>
                    <Button className="bg-white dark:bg-black/30">
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
