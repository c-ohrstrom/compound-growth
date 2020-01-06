import CalculateCompoundGrowth from "./compound.js";

const calculateButton = document.querySelector("#button_calculateCompound");
const dividendRateInput = document.querySelector("#dividend-rate-input");
const monthlySavingsInput = document.querySelector("#monthly-saving");
const expectedGrowthInput = document.querySelector("#growth-rate-input");
const startingCapital = document.querySelector("#starting-capital");

calculateButton.addEventListener("click", () => {
    let dividendRate = parseInt(dividendRateInput.value);
    let years = parseInt(document.querySelector("#years-for-growth").value);
    let opts = {
        startCapital: parseInt(startingCapital.value),
        dividends: dividendRate / 100,
        yearsForCompound: years,
        savedMonthly: parseInt(monthlySavingsInput.value),
        expectedYearlyGrowth: expectedGrowthInput.value / 100,
        isReinvestingDividend: false,
    };

    let result = CalculateCompoundGrowth(opts);
    PrintCompound("#compound-result tbody", result);

    opts.isReinvestingDividend = true;
    let resultWithReinvestment = CalculateCompoundGrowth(opts);
    PrintCompound("#compound-result_dividend tbody", resultWithReinvestment);
});

expectedGrowthInput.addEventListener("change", () => {
    document.querySelector("#growth-rate-output").value =
        expectedGrowthInput.value + " %";
});

dividendRateInput.addEventListener("change", () => {
    document.querySelector("#dividend-rate-output").value =
        dividendRateInput.value + " %";
});

const PrintCompound = (element, result) => {
    let tableBody = "";
    result.forEach(item => {
        let tr = `<tr>
                <td>${item.year}</td>
                <td>${item.capital}</td>
				<td>${item.yearlyInvestment}</td>
                <td>${item.growth}</td>
                <td>${item.dividend}</td>
                <td>${item.capital + item.growth + item.dividend}</td>
                </tr>`;
        tableBody += tr;
    });
    let table = document.querySelector(element);
    table.innerHTML = "";
    table.innerHTML = tableBody;
};
