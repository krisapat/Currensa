"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
        <div className="relative flex justify-center items-center min-h-[80vh] overflow-hidden pt-28">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/1 via-white/70 to-transparent dark:from-white/10 dark:via-[#0c0c0c]/50 dark:to-transparent" />
            </div>
            <div className="relative w-[90vw] max-w-3xl mx-auto space-y-8 p-8 border-white/20 shadow-md backdrop-blur-lg rounded-xl
                      bg-white/50 dark:bg-white/10 z-10">
                <div className="flex justify-between items-center space-x-4 mx-auto">
                    <h1 className="text-3xl font-bold">Dividend calculator</h1>
                    <Button asChild className="bg-white dark:bg-black/30">
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
        </div>
    );
}
