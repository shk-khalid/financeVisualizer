import mongoose from 'mongoose';
import { CATEGORIES } from './Transaction';

export interface Budget {
    _id: string;
    category: typeof CATEGORIES[number];
    amount: number;
    month: string; // Format: YYYY-MM
    createdAt?: string;
    updatedAt?: string;
}



const BudgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: CATEGORIES,
    },
    amount: {
        type: Number,
        required: [true, 'Please add a budget amount'],
        min: [0, 'Budget amount cannot be negative'],
    },
    month: {
        type: String,
        required: [true, 'Please specify the month'],
        validate: {
            validator: function (v: string) {
                return /^\d{4}-\d{2}$/.test(v);
            },
            message: (props: { value: string }) => `${props.value} is not a valid month format! Use YYYY-MM`
        }
    }
}, {
    timestamps: true,
});

// Compound unique index to ensure one budget per category per month
BudgetSchema.index({ category: 1, month: 1 }, { unique: true });

const Budget = mongoose.models?.Budget || mongoose.model('Budget', BudgetSchema);

export default Budget;