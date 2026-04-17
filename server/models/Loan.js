const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in months
    required: true
  },
  interestRate: {
    type: Number,
    default: 5 // 5% default
  },
  monthlyPayment: {
    type: Number
  },
  totalPayment: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'completed'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  approvedDate: {
    type: Date
  },
  rejectedDate: {
    type: Date
  }
});

module.exports = mongoose.model('Loan', loanSchema);