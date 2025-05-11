import CurrencyConverter from "@/components/calculation/CurrencyConverter";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Currensa | Currency Converter',
  description: 'Convert currencies instantly with real-time exchange rates. Use Currensa\'s accurate and easy-to-use currency converter to plan international transactions and investments.',
}

export default function Home() {
  return (
    <main>
      <CurrencyConverter />
    </main>
  );
}
