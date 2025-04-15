import mongoose from 'mongoose';

export const CATEGORIES = [
  'Food',
  'Rent',
  'Transport',
  'Utilities',
  'Entertainment',
  'Other'
] as const;

export type TransactionCategory = typeof CATEGORIES[number];

export interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  category: TransactionCategory;
  createdAt?: string;
  updatedAt?: string;
}

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please add an amount'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: CATEGORIES,
  }
}, {
  timestamps: true,
});

const Transaction = mongoose.models?.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;