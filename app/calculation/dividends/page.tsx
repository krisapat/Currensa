import DividendCalculator from "@/components/calculation/DividendCalculator";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Currensa | Dividend Calculator',
  description: 'Estimate your dividend income with Currensa\'s smart calculator. Analyze yields, payout schedules, and total returns to plan for passive income and long-term investment growth.',
}

export default function Home() {
  return (
    <main>
      <DividendCalculator />
    </main>
  );
}
