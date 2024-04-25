'use client'
import AIAnalizer from '../components/AIAnalizer'
import { InvestmentBlock } from '../components/InvesmentBlock'
import { useSearchParams } from 'next/navigation'
enum InvestmentType {
    Needs = 'needs',
    Wants = 'wants',
    Savings = 'savings',
  }

const page = () => {
    const searchParams = useSearchParams()
    const amount = searchParams.get('amount')
    
  return (
    <div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InvestmentBlock title='Needs (50%)' type={InvestmentType.Needs} />
            <InvestmentBlock title='Wants (30%)' type={InvestmentType.Wants} />
            <InvestmentBlock title='Savings and Investments (20%)' type={InvestmentType.Savings} />
        </main>
        {/* IA */}
        <div>
            <label>AI analysis</label>
            <AIAnalizer />
        </div>

    </div>
  )
}

export default page