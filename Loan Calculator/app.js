document.querySelector('#loan-form').addEventListener('submit',function(e){
	//hide result div
	document.getElementById('result').style.display = 'none';
	//show the loader
	document.getElementById('loading').style.display = 'block';
	setTimeout(loanCalculate, 2000);
	e.preventDefault();
});



//function loanCalculate
function loanCalculate(){
	
	/*variables*/
	const amount = document.querySelector('#amount');
	const interest = document.querySelector('#interest');
	const years = document.querySelector('#years');

	/*Results vars*/
	const monthlyPay = document.querySelector('#monthly-pay');
	const totalPay = document.querySelector('#total-pay');
	const totalInterest = document.querySelector('#total-interest');

	/*Calculation vars*/
	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) /100 /12;
	const calculatedYears = parseFloat(years.value) *12;

	/*Monthly Payment*/
	const x = Math.pow(1 + calculatedInterest, calculatedYears);
	const monthly = (principal*x*calculatedInterest)/(x-1);

	if(isFinite(monthly)){
		monthlyPay.value = monthly.toFixed(2);
		totalPay.value = (monthly * calculatedYears).toFixed(2);
		totalInterest.value = ((monthly * calculatedYears)-principal).toFixed(2);

		//show results
		document.getElementById('result').style.display = 'block';
		//hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		alertBox('Please check your inputs');
	};
}


//alert function
function alertBox(error){
	//hide results
	document.getElementById('result').style.display = 'none';
	//hide loader
	document.getElementById('loading').style.display = 'none';

	//craete a div
	const errDiv = document.createElement('div');

	//get element
	const parent = document.querySelector('.card');
	const child = document.querySelector('.heading');

	//add class
	errDiv.className = 'alert alert-danger';

	//create a text node
	errDiv.appendChild(document.createTextNode(error));

	parent.insertBefore(errDiv, child);

	//set a timer of the alert

	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 3000);

}