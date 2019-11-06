let button = document.querySelector("#calculate-compound");

button.addEventListener("click", () => {
	// let startingCapital = document.querySelector("#starting-capital");
	// let monthlySavings = document.querySelector("#monthly-saving").value;
	let dividendRate = document.querySelector("#dividendRate");
	let years = parseInt(document.querySelector("#years-for-growth").value);
	let opts = {
		startCapital: 100000,
		dividends: 0.05,
		yearsForCompound: years,
		savedMonthly: 1000,
		expectedYearlyGrowth: 0.07,
		reinvestDividend: true
	};

	let result = CalculateCompoundGrowth(opts);
	PrintCompound(result);
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
			yearlyInvestment: savedYearly
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
