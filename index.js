let button = document.querySelector("#calculate-compound");

button.addEventListener("click", () => {
    // let startingCapital = document.querySelector("#starting-capital");
    // let monthlySavings = document.querySelector("#monthly-saving").value;
    let dividendRate = document.querySelector("#dividendRate");
    let years = document.querySelector("#years-for-growth").value;
    let result = CalculateCompoundGrowth(100000, 1000, years, 0.07, 0.04, false);
    PrintCompound(result);
});

function PrintCompound(result) {
    let tableBody = "";
    let capital = 0;
    result.forEach(element => {
        capital += element.growth + element.dividend;
        let tr = `<tr>
            <td>${element.year}</td>
            <td>${element.growth}</td>
            <td>${element.dividend}</td>
            <td>${element.capital}</td>
            <td>${element.yearlyInvestment}</td>
        </tr>`;
        tableBody += tr;
    });
    let table = document.querySelector("#compound-result tbody");
    table.innerHTML = "";
    table.innerHTML = tableBody;
}

function CalculateCompoundGrowth(startCapital, monthlySavings, yearsForCompound, expectedYearlyGrowth, dividends, reinvestDividend) {
    let yearlyGainsList = [];
    let capital = startCapital * dividends + (monthlySavings * 12);
    for (let i = 1; i <= yearsForCompound; i++) {

        let dividend = capital * dividends;
        let savedYearly = monthlySavings * 12;
        let thisYearsGrowth = (capital + savedYearly) * expectedYearlyGrowth;

        capital += thisYearsGrowth;
        let capitalWithDividendReinvestment = 0;
        if (reinvestDividend) {
            capitalWithDividendReinvestment = capital + dividend;
            capital += capitalWithDividendReinvestment;
        }
        let year = {
            year: i,
            capital: Math.round(capital),
            growth: Math.round(thisYearsGrowth),
            dividend: Math.round(dividend),
            yearlyInvestment: savedYearly
        };
        console.log(year);
        yearlyGainsList.push(year)
    }
    return yearlyGainsList;
}