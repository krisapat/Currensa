"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Undo2 } from "lucide-react";

export default function DividendCalculator() {
    const [monthlyDividend, setMonthlyDividend] = useState<string>("");
    const [annualReturnPercent, setAnnualReturnPercent] = useState<string>("");
    const [requiredInvestment, setRequiredInvestment] = useState<number | null>(null);

    const isValid = () => {
        const monthly = parseFloat(monthlyDividend);
        const percent = parseFloat(annualReturnPercent);
        return !isNaN(monthly) && monthly > 0 && !isNaN(percent) && percent > 0;
    };

    useEffect(() => {
        if (isValid()) {
            const monthly = parseFloat(monthlyDividend);
            const percent = parseFloat(annualReturnPercent);
            const annualDividend = monthly * 12;
            const required = annualDividend / (percent / 100);
            setRequiredInvestment(required);
        } else {
            setRequiredInvestment(null);
        }
    }, [monthlyDividend, annualReturnPercent]);

    return (
        <div
            className="max-w-3xl md:w-3xl mx-auto space-y-8 p-4 m-4 bg-white/30 dark:bg-white/10 rounded-xl border
                 border-white/30 dark:border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.1)]
                 dark:shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-lg"
        >
            <div className="flex justify-between items-center space-x-4 mx-auto">
                <h1 className="text-3xl font-bold">Dividend calculator</h1>
                <Button className="bg-white dark:bg-black/30">
                    <Link href="/calculation">
                        <Undo2 className="text-black dark:text-white" />
                    </Link>
                </Button>
            </div>

            <div className="space-y-4">
                <div>
                    <Input
                        id="monthly-dividend"
                        type="number"
                        value={monthlyDividend}
                        onChange={(e) => setMonthlyDividend(e.target.value)}
                        placeholder="Monthly income desired (baht)"
                    />
                </div>

                <div>
                    <Input
                        id="annual-return"
                        type="number"
                        value={annualReturnPercent}
                        onChange={(e) => setAnnualReturnPercent(e.target.value)}
                        placeholder="Annual return (%)"
                    />
                </div>
            </div>
            <Card>
                <CardContent className="p-6 text-center space-y-2">
                    {isValid() ? (
                        <>
                            <p className="text-sm text-muted-foreground">You will need to invest approximately</p>
                            <p className="text-2xl font-semibold text-green-600">
                                {requiredInvestment?.toLocaleString("th-TH", {
                                    style: "currency",
                                    currency: "THB",
                                })}
                            </p>
                        </>
                    ) : (
                        <p className="text-lg  font-medium">Waiting for information 😉</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
