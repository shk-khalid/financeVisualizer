import TransactionForm from '@/components/transactions/TransactionForm';
import TransactionList from '@/components/transactions/TransactionList';
import MonthlyExpensesChart from '@/components/transactions/MonthlyExpensesChart';
import CategoryPieChart from '@/components/transactions/CategoryPieChart';
import DashboardSummary from '@/components/transactions/DashboardSummary';
import BudgetForm from '@/components/transactions/BudgetForm';
import BudgetComparison from '@/components/transactions/BudgetComparison';
import BudgetInsights from '@/components/transactions/BudgetInsights';
import { Card, CardContent } from '@/components/ui/card';
import { MutationProvider } from '@/contexts/MutationContext';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#f5e1c4] to-[#deb887] py-12">
      <MutationProvider>
        <div className="mx-auto max-w-screen-lg px-4">
          <header className="mb-10 text-center">
            <h1 className="text-5xl font-extrabold text-[#333]">
              PiggyTrack Dashboard
            </h1>
            <p className="mt-4 text-lg text-[#555] max-w-2xl mx-auto">
              Welcome to your PiggyTrack Dashboard! Here you can manage your transactions, 
              set budgets, track spending patterns, and gain valuable insights into your 
              financial habits. Use the tools below to maintain better control over your 
              finances and make informed decisions about your money.
            </p>
          </header>

          <div className="mb-10">
            <DashboardSummary />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card id="transaction-form-section" className="border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <TransactionForm />
              </CardContent>
            </Card>

            <Card id="budget-form-section" className="border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <BudgetForm />
              </CardContent>
            </Card>

            <Card className="border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <CategoryPieChart />
              </CardContent>
            </Card>

            <Card className="border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <MonthlyExpensesChart />
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <BudgetComparison />
              </CardContent>
            </Card>

            <Card className="md:col-span-2 border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <BudgetInsights />
              </CardContent>
            </Card>

            <Card id="transactions-list-section" className="md:col-span-2 border border-[#a67c52] rounded-xl shadow-lg">
              <CardContent className="p-0">
                <TransactionList />
              </CardContent>
            </Card>
          </div>
        </div>
      </MutationProvider>
    </div>
  );
}