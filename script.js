'use strict';
/**
 * Lesson08
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
const start = function () {
    let money = 0;
    do {
            money = prompt('Введите ваш месячный доход в цифрах');
        }
        while (!isNumber(money));
        return money;
    };


//основные данные приложения в объекте
let appData = {

    budget: start(), // по сути принимать значение money 
    income: {},    // основной доход
    addIncome: [], // доп доход
    expenses: {},    // обязательные расходы
    addExpenses: [], // доп расходы
    deposit: false, //есть ли депозит
    mission: 50000, //цель накопить сумму
    period: 12,  //за какой период мы планируем накопить
    budgetDay: 0, //бюджет на день
    budgetMonth: 0, //бюджет на месяц
    expensesMonth: 0, // расходы на месяц

    asking: function() {
        //спрашиваем доп расходы
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
                                    'еда, вода, газ');
        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит

        for (let i = 0; i < 2; i++) {
            let expenseKey = '';
            //проверка на существование ключа строки расходов
            do {
                expenseKey = prompt('Введите обязательную статью расходов');
            } while (appData.expenses.hasOwnProperty(expenseKey));

            let answerValue = 0;
            //проверка на корректность ввода числа
            do {
                answerValue = prompt('Во сколько это обойдется? введите число!');
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
    }
}; //appData


// Вызвать все необходимые методы после объекта (порядок очень важен)
appData.asking(); //спрашиваем пользователя
appData.getExpensesMonth(); //расчет обязательных расходов
appData.getBudget(); //по смыслу countBudget() считаем бюджет на месяц и на день


//расходы за месяц
console.log('Расходы за месяц', appData.expensesMonth);
//за сколько целых месяцев мы сможем накопить
console.log(appData.getTargetMonth());
//уровень дохода
console.log(appData.getStatusIncome());



///////////////////////////////////////////////////////////

console.log('\nНаша программа включает в себя данные: ');
for (let key in appData) {
    if (appData.hasOwnProperty(key)) {
        console.log(key, '->', appData[key]);
    }
}
