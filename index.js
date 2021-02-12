'use strict';
/**
 * Lesson11
 */
// ! регулярное выражение
// ? ^[?!,.а-яА-ЯёЁ0-9\s]+$  кириллица пробелы и знаки
//? ^[а-я]
//? /^[?!.,a-zA-Z0-9\s]+$/ english symbols 
//? ^beginstring
//? endofstring$

//buttons
const startBtn = document.getElementById('start');   //? start
const cancelBtn = document.getElementById('cancel');
//другие кнопки buttons plus
const buttons = document.getElementsByTagName('button'); //NodeList buttons 0, 1, ..
// const incomeAddBtn = buttons[0]; //
// const expensesAddBtn = buttons[1]; //


//! data весь блок с input слева


const inputSalaryAmount = document.querySelector('.salary-amount'); //Месячный доход salary
const inputIncomeTitle = document.querySelector('input.income-title'); //Дополнительный доход income title
const inputIncomeAmount = document.querySelector('input.income-amount'); //Дополнительный доход income размер

const incomeAddBtn = buttons[0]; //? incomePlus КНОПКА + добавить поле ввода поля дополнительных доходов

const additionalIncomeItem = document.querySelectorAll('.additional_income-item'); // Возможный доход через запятую
const inputExpensesTitle = document.querySelector('input.expenses-title'); // Обязательные расходы наименование
const inputExpensesAmount = document.querySelector('input.expenses-amount'); // Обязательные расходы размер
let expensesItems = document.querySelectorAll('.expenses-items'); // * 08:22 block

const expensesAddBtn = buttons[1]; //? expensesPlus КНОПКА + добавить поле ввода поля дополнительных расходов

const inputAdditionalExpensesItem = document.querySelector('input.additional_expenses-item'); // Возможные расходы <span>(перечислите через запятую)</span>
const depositCheck = document.querySelector('#deposit-check'); //check галочка наличие депозита
const selectDepositBank = document.querySelector('.deposit-bank'); //* выбор банка скрыто
const inputDepositAmount = document.querySelector('.input.deposit-amount'); //сумма депозита .deposit-calc скрыто
const inputDepositPercent = document.querySelector('.input.deposit-percent'); //процент депозита .deposit-calc скрыто
const inputTargetAmount = document.querySelector('.target-amount'); //цель сумма
const inputPeriodSelect = document.querySelector('input.period-select'); //Выбор Периода расчета 
const periodAmount = document.querySelector('.period-amount'); //Период расчета отображение



//! result весь блок с результатами справа //

const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0]; // Доход за месяц
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; // Дневной бюджет
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; // Расход за месяц
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; // Возможные доходы
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; // Возможные расходы
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; // Накопления за период
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; // Срок достижения цели в месяцах


// * console.log('button: ', buttons);
/*
console.log('inputSalaryAmount: ', inputSalaryAmount);
console.log('inputIncomeTitle: ', inputIncomeTitle);
console.log('inputIncomeAmount: ', inputIncomeAmount);
console.log('additionalIncomeItem: ', additionalIncomeItem);
console.log('incomeAddBtn: ', incomeAddBtn);
console.log('expensesItems: ', expensesItems);
console.log('inputExpensesTitle: ', inputExpensesTitle);
console.log('inputExpensesAmount: ', inputExpensesAmount);
console.log('expensesAddBtn: ', expensesAddBtn);
console.log('inputAdditionalExpensesItem: ', inputAdditionalExpensesItem);
console.log('depositCheck: ', depositCheck);
console.log('selectDepositBank: ', selectDepositBank);
console.log('inputDepositAmount: ', inputDepositAmount);
console.log('inputDepositPercent: ', inputDepositPercent);
console.log('inputTargetAmount: ', inputTargetAmount);
console.log('inputPeriodSelect: ', inputPeriodSelect);
console.log('periodAmount: ', periodAmount);

console.log('budgetMonthValue: ', budgetMonthValue);
console.log('budgetDayValue: ', budgetDayValue);
console.log('expensesMonthValue: ', expensesMonthValue);
console.log('additionalIncomeValue: ', additionalIncomeValue);
console.log('additionalExpensesValue: ', additionalExpensesValue);
console.log('incomePeriodValue: ', incomePeriodValue);
console.log('targetMonthValue: ', targetMonthValue);

console.log('startBtn: ', startBtn);
console.log('cancelBtn: ', cancelBtn);
*/



//функция проверки ввода числа на цисле
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


// ! основные данные приложения в объекте appData
let appData = {
    
    budget: 0, // * 02:15 money 
    income: {},    // основной доход
    addIncome: [], // доп доход
    expenses: {},    // обязательные расходы
    addExpenses: [], // доп расходы
    deposit: false, //есть ли депозит
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000, //цель накопить сумму
    period: 12,  //за какой период мы планируем накопить
    budgetDay: 0, //бюджет на день
    budgetMonth: 0, //бюджет на месяц
    expensesMonth: 0, // расходы на месяц
    
    start: function () { // *1
        // * 02:30
        //проверка на пустую строку
        if (inputSalaryAmount.value === '') {
            alert('Ошибка, поле Месячный доход должно быть заполнено');
            return;
        }
        
        appData.budget = inputSalaryAmount.value;
        console.log('inputSalaryAmount.value: ', inputSalaryAmount.value);
        
        appData.getExpenses(); // * 09:45

        // * appData.asking(); //спрашиваем пользователя
        // * appData.getExpensesMonth(); //расчет обязательных расходов
        // * appData.getBudget(); //по смыслу countBudget() считаем бюджет на месяц и на день
        // * appData.getInfoDeposit(); //расчет информации по депозиту    

    },
    
    addExpensesBlock: function () { // * 04:05 метод добавления новых полей
        expensesItems = document.querySelectorAll('.expenses-items'); // * 06:50 block узнаем текущее состояние блока
        let cloneExpensesItems = expensesItems[0].cloneNode(true); // *7 клонируем блок делаем глубокую копию true
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAddBtn); //вставляем копию блока до кнопки
        
        expensesItems = document.querySelectorAll('.expenses-items'); //block обновляем состояние
        
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none'; //прячим кнопку после 3го раза
        }
        console.log('expensesItems: ', expensesItems);
    },
    // * 09:00
    getExpenses: function () {
        expensesItems.forEach(function (item, index, arr) {
            // * 11:00 получаем значения инпутов
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            // проверка на пустые поля
            if (itemExpenses !== '' && cashExpenses !== '') {

                console.log(itemExpenses, " -> ", cashExpenses);
                //тогда записываем значения
                appData.expenses[itemExpenses] = cashExpenses;
            }
            
            console.log('appData.expenses: ', appData.expenses);
            // console.log(index, '->', item);
            // console.log(item.querySelector('.expenses-title').value, "-> по цене ->", item.querySelector('.expenses-amount').value);
        });
    },
    asking: function() {
        //вводим дополнительный источник заработка
        if (confirm('Есть ли у вас дополнительный заработок?')) { //
            //проверка строки дополнительного заработка
            //отсекаем строки с цифрами в начале
            let itemIncome = '';
            let cashIncome = 0;
            
            do {
                itemIncome = prompt('Какой у вас источник дополнительного заработка? Введите строку', 'таксую'); //str
            } while (isFinite(itemIncome));
            //проверка ввода дополнительного источника заработка
            do {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом? Введите число', 10000); //numb
            } while (!isNumber(cashIncome));
            
            appData.income[itemIncome] = cashIncome;
        }
        
        //спрашиваем доп расходы ,проверяем на ввод null и ' '
        let addExpenses = '';
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
            'еда, вода, интернет'); ///
        } while (isFinite(addExpenses));
        
        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит
        
        // * 13:40 это цикл и его функционал мы перенесли в getExpenses
        // for (let i = 0; i < 2; i++) {
        //     let expenseKey = '';
        //     //проверка на существование ключа строки расходов
        //     do {
        //         //проверка если введена НЕ строка
        //         do {
        //             expenseKey = prompt('Введите обязательную статью расходов'); //
        //         } while (isFinite(expenseKey)); // (!isNaN(parseInt(expenseKey)));
                
        //     } while (appData.expenses.hasOwnProperty(expenseKey));

        //     let answerValue = 0;
        //     //проверка на корректность ввода числа
        //     do {
        //         answerValue = prompt('Во сколько это обойдется? Введите число!'); //
        //     } while (!isNumber(answerValue));
        //     appData.expenses[expenseKey] = +answerValue;
        // }//for


    },
    
    getExpensesMonth: function() {
        // расчет обязательныз расходов суммируем по полям expenses
        for (let key in appData.expenses) {
            //проверка на собственное свойство
            if (appData.expenses.hasOwnProperty(key)) {
                appData.expensesMonth += +appData.expenses[key];
            }
        }
    },

    getBudget: function() {
        //расчет бюджетов
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        //за сколько месяцев будет достигнута цель
        let periodMission = Math.ceil(appData.mission / appData.budgetMonth);
        
        //проверяем сможем ли накопить или нет и возвращаем результат
        if (periodMission > 0) {
            return 'Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)';
        } else {
            return 'Цель не будет достигнута';
        }
    },
        
    getStatusIncome: function() {
        //возвращает результат вычислений уровня средних доходов на день
        if (appData.budgetDay >= 1200) {
            return 'Поздравляем!\nУ вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    },

    getInfoDeposit: function() {
        //спрашиваем и вычисляем информацию о депозите 
        //а также в методе asking спрашиваем appData.deposit
        if(appData.deposit) {
            //проверка ввода процента депозита
            do {
                appData.percentDeposit = prompt('Какой годовой процент? Введите число', '10');
            } while (!isNumber(appData.percentDeposit));
            appData.percentDeposit = +appData.percentDeposit;

            //проверка ввода суммы депозита
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена в депосит? Введите число', 10000);
            } while (!isNumber(appData.moneyDeposit));
            appData.moneyDeposit = +appData.moneyDeposit;
        }
    },

    calcSavedMoney: function () {
        //возвращает значения накопленных средств
        return appData.budgetMonth * appData.period;
    }

}; //appData


//! привязываем слушатели событий

// * 01:17 клик на кнопку start
startBtn.addEventListener('click', appData.start);

//  * 04:30 клик на кнопку плюс expensesPlus
expensesAddBtn.addEventListener('click', appData.addExpensesBlock);




// * 2 Вызвать все необходимые методы после объекта (порядок очень важен)
//appData.asking(); //спрашиваем пользователя
//appData.getExpensesMonth(); //расчет обязательных расходов
//appData.getBudget(); //по смыслу countBudget() считаем бюджет на месяц и на день
//appData.getInfoDeposit(); //расчет информации по депозиту


// *3 почистить выводы в консоль
// *3 console.log('Расходы за месяц', appData.expensesMonth); //расходы за месяц
// *3 console.log(appData.getTargetMonth()); //за сколько целых месяцев мы сможем накопить
// *3 console.log(appData.getStatusIncome()); //уровень дохода
// *3 console.log('Накопленные средства', appData.calcSavedMoney());


// вывести Возможные расходы строкой в консоль 
//каждое слово с большой буквы слова разделены запятой и пробелом
// TODO 
/*
let resultStr = '';
for (const elem of appData.addExpenses) {
    resultStr += elem[0].toUpperCase() + elem.slice(1) + ', ';
}
console.log(resultStr);
*/

// TODO /*** */
/*
console.log('\nНаша программа включает в себя данные: ');
for (let key in appData) {
    if (appData.hasOwnProperty(key)) {
        console.log(key, '->', appData[key]);
    }
}
*/
