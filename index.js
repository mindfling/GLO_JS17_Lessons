'use strict';
/**
 * Lesson11
 */

//buttons
const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

//other buttons plus
const buttons = document.getElementsByTagName('button'); //HTMLCollection buttons
const incomeAddBtn = buttons[0]; //
const expensesAddBtn = buttons[1]; //

//! data весь блок с inputs слева

//Месячный доход salary
const inputSalaryAmount = document.querySelector('.salary-amount');

//Дополнительный доход income
const inputIncomeTitle = document.querySelector('input.income-title');
const inputIncomeAmount = document.querySelector('input.income-amount');

//* const incomeAddBtn = button[0]; //

// Возможный доход через запятую
const additionalIncomeItem = document.querySelectorAll(
  '.additional_income-item'
);

// Обязательные расходы
const inputExpensesTitle = document.querySelector('input.expenses-title');
const inputExpensesAmount = document.querySelector('input.expenses-amount');

//* const expensesAddBtn = button[1]; //

// Возможные расходы <span>(перечислите через запятую)</span>
const inputAdditionalExpensesItem = document.querySelector(
  'input.additional_expenses-item'
);

//check галочка наличие депозита
const depositCheck = document.querySelector('#deposit-check');

//* выбор банка скрыто
const selectDepositBank = document.querySelector('.deposit-bank');

//* .deposit-calc скрыт
const inputDepositAmount = document.querySelector('.input.deposit-amount'); //сумма депозита
const inputDepositPercent = document.querySelector('.input.deposit-percent'); //процент депозита

//цель сумма
const inputTargetAmount = document.querySelector('.target-amount');

//Период расчета
const inputPeriodSelect = document.querySelector('input.period-select');
const periodAmount = document.querySelector('.period-amount');


//! result весь блок с результатами справа 
// Доход за месяц
const budgetMonthValue = document.getElementsByClassName(
  'budget_month-value'
)[0];
// Дневной бюджет
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// Расход за месяц
const expensesMonthValue = document.getElementsByClassName(
  'expenses_month-value'
)[0];
// Возможные доходы
const additionalIncomeValue = document.getElementsByClassName(
  'additional_income-value'
)[0];
// Возможные расходы
const additionalExpensesValue = document.getElementsByClassName(
  'additional_expenses-value'
)[0];
// Накопления за период
const incomePeriodValue = document.getElementsByClassName(
  'income_period-value'
)[0];
// Срок достижения цели в месяцах
const targetMonthValue = document.getElementsByClassName(
  'target_month-value'
)[0];









/*
!ЗАКОМЕНТИРОВАЛИ ДО СЛЕДУЮЩЕГО УРОКА
//функция проверки ввода числа на цисле
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


//вот так вводим наш доход за месяц
const start = function () {
    let money = 0;
    do {
            money = prompt('Введите ваш месячный доход в цифрах');//
        }
        while (!isNumber(money));
        return +money;
    };


//основные данные приложения в объекте
let appData = {

    budget: start(), // по сути принимать значение money 
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

    asking: function() {

        //вводим дополнительный источник заработка
        if (confirm('Есть ли у вас дополнительный заработок?')) { //

            //проверка строки дополнительного заработка
            //отсекаем строки с цифрами в начале
            let itemIncome = '';
            do {
                itemIncome = prompt('Какой у вас источник дополнительного заработка? Введите строку', 'таксую'); //str
            } while (isFinite(itemIncome));
            
            //проверка ввода дополнительного источника заработка
            let cashIncome = 0;
            do {
                cashIncome = prompt('Сколько в месяц зарабатываете на этом? Введите число', 10000); //numb
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }

        //спрашиваем доп расходы
        //проверяем на ввод null и ' '
        let addExpenses = '';
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
                                'еда, вода, интернет'); ///
        } while (isFinite(addExpenses));

        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит

        for (let i = 0; i < 2; i++) {
            let expenseKey = '';
            //проверка на существование ключа строки расходов
            do {
                //проверка если введена НЕ строка
                do {
                    expenseKey = prompt('Введите обязательную статью расходов'); //
                } while (isFinite(expenseKey)); // (!isNaN(parseInt(expenseKey)));

            } while (appData.expenses.hasOwnProperty(expenseKey));

            let answerValue = 0;
            //проверка на корректность ввода числа
            do {
                answerValue = prompt('Во сколько это обойдется? Введите число!'); //
            } while (!isNumber(answerValue));
            appData.expenses[expenseKey] = +answerValue;
        }//for
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


// Вызвать все необходимые методы после объекта (порядок очень важен)
appData.asking(); //спрашиваем пользователя
appData.getExpensesMonth(); //расчет обязательных расходов
appData.getBudget(); //по смыслу countBudget() считаем бюджет на месяц и на день

appData.getInfoDeposit();



//расходы за месяц
console.log('Расходы за месяц', appData.expensesMonth);
//за сколько целых месяцев мы сможем накопить
console.log(appData.getTargetMonth());
//уровень дохода
console.log(appData.getStatusIncome());

console.log('Накопленные средства', appData.calcSavedMoney());


//2) Возможные расходы (addExpenses) вывести строкой в консоль 
//каждое слово с большой буквы слова разделены запятой и пробелом
let resultStr = '';
for (const elem of appData.addExpenses) {
    resultStr += elem[0].toUpperCase() + elem.slice(1) + ', ';
}
console.log(resultStr);


///////////////////////////////////////////////////////////

console.log('\nНаша программа включает в себя данные: ');
for (let key in appData) {
    if (appData.hasOwnProperty(key)) {
        console.log(key, '->', appData[key]);
    }
}
*/
