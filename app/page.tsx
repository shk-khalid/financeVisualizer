import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletIcon, BarChart3, PieChart, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e1bb80] to-[#9c7e50]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center blur-3xl opacity-20">
              <WalletIcon className="w-48 h-48 text-[#574120]" />
            </div>
            <WalletIcon className="w-24 h-24 mx-auto text-[#574120] animate-bounce" />
          </div>
          
          <h1 className="text-6xl font-bold tracking-tight text-[#352208] drop-shadow-lg">
            Personal Finance Visualizer
          </h1>
          <p className="text-2xl text-[#7a5f38] max-w-2xl mx-auto leading-relaxed">
            Track your expenses, visualize your spending patterns, and take control
            of your financial future with our intuitive tools.
          </p>
          <div className="flex justify-center gap-6 pt-4">
            <Link href="/transactions">
              <Button 
                size="lg" 
                className="bg-[#574120] hover:bg-[#352208] text-white px-8 py-6 text-lg transform hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transform hover:-translate-y-1 transition-transform duration-200">
            <BarChart3 className="w-12 h-12 text-[#574120] mb-4" />
            <h3 className="text-2xl font-bold text-[#352208] mb-4">
              Expense Tracking
            </h3>
            <p className="text-[#7a5f38]">
              Easily log and categorize your daily expenses with our intuitive interface.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transform hover:-translate-y-1 transition-transform duration-200">
            <PieChart className="w-12 h-12 text-[#574120] mb-4" />
            <h3 className="text-2xl font-bold text-[#352208] mb-4">
              Visual Analytics
            </h3>
            <p className="text-[#7a5f38]">
              Understand your spending patterns through beautiful and insightful charts.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl transform hover:-translate-y-1 transition-transform duration-200">
            <TrendingUp className="w-12 h-12 text-[#574120] mb-4" />
            <h3 className="text-2xl font-bold text-[#352208] mb-4">
              Financial Insights
            </h3>
            <p className="text-[#7a5f38]">
              Get valuable insights about your spending habits and financial trends.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-[#574120]">
        <p className="text-sm">
          © 2024 Personal Finance Visualizer. All rights reserved.
        </p>
      </footer>
    </div>
  );
}