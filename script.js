'use strict';
/**
 * Lesson07
 */


//функция проверки на цисло
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};


//вот так вводим наш доход за месяц
//создадим функцию старт
let money = 0,
    start = function () {
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
    
    asking: function() {
        //доп расходы/
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода, газ');
        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит

        //Перенести цикл из метода  getExpensesMonth  в метод asking, 
        //и переписать цикл таким образом чтобы результат записывался в объект  appData.expenses
        for (let i = 0; i < 3; i++) {
            let expenseKey = prompt('Введите обязательную статью расходов');

            let answer = 0;
            do {
                answer = prompt('Во сколько это обойдется, введите число', 1000);
            } while (!isNumber(answer)); //спрашивает пока не ввели число
            // записываем обязательные расходы по ключам в обкт expenses
            appData.expenses[expenseKey] = answer;
        }
    },

    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    getExpensesMonth: function() {
        let sum = 0;
        // let expenses = [];
        //8) Переписать метод getExpensesMonth: 
        //с помощью цикла считаем сумму всех обязательных расходов и сохраняем результат в свойство expensesMonth нашего объекта
        //для того, чтобы посчитать сумму используйте цикл for in
        
        // суммируем по expenses
        for (let key in appData.expenses) {
            //проверка на собственное свойство
            if (appData.expenses.hasOwnProperty(key)) {
                console.log('appData.expenses[key]:', key, appData.expenses[key]);
                sum += +appData.expenses[key];
            }
        }


        // for (let i = 0; i < 2; i++) {
        //     expenses[i] = prompt('Введите обязательную статью расходов', 'комуналка');
        //     let answer = 0;
        //     do {
        //         answer = prompt('Во сколько это обойдется, введите число', 1000);
        //     } while (!isNumber(answer));
        //     sum += +answer;
        // }
        return sum;
    },
    getAccumulatedMonth: function(moneyMonth, expensesMonth) {
        //сколько накопили за месяц
        return moneyMonth - expensesMonth;
    },
    getTargetMonth: function(aim, accum) {
        //за сколько месяцев будет достигнута цель
        return Math.ceil(aim / accum);
    },
    getStatusIncome: function(moneyOnDay) {
        //условия уровня дохода
        if (moneyOnDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (moneyOnDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (moneyOnDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что-то пошло не так';
        }
    }
}; //appData

appData.asking();


appData.expensesMonth = appData.getExpensesMonth();

console.log('Расходы за месяц', appData.expensesMonth); //вывод расходов за месяц

console.log(appData.addExpenses); //вывод массив с доп расходами


//вычисляем бюджет на месяц = доходы -минус- расходы
// let accumulatedMonth = appData.getAccumulatedMonth(money, appData.expensesMonth);
let accumulatedMonth = appData.getAccumulatedMonth(money, appData.expensesMonth);


//за сколько целых месяцев мы сможем накопить
//на нашу цель из остатка за месяц
let periodMission = appData.getTargetMonth(appData.mission, accumulatedMonth);

//проверяем сможем накопить или нет
if (periodMission > 0) {
    console.log('Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)');
} else {
    console.log('Цель не будет достигнута');
}


//вычисляем дневной бюджет
//из средств накопленных за день
appData.budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день', appData.budgetDay);


//сделаем функцию вычесления уровня доходов исходя из budgetDay
console.log(appData.getStatusIncome(appData.budgetDay));
