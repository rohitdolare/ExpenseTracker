////////Model part////////

let totalExpence = 0;
const AllExpenses = [];

////////Controller part////////

const inputAmountEl = document.querySelector("#inputAmount");
const inputDescEl = document.querySelector("#inputDesc");

const headingDisplayEl = document.querySelector("#headingDisplay");
const divDisplayTable = document.querySelector("#tableOfExpenses");

headingDisplayEl.textContent = totalExpence;

function IncrementExpense() {
  const expenseItem = {};

  const textAmount = inputAmountEl.value;
  const textDesc = inputDescEl.value;

  // validation
  if (textAmount === "" || textDesc === "") {
    alert("please fill both field");
    return;
  }
  const intAmount = parseInt(textAmount, 10);

  totalExpence = totalExpence + intAmount;

  let textToDisplay = `Total : ${totalExpence}`;
  headingDisplayEl.textContent = textToDisplay;

  expenseItem.amount = intAmount;
  expenseItem.desc = textDesc;
  expenseItem.moment = new Date();

  AllExpenses.push(expenseItem);

  renderListItem(AllExpenses);

  // Clear the input fields
  inputAmountEl.value = "";
  inputDescEl.value = "";
}

const btnAddEl = document.querySelector("#btnAdd");
btnAddEl.addEventListener("click", IncrementExpense, false);

//get date string
function getDateString(moment) {
  return moment.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

//deleting item
function deleteItem(dateValue) {
  const index = AllExpenses.findIndex(
    (expense) => expense.moment.valueOf() === dateValue
  );

  if (index !== -1) {
    const deletedExpense = AllExpenses.splice(index, 1)[0];
    console.log(deletedExpense);
    totalExpence -= deletedExpense.amount;
    headingDisplayEl.textContent = `Total : ${totalExpence}`;
    renderListItem(AllExpenses);
  }
}

////////view part////////
//render items
function renderListItem(arrOfList) {
  const AllExpensesHtml = arrOfList.map((expense) => createListItem(expense));
  let joinedAllExpense = AllExpensesHtml.join("");
  divDisplayTable.innerHTML = joinedAllExpense;
}

function createListItem({ desc, amount, moment }) {
  return `<li class="list-group-item d-flex justify-content-between">
                        <div class="d-flex flex-column">
                            ${desc}
                            <small class="text-muted">${getDateString(
                              moment
                            )}</small>
                        </div>
                        <div>
                            <span class="px-5">
                                ${amount}
                            </span>
                            <button 
                            type="button" 
                            class="btn btn-outline-danger btn-sm"
                            onclick="deleteItem(${moment.valueOf()})"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>`;
}
