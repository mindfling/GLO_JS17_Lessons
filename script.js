'use strict';
/**
 * Lesson04
 */

//функция для вывода в консоль типа данных аргумента
const showTypeOf = function(data) {
    console.log(data, typeof data);
};


const isNumber = function name(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
};

//основные данные приложения
let money = 0,//доход за месяц
    income = 'фриланс', //строка с доп доходом
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'еда, вода, газ'),//доп расходы
    deposit = confirm('Есть ли у вас депозит в банке?', true),//есть ли депозит
    mission = 100000,   //цель накопить сумму
    period = 12;        //за какой период мы планируем накопить


//создадим функцию старт
let start = function () {
    do {
        money = prompt('Введите ваш месячный доход в цифрах');
    }
    while (isNaN(money) || money.trim() === '' || money === null);
};
start();


//getExpensesMonth Функция возвращает сумму всех обязательных расходов за месяц
//сделать чистый расчет суммы обязательных расходов
//amount1 + amount2
// const getExpensesMonth = function(exp1, exp2) {
//     return exp1 + exp2;
// };
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
//сделать чистый расчет накопленных средств
//money - expenses
const getAccumulatedMonth = function(mon, exp) {
    return mon - exp;
};


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


// console.log('Расходы за месяц', getExpensesMonth(amount1, amount2));
console.log('Расходы за месяц', expensesAmount);

console.log(addExpenses.toLowerCase().split(', ')); //вывод массив с доп расходами


//вычисляем бюджет на месяц = доходы -минус- расходы
//3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);


//4 Объявить функцию getTargetMonth
//Подсчитывает за какой период будет достигнута цель, 
//зная результат месячного накопления (accumulatedMonth)
//и возвращает результат mission / accumulatedMonth
const getTargetMonth = function(aim, accum) {
    return Math.ceil(aim / accum);
};


//вычисляем период достижения цели
//за сколько целых месяцев мы сможем накопить
//на нашу цель из остатка за месяц
let periodMission = getTargetMonth(mission, accumulatedMonth);
//проверяем сможем накопить или нет
if (periodMission > 0) {
    console.log('Цель будет достигнута в течении ' + periodMission + ' месяцев(-в)');
} else {
    console.log('Цель не будет достигнута');
}


//вычисляем дневной бюджет
let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день', budgetDay);


//сделаем чистую функцию
// budgetDay
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
