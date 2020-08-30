const income = document.getElementById("income");
const balance = document.getElementById("balance");
const expenses = document.getElementById("expenses");
const closeBtn = document.getElementById("close");
const closeExpenseBtn = document.getElementById("close-expenses");
const incomeBtn = document.getElementById("btn-income");
const expenseBtn = document.getElementById("btn-expense");
const incomeModal = document.getElementById("incomeModal");
const expenseModal = document.getElementById("expenseModal");
const incomeForm = document.getElementById("incomeForm");
const expenseForm = document.getElementById("expenseForm");

function handleModal(param, element, value) {
	param.addEventListener("click", () => {
		element.style.transform = `translateX(${value})`;
		Attr(param);
	});
}

function Attr(param) {
	switch(param) {
		case incomeBtn:
		expenseBtn.setAttribute("disabled", true);
		break;

		case expenseBtn:
		incomeBtn.setAttribute("disabled", true);
		break;

		case closeBtn:
		expenseBtn.removeAttribute("disabled");
		break;

		default:
		incomeBtn.removeAttribute("disabled");
	}
}

handleModal(incomeBtn, incomeModal, "0");

handleModal(closeBtn, incomeModal, "-1000px");

handleModal(expenseBtn, expenseModal, "0");

handleModal(closeExpenseBtn, expenseModal, "1000px");

const storageItem = localStorage.getItem('transactions');

let data = storageItem !== null ? JSON.parse(storageItem) : [];

incomeForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const transaction = {
		id: Math.floor(Math.random() * 100000000),
		balance: parseInt(e.target.children[1].value, 10),
		income: parseInt(e.target.children[1].value, 10),
		incomeText: e.target.firstElementChild.value,
		expenses: parseInt(0, 10),
		expensesText: ""
	};

	data.push(transaction);

	addToDom(transaction);

	e.target.firstElementChild.value = "";

	e.target.children[1].value = "";

	updateValues();

	updateLocalStorage();
});

expenseForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const transaction = {
		id: Math.floor(Math.random() * 100000000),
		balance: parseInt((e.target.children[1].value * -1), 10),
		income: parseInt(0, 10),
		incomeText: "",
		expenses: parseInt(e.target.children[1].value, 10),
		expensesText: e.target.firstElementChild.value
	};

	data.push(transaction);

	addToDom(transaction);

	e.target.firstElementChild.value = "";

	e.target.children[1].value = "";

	updateValues();

	updateLocalStorage();
});

function updateValues() {
	const balance2 = data.map(transaction => transaction.balance);

	const total = balance2.reduce((acc, item) => acc + item, 0);

	const income2 = data.map(transaction => transaction.income);
	
	const totalIncome = income2.reduce((acc, item) => acc + item, 0);

	const totalExpenses2 = data.map(transaction => transaction.expenses);

	const totalExpenses = totalExpenses2.reduce((acc, item) => acc += item, 0);
	balance.textContent = total;
	income.textContent = totalIncome;
	expenses.textContent = totalExpenses;
}

function addToDom(values) {
	const item = document.createElement('div');
	item.classList.add("transactions");

	if (values.incomeText !== "") {
		item.classList.add("income");
		item.innerHTML = `
			<p>${values.incomeText}</p>
			<p>${values.income}</p>
			<span class="income-delete-btn" onclick="removeTransaction(${values.id})">&times;</span>
		`;
	}

	if (values.expensesText !== "") {
		item.classList.add("expenses");
		item.innerHTML = `
			<p>${values.expensesText}</p>
			<p style="color: red;"><b>${values.expenses}</b></p>
			<span class="delete-btn" onclick="removeTransaction(${values.id})">&times;</span>
		`;
	}

	document.querySelector("#output").appendChild(item);
}

function removeTransaction(id) {
	data = data.filter(ele => ele.id !== id);
	updateLocalStorage();
	init();
}

function updateLocalStorage() {
	localStorage.setItem("transactions", JSON.stringify(data));
}

function init() {
	document.querySelector("#output").innerHTML = '';
	data.forEach(addToDom);
	updateValues();
}

init();