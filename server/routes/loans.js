const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const auth = require('../middleware/auth');


// Apply for loan
router.post('/apply', auth, async (req, res) => {
  try {
    let { amount, purpose, duration, interestRate } = req.body;

    amount = Number(amount);
    duration = Number(duration);
    interestRate = Number(interestRate) || 5;

    if (!amount || !purpose || !duration) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (amount <= 0 || duration <= 0) {
      return res.status(400).json({ error: 'Amount and duration must be valid numbers' });
    }

    // Monthly interest rate
    const rate = interestRate / 100 / 12;

    const monthlyPayment =
      (amount * rate * Math.pow(1 + rate, duration)) /
      (Math.pow(1 + rate, duration) - 1);

    const totalPayment = monthlyPayment * duration;

    const loan = await Loan.create({
      userId: req.user._id,
      amount,
      purpose,
      duration,
      interestRate,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      loan
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Dashboard stats
router.get('/dashboard/stats', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user._id });

    const stats = {
      totalLoans: loans.length,
      pendingLoans: loans.filter(l => l.status === 'pending').length,
      approvedLoans: loans.filter(l => l.status === 'approved').length,
      activeLoans: loans.filter(l => l.status === 'active').length,
      rejectedLoans: loans.filter(l => l.status === 'rejected').length,
      completedLoans: loans.filter(l => l.status === 'completed').length,

      totalBorrowed: loans
        .filter(l => l.status === 'approved' || l.status === 'active')
        .reduce((sum, l) => sum + l.amount, 0),

      totalRepayment: loans
        .filter(l => l.status === 'approved' || l.status === 'active')
        .reduce((sum, l) => sum + Number(l.totalPayment), 0)
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get user's loans
router.get('/my-loans', auth, async (req, res) => {
  try {

    const loans = await Loan.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      loans
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get single loan
router.get('/:id', auth, async (req, res) => {
  try {

    const loan = await Loan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json({
      success: true,
      loan
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;