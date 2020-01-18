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

const tabs = document.querySelectorAll(".button-tab");

window.onload = () => {
    tabs.forEach(item => {
        item.addEventListener("click", item => {
            ToggleTab(item.currentTarget);
        });
    });
};

const ToggleTab = obj => {
    let tabs = document.querySelectorAll(".table-compound");
    tabs.forEach(tab => {
        tab.parentElement.classList.add("hidden");
    });
    let tableToShow = document.querySelector(
        "#" + obj.getAttribute("data-target-id")
    );
    tableToShow.parentElement.classList.remove("hidden");
};

const PrintCompound = (element, result) => {
    let tableBody = "";
    result.forEach(item => {
        let tr = `<tr>
                <td>${item.year}</td>
                <td>${NumberWithSpaces(item.capital)} kr</td>
				<td>+${NumberWithSpaces(item.yearlyInvestment)} kr</td>
                <td>+${NumberWithSpaces(item.growth)} kr</td>
                <td>+${NumberWithSpaces(item.dividend)} kr</td>
                <td>${NumberWithSpaces(
                    item.capital + item.growth + item.dividend
                )} kr</td>
                </tr>`;
        tableBody += tr;
    });
    let table = document.querySelector(element);
    table.innerHTML = "";
    table.innerHTML = tableBody;
};

const NumberWithSpaces = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
