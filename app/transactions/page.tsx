import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e1bb80] to-[#9c7e50] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#352208] mb-8 text-center">
          Financial Dashboard
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-[#7a5f38] shadow-lg">
            <CardHeader className="border-b border-[#bf9c68]">
              <CardTitle className="text-[#574120]">Add Transaction</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <TransactionForm />
            </CardContent>
          </Card>

          <Card className="border-[#7a5f38] shadow-lg">
            <CardHeader className="border-b border-[#bf9c68]">
              <CardTitle className="text-[#574120]">Monthly Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <MonthlyExpensesChart />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 border-[#7a5f38] shadow-lg">
            <CardHeader className="border-b border-[#bf9c68]">
              <CardTitle className="text-[#574120]">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <TransactionList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}