import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardSummary from '@/components/DashboardSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#f5e1c4] to-[#deb887] py-12">
      <div className="mx-auto max-w-screen-lg px-4">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-[#333]">
            Financial Dashboard
          </h1>
          <p className="mt-4 text-lg text-[#555] max-w-2xl mx-auto">
            Welcome to your Financial Dashboard! Here you can manage your transactions, 
            view monthly expenses, analyze category distribution, and track recent 
            activity at a glance. Use the tools below to add new transactions, review 
            detailed summaries, and gain insights into your spending habits to optimize 
            your financial planning.
          </p>
        </header>

        <div className="mb-10">
          <DashboardSummary />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="border border-[#a67c52] rounded-xl shadow-lg">
            <CardHeader className="border-b border-[#c9a66b] p-4">
              <CardTitle className="text-xl font-semibold text-[#5e4b3c]">
                Add Transaction
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <TransactionForm />
            </CardContent>
          </Card>

          <Card className="border border-[#a67c52] rounded-xl shadow-lg">
            <CardHeader className="border-b border-[#c9a66b] p-4">
              <CardTitle className="text-xl font-semibold text-[#5e4b3c]">
                Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <CategoryPieChart />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border border-[#a67c52] rounded-xl shadow-lg">
            <CardHeader className="border-b border-[#c9a66b] p-4">
              <CardTitle className="text-xl font-semibold text-[#5e4b3c]">
                Monthly Expenses
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <MonthlyExpensesChart />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border border-[#a67c52] rounded-xl shadow-lg">
            <CardHeader className="border-b border-[#c9a66b] p-4">
              <CardTitle className="text-xl font-semibold text-[#5e4b3c]">
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <TransactionList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
