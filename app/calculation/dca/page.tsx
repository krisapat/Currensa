import DCA from "@/components/calculation/DCA";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Currensa | Calculators | DCA',
  description: 'Calculate your Dollar-Cost Averaging (DCA) investment strategy to optimize long-term growth. Plan recurring investments and analyze outcomes with Currensa\'s smart DCA calculator.',
}

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 ">
      <DCA />
    </main>
  );
}
