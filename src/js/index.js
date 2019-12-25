let calculateButton = document.querySelector("#calculate-compound");
const dividendRateInput = document.querySelector("#dividend-rate-input");
const monthlySavingsInput = document.querySelector("#saved-monthly");
const expectedGrowthInput = document.querySelector("#expected-Growth");
const startingCapital = document.querySelector("#start-capital");
calculateButton.addEventListener("click", () => {
    let dividendRate = parseInt(dividendRateInput.value);
    let years = parseInt(document.querySelector("#years-for-growth").value);
    let opts = {
        startCapital: startingCapital.value,
        dividends: dividendRate,
        yearsForCompound: years,
        savedMonthly: monthlySavingsInput.value,
        expectedYearlyGrowth: expectedGrowthInput.value / 100,
        reinvestDividend: true,
    };

    let result = CalculateCompoundGrowth(opts);
    PrintCompound(result);
});

dividendRateInput.addEventListener("change", () => {
    document.querySelector("#dividend-rate-output").value =
        dividendRateInput.value + " %";
});

class Compound {
    constructor(startCapital, savedMonthly) {
        (this.startCapital = startCapital), (this.savedMonthly = savedMonthly);
    }

    GetYearlySavings() {
        return this.savedMonthly * 12;
    }
}

function CalculateCompoundGrowth(opts) {
    console.log(opts);
    let yearlyGainsList = [];
    let capital = opts.startCapital * opts.dividends;
    for (let i = 1; i <= opts.yearsForCompound; i++) {
        let dividend = GetDividend(capital, opts.dividends);
        let savedYearly = opts.savedMonthly * 12;
        let thisYearsGrowth = YearsGrowth(
            capital,
            savedYearly,
            opts.expectedYearlyGrowth
        );

        capital += thisYearsGrowth;
        let capitalWithDividendReinvestment = 0;

        if (opts.reinvestDividend) {
            capitalWithDividendReinvestment = capital + dividend;
            capital += capitalWithDividendReinvestment;
        }

        let year = {
            year: i,
            capital: Math.round(capital),
            growth: Math.round(thisYearsGrowth),
            dividend: Math.round(dividend),
            yearlyInvestment: savedYearly,
        };

        console.log(year);
        yearlyGainsList.push(year);
    }
    return yearlyGainsList;
}

function YearsGrowth(capital, yearlySavings, growth) {
    return (capital + yearlySavings) * growth;
}

function GetDividend(capital, dividendRate) {
    return capital * dividendRate;
}

function PrintCompound(result) {
    let tableBody = "";
    result.forEach(element => {
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
