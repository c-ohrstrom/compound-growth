"use strict";

const CalculateCompoundGrowth = opts => {
    let yearlyGainsList = [];
    let capital = opts.startCapital;
    for (let i = 1; i <= opts.yearsForCompound; i++) {
        let startCapital = capital;
        let dividend = GetDividend(capital, opts.dividends);

        if (opts.isReinvestingDividend) capital += dividend;

        let savedYearly = opts.savedMonthly * 12;
        capital += savedYearly;
        let thisYearsGrowth = YearsGrowth(
            capital,
            savedYearly,
            opts.expectedYearlyGrowth
        );
        capital += thisYearsGrowth;

        let year = {
            year: i,
            capital: Math.round(startCapital),
            growth: Math.round(thisYearsGrowth),
            dividend: Math.round(dividend),
            yearlyInvestment: savedYearly,
            capitalEnd: Math.round(capital),
        };
        yearlyGainsList.push(year);
    }
    return yearlyGainsList;
};

const YearsGrowth = (capital, yearlySavings, growth) => {
    return (capital + yearlySavings) * growth;
};

const GetDividend = (capital, dividendRate) => {
    return capital * dividendRate;
};

export default CalculateCompoundGrowth;
