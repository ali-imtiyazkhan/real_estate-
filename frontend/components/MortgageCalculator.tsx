"use client";

import { useState, useId } from "react";

interface MortgageCalculatorProps {
  propertyPriceRaw?: string;
}

export default function MortgageCalculator({
  propertyPriceRaw,
}: MortgageCalculatorProps) {
  // Parse numbers from price string e.g. "$750,000" -> 750000
  const numericPrice = propertyPriceRaw
    ? parseInt(propertyPriceRaw.replace(/[^0-9]/g, "")) || 500000
    : 500000;

  const [price, setPrice] = useState<number>(numericPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenureYears, setTenureYears] = useState<number>(20);

  const priceId = useId();
  const downPaymentId = useId();
  const interestId = useId();
  const tenureId = useId();

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const principal = price - downPaymentAmount;

  // Monthly interest rate calculation
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else if (totalMonths > 0) {
    monthlyPayment = principal / totalMonths;
  }

  return (
    <div className="mt-8 p-6 bg-base-50 border border-base-200 rounded-xl">
      <div className="flex items-center justify-between pb-4 border-b border-base-200">
        <div>
          <h3 className="text-lg font-semibold text-base-900">
            🧮 Mortgage & Loan Calculator
          </h3>
          <p className="text-xs text-base-500">Estimate your monthly property payment</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-base-900">
            ₹{Math.round(monthlyPayment).toLocaleString()}
          </span>
          <span className="text-xs text-base-500 block">/ month</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <label htmlFor={priceId} className="block text-xs font-medium text-base-700 mb-1">
            Property Price: ₹{price.toLocaleString()}
          </label>
          <input
            id={priceId}
            type="range"
            min="100000"
            max="10000000"
            step="50000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            aria-label={`Property price: ₹${price.toLocaleString()}`}
            className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer accent-base-900"
          />
        </div>

        <div>
          <label htmlFor={downPaymentId} className="block text-xs font-medium text-base-700 mb-1">
            Down Payment ({downPaymentPercent}%): ₹{Math.round(downPaymentAmount).toLocaleString()}
          </label>
          <input
            id={downPaymentId}
            type="range"
            min="5"
            max="50"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            aria-label={`Down payment: ${downPaymentPercent}%`}
            className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer accent-base-900"
          />
        </div>

        <div>
          <label htmlFor={interestId} className="block text-xs font-medium text-base-700 mb-1">
            Interest Rate: {interestRate}% p.a.
          </label>
          <input
            id={interestId}
            type="range"
            min="4"
            max="15"
            step="0.25"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            aria-label={`Interest rate: ${interestRate}% per annum`}
            className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer accent-base-900"
          />
        </div>

        <div>
          <label htmlFor={tenureId} className="block text-xs font-medium text-base-700 mb-1">
            Loan Tenure: {tenureYears} Years
          </label>
          <input
            id={tenureId}
            type="range"
            min="5"
            max="30"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            aria-label={`Loan tenure: ${tenureYears} years`}
            className="w-full h-2 bg-base-200 rounded-lg appearance-none cursor-pointer accent-base-900"
          />
        </div>
      </div>
    </div>
  );
}
