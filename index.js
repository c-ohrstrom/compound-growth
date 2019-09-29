function CalculateCompoundGrowth(startCapital, monthlySavings, yearsForCompound, expectedGrowth, dividends, doesReinvest) {
    let yearlyGainsList = [];
    let capital = startCapital * dividends + (monthlySavings * 12);
    for (let i = 0; i < yearsForCompound; i++) {
        
        capital += capital * dividends;
        capital += monthlySavings * 12;
        let year = {
            year: i,
            growth: capital
        };
        yearlyGainsList.push(year)
    }
    return yearlyGainsList;
}