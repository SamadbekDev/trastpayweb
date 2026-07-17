"use client";

import React, { useState, useEffect } from "react";
import { 
  Calculator, 
  ArrowRightLeft, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  ChevronRight,
  Info
} from "lucide-react";

type LoanType = "auto" | "micro" | "consumer";

interface LoanConfig {
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  defaultAmount: number;
  minTerm: number;
  maxTerm: number;
  stepTerm: number;
  defaultTerm: number;
  rate: number;
  label: string;
}

const loanConfigs: Record<LoanType, LoanConfig> = {
  auto: {
    minAmount: 30000000,
    maxAmount: 400000000,
    stepAmount: 5000000,
    defaultAmount: 150000000,
    minTerm: 12,
    maxTerm: 60,
    stepTerm: 6,
    defaultTerm: 36,
    rate: 0.22,
    label: "Auto Loan (22% APR)"
  },
  micro: {
    minAmount: 5000000,
    maxAmount: 50000000,
    stepAmount: 1000000,
    defaultAmount: 20000000,
    minTerm: 3,
    maxTerm: 24,
    stepTerm: 3,
    defaultTerm: 12,
    rate: 0.24,
    label: "Microloan (24% APR)"
  },
  consumer: {
    minAmount: 10000000,
    maxAmount: 100000000,
    stepAmount: 2000000,
    defaultAmount: 40000000,
    minTerm: 6,
    maxTerm: 36,
    stepTerm: 6,
    defaultTerm: 24,
    rate: 0.23,
    label: "Consumer Credit (23% APR)"
  }
};

interface RateInfo {
  code: string;
  name: string;
  flag: string;
  buy: number;
  sell: number;
  cb: number;
}

const initialRates: RateInfo[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸", buy: 12650, sell: 12720, cb: 12685 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", buy: 13520, sell: 13690, cb: 13580 },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", buy: 140, sell: 148, cb: 143.5 }
];

export default function QuickTools() {
  const [activeTab, setActiveTab] = useState<"calc" | "rates">("calc");
  
  // Calculator States
  const [selectedLoan, setSelectedLoan] = useState<LoanType>("auto");
  const [loanAmount, setLoanAmount] = useState(loanConfigs.auto.defaultAmount);
  const [loanTerm, setLoanTerm] = useState(loanConfigs.auto.defaultTerm);
  const [calcResult, setCalcResult] = useState({
    monthly: 0,
    totalInterest: 0,
    totalRepayment: 0
  });

  // Currency Converter States
  const [convertAmount, setConvertAmount] = useState<string>("100");
  const [convertFrom, setConvertFrom] = useState<string>("USD");
  const [convertTo, setConvertTo] = useState<string>("UZS");
  const [convertResult, setConvertResult] = useState<number>(0);

  // Update calculator ranges when loan type changes
  useEffect(() => {
    const config = loanConfigs[selectedLoan];
    setLoanAmount(config.defaultAmount);
    setLoanTerm(config.defaultTerm);
  }, [selectedLoan]);

  // Compute PMT Loan calculations
  useEffect(() => {
    const config = loanConfigs[selectedLoan];
    const principal = loanAmount;
    const annualRate = config.rate;
    const termMonths = loanTerm;

    const r = annualRate / 12; // Monthly rate
    const pmt = (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
    
    const monthlyPayment = Math.round(pmt);
    const totalRepayment = monthlyPayment * termMonths;
    const totalInterest = totalRepayment - principal;

    setCalcResult({
      monthly: monthlyPayment,
      totalInterest,
      totalRepayment
    });
  }, [loanAmount, loanTerm, selectedLoan]);

  // Currency converter logic
  useEffect(() => {
    const amount = parseFloat(convertAmount) || 0;
    if (amount <= 0) {
      setConvertResult(0);
      return;
    }

    const ratesMap = initialRates.reduce((acc, r) => {
      acc[r.code] = r;
      return acc;
    }, {} as Record<string, RateInfo>);

    if (convertFrom === "UZS" && convertTo !== "UZS") {
      // UZS to foreign (use bank selling rate)
      const targetRate = ratesMap[convertTo]?.sell || 1;
      setConvertResult(amount / targetRate);
    } else if (convertFrom !== "UZS" && convertTo === "UZS") {
      // Foreign to UZS (use bank buying rate)
      const sourceRate = ratesMap[convertFrom]?.buy || 1;
      setConvertResult(amount * sourceRate);
    } else if (convertFrom !== "UZS" && convertTo !== "UZS") {
      // Foreign to Foreign
      const sourceInUZS = amount * (ratesMap[convertFrom]?.buy || 1);
      const targetRate = ratesMap[convertTo]?.sell || 1;
      setConvertResult(sourceInUZS / targetRate);
    } else {
      // Same currency
      setConvertResult(amount);
    }
  }, [convertAmount, convertFrom, convertTo]);

  // Currency switcher
  const handleSwapCurrencies = () => {
    const temp = convertFrom;
    setConvertFrom(convertTo);
    setConvertTo(temp);
  };

  const formatUZS = (val: number) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Interactive Banking Services
          </h2>
          <p className="text-text-muted mt-3 text-sm md:text-base">
            Instantly calculate credit payments or check current currency exchange rates in Uzbekistan Sums.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-white border border-slate-200 shadow-sm p-1 rounded-2xl flex">
            <button
              onClick={() => setActiveTab("calc")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all text-sm ${
                activeTab === "calc"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-slate-600 hover:text-primary hover:bg-slate-50"
              }`}
            >
              <Calculator size={16} />
              <span>Loan Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab("rates")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all text-sm ${
                activeTab === "rates"
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-slate-600 hover:text-primary hover:bg-slate-50"
              }`}
            >
              <ArrowRightLeft size={16} />
              <span>Exchange Rates</span>
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "calc" ? (
            /* Loan Calculator Form Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8 lg:p-10 animate-fade-in-up">
              
              {/* Sliders Area (8 cols) */}
              <div className="lg:col-span-7 space-y-8">
                {/* Loan Type Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Select Loan Category
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(loanConfigs) as LoanType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedLoan(type)}
                        className={`py-3 px-3 rounded-xl text-xs md:text-sm font-bold border transition-all text-center ${
                          selectedLoan === type
                            ? "border-primary bg-blue-50/50 text-primary"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {type === "auto" ? "Auto" : type === "micro" ? "Micro" : "Consumer"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Loan Amount</span>
                    <span className="text-base font-extrabold text-primary">
                      {formatUZS(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={loanConfigs[selectedLoan].minAmount}
                    max={loanConfigs[selectedLoan].maxAmount}
                    step={loanConfigs[selectedLoan].stepAmount}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary border border-slate-200"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1.5 font-medium">
                    <span>{formatUZS(loanConfigs[selectedLoan].minAmount).split(" UZS")[0]}</span>
                    <span>{formatUZS(loanConfigs[selectedLoan].maxAmount)}</span>
                  </div>
                </div>

                {/* Term Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Repayment Period</span>
                    <span className="text-base font-extrabold text-primary">
                      {loanTerm} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min={loanConfigs[selectedLoan].minTerm}
                    max={loanConfigs[selectedLoan].maxTerm}
                    step={loanConfigs[selectedLoan].stepTerm}
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary border border-slate-200"
                  />
                  <div className="flex justify-between text-xs text-text-muted mt-1.5 font-medium">
                    <span>{loanConfigs[selectedLoan].minTerm} mos</span>
                    <span>{loanConfigs[selectedLoan].maxTerm} mos ({loanConfigs[selectedLoan].maxTerm / 12} yrs)</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 bg-blue-50/60 border border-blue-100 p-4 rounded-2xl text-xs text-blue-800 leading-relaxed font-medium">
                  <Info size={18} className="shrink-0 text-primary" />
                  <span>Calculations are calculated using the annuity method. Interest rates shown are initial annual rates and may be adjusted based on co-borrower status.</span>
                </div>
              </div>

              {/* Calculator Summary Column (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-br from-primary to-blue-800 rounded-3xl p-6 text-white flex flex-col justify-between shadow-lg shadow-primary/20">
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-base font-bold tracking-wide uppercase text-blue-200 mb-1">
                      Estimation Summary
                    </h3>
                    <p className="text-xs text-blue-100">
                      {loanConfigs[selectedLoan].label}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-[11px] font-semibold text-blue-200 uppercase tracking-wider mb-0.5">
                        Monthly Payment
                      </span>
                      <span className="text-3xl font-extrabold block text-white tracking-tight">
                        {formatUZS(calcResult.monthly)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div>
                        <span className="block text-[10px] font-semibold text-blue-200 uppercase tracking-wider mb-0.5">
                          Total Interest
                        </span>
                        <span className="text-sm font-bold text-white">
                          {formatUZS(calcResult.totalInterest)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-blue-200 uppercase tracking-wider mb-0.5">
                          Total Repayment
                        </span>
                        <span className="text-sm font-bold text-white">
                          {formatUZS(calcResult.totalRepayment)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <a
                    href="#order"
                    className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
                  >
                    <span>Apply for Loan</span>
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>

            </div>
          ) : (
            /* Currency rates and interactive converter layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8 lg:p-10 animate-fade-in-up">
              
              {/* Rates Display Table (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 flex items-center mb-1">
                    Exchange Rates <TrendingUp size={16} className="ml-1.5 text-emerald-500" />
                  </h3>
                  <p className="text-xs text-text-muted font-medium">
                    Commercial exchange rates valid as of today. Rates are expressed in Uzbek Sums (UZS).
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <th className="py-3 px-2">Currency</th>
                        <th className="py-3 px-2 text-right">Buying</th>
                        <th className="py-3 px-2 text-right">Selling</th>
                        <th className="py-3 px-2 text-right text-slate-400">CB Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm font-semibold text-slate-700">
                      {initialRates.map((rate) => (
                        <tr key={rate.code} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-2 flex items-center space-x-3">
                            <span className="text-xl" role="img" aria-label={rate.name}>{rate.flag}</span>
                            <div>
                              <span className="font-bold block text-slate-800">{rate.code}</span>
                              <span className="text-[10px] text-text-muted block font-medium">{rate.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right font-bold text-slate-800">
                            {rate.buy.toLocaleString()}
                          </td>
                          <td className="py-3 px-2 text-right font-bold text-primary">
                            {rate.sell.toLocaleString()}
                          </td>
                          <td className="py-3 px-2 text-right text-slate-400 font-medium">
                            {rate.cb.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-100 p-4 rounded-xl text-[11px] text-text-muted leading-relaxed font-medium">
                  <Calendar size={14} className="shrink-0 text-primary" />
                  <span>Central Bank rates are sourced from the Central Bank of Uzbekistan. Commercial rates may fluctuate slightly during banking operation hours.</span>
                </div>
              </div>

              {/* Interactive Currency Converter Column (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-150 rounded-3xl p-6 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                      Currency Converter
                    </h3>
                  </div>

                  {/* Input Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={convertAmount}
                      onChange={(e) => setConvertAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-white border border-slate-200 focus:border-primary px-4 py-3 rounded-xl font-bold text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Convert currencies selects */}
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-5">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        From
                      </label>
                      <select
                        value={convertFrom}
                        onChange={(e) => {
                          setConvertFrom(e.target.value);
                          if (e.target.value === "UZS" && convertTo === "UZS") setConvertTo("USD");
                          else if (e.target.value !== "UZS") setConvertTo("UZS");
                        }}
                        className="w-full bg-white border border-slate-200 px-3 py-3 rounded-xl font-bold text-slate-700 text-sm focus:outline-none"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUB">RUB</option>
                        <option value="UZS">UZS</option>
                      </select>
                    </div>

                    <div className="col-span-2 flex justify-center pt-5">
                      <button 
                        onClick={handleSwapCurrencies}
                        className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:text-primary rounded-xl transition-all shadow-sm active:scale-90"
                        title="Swap currencies"
                      >
                        <ArrowRightLeft size={14} className="rotate-90 sm:rotate-0" />
                      </button>
                    </div>

                    <div className="col-span-5">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">
                        To
                      </label>
                      <select
                        value={convertTo}
                        onChange={(e) => {
                          setConvertTo(e.target.value);
                          if (e.target.value === "UZS" && convertFrom === "UZS") setConvertFrom("USD");
                          else if (e.target.value !== "UZS") setConvertFrom("UZS");
                        }}
                        className="w-full bg-white border border-slate-200 px-3 py-3 rounded-xl font-bold text-slate-700 text-sm focus:outline-none"
                      >
                        <option value="UZS">UZS</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUB">RUB</option>
                      </select>
                    </div>
                  </div>

                  {/* Converter Result Box */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                    <span className="text-xs font-semibold text-text-muted uppercase mb-1">
                      Estimated Conversion
                    </span>
                    <span className="text-xl font-extrabold text-slate-800">
                      {convertResult.toLocaleString(undefined, {
                        maximumFractionDigits: convertTo === "UZS" ? 0 : 2,
                        minimumFractionDigits: convertTo === "UZS" ? 0 : 2
                      })}{" "}
                      {convertTo}
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200">
                  <div className="flex items-center space-x-2 text-[10px] text-text-muted font-medium">
                    <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                    <span>Real-time values. Visit local branch for physical swaps.</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  );
}
