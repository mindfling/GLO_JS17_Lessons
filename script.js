'use strict';
/**
 * Lesson07
 */


//функция проверки ввода числа на цисле
/**
 * @param {строка} number 
 * возвращает true если строку number можно полностью перевести в число
 */
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


//вот так вводим наш доход за месяц
//создадим функцию старт
let money = 0;
const start = function () {
    do {
            money = prompt('Введите ваш месячный доход в цифрах');
        }
        while (!isNumber(money));
    };
start();


//основные данные приложения в объекте
let appData = {
    budget: money, //свойство budget которое будет принимать значение money
    income: {},    // основноей доход
    addIncome: [], // доп доход
    expenses: {},    // обязательные расходы
    addExpenses: [], // доп расходы
    deposit: false, //есть ли депозит
    mission: 50000, //цель накопить сумму
    period: 12,  //за какой период мы планируем накопить
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {
        //спрашиваем доп расходы
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода, газ');
        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит

        for (let i = 0; i < 2; i++) {
            let expenseKey = prompt('Введите обязательную статью расходов');
            /** TODO НУЖНО ЛИ СДЕЛАТЬ ПРОВЕРКУ НА ТО ЧТО ТАКОЙ КЛЮЧ УЖЕ СУЩЕСТВУЕТ??? */
            let answer = 0;
            do {
                answer = prompt('Во сколько это обойдется? введите число!');
            } while (!isNumber(answer)); //спрашивает пока не ввели число
            appData.expenses[expenseKey] = +answer;
        }//for
    },
    
    getExpensesMonth: function() {
        // суммируем по expenses
        for (let key in appData.expenses) {
            //проверка на собственное свойство
            if (appData.expenses.hasOwnProperty(key)) {
                appData.expensesMonth += +appData.expenses[key];
            }
        }
    },

    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {
        //за сколько месяцев будет достигнута цель
        //перенесли сюда
        // let periodMission = appData.getTargetMonth(appData.mission, appData.budgetMonth);
        let periodMission = Math.ceil(appData.mission / appData.budgetMonth);
        
        //проверяем сможем накопить или нет и возвращаем результат
        if (periodMission > 0) {
            return 'Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)';
        } else {
            return 'Цель не будет достигнута';
        }
        // return periodMission;
    },
        
    getStatusIncome: function() {
        //возвращает результат вычислений уровня средних доходов на день
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    }
}; //appData


//11) Вызвать все необходимые методы после объекта (порядок очень важен)
appData.asking(); //спрашиваем пользователя
appData.getExpensesMonth(); //расчет обязательных расходов
appData.getBudget(); //по смыслу countBudget() считаем бюджет на месяц и на день


//расходы за месяц
console.log('Расходы за месяц', appData.expensesMonth); //вывод расходов за месяц

//за сколько целых месяцев мы сможем накопить
console.log(appData.getTargetMonth());

//уровень дохода
console.log(appData.getStatusIncome());




///////////////////////////////////////////////////////////

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
    if (appData.hasOwnProperty(key)) {
        console.log(key, '->', appData[key]);
    }
}