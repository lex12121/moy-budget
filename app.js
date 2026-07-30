// ====== Данные ======
let balance = Number(localStorage.getItem("balance")) || 0;
let operations = JSON.parse(localStorage.getItem("operations")) || [];
let currentType = "income";

// ====== Элементы ======
const balanceEl = document.getElementById("balance");
const operationsEl = document.getElementById("operations");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");

const amount = document.getElementById("amount");
const category = document.getElementById("category");
const comment = document.getElementById("comment");

const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// ====== Кнопки ======
incomeBtn.onclick = () => {
    currentType = "income";
    modalTitle.textContent = "Добавить зарплату";
    category.value = "💰 Зарплата";
    openModal();
};

expenseBtn.onclick = () => {
    currentType = "expense";
    modalTitle.textContent = "Добавить расход";
    openModal();
};

cancelBtn.onclick = closeModal;
saveBtn.onclick = saveOperation;

// ====== Окно ======
function openModal() {
    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
    amount.value = "";
    comment.value = "";
}

// ====== Сохранение операции ======
function saveOperation() {

    const sum = Number(amount.value);

    if (!sum || sum <= 0) {
        alert("Введите сумму");
        return;
    }

    const operation = {
        type: currentType,
        amount: sum,
        category: category.value,
        comment: comment.value,
        date: new Date().toLocaleDateString("ru-RU")
    };

    operations.unshift(operation);

    if (currentType === "income")
        balance += sum;
    else
        balance -= sum;

    saveData();
    render();

    closeModal();
}

// ====== Сохранить ======
function saveData() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("operations", JSON.stringify(operations));
}

// ====== Отрисовка ======
function render() {

    balanceEl.textContent = balance.toLocaleString("ru-RU") + " ₽";

    operationsEl.innerHTML = "";

    if (operations.length === 0) {

        operationsEl.innerHTML =
            '<li class="empty">Пока операций нет</li>';

        return;
    }

    operations.forEach(op => {

        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${op.type === "income" ? "🟢 +" : "🔴 -" }${op.amount.toLocaleString("ru-RU")} ₽</strong><br>
            ${op.category}<br>
            <small>${op.comment}</small><br>
            <small>${op.date}</small>
        `;

        operationsEl.appendChild(li);

    });

}

render();
// ===== Зарплатная неделя =====

function updateSalaryWeek() {

    const weekElement = document.getElementById("salaryWeek");

    const today = new Date();

    const day = today.getDay(); // 0-вс ... 5-пт

    const diff = (day >= 5) ? day - 5 : day + 2;

    const friday = new Date(today);

    friday.setDate(today.getDate() - diff);

    const thursday = new Date(friday);

    thursday.setDate(friday.getDate() + 6);

    weekElement.textContent =
        "💰 " +
        friday.toLocaleDateString("ru-RU") +
        " → " +
        thursday.toLocaleDateString("ru-RU");

}

updateSalaryWeek();function updateNextSalary(){

    const el = document.getElementById("nextSalary");

    const today = new Date();

    let friday = new Date(today);

    while(friday.getDay() !== 5){
        friday.setDate(friday.getDate()+1);
    }

    el.textContent =
        "Следующая зарплата: 💰 " +
        friday.toLocaleDateString("ru-RU");

}

updateNextSalary();