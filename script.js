'use strict';
/**
 * Lesson07
 */


//функция для вывода в консоль типа данных аргумента
const showTypeOf = function(data) {
    console.log(data, typeof data);
};


//функция проверки на цисло
const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};

let money = 0,//доход за месяц
    start = function () {//создадим функцию старт
        do {
            money = prompt('Введите ваш месячный доход в цифрах');
        }
        while (!isNumber(money));
    };

start();


//основные данные приложения перенесем это в обкт appData
let appData = {
    income: {}, // основноей доход
    addIncome: [], // доп доход
    expenses: {}, // обязательные расходы
    addExpenses: [], // доп расходы
    deposit: false, //есть ли депозит
    mission: 50000, //цель накопить сумму
    period: 12,  //за какой период мы планируем накопить
    
    asking: function() {
        //доп расходы/
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода, газ');
        
        appData.addExpenses = addExpenses.toLowerCase().split(', '); //вывод массив с доп расходами
        appData.deposit = confirm('Есть ли у вас депозит в банке?', true); //есть ли депозит
    }
};






//getExpensesMonth Функция возвращает сумму всех обязательных расходов за месяц
//amount1 + amount2
//перепишем с циклом
const getExpensesMonth = function() {
    let sum = 0;
    let expenses = [];
    
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов', 'комуналка');
        let answer = 0;
        do {
            answer = prompt('Во сколько это обойдется, введите число', 1000);
        } while (!isNumber(answer));
        sum += +answer;
    }
    return sum;
};
let expensesAmount = getExpensesMonth();


//2 Объявить функцию getAccumulatedMonth Функция возвращает Накопления за месяц Доходы минус расходы
//money - expenses
const getAccumulatedMonth = function(mon, exp) {
    return mon - exp;
};


//вывести типы переменных
// showTypeOf(money);
// showTypeOf(income);
// showTypeOf(deposit);


console.log('Расходы за месяц', expensesAmount); //вывод расходов замесяц

// console.log(addExpenses.toLowerCase().split(', ')); //вывод массив с доп расходами


//вычисляем бюджет на месяц = доходы -минус- расходы
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


//функция getTargetMonth подсчитывает за какой период будет достигнута цель, 
//и возвращает результат mission / accumulatedMonth
const getTargetMonth = function(aim, accum) {
    return Math.ceil(aim / accum);
};


//за сколько целых месяцев мы сможем накопить
//на нашу цель из остатка за месяц
let periodMission = getTargetMonth(appData.mission, accumulatedMonth);
//проверяем сможем накопить или нет
if (periodMission > 0) {
    console.log('Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)');
} else {
    console.log('Цель не будет достигнута');
}


//вычисляем дневной бюджет
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день', budgetDay);


//сделаем функцию вычесления уровня доходов исходя из budgetDay
const getStatusIncome = function(moneyOnDay) {
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
    
};
console.log(getStatusIncome(budgetDay));
